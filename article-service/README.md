# Article Service

Article Service manages article CRUD and publish workflow.

## Service Details

- Port: `3002`
- Base URL: `http://localhost:3002`
- Base Route: `/api/v1/articles`
- Swagger UI: `http://localhost:3002/api/v1/api-docs`

## Environment Variables

- `PORT` (optional, default: `3002`)
- `MONGODB_URI` (required)

## Run

```bash
npm install
npm run dev
```

## New Validation Behavior

- Zod validates body, query, and params.
- Invalid input returns `422` with detailed field errors.

## Endpoints and Contracts

| Method   | Path                             | Validation                            |
| -------- | -------------------------------- | ------------------------------------- |
| `POST`   | `/api/v1/articles`               | Body: create article schema           |
| `GET`    | `/api/v1/articles`               | Query: filter + pagination schema     |
| `GET`    | `/api/v1/articles/:id`           | Param UUID                            |
| `PUT`    | `/api/v1/articles/:id`           | Param UUID + Body: at least one field |
| `DELETE` | `/api/v1/articles/:id`           | Param UUID                            |
| `PATCH`  | `/api/v1/articles/:id/publish`   | Param UUID                            |
| `PATCH`  | `/api/v1/articles/:id/unpublish` | Param UUID                            |

## Request Body Rules

### Create Article

`POST /api/v1/articles`

- `title`: string, min 3, max 200, required
- `content`: string, min 10, required
- `author_id`: UUID string, required
- `category_id`: UUID string, required
- `tags`: array of non-empty strings, optional
- `status`: `draft` or `published`, optional
- `thumbnail_url`: valid URL string, optional

Example:

```json
{
  "title": "Introduction to Artificial Intelligence",
  "content": "This article explains the basics of AI and practical use cases.",
  "author_id": "11111111-2222-3333-4444-555555555555",
  "category_id": "66666666-7777-8888-9999-000000000000",
  "tags": ["AI", "Technology"],
  "status": "draft",
  "thumbnail_url": "https://example.com/ai-cover.jpg"
}
```

### Update Article

`PUT /api/v1/articles/:id`

- Same fields as create, all optional
- Must include at least one field

## Query and Params Rules

### List Articles Query

`GET /api/v1/articles`

- `page`: positive integer, optional
- `limit`: positive integer, max 100, optional
- `category_id`: UUID string, optional
- `author_id`: UUID string, optional
- `status`: `draft` or `published`, optional

### ID Params

- `id` must be a valid UUID on all `/:id` routes.

## Access Through Gateway

- Service direct: `http://localhost:3002/api/v1/articles`
- Via gateway: `http://localhost:3000/api/v1/articles`
