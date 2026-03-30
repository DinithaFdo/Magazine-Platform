$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $PSScriptRoot
$services = @(
  "api-gateway",
  "user-service",
  "article-service",
  "category-service",
  "comment-service",
  "subscription-service",
  "media-service"
)

Write-Host "Starting all services in separate PowerShell windows..." -ForegroundColor Cyan

foreach ($service in $services) {
  $servicePath = Join-Path $repoRoot $service

  if (-not (Test-Path $servicePath)) {
    Write-Warning "Skipping missing service folder: $service"
    continue
  }

  $command = "Set-Location '$servicePath'; npm run dev"
  Start-Process powershell -ArgumentList "-NoExit", "-Command", $command | Out-Null
  Write-Host "Started: $service" -ForegroundColor Yellow
}

Write-Host "\nAll service start commands were launched." -ForegroundColor Green
