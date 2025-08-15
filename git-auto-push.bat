@echo off
chcp 65001 >nul
echo 🚀 开始自动Git操作...

REM 检查是否在git仓库中
if not exist ".git" (
    echo ❌ 错误: 当前目录不是Git仓库！
    pause
    exit /b 1
)

REM 获取提交信息参数，如果没有则使用默认信息
set "commit_msg=%~1"
if "%commit_msg%"=="" (
    for /f "tokens=1-4 delims=/ " %%i in ('date /t') do set mydate=%%i-%%j-%%k
    for /f "tokens=1-2 delims=: " %%i in ('time /t') do set mytime=%%i:%%j
    set "commit_msg=Auto commit: %mydate% %mytime%"
)

echo 📁 添加所有文件...
git add .
if errorlevel 1 (
    echo ❌ git add 失败！
    pause
    exit /b 1
)

echo 💾 提交更改: %commit_msg%
git commit -m "%commit_msg%"
if errorlevel 1 (
    echo ❌ git commit 失败！
    pause
    exit /b 1
)

echo 🌐 推送到远程仓库...
git push
if errorlevel 1 (
    echo ❌ git push 失败！请检查网络连接和权限。
    pause
    exit /b 1
)

echo 🎉 成功！所有更改已提交并推送到远程仓库。
echo.
echo 📊 当前状态:
git status --short

pause
