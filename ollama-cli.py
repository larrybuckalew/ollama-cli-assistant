#!/usr/bin/env python3
"""
Ollama Desktop CLI Assistant with MCP Support
A command-line interface integrated with Ollama and Model Context Protocol
"""

import requests
import json
import sys
import os
import subprocess
import platform
import asyncio
from typing import Optional, List, Dict, Any
import argparse
from datetime import datetime
from pathlib import Path
import shlex

# MCP imports
try:
    from mcp import ClientSession, StdioServerParameters
    from mcp.client.stdio import stdio_client
    MCP_AVAILABLE = True
except ImportError:
    MCP_AVAILABLE = False
    print("⚠️  MCP not available. Install with: pip install mcp")

class Config:
    """Configuration management"""
    def __init__(self):
        self.config_dir = Path.home() / ".ollama-cli"
        self.config_file = self.config_dir / "config.json"
        self.history_file = self.config_dir / "history.json"
        self.mcp_config_file = self.config_dir / "mcp_servers.json"
        self.config_dir.mkdir(exist_ok=True)
        self.load()
    
    def load(self):
        """Load configuration from file"""
        if self.config_file.exists():
            with open(self.config_file, 'r') as f:
                data = json.load(f)
                self.model = data.get('model', 'llama2')
                self.base_url = data.get('base_url', 'http://localhost:11434')
                self.stream = data.get('stream', True)
                self.system_prompt = data.get('system_prompt', '')
                self.mcp_enabled = data.get('mcp_enabled', True)
        else:
            self.model = 'llama2'
            self.base_url = 'http://localhost:11434'
            self.stream = True
            self.system_prompt = ''
            self.mcp_enabled = True
    
    def save(self):
        """Save configuration to file"""
        data = {
            'model': self.model,
            'base_url': self.base_url,
            'stream': self.stream,
            'system_prompt': self.system_prompt,
            'mcp_enabled': self.mcp_enabled
        }
        with open(self.config_file, 'w') as f:
            json.dump(data, f, indent=2)
    
    def load_mcp_servers(self) -> Dict[str, Any]:
        """Load MCP server configurations"""
        if self.mcp_config_file.exists():
            with open(self.mcp_config_file, 'r') as f:
                return json.load(f)
        else:
            # Default MCP servers configuration
            default_config = {
                "filesystem": {
                    "command": "npx",
                    "args": ["-y", "@modelcontextprotocol/server-filesystem", os.path.expanduser("~")],
                    "enabled": False
                },
                "github": {
                    "command": "npx",
                    "args": ["-y", "@modelcontextprotocol/server-github"],
                    "env": {
                        "GITHUB_PERSONAL_ACCESS_TOKEN": "your_token_here"
                    },
                    "enabled": False
                },
                "brave-search": {
                    "command": "npx",
                    "args": ["-y", "@modelcontextprotocol/server-brave-search"],
                    "env": {
                        "BRAVE_API_KEY": "your_api_key_here"
                    },
                    "enabled": False
                },
                "postgres": {
                    "command": "npx",
                    "args": ["-y", "@modelcontextprotocol/server-postgres", "postgresql://localhost/mydb"],
                    "enabled": False
                }
            }
            with open(self.mcp_config_file, 'w') as f:
                json.dump(default_config, f, indent=2)
            return default_config
    
    def save_mcp_servers(self, servers: Dict[str, Any]):
        """Save MCP server configurations"""
        with open(self.mcp_config_file, 'w') as f:
            json.dump(servers, f, indent=2)
    
    def save_conversation(self, messages: List[Dict]):
        """Save conversation history"""
        history_data = {
            'timestamp': datetime.now().isoformat(),
            'messages': messages
        }
        
        history = []
        if self.history_file.exists():
            with open(self.history_file, 'r') as f:
                history = json.load(f)
        
        history.append(history_data)
        history = history[-10:]
        
        with open(self.history_file, 'w') as f:
            json.dump(history, f, indent=2)

