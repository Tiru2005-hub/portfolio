@echo off
TITLE Anti-Gravity Portfolio Launcher
cls

echo ============================================================
echo   🚀 LAUNCHING ANTI-GRAVITY PORTFOLIO
echo   Author: Tiru krishna E
echo ============================================================
echo.

:: Check if Node.js is installed
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed! Please install it to run the backend.
    pause
    exit /b
)

:: Navigate to backend and install dependencies if node_modules is missing
cd backend
if not exist node_modules (
    echo [INFO] First time setup: Installing dependencies...
    call npm install
)

:: Start the backend server in a new window
echo [INFO] Starting Backend Server on port 3001...
start "Portfolio Backend" cmd /c "node server.js"

:: Wait a few seconds for server to initialize
timeout /t 3 /nobreak >nul

:: Open the website in the default browser
echo [INFO] Opening Portfolio in browser...
start http://localhost:3001

echo.
echo ============================================================
echo   ✅ SYSTEM ONLINE!
echo   You can close this window. The server is running in 
echo   the "Portfolio Backend" window.
echo ============================================================
echo.
timeout /t 5
exit
