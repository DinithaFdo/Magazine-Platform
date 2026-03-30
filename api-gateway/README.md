# API Gateway

API Gateway is the single entry point to all Magazine Platform services.
It handles authentication, request routing, and readable request logging.

## Service Details

- Port: `3000`
- Base URL: `http://localhost:3000`
- Swagger UI: `http://localhost:3000/api/v1/api-docs`

## Environment Variables

- `PORT` (optional, default: `3000`)
- `JWT_SECRET` (required)
- `AUTH_USERNAME` (required)
- `AUTH_PASSWORD` (required)
- `USER_SERVICE_URL` (optional, default: `http://localhost:3001`)
- `ARTICLE_SERVICE_URL` (optional, default: `http://localhost:3002`)
- `CATEGORY_SERVICE_URL` (optional, default: `http://localhost:3003`)
- `COMMENT_SERVICE_URL` (optional, default: `http://localhost:3004`)
- `SUBSCRIPTION_SERVICE_URL` (optional, default: `http://localhost:3005`)
- `MEDIA_SERVICE_URL` (optional, default: `http://localhost:3006`)

## Install and Run

```bash
npm install
npm run dev
```

## Public Endpoints

| Method | Path                 | Description         |
| ------ | -------------------- | ------------------- |
| `POST` | `/api/v1/auth/login` | Login and issue JWT |
| `GET`  | `/api/v1/api-docs`   | Gateway Swagger UI  |

## Login Validation Contract

Endpoint: `POST /api/v1/auth/login`

Request body rules:

- `username`: string, trimmed, min 3, max 100
- `password`: string, min 8, max 128

Example request:

```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "change_me_123"
}
```

Success response:

```json
{
  "access_token": "<jwt-token>",
  "token_type": "Bearer",
  "expires_in": "24h"
}
```

## Protected Routes

All routes under `/api/v1/*` are protected except `/api/v1/auth/login` and `/api/v1/api-docs`.

Use:

```http
Authorization: Bearer <jwt-token>
```

## Proxy Route Map

| Gateway Route           | Downstream Target Path                             |
| ----------------------- | -------------------------------------------------- |
| `/api/v1/users`         | `${USER_SERVICE_URL}/api/v1/users`                 |
| `/api/v1/articles`      | `${ARTICLE_SERVICE_URL}/api/v1/articles`           |
| `/api/v1/categories`    | `${CATEGORY_SERVICE_URL}/api/v1/categories`        |
| `/api/v1/comments`      | `${COMMENT_SERVICE_URL}/api/v1/comments`           |
| `/api/v1/subscriptions` | `${SUBSCRIPTION_SERVICE_URL}/api/v1/subscriptions` |
| `/api/v1/media`         | `${MEDIA_SERVICE_URL}/api/v1/media`                |

## Logging (Updated)

Gateway request logs are now compact one-line entries for readability.

Each line includes:

- time
- level
- status code
- method
- URL
- duration
- short request id
- client IP

## Validation and Error Behavior

- Invalid login payload returns `422` with validation details.
- Invalid credentials return `401`.
- Misconfigured auth environment returns `500`.

## Through Gateway

Use these base paths after login:

- `/api/v1/users`
- `/api/v1/articles`
- `/api/v1/categories`
- `/api/v1/comments`
- `/api/v1/subscriptions`
- `/api/v1/media`