class MCPManager:
    """Manage MCP server connections and tool calls"""
    def __init__(self, config: Config):
        self.config = config
        self.sessions: Dict[str, ClientSession] = {}
        self.available_tools: Dict[str, Any] = {}
        
    async def connect_server(self, name: str, server_config: Dict[str, Any]) -> bool:
        """Connect to an MCP server"""
        try:
            if not MCP_AVAILABLE:
                return False
            
            server_params = StdioServerParameters(
                command=server_config['command'],
                args=server_config['args'],
                env=server_config.get('env', {})
            )
            
            stdio_transport = await stdio_client(server_params)
            session = ClientSession(stdio_transport[0], stdio_transport[1])
            await session.initialize()
            
            self.sessions[name] = session
            
            # Get available tools from this server
            tools_result = await session.list_tools()
            for tool in tools_result.tools:
                self.available_tools[f"{name}:{tool.name}"] = {
                    'server': name,
                    'tool': tool
                }
            
            return True
        except Exception as e:
            print(f"❌ Failed to connect to {name}: {str(e)}")
            return False
    
    async def disconnect_all(self):
        """Disconnect all MCP servers"""
        for name, session in self.sessions.items():
            try:
                await session.__aexit__(None, None, None)
            except:
                pass
        self.sessions.clear()
        self.available_tools.clear()
    
    async def call_tool(self, server_name: str, tool_name: str, arguments: Dict[str, Any]) -> Any:
        """Call an MCP tool"""
        if server_name not in self.sessions:
            return {"error": f"Server {server_name} not connected"}
        
        try:
            session = self.sessions[server_name]
            result = await session.call_tool(tool_name, arguments)
            return result
        except Exception as e:
            return {"error": str(e)}
    
    def get_tools_description(self) -> str:
        """Get a description of available MCP tools for the AI"""
        if not self.available_tools:
            return ""
        
        description = "\n\nAvailable MCP Tools:\n"
        for tool_id, info in self.available_tools.items():
            tool = info['tool']
            description += f"- {tool_id}: {tool.description}\n"
        
        return description

class OllamaAssistant:
    def __init__(self, config: Config, mcp_manager: Optional[MCPManager] = None):
        self.config = config
        self.model = config.model
        self.base_url = config.base_url
        self.conversation_history: List[Dict] = []
        self.mcp_manager = mcp_manager
        
        # Add system prompt with MCP tools description
        system_content = config.system_prompt
        if mcp_manager and config.mcp_enabled:
            system_content += mcp_manager.get_tools_description()
            system_content += "\n\nWhen you need to use an MCP tool, respond with a JSON object: {\"mcp_call\": {\"server\": \"server_name\", \"tool\": \"tool_name\", \"arguments\": {...}}}"
        
        if system_content:
            self.conversation_history.append({
                "role": "system",
                "content": system_content
            })
        
    def check_ollama_running(self) -> bool:
        """Check if Ollama is running and accessible"""
        try:
            response = requests.get(f"{self.base_url}/api/tags", timeout=2)
            return response.status_code == 200
        except requests.exceptions.RequestException:
            return False
    
    def list_models(self) -> List[str]:
        """List available Ollama models"""
        try:
            response = requests.get(f"{self.base_url}/api/tags")
            if response.status_code == 200:
                models = response.json().get('models', [])
                return [model['name'] for model in models]
            return []
        except requests.exceptions.RequestException:
            return []
    
    async def chat(self, message: str, stream: bool = True) -> str:
        """Send a message to Ollama and get response"""
        self.conversation_history.append({
            "role": "user",
            "content": message
        })
        
        payload = {
            "model": self.model,
            "messages": self.conversation_history,
            "stream": stream
        }
        
        try:
            response = requests.post(
                f"{self.base_url}/api/chat",
                json=payload,
                stream=stream,
                timeout=120
            )
            
            if stream:
                full_response = ""
                print("\n🤖 Assistant: ", end="", flush=True)
                
                for line in response.iter_lines():
                    if line:
                        try:
                            chunk = json.loads(line)
                            if 'message' in chunk:
                                content = chunk['message'].get('content', '')
                                print(content, end="", flush=True)
                                full_response += content
                        except json.JSONDecodeError:
                            continue
                
                print("\n")
                
                # Check if response contains MCP call
                if self.mcp_manager and "mcp_call" in full_response:
                    mcp_result = await self._handle_mcp_call(full_response)
                    if mcp_result:
                        return await self.chat(f"Here's the result from the tool: {mcp_result}", stream=False)
                
                self.conversation_history.append({
                    "role": "assistant",
                    "content": full_response
                })
                return full_response
            else:
                result = response.json()
                assistant_message = result.get('message', {}).get('content', '')
                
                # Check if response contains MCP call
                if self.mcp_manager and "mcp_call" in assistant_message:
                    mcp_result = await self._handle_mcp_call(assistant_message)
                    if mcp_result:
                        return await self.chat(f"Here's the result from the tool: {mcp_result}", stream=False)
                
                self.conversation_history.append({
                    "role": "assistant",
                    "content": assistant_message
                })
                return assistant_message
                
        except requests.exceptions.RequestException as e:
            return f"Error communicating with Ollama: {str(e)}"
    
    async def _handle_mcp_call(self, response: str) -> Optional[str]:
        """Parse and execute MCP tool calls from AI response"""
        try:
            # Try to extract JSON from response
            start = response.find("{\"mcp_call\"")
            if start == -1:
                return None
            
            end = response.find("}", start)
            json_str = response[start:end+1]
            
            call_data = json.loads(json_str)
            mcp_call = call_data.get("mcp_call", {})
            
            server = mcp_call.get("server")
            tool = mcp_call.get("tool")
            arguments = mcp_call.get("arguments", {})
            
            print(f"\n🔧 Calling MCP tool: {server}:{tool}")
            result = await self.mcp_manager.call_tool(server, tool, arguments)
            print(f"✅ Tool result received\n")
            
            return json.dumps(result)
        except Exception as e:
            print(f"❌ Error handling MCP call: {str(e)}")
            return None
    
    def clear_history(self):
        """Clear conversation history"""
        system_messages = [msg for msg in self.conversation_history if msg.get('role') == 'system']
        self.conversation_history = system_messages
        print("💭 Conversation history cleared.")
    
    def get_system_info(self) -> str:
        """Get system information"""
        info = f"""System Information:
- OS: {platform.system()} {platform.release()}
- Platform: {platform.platform()}
- Machine: {platform.machine()}
- Python: {platform.python_version()}
- Working Directory: {os.getcwd()}
- MCP Available: {MCP_AVAILABLE}
"""
        return info

