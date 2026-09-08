@echo off
setlocal
title Quiz for YouTube Generator
cd /d "%~dp0" || goto :folder_error

echo ===================================================
echo    Starting Quiz for YouTube Generator...
echo ===================================================

where node.exe >nul 2>&1
if errorlevel 1 goto :node_error

where npm.cmd >nul 2>&1
if errorlevel 1 goto :npm_error

if not exist "node_modules\tsx\dist\cli.mjs" (
    echo.
    echo Installing project dependencies. This may take a few minutes...
    call npm.cmd install
    if errorlevel 1 goto :install_error
)

powershell.exe -NoProfile -Command "try { $r = Invoke-RestMethod -Uri 'http://127.0.0.1:3000/api/health' -TimeoutSec 2; if ($r.status -eq 'ok') { exit 0 } } catch {}; exit 1" >nul 2>&1
if not errorlevel 1 (
    echo The quiz app is already running at http://127.0.0.1:3000
    if not defined NO_OPEN start "" "http://127.0.0.1:3000"
    exit /b 0
)

netstat -ano | findstr /r /c:":3000 .*LISTENING" >nul 2>&1
if not errorlevel 1 goto :port_error

echo.
echo Starting the local server...
echo Keep this window open while using the app.

if not defined NO_OPEN (
    start "Quiz Browser Waiter" /b powershell.exe -NoProfile -WindowStyle Hidden -Command "$deadline = (Get-Date).AddSeconds(45); do { try { $r = Invoke-RestMethod -Uri 'http://127.0.0.1:3000/api/health' -TimeoutSec 2; if ($r.status -eq 'ok') { Start-Process 'http://127.0.0.1:3000'; exit 0 } } catch {}; Start-Sleep -Milliseconds 300 } while ((Get-Date) -lt $deadline)"
)

call npm.cmd run dev
set "APP_EXIT_CODE=%ERRORLEVEL%"

echo.
if "%APP_EXIT_CODE%"=="0" (
    echo Quiz server stopped.
) else (
    echo Quiz server stopped with error code %APP_EXIT_CODE%.
    echo Review the error above, then press any key to close this window.
)
pause >nul
exit /b %APP_EXIT_CODE%

:folder_error
echo ERROR: Could not open the project folder:
echo %~dp0
goto :fatal

:node_error
echo ERROR: Node.js was not found.
echo Install the current Node.js LTS release from https://nodejs.org/ and run this file again.
goto :fatal

:npm_error
echo ERROR: npm.cmd was not found even though Node.js may be installed.
echo Reinstall Node.js with npm enabled, then run this file again.
goto :fatal

:install_error
echo ERROR: Project dependencies could not be installed.
echo Check your internet connection and the npm error above.
goto :fatal

:port_error
echo ERROR: Port 3000 is already being used by another program.
echo Close that program, then run this file again.
goto :fatal

:fatal
echo.
pause
exit /b 1
