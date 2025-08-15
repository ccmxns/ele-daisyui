# Git自动提交推送脚本
# 使用方法: .\git-auto-push.ps1 "提交信息"
# 或者: .\git-auto-push.ps1 (使用默认提交信息)

param(
    [string]$CommitMessage = "Auto commit: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
)

Write-Host "开始自动Git操作..." -ForegroundColor Green

# 检查是否在git仓库中
if (-not (Test-Path ".git")) {
    Write-Host "错误: 当前目录不是Git仓库！" -ForegroundColor Red
    exit 1
}

# 检查是否有更改
$status = git status --porcelain
if ([string]::IsNullOrEmpty($status)) {
    Write-Host "工作目录干净，没有需要提交的更改。" -ForegroundColor Yellow
    exit 0
}

Write-Host "添加所有文件..." -ForegroundColor Cyan
git add .

if ($LASTEXITCODE -ne 0) {
    Write-Host "git add 失败！" -ForegroundColor Red
    exit 1
}

Write-Host "提交更改: $CommitMessage" -ForegroundColor Cyan
git commit -m "$CommitMessage"

if ($LASTEXITCODE -ne 0) {
    Write-Host "git commit 失败！" -ForegroundColor Red
    exit 1
}

Write-Host "推送到远程仓库..." -ForegroundColor Cyan
git push

if ($LASTEXITCODE -ne 0) {
    Write-Host "git push 失败！请检查网络连接和权限。" -ForegroundColor Red
    exit 1
}

Write-Host "成功！所有更改已提交并推送到远程仓库。" -ForegroundColor Green

# 显示最新状态
Write-Host ""
Write-Host "当前状态:" -ForegroundColor Magenta
git status --short