def execute_shell_command(command: str) -> tuple[str, int]:
    """Execute a shell command and return output"""
    try:
        result = subprocess.run(
            command,
            shell=True,
            capture_output=True,
            text=True,
            timeout=30
        )
        return result.stdout + result.stderr, result.returncode
    except subprocess.TimeoutExpired:
        return "Command timed out after 30 seconds", 1
    except Exception as e:
        return f"Error executing command: {str(e)}", 1

def read_file(filepath: str) -> str:
    """Read file contents"""
    try:
        path = Path(filepath).expanduser()
        if not path.exists():
            return f"❌ File not found: {filepath}"
        
        if path.stat().st_size > 1_000_000:
            return "❌ File too large (max 1MB)"
        
        with open(path, 'r', encoding='utf-8', errors='ignore') as f:
            return f.read()
    except Exception as e:
        return f"❌ Error reading file: {str(e)}"

def print_banner():
    """Print welcome banner"""
    banner = """
╔═══════════════════════════════════════════════════════╗
║    🤖 Ollama CLI Assistant with MCP Support 🔧       ║
║         Your Local AI Companion + Tools               ║
╚═══════════════════════════════════════════════════════╝
    """
    print(banner)

def print_help():
    """Print available commands"""
    help_text = """
Available Commands:
  /help       - Show this help message
  /clear      - Clear conversation history
  /models     - List available models
  /switch     - Switch to a different model
  /info       - Show system information
  /read <file> - Read a file and discuss it
  /exec <cmd> - Execute a shell command (use with caution!)
  /save       - Save current conversation
  /config     - Show current configuration
  /system     - Set system prompt
  /mcp        - MCP server management
  /tools      - List available MCP tools
  /exit       - Exit the assistant
  
Just type your message to chat with the assistant!
    """
    print(help_text)

async def setup_mcp_servers(config: Config, mcp_manager: MCPManager):
    """Set up and connect to enabled MCP servers"""
    servers = config.load_mcp_servers()
    
    connected = []
    for name, server_config in servers.items():
        if server_config.get('enabled', False):
            print(f"🔌 Connecting to MCP server: {name}...")
            if await mcp_manager.connect_server(name, server_config):
                connected.append(name)
                print(f"✅ Connected to {name}")
            else:
                print(f"❌ Failed to connect to {name}")
    
    if connected:
        print(f"\n🎯 Connected MCP servers: {', '.join(connected)}\n")
    
    return connected

