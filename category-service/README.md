# Category Service

Category Service manages categories and category article lookup.

## Service Details

- Port: `3003`
- Base URL: `http://localhost:3003`
- Base Route: `/api/v1/categories`
- Swagger UI: `http://localhost:3003/api/v1/api-docs`

## Environment Variables

- `PORT` (optional, default: `3003`)
- `MONGODB_URI` (required)

## Run

```bash
npm install
npm run dev
```

## New Validation Behavior

- Zod validates request body, query, and params.
- Invalid payloads return `422` with field-level details.

## Endpoints and Contracts

| Method   | Path                              | Validation                            |
| -------- | --------------------------------- | ------------------------------------- |
| `POST`   | `/api/v1/categories`              | Body: create category schema          |
| `GET`    | `/api/v1/categories`              | Query: pagination schema              |
| `GET`    | `/api/v1/categories/:id`          | Param UUID                            |
| `PUT`    | `/api/v1/categories/:id`          | Param UUID + Body: at least one field |
| `DELETE` | `/api/v1/categories/:id`          | Param UUID                            |
| `GET`    | `/api/v1/categories/:id/articles` | Param UUID                            |

## Request Body Rules

### Create Category

`POST /api/v1/categories`

- `name`: string, min 2, max 100, required
- `description`: string, max 500, optional

Example:

```json
{
  "name": "Technology",
  "description": "Articles related to technology and innovation"
}
```

### Update Category

`PUT /api/v1/categories/:id`

- Same fields as create, all optional
- Must include at least one field

## Query and Params Rules

### List Categories Query

`GET /api/v1/categories`

- `page`: positive integer, optional
- `limit`: positive integer, max 100, optional

### ID Params

- `id` must be valid UUID in `/:id` and `/:id/articles`.

## Access Through Gateway

- Service direct: `http://localhost:3003/api/v1/categories`
- Via gateway: `http://localhost:3000/api/v1/categories`
