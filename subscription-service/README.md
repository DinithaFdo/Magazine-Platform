# Subscription Service

Subscription Service manages user subscription plans and lifecycle state.

## Service Details

- Port: `3005`
- Base URL: `http://localhost:3005`
- Base Route: `/api/v1/subscriptions`
- Swagger UI: `http://localhost:3005/api/v1/api-docs`

## Environment Variables

- `PORT` (optional, default: `3005`)
- `MONGODB_URI` (required)

## Run

```bash
npm install
npm run dev
```

## New Validation Behavior

- Zod validates body, query, and params.
- Invalid input returns `422` with validation details.
- Date refinement rule enforces `end_date >= start_date`.

## Endpoints and Contracts

| Method   | Path                                 | Validation                                                 |
| -------- | ------------------------------------ | ---------------------------------------------------------- |
| `POST`   | `/api/v1/subscriptions`              | Body: create subscription schema + date refinement         |
| `GET`    | `/api/v1/subscriptions`              | Query: pagination/status schema                            |
| `GET`    | `/api/v1/subscriptions/user/:userId` | Param UUID                                                 |
| `GET`    | `/api/v1/subscriptions/:id`          | Param UUID                                                 |
| `PUT`    | `/api/v1/subscriptions/:id`          | Param UUID + Body: partial update schema + date refinement |
| `DELETE` | `/api/v1/subscriptions/:id`          | Param UUID                                                 |

## Request Body Rules

### Create Subscription

`POST /api/v1/subscriptions`

- `user_id`: UUID string, required
- `plan`: `free` or `standard` or `premium`, required
- `start_date`: `YYYY-MM-DD`, required
- `end_date`: `YYYY-MM-DD`, required
- `status`: `active` or `expired` or `cancelled`, optional
- refinement: `end_date` must be on/after `start_date`

Example:

```json
{
  "user_id": "11111111-2222-3333-4444-555555555555",
  "plan": "premium",
  "start_date": "2026-01-01",
  "end_date": "2026-12-31",
  "status": "active"
}
```

### Update Subscription

`PUT /api/v1/subscriptions/:id`

- Same fields as create, all optional
- Must include at least one field
- If both dates are provided, `end_date >= start_date` is required

## Query and Params Rules

### List Subscriptions Query

`GET /api/v1/subscriptions`

- `page`: positive integer, optional
- `limit`: positive integer, max 100, optional
- `status`: `active` or `expired` or `cancelled`, optional

### Params

- `id`: UUID
- `userId`: UUID

## Access Through Gateway

- Service direct: `http://localhost:3005/api/v1/subscriptions`
- Via gateway: `http://localhost:3000/api/v1/subscriptions`