async def interactive_mode(assistant: OllamaAssistant, config: Config, mcp_manager: Optional[MCPManager] = None):
    """Run the assistant in interactive mode"""
    print_banner()
    print(f"📦 Using model: {assistant.model}")
    print(f"🌐 Ollama URL: {assistant.base_url}")
    
    if mcp_manager and MCP_AVAILABLE:
        await setup_mcp_servers(config, mcp_manager)
    
    print("💡 Type /help for commands or just start chatting!\n")
    
    while True:
        try:
            user_input = input("👤 You: ").strip()
            
            if not user_input:
                continue
            
            # Handle commands
            if user_input.startswith('/'):
                parts = user_input.split(maxsplit=1)
                command = parts[0].lower()
                args = parts[1] if len(parts) > 1 else ""
                
                if command == '/exit' or command == '/quit':
                    print("👋 Goodbye!")
                    if assistant.conversation_history:
                        save = input("Save this conversation? (y/n): ").strip().lower()
                        if save == 'y':
                            config.save_conversation(assistant.conversation_history)
                            print("✅ Conversation saved!")
                    if mcp_manager:
                        await mcp_manager.disconnect_all()
                    break
                    
                elif command == '/help':
                    print_help()
                    
                elif command == '/clear':
                    assistant.clear_history()
                    
                elif command == '/info':
                    print("\n" + assistant.get_system_info())
                    
                elif command == '/tools':
                    if mcp_manager and mcp_manager.available_tools:
                        print("\n🔧 Available MCP Tools:")
                        for tool_id, info in mcp_manager.available_tools.items():
                            tool = info['tool']
                            print(f"  • {tool_id}")
                            print(f"    Description: {tool.description}")
                            print()
                    else:
                        print("❌ No MCP tools available. Enable MCP servers with /mcp\n")
                    
                elif command == '/mcp':
                    if not MCP_AVAILABLE:
                        print("❌ MCP not installed. Run: pip install mcp\n")
                        continue
                    
                    servers = config.load_mcp_servers()
                    print("\n🔧 MCP Servers Configuration:")
                    for i, (name, server_config) in enumerate(servers.items(), 1):
                        status = "✅ Enabled" if server_config.get('enabled') else "❌ Disabled"
                        print(f"{i}. {name} - {status}")
                    
                    print("\nOptions:")
                    print("  e - Enable a server")
                    print("  d - Disable a server")
                    print("  c - Configure a server")
                    print("  r - Reconnect servers")
                    print("  q - Back to chat")
                    
                    choice = input("\nSelect option: ").strip().lower()
                    
                    if choice == 'e':
                        server_name = input("Server name to enable: ").strip()
                        if server_name in servers:
                            servers[server_name]['enabled'] = True
                            config.save_mcp_servers(servers)
                            print(f"✅ Enabled {server_name}. Use /mcp r to reconnect.\n")
                        else:
                            print(f"❌ Server {server_name} not found\n")
                    
                    elif choice == 'd':
                        server_name = input("Server name to disable: ").strip()
                        if server_name in servers:
                            servers[server_name]['enabled'] = False
                            config.save_mcp_servers(servers)
                            print(f"✅ Disabled {server_name}\n")
                        else:
                            print(f"❌ Server {server_name} not found\n")
                    
                    elif choice == 'r':
                        if mcp_manager:
                            await mcp_manager.disconnect_all()
                            await setup_mcp_servers(config, mcp_manager)
                    
                elif command == '/models':
                    models = assistant.list_models()
                    if models:
                        print("\n📚 Available models:")
                        for i, model in enumerate(models, 1):
                            current = "⭐" if model == assistant.model else "  "
                            print(f"{current} {i}. {model}")
                        print()
                    else:
                        print("❌ No models found.")
                        
                elif command == '/switch':
                    models = assistant.list_models()
                    if models:
                        print("\n📚 Available models:")
                        for i, model in enumerate(models, 1):
                            print(f"{i}. {model}")
                        try:
                            choice = input("\nEnter model number: ").strip()
                            idx = int(choice) - 1
                            if 0 <= idx < len(models):
                                assistant.model = models[idx]
                                config.model = models[idx]
                                config.save()
                                assistant.clear_history()
                                print(f"✅ Switched to {assistant.model}\n")
                            else:
                                print("❌ Invalid choice\n")
                        except (ValueError, IndexError):
                            print("❌ Invalid input\n")
                    else:
                        print("❌ No models found\n")
                        
                elif command == '/read':
                    if not args:
                        print("❌ Usage: /read <filepath>\n")
                    else:
                        content = read_file(args)
                        print(f"\n📄 File contents:\n{content[:500]}{'...' if len(content) > 500 else ''}\n")
                        follow_up = input("Ask about this file (or press Enter to skip): ").strip()
                        if follow_up:
                            full_message = f"Here's the content of {args}:\n\n{content}\n\nQuestion: {follow_up}"
                            await assistant.chat(full_message)
                            
                elif command == '/exec':
                    if not args:
                        print("❌ Usage: /exec <command>\n")
                    else:
                        print(f"⚠️  About to execute: {args}")
                        confirm = input("Continue? (y/n): ").strip().lower()
                        if confirm == 'y':
                            output, returncode = execute_shell_command(args)
                            print(f"\n📤 Output (exit code {returncode}):\n{output}\n")
                            follow_up = input("Ask AI about this output? (y/n): ").strip().lower()
                            if follow_up == 'y':
                                full_message = f"I executed the command: {args}\n\nOutput:\n{output}\n\nWhat does this mean?"
                                await assistant.chat(full_message)
                        else:
                            print("❌ Cancelled\n")
                            
                elif command == '/save':
                    config.save_conversation(assistant.conversation_history)
                    print("✅ Conversation saved!\n")
                    
                elif command == '/config':
                    print(f"""
Current Configuration:
  Model: {config.model}
  Base URL: {config.base_url}
  Stream: {config.stream}
  MCP Enabled: {config.mcp_enabled}
  System Prompt: {config.system_prompt[:50] + '...' if len(config.system_prompt) > 50 else config.system_prompt}
  Config Dir: {config.config_dir}
""")
                    
                elif command == '/system':
                    print("Current system prompt:", config.system_prompt or "(none)")
                    new_prompt = input("Enter new system prompt (or press Enter to clear): ").strip()
                    config.system_prompt = new_prompt
                    config.save()
                    print("✅ System prompt updated! Use /clear to apply to current conversation.\n")
                    
                else:
                    print(f"❌ Unknown command: {command}")
                    print("💡 Type /help to see available commands\n")
            else:
                # Regular chat message
                await assistant.chat(user_input)
                
        except KeyboardInterrupt:
            print("\n\n👋 Goodbye!")
            if mcp_manager:
                await mcp_manager.disconnect_all()
            break
        except EOFError:
            print("\n👋 Goodbye!")
            if mcp_manager:
                await mcp_manager.disconnect_all()
            break

