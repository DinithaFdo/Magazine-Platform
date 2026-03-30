# Dev-Test Scripts (Development Only)

This folder contains helper scripts for local development setup only.
Do not use these scripts for production environments.

## Scripts

1. install-all.ps1

- Installs npm packages in all service folders, including api-gateway.

2. run-all.ps1

- Starts all services in separate PowerShell windows by running npm run dev in each service folder.

3. create-envs.ps1

- Creates .env files for all services, including api-gateway.
- Each generated .env includes:
  - PORT
  - MONGODB_URI
- api-gateway .env also includes auth and service URL variables.

## How to Run

Open PowerShell in the repository root, then run:

1. Create .env files

powershell -ExecutionPolicy Bypass -File .\dev-test\create-envs.ps1

Optional: overwrite existing .env files

powershell -ExecutionPolicy Bypass -File .\dev-test\create-envs.ps1 -Force

Optional: use a custom MongoDB URI

powershell -ExecutionPolicy Bypass -File .\dev-test\create-envs.ps1 -MongoUri "mongodb://localhost:27017/magazine-platform"

2. Install all dependencies

powershell -ExecutionPolicy Bypass -File .\dev-test\install-all.ps1

3. Run all services

powershell -ExecutionPolicy Bypass -File .\dev-test\run-all.ps1

## Service Ports

- api-gateway: 3000
- user-service: 3001
- article-service: 3002
- category-service: 3003
- comment-service: 3004
- subscription-service: 3005
- media-service: 3006

## Notes

- If script execution is blocked on your machine, run PowerShell as Administrator or use ExecutionPolicy Bypass as shown above.
- For media-service uploads to cloud, update Cloudinary values in media-service/.env.
