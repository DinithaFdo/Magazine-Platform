# User Service

User Service manages user profiles and follow relationships.

## Service Details

- Port: `3001`
- Base URL: `http://localhost:3001`
- Base Route: `/api/v1/users`
- Swagger UI: `http://localhost:3001/api/v1/api-docs`

## Environment Variables

- `PORT` (optional, default: `3001`)
- `MONGODB_URI` (required)

## Run

```bash
npm install
npm run dev
```

## New Validation Behavior

- Request body, params, and query are validated with Zod middleware.
- Invalid input returns `422` with field-level issues.

Validation error response format:

```json
{
  "status": "error",
  "code": 422,
  "message": "Validation failed",
  "errors": [{ "path": "email", "message": "Invalid email" }]
}
```

## Endpoints and Contracts

| Method   | Path                         | Validation                                      |
| -------- | ---------------------------- | ----------------------------------------------- |
| `POST`   | `/api/v1/users`              | Body: create user schema                        |
| `GET`    | `/api/v1/users`              | Query: pagination schema                        |
| `GET`    | `/api/v1/users/:id`          | Param: `id` must be UUID                        |
| `PUT`    | `/api/v1/users/:id`          | Param UUID + Body: at least one updatable field |
| `DELETE` | `/api/v1/users/:id`          | Param: `id` must be UUID                        |
| `POST`   | `/api/v1/users/:id/follow`   | Param UUID + Body `follower_id` UUID            |
| `POST`   | `/api/v1/users/:id/unfollow` | Param UUID + Body `follower_id` UUID            |

## Request Body Rules

### Create User

`POST /api/v1/users`

- `name`: string, min 2, max 100, required
- `email`: valid email string, required
- `bio`: string, max 500, optional
- `country`: string, max 100, optional
- `preferred_categories`: string array, optional

Example:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "bio": "Tech enthusiast",
  "country": "Sri Lanka",
  "preferred_categories": ["Technology", "Business"]
}
```

### Update User

`PUT /api/v1/users/:id`

- Same fields as create, all optional
- Must include at least one field

### Follow and Unfollow

`POST /api/v1/users/:id/follow` and `POST /api/v1/users/:id/unfollow`

- `follower_id`: UUID string, required

Example:

```json
{
  "follower_id": "11111111-2222-3333-4444-555555555555"
}
```

## Query and Params Rules

### List Users Query

`GET /api/v1/users`

- `page`: positive integer, optional
- `limit`: positive integer, max 100, optional

### ID Params

- `id` must be a valid UUID for all `/:id` routes.

## Access Through Gateway

- Service direct: `http://localhost:3001/api/v1/users`
- Via gateway: `http://localhost:3000/api/v1/users`