async def single_query_mode(assistant: OllamaAssistant, query: str, mcp_manager: Optional[MCPManager] = None):
    """Run a single query and exit"""
    if mcp_manager:
        await setup_mcp_servers(assistant.config, mcp_manager)
    
    response = await assistant.chat(query, stream=False)
    print(f"\n🤖 Assistant: {response}\n")
    
    if mcp_manager:
        await mcp_manager.disconnect_all()

async def async_main():
    parser = argparse.ArgumentParser(
        description="Ollama Desktop CLI Assistant with MCP Support"
    )
    parser.add_argument('-m', '--model', help='Ollama model to use')
    parser.add_argument('-q', '--query', help='Single query mode')
    parser.add_argument('--url', help='Ollama API URL')
    parser.add_argument('--list-models', action='store_true', help='List models')
    parser.add_argument('--reset-config', action='store_true', help='Reset config')
    parser.add_argument('--no-mcp', action='store_true', help='Disable MCP')
    
    args = parser.parse_args()
    
    config = Config()
    
    if args.reset_config:
        config.config_file.unlink(missing_ok=True)
        print("✅ Configuration reset")
        return
    
    if args.model:
        config.model = args.model
    if args.url:
        config.base_url = args.url
    if args.no_mcp:
        config.mcp_enabled = False
    
    # Initialize MCP manager
    mcp_manager = None
    if config.mcp_enabled and MCP_AVAILABLE:
        mcp_manager = MCPManager(config)
    
    assistant = OllamaAssistant(config, mcp_manager)
    
    if not assistant.check_ollama_running():
        print("❌ Cannot connect to Ollama at", assistant.base_url)
        print("Run: ollama serve")
        sys.exit(1)
    
    if args.list_models:
        models = assistant.list_models()
        if models:
            print("\n📚 Available models:")
            for model in models:
                print(f"  • {model}")
        sys.exit(0)
    
    if args.query:
        await single_query_mode(assistant, args.query, mcp_manager)
    else:
        await interactive_mode(assistant, config, mcp_manager)
        config.save()

def main():
    asyncio.run(async_main())

if __name__ == "__main__":
    main()
