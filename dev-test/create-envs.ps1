param(
  [string]$MongoUri = "mongodb://localhost:27017/magazine-platform",
  [switch]$Force
)

$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $PSScriptRoot

$envTemplates = @{
  "api-gateway" = @(
    "PORT=3000",
    "MONGODB_URI=$MongoUri",
    "JWT_SECRET=replace_with_a_strong_secret",
    "AUTH_USERNAME=admin",
    "AUTH_PASSWORD=change_me",
    "USER_SERVICE_URL=http://localhost:3001",
    "ARTICLE_SERVICE_URL=http://localhost:3002",
    "CATEGORY_SERVICE_URL=http://localhost:3003",
    "COMMENT_SERVICE_URL=http://localhost:3004",
    "SUBSCRIPTION_SERVICE_URL=http://localhost:3005",
    "MEDIA_SERVICE_URL=http://localhost:3006"
  )
  "user-service" = @(
    "PORT=3001",
    "MONGODB_URI=$MongoUri"
  )
  "article-service" = @(
    "PORT=3002",
    "MONGODB_URI=$MongoUri"
  )
  "category-service" = @(
    "PORT=3003",
    "MONGODB_URI=$MongoUri"
  )
  "comment-service" = @(
    "PORT=3004",
    "MONGODB_URI=$MongoUri"
  )
  "subscription-service" = @(
    "PORT=3005",
    "MONGODB_URI=$MongoUri"
  )
  "media-service" = @(
    "PORT=3006",
    "MONGODB_URI=$MongoUri",
    "CLOUDINARY_CLOUD_NAME=your_cloud_name",
    "CLOUDINARY_API_KEY=your_api_key",
    "CLOUDINARY_API_SECRET=your_api_secret"
  )
}

Write-Host "Creating .env files for all services..." -ForegroundColor Cyan

foreach ($service in $envTemplates.Keys) {
  $servicePath = Join-Path $repoRoot $service

  if (-not (Test-Path $servicePath)) {
    Write-Warning "Skipping missing service folder: $service"
    continue
  }

  $envPath = Join-Path $servicePath ".env"

  if ((Test-Path $envPath) -and (-not $Force)) {
    Write-Warning "Skipping existing .env in $service (use -Force to overwrite)"
    continue
  }

  $content = ($envTemplates[$service] -join [Environment]::NewLine) + [Environment]::NewLine
  Set-Content -Path $envPath -Value $content -Encoding UTF8

  if (Test-Path $envPath) {
    Write-Host "Created: $envPath" -ForegroundColor Yellow
  }
}

Write-Host "\nDone. .env generation complete." -ForegroundColor Green
