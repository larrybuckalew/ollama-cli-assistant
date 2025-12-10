# Ollama CLI Assistant

A comprehensive AI assistant platform with both **Command-Line Interface** and **Web Interface** for interacting with Ollama and MCP (Model Context Protocol).

## 🏗️ Project Structure

This repository contains two complementary applications:

```
ollama-cli-assistant/
├── ollama-cli.py          # Python CLI Application
├── requirements.txt       # Python dependencies
├── package.json           # Next.js Web UI dependencies
├── *.tsx                  # React/Next.js components
├── *.css                  # Stylesheets
├── README.md             # This file
└── LICENSE               # MIT License
```

## 🚀 Two Ways to Use Ollama CLI

### 1. Command-Line Interface (Python)

A powerful terminal-based AI assistant with MCP integration.

#### Features:
- Interactive chat with streaming responses
- MCP server integration (filesystem, GitHub, databases)
- File operations and shell command execution
- Conversation history
- Multiple model support

#### Quick Start:
```bash
# Install Python dependencies
pip install -r requirements.txt

# Run the CLI
python ollama-cli.py

# Single query mode
python ollama-cli.py -q "What is Python?"
```

### 2. Web Interface (Next.js)

A modern web application for Ollama CLI with a beautiful UI.

#### Features:
- Modern, responsive web interface
- Real-time chat interface
- Settings panel for configuration
- MCP server management UI
- Statistics and analytics
- Marketing pages (pricing, contact)

#### Quick Start:
```bash
# Install Node.js dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
npm start
```

Visit `http://localhost:3000` to use the web interface.

## 📋 Prerequisites

### For CLI (Python):
- Python 3.8+
- [Ollama](https://ollama.ai) installed and running
- Node.js (for MCP servers)

### For Web UI (Next.js):
- Node.js 18+
- npm or yarn

## 🔧 Installation

### 1. Clone Repository
```bash
git clone https://github.com/larrybuckalew/ollama-cli-assistant.git
cd ollama-cli-assistant
```

### 2. Setup Python CLI
```bash
# Install Python dependencies
pip install -r requirements.txt

# Start Ollama
ollama serve

# Pull a model
ollama pull llama2

# Run CLI
python ollama-cli.py
```

### 3. Setup Web UI
```bash
# Install Node.js dependencies
npm install

# Create environment variables (if needed)
# Create .env.local file with:
# NEXT_PUBLIC_API_URL=http://localhost:11434

# Run development server
npm run dev
```

## 🚀 Deployment

The Ollama CLI Assistant can be deployed to production using modern cloud platforms. See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.

### Quick Deploy Options:

| Component | Platform | Status | Cost |
|-----------|----------|--------|------|
| **Web UI** | [Vercel](https://vercel.com) | ✅ Ready | Free |
| **Backend** | [Railway](https://railway.app) | ✅ Ready | $5/month |
| **Backend** | [Render](https://render.com) | ✅ Ready | $7/month |
| **CLI** | GitHub Releases | ✅ Ready | Free |

### One-Click Deploy:

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/larrybuckalew/ollama-cli-assistant)

## 🎯 Usage

### CLI Commands

| Command | Description |
|---------|-------------|
| `/help` | Show available commands |
| `/models` | List available models |
| `/switch` | Switch models |
| `/mcp` | Manage MCP servers |
| `/read <file>` | Read and discuss files |
| `/exec <cmd>` | Execute shell commands |
| `/exit` | Exit CLI |

### Web UI Routes

- `/` - Home page with features
- `/app` - Main chat interface
- `/pricing` - Pricing information
- `/contact` - Contact form

## 🔌 MCP Integration

Both CLI and Web UI support MCP servers:

### Available MCP Servers:
- **Filesystem** - File read/write operations
- **GitHub** - Repository access
- **Brave Search** - Web search
- **PostgreSQL** - Database queries

### Configuration:

Edit `~/.ollama-cli/mcp_servers.json` (or `%USERPROFILE%\.ollama-cli\mcp_servers.json` on Windows):

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
      "GITHUB_PERSONAL_ACCESS_TOKEN": "your_token_here"
    },
    "enabled": true
  }
}
```

## 📁 Project Components

### Python CLI Components:
- `ollama-cli.py` - Main CLI application
- `Config` class - Configuration management
- `MCPManager` class - MCP server handling
- `OllamaAssistant` class - Chat interface

### Next.js Web Components:
- `page.tsx` - Contact page
- `chat-interface.tsx` - Chat UI component
- `chat-messages.tsx` - Message display
- `chat-input.tsx` - Input component
- `settings-panel.tsx` - Settings UI
- `mcp-panel.tsx` - MCP management UI
- `hero-section.tsx` - Landing page hero
- `features-section.tsx` - Features showcase

## 🎨 Tech Stack

### CLI:
- Python 3.8+
- requests
- mcp
- asyncio

### Web UI:
- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Radix UI components
- Lucide icons

## 🔐 Security

- MCP tools run with system permissions
- API keys stored locally
- Shell commands require confirmation
- File access limited to configured directories

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to your fork
5. Open a Pull Request

## 📝 License

MIT License - see [LICENSE](LICENSE) file

Copyright (c) 2024 Larry Buckalew

## 🙏 Acknowledgments

- [Ollama](https://ollama.ai) - Local LLM runtime
- [Model Context Protocol](https://modelcontextprotocol.io) - Tool integration
- [Next.js](https://nextjs.org) - React framework
- [Radix UI](https://radix-ui.com) - UI components

## 📮 Support

- **Issues**: [GitHub Issues](https://github.com/larrybuckalew/ollama-cli-assistant/issues)
- **Discussions**: [GitHub Discussions](https://github.com/larrybuckalew/ollama-cli-assistant/discussions)
- **Email**: Contact via GitHub

## 🗺️ Roadmap

- [ ] Real-time collaboration
- [ ] Voice input/output
- [ ] Mobile app
- [ ] Docker containers
- [ ] More MCP integrations
- [ ] Plugin system
- [ ] Multi-language support

---

**Author**: Larry Buckalew

Made with ❤️ for the AI community

**Choose your interface**: Command-line power or web convenience - both backed by the same powerful Ollama engine!
