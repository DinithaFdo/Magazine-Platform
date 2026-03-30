# Comment Service

Comment Service manages comments and replies for articles.

## Service Details

- Port: `3004`
- Base URL: `http://localhost:3004`
- Base Route: `/api/v1/comments`
- Swagger UI: `http://localhost:3004/api/v1/api-docs`

## Environment Variables

- `PORT` (optional, default: `3004`)
- `MONGODB_URI` (required)

## Run

```bash
npm install
npm run dev
```

## New Validation Behavior

- Zod validates body, query, and params on all routes.
- Invalid input returns `422` with field-level validation errors.

## Endpoints and Contracts

| Method   | Path                                  | Validation                       |
| -------- | ------------------------------------- | -------------------------------- |
| `POST`   | `/api/v1/comments`                    | Body: create comment schema      |
| `GET`    | `/api/v1/comments`                    | Query: pagination/filter schema  |
| `GET`    | `/api/v1/comments/article/:articleId` | Param UUID                       |
| `GET`    | `/api/v1/comments/user/:userId`       | Param UUID                       |
| `GET`    | `/api/v1/comments/:id`                | Param UUID                       |
| `PUT`    | `/api/v1/comments/:id`                | Param UUID + Body content schema |
| `DELETE` | `/api/v1/comments/:id`                | Param UUID                       |

## Request Body Rules

### Create Comment

`POST /api/v1/comments`

- `article_id`: UUID string, required
- `user_id`: UUID string, required
- `content`: string, min 1, max 2000, required
- `parent_comment_id`: UUID string or `null`, optional

Example:

```json
{
  "article_id": "11111111-2222-3333-4444-555555555555",
  "user_id": "66666666-7777-8888-9999-000000000000",
  "content": "Great article!",
  "parent_comment_id": null
}
```

### Update Comment

`PUT /api/v1/comments/:id`

- `content`: string, min 1, max 2000, required

## Query and Params Rules

### List Comments Query

`GET /api/v1/comments`

- `page`: positive integer, optional
- `limit`: positive integer, max 100, optional
- `article_id`: UUID string, optional

### Params

- `id`: UUID
- `articleId`: UUID
- `userId`: UUID

## Access Through Gateway

- Service direct: `http://localhost:3004/api/v1/comments`
- Via gateway: `http://localhost:3000/api/v1/comments`
