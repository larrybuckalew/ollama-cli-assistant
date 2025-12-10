# 🖥️ VPS Deployment Guide

Deploy the Ollama CLI Assistant to your existing VPS (where n8n is running). This guide assumes you have a Linux VPS with root/sudo access.

## 📋 Prerequisites

Your VPS should have:
- ✅ Ubuntu/Debian/CentOS Linux
- ✅ At least 2GB RAM (4GB recommended)
- ✅ 10GB free disk space
- ✅ n8n already running
- ✅ SSH access

## 🚀 Quick VPS Setup

### 1. Update System & Install Runtimes

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18+ (for Next.js)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Python 3.8+ (for backend & CLI)
sudo apt install python3 python3-pip python3-venv -y

# Install nginx (reverse proxy)
sudo apt install nginx -y

# Install certbot (SSL certificates)
sudo apt install certbot python3-certbot-nginx -y
```

### 2. Clone & Setup Project

```bash
# Clone repository
cd /opt
sudo git clone https://github.com/larrybuckalew/ollama-cli-assistant.git
sudo chown -R $USER:$USER ollama-cli-assistant
cd ollama-cli-assistant

# Install Node.js dependencies
npm install

# Install Python backend dependencies
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cd ..
```

### 3. Configure Environment Variables

```bash
# Create environment files
sudo mkdir -p /etc/ollama-cli

# Backend environment variables
sudo tee /etc/ollama-cli/backend.env > /dev/null <<EOF
SECRET_KEY=your-super-secret-key-change-this
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
MICROSOFT_CLIENT_ID=your-microsoft-client-id
MICROSOFT_CLIENT_SECRET=your-microsoft-client-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
STRIPE_SECRET_KEY=your-stripe-secret-key
EOF

# Web UI environment variables
sudo tee /etc/ollama-cli/web.env > /dev/null <<EOF
OLLAMA_API_URL=http://localhost:8000
NEXT_PUBLIC_API_URL=http://localhost:8000
EOF
```

### 4. Create Systemd Services

#### Backend Service (`/etc/systemd/system/ollama-backend.service`):

```bash
sudo tee /etc/systemd/system/ollama-backend.service > /dev/null <<EOF
[Unit]
Description=Ollama CLI Assistant Backend
After=network.target

[Service]
Type=simple
User=$USER
WorkingDirectory=/opt/ollama-cli-assistant/backend
EnvironmentFile=/etc/ollama-cli/backend.env
ExecStart=/opt/ollama-cli-assistant/backend/venv/bin/uvicorn main:app --host 0.0.0.0 --port 8000
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
EOF
```

#### Web UI Service (`/etc/systemd/system/ollama-web.service`):

```bash
sudo tee /etc/systemd/system/ollama-web.service > /dev/null <<EOF
[Unit]
Description=Ollama CLI Assistant Web UI
After=network.target ollama-backend.service

[Service]
Type=simple
User=$USER
WorkingDirectory=/opt/ollama-cli-assistant
EnvironmentFile=/etc/ollama-cli/web.env
ExecStart=/usr/bin/npm run start
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
EOF
```

### 5. Configure Nginx Reverse Proxy

Create nginx config (`/etc/nginx/sites-available/ollama-cli-assistant`):

```bash
sudo tee /etc/nginx/sites-available/ollama-cli-assistant > /dev/null <<EOF
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    # Backend API
    location /api/ {
        proxy_pass http://localhost:8000;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }

    # Next.js app
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
EOF
```

Enable the site:

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/ollama-cli-assistant /etc/nginx/sites-enabled/

# Remove default site
sudo rm /etc/nginx/sites-enabled/default

# Test nginx config
sudo nginx -t

# Restart nginx
sudo systemctl restart nginx
```

### 6. Start Services

```bash
# Enable services
sudo systemctl enable ollama-backend
sudo systemctl enable ollama-web

# Start services
sudo systemctl start ollama-backend
sudo systemctl start ollama-web

# Check status
sudo systemctl status ollama-backend
sudo systemctl status ollama-web
```

### 7. Setup SSL (Let's Encrypt)

```bash
# Get SSL certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Test renewal
sudo certbot renew --dry-run
```

## 🔍 Testing Your Deployment

### Test Backend API
```bash
curl http://localhost:8000/
curl http://your-domain.com/api/
```

### Test Web UI
```bash
curl http://localhost:3000/
curl http://your-domain.com/
```

### Check Logs
```bash
# Backend logs
sudo journalctl -u ollama-backend -f

# Web UI logs
sudo journalctl -u ollama-web -f

# Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

## 🔧 Maintenance Commands

### Update the Application
```bash
cd /opt/ollama-cli-assistant
git pull origin main
npm install
cd backend && source venv/bin/activate && pip install -r requirements.txt
sudo systemctl restart ollama-backend ollama-web
```

### Backup Data
```bash
# Backup database (if using SQLite)
cp /opt/ollama-cli-assistant/backend/ollama-cli.db /opt/backup/

# Backup environment files
cp /etc/ollama-cli/*.env /opt/backup/
```

### Monitor Resources
```bash
# Check service status
sudo systemctl status ollama-backend ollama-web nginx

# Check resource usage
htop
df -h
free -h
```

## 🚨 Troubleshooting

### Common Issues

1. **Port Conflicts**
   ```bash
   # Check what's using ports
   sudo netstat -tulpn | grep :3000
   sudo netstat -tulpn | grep :8000
   ```

2. **Permission Issues**
   ```bash
   # Fix permissions
   sudo chown -R $USER:$USER /opt/ollama-cli-assistant
   sudo chmod 600 /etc/ollama-cli/*.env
   ```

3. **Service Won't Start**
   ```bash
   # Check service logs
   sudo journalctl -u ollama-backend --no-pager -n 50
   sudo journalctl -u ollama-web --no-pager -n 50
   ```

4. **SSL Issues**
   ```bash
   # Check certificate
   sudo certbot certificates
   # Renew certificate
   sudo certbot renew
   ```

## 📊 Performance Tuning

### For High Traffic
```bash
# Increase nginx worker processes
sudo sed -i 's/worker_processes auto;/worker_processes 4;/' /etc/nginx/nginx.conf

# Add caching to nginx
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

### Memory Optimization
```bash
# Use PM2 for better process management (optional)
sudo npm install -g pm2
cd /opt/ollama-cli-assistant
pm2 start npm --name "ollama-web" -- run start
pm2 save
pm2 startup
```

## 🔒 Security Checklist

- [ ] Changed default SSH port (22 → 2222)
- [ ] Disabled root login via SSH
- [ ] Installed fail2ban
- [ ] Set up firewall (ufw)
- [ ] Regular security updates
- [ ] SSL certificates installed
- [ ] Environment variables secured
- [ ] File permissions correct

## 🎯 Your VPS URLs

After setup, your application will be available at:
- **Web UI**: `https://your-domain.com`
- **API**: `https://your-domain.com/api/`
- **n8n**: `https://your-domain.com/n8n/` (existing)

## 💡 Integration with n8n

Since you already have n8n running, you can:

1. **Create workflows** that interact with your Ollama API
2. **Automate tasks** using the CLI tool
3. **Build custom integrations** between services

Example n8n workflow: Auto-post Ollama responses to Slack/Discord.

---

**Your Ollama CLI Assistant is now running on your VPS alongside n8n! 🎉**