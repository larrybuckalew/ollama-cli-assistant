@echo off
echo ========================================
echo Pushing to GitHub Repository
echo ========================================
echo.

cd C:\Users\larry\ollama-cli-assistant

echo Initializing Git repository...
git init

echo Adding all files...
git add .

echo Creating commit...
git commit -m "Initial commit: Ollama CLI Assistant with MCP support by Larry Buckalew"

echo Adding remote repository...
git remote add origin https://github.com/larrybuckalew/ollama-cli-assistant.git

echo Setting branch to main...
git branch -M main

echo Pushing to GitHub...
echo You may be prompted to authenticate. Use your GitHub username and Personal Access Token.
echo.
git push -u origin main

echo.
echo ========================================
echo Done! Check https://github.com/larrybuckalew/ollama-cli-assistant
echo ========================================
pause
