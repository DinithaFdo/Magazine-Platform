# Media Service

Media Service manages file uploads and media metadata.

## Service Details

- Port: `3006`
- Base URL: `http://localhost:3006`
- Base Route: `/api/v1/media`
- Swagger UI: `http://localhost:3006/api/v1/api-docs`

## Environment Variables

- `PORT` (optional, default: `3006`)
- `MONGODB_URI` (required)
- `CLOUDINARY_CLOUD_NAME` (required)
- `CLOUDINARY_API_KEY` (required)
- `CLOUDINARY_API_SECRET` (required)

## Run

```bash
npm install
npm run dev
```

## New Validation Behavior

- Zod validates body, query, and params.
- Invalid input returns `422` with field-level details.
- Upload endpoint uses Multer with stricter file limits and MIME filtering.

## Upload Constraints

- Upload field name must be `file`.
- Max file size: `10 MB`.
- Allowed MIME types:
  - `image/jpeg`
  - `image/png`
  - `image/gif`
  - `image/webp`
  - `application/pdf`

## Endpoints and Contracts

| Method   | Path                         | Validation                                    |
| -------- | ---------------------------- | --------------------------------------------- |
| `POST`   | `/api/v1/media`              | Multipart upload + body schema                |
| `GET`    | `/api/v1/media`              | Query schema                                  |
| `GET`    | `/api/v1/media/user/:userId` | Param UUID                                    |
| `GET`    | `/api/v1/media/:id`          | Param UUID                                    |
| `PUT`    | `/api/v1/media/:id`          | Param UUID + Body schema (at least one field) |
| `DELETE` | `/api/v1/media/:id`          | Param UUID                                    |

## Request Body Rules

### Upload Media

`POST /api/v1/media` with `multipart/form-data`

- `file`: required file part
- `uploaded_by`: UUID string, optional

Example:

```bash
curl -X POST http://localhost:3006/api/v1/media \
  -F "file=@C:/path/to/image.png" \
  -F "uploaded_by=11111111-2222-3333-4444-555555555555"
```

### Update Media

`PUT /api/v1/media/:id`

- `file_name`: string, max 255, optional
- `file_type`: string, max 100, optional
- `file_size`: positive number, optional
- `uploaded_by`: UUID string, optional
- `url`: valid URL string, optional
- At least one field must be provided

## Query and Params Rules

### List Media Query

`GET /api/v1/media`

- `page`: positive integer, optional
- `limit`: positive integer, max 100, optional
- `uploaded_by`: UUID string, optional

### Params

- `id`: UUID
- `userId`: UUID

## Access Through Gateway

- Service direct: `http://localhost:3006/api/v1/media`
- Via gateway: `http://localhost:3000/api/v1/media`
