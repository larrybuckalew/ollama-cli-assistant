# Ollama CLI Assistant with MCP Support

A powerful command-line interface that integrates Ollama with Model Context Protocol (MCP) for enhanced AI assistance with tool capabilities.

🌟 **Features**
- **Interactive Chat Mode** - Natural conversation with your local LLM
- **MCP Integration** - Connect to multiple MCP servers for extended capabilities
- **File Operations** - Read and discuss files with AI assistance
- **Shell Execution** - Execute commands with AI explanations
- **Multiple Model Support** - Easy switching between Ollama models
- **Conversation History** - Save and restore chat sessions
- **Streaming Responses** - Real-time AI output
- **System Prompts** - Customize AI behavior
- **Persistent Configuration** - Settings saved between sessions

📋 **Prerequisites**
- Python 3.8+
- Ollama installed and running
- Node.js (for MCP servers)

🚀 **Installation**
1. Clone the repository
    ```bash
    git clone https://github.com/yourusername/ollama-cli-assistant.git
    cd ollama-cli-assistant
    ```
2. Install Python dependencies
    ```bash
    pip install -r requirements.txt
    ```
3. Install MCP servers (optional but recommended)
    ```bash
    # Filesystem access
    npm install -g @modelcontextprotocol/server-filesystem

    # GitHub integration
    npm install -g @modelcontextprotocol/server-github

    # Web search
    npm install -g @modelcontextprotocol/server-brave-search

    # PostgreSQL database
    npm install -g @modelcontextprotocol/server-postgres
    ```
4. Make the script executable
    ```bash
    chmod +x ollama-cli.py
    ```
5. Optional: Add to PATH
    ```bash
    # Add to ~/.bashrc or ~/.zshrc
    echo 'alias ai="python3 /path/to/ollama-cli.py"' >> ~/.bashrc
    source ~/.bashrc
    ```

🎯 **Quick Start**

**Basic Usage**
```bash
# Interactive mode
python ollama-cli.py

# Single query
python ollama-cli.py -q "What is Python?"

# Use specific model
python ollama-cli.py -m codellama

# List available models
python ollama-cli.py --list-models
```

**First Time Setup**
- Start Ollama: `ollama serve`
- Pull a model: `ollama pull llama2`
- Run the CLI: `python ollama-cli.py`
- Enable MCP servers: Type `/mcp` in the chat

📖 **Commands**

**Chat Commands**

| Command                 | Description                               |
|-------------------------|-------------------------------------------|
| `/help`                 | Show available commands                   |
| `/clear`                | Clear conversation history                |
| `/models`               | List available Ollama models              |
| `/switch`               | Switch to a different model               |
| `/info`                 | Show system information                   |
| `/read <file>`          | Read and discuss a file                   |
| `/exec <cmd>`           | Execute shell command                     |
| `/save`                 | Save conversation history                 |
| `/config`               | Show current configuration                |
| `/system`               | Set custom system prompt                  |
| `/mcp`                  | Manage MCP servers                        |
| `/tools`                | List available MCP tools                  |
| `/exit`                 | Exit the assistant                        |

**Command Line Arguments**
```bash
python ollama-cli.py [OPTIONS]
```
**Options:**
- `-m, --model MODEL`        Specify Ollama model (default: llama2)
- `-q, --query QUERY`        Single query mode
- `--url URL`                Ollama API URL (default: http://localhost:11434)
- `--list-models`            List available models
- `--reset-config`           Reset configuration to defaults
- `--no-mcp`                 Disable MCP integration
- `-h, --help`               Show help message

🔧 **MCP Configuration**

**Enable MCP Servers**
- In the chat, type `/mcp`
- Choose option `e` to enable a server
- Enter the server name (e.g., filesystem)
- Choose option `r` to reconnect

**Configure Server Settings**  
Edit `~/.ollama-cli/mcp_servers.json`:
```json
{
  "filesystem": {
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-filesystem", "/home/user"],
    "enabled": true
  },
  "github": {
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-github"],
    "env": {
      "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_your_token_here"
    },
    "enabled": true
  }
}
```

**Available MCP Servers**
- **Filesystem** - File read/write, directory listing
- **GitHub** - Repository access, issues, pull requests
- **Brave Search** - Web search integration
- **PostgreSQL** - Database queries and operations

💡 **Use Cases**
- **Code Review**  
  You: Read src/main.py and suggest improvements
- **System Debugging**  
  You: /exec docker ps  
  You: What does this output mean?
- **Research**  
  You: Search for latest developments in AI safety
- **Database Operations**  
  You: Query the users table where created_at > '2024-01-01'

📁 **Project Structure**
```
ollama-cli-assistant/
├── ollama-cli.py          # Main application
├── requirements.txt       # Python dependencies
├── README.md              # This file
├── LICENSE                # MIT License
└── .gitignore             # Git ignore rules
```

🔐 **Security**
- MCP tools run with your system permissions.
- API keys are stored locally in `~/.ollama-cli/mcp_servers.json`.
- Shell commands require confirmation before execution.
- File access is limited to configured directories.

> **Important:** Keep your configuration files secure and never commit API keys to version control.

🤝 **Contributing**
Contributions are welcome! Please feel free to submit a Pull Request.
1. Fork the repository
2. Create your feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add some AmazingFeature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a Pull Request

📝 **License**
This project is licensed under the MIT License - see the LICENSE file for details.

🙏 **Acknowledgments**
- Ollama - Local LLM runtime
- Model Context Protocol - Tool integration framework
- Anthropic - For MCP specification

📮 **Support**
- Issues: GitHub Issues
- Discussions: GitHub Discussions

🗺️ **Roadmap**
- Plugin system for custom commands
- Multi-language support
- Voice input/output
- Web interface
- Docker container
- More MCP server integrations

---

Author: Larry Buckalew  
Made with ❤️ for the AI community