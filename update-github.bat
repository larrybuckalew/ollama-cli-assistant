@echo off
echo ========================================
echo Updating GitHub Repository
echo ========================================
echo.

cd C:\Users\larry\ollama-cli-assistant

echo Checking git status...
git status

echo.
echo Adding all updated files...
git add .

echo.
echo Please enter a commit message describing your changes:
set /p commit_message="Commit message: "

if "%commit_message%"=="" (
    set commit_message=Updated files
)

echo.
echo Creating commit with message: %commit_message%
git commit -m "%commit_message%"

echo.
echo Pushing to GitHub...
git push origin main

echo.
echo ========================================
echo Done! Check https://github.com/larrybuckalew/ollama-cli-assistant
echo ========================================
echo.
pause
