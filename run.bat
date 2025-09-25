@echo off
echo ========================================
echo     Remove BG - Local Development
echo ========================================
echo.

:: Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

:: Check if pnpm is installed
pnpm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo PNPM is not installed. Installing pnpm globally...
    npm install -g pnpm
    if %errorlevel% neq 0 (
        echo ERROR: Failed to install pnpm
        pause
        exit /b 1
    )
)

:: Display versions
echo Node.js version:
node --version
echo.
echo PNPM version:
pnpm --version
echo.

:: Check if node_modules exists
if not exist "node_modules" (
    echo Installing dependencies...
    pnpm install
    if %errorlevel% neq 0 (
        echo ERROR: Failed to install dependencies
        pause
        exit /b 1
    )
    echo.
) else (
    echo Dependencies already installed.
    echo.
)

:: Start the development server
echo Starting the development server...
echo You can access the application at: http://localhost:3000
echo Press Ctrl+C to stop the server
echo.
pnpm dev

pause