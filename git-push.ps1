param(
    [string]$message = "Auto commit $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
)

Write-Host "开始Git自动操作..." -ForegroundColor Green

# 检查git仓库
if (!(Test-Path ".git")) {
    Write-Host "错误: 不是Git仓库!" -ForegroundColor Red
    exit 1
}

# 检查是否有更改
$status = git status --porcelain
if (!$status) {
    Write-Host "没有更改需要提交" -ForegroundColor Yellow
    exit 0
}

# 执行git操作
Write-Host "添加文件..." -ForegroundColor Cyan
git add .

Write-Host "提交: $message" -ForegroundColor Cyan
git commit -m $message

Write-Host "推送到远程..." -ForegroundColor Cyan
git push

Write-Host "完成!" -ForegroundColor Green
git status --short
