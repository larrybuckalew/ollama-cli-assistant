#!/bin/bash
set -e

echo "🚀 Starting deployment..."

# Navigate to project directory
cd /opt/ollama-cli-assistant

# Pull latest changes
echo "📥 Pulling latest code from GitHub..."
git pull origin main

# Install/update dependencies
echo "📦 Installing dependencies..."
npm install

# Build the Next.js app
echo "🔨 Building application..."
npm run build

# Restart services
echo "♻️  Restarting services..."
systemctl restart ollama-backend
systemctl restart ollama-web

# Check service status
echo "✅ Checking service status..."
systemctl is-active ollama-backend
systemctl is-active ollama-web

echo "✅ Deployment complete!"
