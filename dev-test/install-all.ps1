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

Write-Host "Installing npm packages for all services..." -ForegroundColor Cyan

foreach ($service in $services) {
  $servicePath = Join-Path $repoRoot $service

  if (-not (Test-Path $servicePath)) {
    Write-Warning "Skipping missing service folder: $service"
    continue
  }

  Write-Host "\n[$service] npm install" -ForegroundColor Yellow
  Push-Location $servicePath
  try {
    npm install
    if ($LASTEXITCODE -ne 0) {
      throw "npm install failed in $service"
    }
  }
  finally {
    Pop-Location
  }
}

Write-Host "\nDone. npm packages are installed for all detected services." -ForegroundColor Green
