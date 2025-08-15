param([string]$message = "Auto commit $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')")

Write-Host "Starting Git operations..." -ForegroundColor Green

if (!(Test-Path ".git")) {
    Write-Host "Error: Not a Git repository!" -ForegroundColor Red
    exit 1
}

$status = git status --porcelain
if (!$status) {
    Write-Host "No changes to commit" -ForegroundColor Yellow
    exit 0
}

Write-Host "Adding files..." -ForegroundColor Cyan
git add .

Write-Host "Committing: $message" -ForegroundColor Cyan
git commit -m $message

Write-Host "Pushing to remote..." -ForegroundColor Cyan
git push

Write-Host "Done!" -ForegroundColor Green
git status --short
