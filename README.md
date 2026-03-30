# Magazine Platform - Microservices Project

This repository contains a Node.js + TypeScript microservices architecture for a magazine platform.
The platform is split by domain and accessed through an API Gateway.

## Project Overview

The system is composed of:

- `api-gateway` (entry point, authentication, request routing)
- `user-service`
- `article-service`
- `category-service`
- `comment-service`
- `subscription-service`
- `media-service`

Each service exposes its own REST API and Swagger UI.

## Architecture

Client applications should call the API Gateway (`http://localhost:3000`).

- Public routes at gateway:
  - `POST /api/v1/auth/login`
  - `GET /api/v1/api-docs`
- Protected routes at gateway:
  - `GET/POST/PUT/DELETE/PATCH /api/v1/*`

The gateway validates JWT tokens and proxies requests to downstream services.

## Service Registry

| Service              | Port | Base Route              | Swagger UI                              |
| -------------------- | ---: | ----------------------- | --------------------------------------- |
| API Gateway          | 3000 | `/api/v1`               | `http://localhost:3000/api/v1/api-docs` |
| User Service         | 3001 | `/api/v1/users`         | `http://localhost:3001/api/v1/api-docs` |
| Article Service      | 3002 | `/api/v1/articles`      | `http://localhost:3002/api/v1/api-docs` |
| Category Service     | 3003 | `/api/v1/categories`    | `http://localhost:3003/api/v1/api-docs` |
| Comment Service      | 3004 | `/api/v1/comments`      | `http://localhost:3004/api/v1/api-docs` |
| Subscription Service | 3005 | `/api/v1/subscriptions` | `http://localhost:3005/api/v1/api-docs` |
| Media Service        | 3006 | `/api/v1/media`         | `http://localhost:3006/api-docs`        |

## Prerequisites

- Node.js 18+
- npm 9+
- MongoDB instance (local or cloud)

## Environment Variables

Create a `.env` file in each service folder.

### Shared (all services)

- `PORT` (optional, each service has a default)
- `MONGODB_URI` (required for all data services)

### API Gateway only

- `JWT_SECRET` (required)
- `AUTH_USERNAME` (required)
- `AUTH_PASSWORD` (required)
- `USER_SERVICE_URL` (optional, default: `http://localhost:3001`)
- `ARTICLE_SERVICE_URL` (optional, default: `http://localhost:3002`)
- `CATEGORY_SERVICE_URL` (optional, default: `http://localhost:3003`)
- `COMMENT_SERVICE_URL` (optional, default: `http://localhost:3004`)
- `SUBSCRIPTION_SERVICE_URL` (optional, default: `http://localhost:3005`)
- `MEDIA_SERVICE_URL` (optional, default: `http://localhost:3006`)

### Media service only

- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

## Installation

Install dependencies per service:

```bash
cd api-gateway && npm install
cd ../user-service && npm install
cd ../article-service && npm install
cd ../category-service && npm install
cd ../comment-service && npm install
cd ../subscription-service && npm install
cd ../media-service && npm install
```

## Running the Platform

Start each service in a separate terminal:

```bash
cd api-gateway && npm run dev
cd user-service && npm run dev
cd article-service && npm run dev
cd category-service && npm run dev
cd comment-service && npm run dev
cd subscription-service && npm run dev
cd media-service && npm run dev
```

### Dev-Test Scripts (Recommended)

You can use helper scripts to set up and run all services quickly:

```bash
powershell -ExecutionPolicy Bypass -File .\dev-test\create-envs.ps1
powershell -ExecutionPolicy Bypass -File .\dev-test\install-all.ps1
powershell -ExecutionPolicy Bypass -File .\dev-test\run-all.ps1
```

See full details in `dev-test/README.md`.

## Authentication Flow

1. Get token:

```http
POST /api/v1/auth/login
Content-Type: application/json

{
	"username": "admin",
	"password": "change_me_123"
}
```

Successful login response:

```json
{
  "access_token": "<jwt-token>",
  "token_type": "Bearer",
  "expires_in": "24h"
}
```

2. Use token for protected APIs:

```http
Authorization: Bearer <token>
```

## API Documentation

Swagger is available per service and at gateway.

- Gateway docs: `GET http://localhost:3000/api/v1/api-docs`
- User docs: `GET http://localhost:3001/api/v1/api-docs`
- Article docs: `GET http://localhost:3002/api/v1/api-docs`
- Category docs: `GET http://localhost:3003/api/v1/api-docs`
- Comment docs: `GET http://localhost:3004/api/v1/api-docs`
- Subscription docs: `GET http://localhost:3005/api/v1/api-docs`
- Media docs: `GET http://localhost:3006/api-docs`

## Gateway API Surface

All endpoint groups are exposed behind `http://localhost:3000/api/v1`:

- `/users`
- `/articles`
- `/categories`
- `/comments`
- `/subscriptions`
- `/media`

This allows clients to use a single host while services remain decoupled.

## Per-Service Documentation

See detailed API documentation in:

- `api-gateway/README.md`
- `user-service/README.md`
- `article-service/README.md`
- `category-service/README.md`
- `comment-service/README.md`
- `subscription-service/README.md`
- `media-service/README.md`

## Validation and Request Contract Guides

Each service README now includes:

- endpoint-by-endpoint validation coverage
- required and optional request body fields
- query and path parameter rules
- validation error behavior (`422`)

Quick links:

- Gateway auth and token contract: `api-gateway/README.md`
- User API request and validation rules: `user-service/README.md`
- Article API request and validation rules: `article-service/README.md`
- Category API request and validation rules: `category-service/README.md`
- Comment API request and validation rules: `comment-service/README.md`
- Subscription API request and validation rules: `subscription-service/README.md`
- Media upload and validation rules: `media-service/README.md`

## Notes

- Service-to-service concerns are currently managed through gateway proxying.
- Authorization is enforced centrally at gateway level.
- Each service keeps its own domain model and database collection schema.
