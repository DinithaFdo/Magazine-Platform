import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Gateway",
      version: "1.0.0",
      description: "Central gateway for all microservices",
    },
    servers: [
      {
        url: "http://localhost:3000/api/v1",
      },
    ],

    // 🔐 JWT Auth config
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        LoginRequest: {
          type: "object",
          required: ["username", "password"],
          properties: {
            username: {
              type: "string",
              minLength: 3,
              maxLength: 100,
              example: "admin",
            },
            password: {
              type: "string",
              minLength: 8,
              maxLength: 128,
              example: "StrongPassword123!",
            },
          },
        },
        UserRequest: {
          type: "object",
          required: ["name", "email"],
          properties: {
            name: {
              type: "string",
              minLength: 2,
              maxLength: 100,
              example: "John Doe",
            },
            email: {
              type: "string",
              format: "email",
              example: "john@example.com",
            },
            bio: { type: "string", maxLength: 500, example: "Tech enthusiast" },
            country: { type: "string", maxLength: 100, example: "Sri Lanka" },
            preferred_categories: {
              type: "array",
              items: { type: "string", minLength: 1 },
              example: ["Technology", "Business"],
            },
          },
        },
        UserUpdateRequest: {
          type: "object",
          minProperties: 1,
          properties: {
            name: {
              type: "string",
              minLength: 2,
              maxLength: 100,
              example: "Jane Doe",
            },
            email: {
              type: "string",
              format: "email",
              example: "jane@example.com",
            },
            bio: {
              type: "string",
              maxLength: 500,
              example: "Product designer and writer",
            },
            country: { type: "string", maxLength: 100, example: "Sri Lanka" },
            preferred_categories: {
              type: "array",
              items: { type: "string", minLength: 1 },
              example: ["Design", "Business"],
            },
          },
        },
        FollowRequest: {
          type: "object",
          required: ["follower_id"],
          properties: {
            follower_id: {
              type: "string",
              format: "uuid",
              example: "11111111-1111-4111-8111-111111111111",
            },
          },
        },
        ArticleRequest: {
          type: "object",
          required: ["title", "content", "author_id", "category_id"],
          properties: {
            title: {
              type: "string",
              minLength: 3,
              maxLength: 200,
              example: "Introduction to AI",
            },
            content: {
              type: "string",
              minLength: 10,
              example: "Article content with at least ten characters.",
            },
            author_id: {
              type: "string",
              format: "uuid",
              example: "22222222-2222-4222-8222-222222222222",
            },
            category_id: {
              type: "string",
              format: "uuid",
              example: "33333333-3333-4333-8333-333333333333",
            },
            tags: {
              type: "array",
              items: { type: "string", minLength: 1 },
              example: ["AI", "Technology"],
            },
            status: {
              type: "string",
              enum: ["draft", "published"],
              example: "draft",
            },
            thumbnail_url: {
              type: "string",
              format: "uri",
              example: "https://example.com/image.jpg",
            },
          },
        },
        ArticleUpdateRequest: {
          type: "object",
          minProperties: 1,
          properties: {
            title: {
              type: "string",
              minLength: 3,
              maxLength: 200,
              example: "Updated AI Trends in 2026",
            },
            content: {
              type: "string",
              minLength: 10,
              example: "Updated article body with new references and insights.",
            },
            author_id: {
              type: "string",
              format: "uuid",
              example: "22222222-2222-4222-8222-222222222222",
            },
            category_id: {
              type: "string",
              format: "uuid",
              example: "33333333-3333-4333-8333-333333333333",
            },
            tags: {
              type: "array",
              items: { type: "string", minLength: 1 },
              example: ["AI", "Research"],
            },
            status: {
              type: "string",
              enum: ["draft", "published"],
              example: "published",
            },
            thumbnail_url: {
              type: "string",
              format: "uri",
              example: "https://example.com/updated-image.jpg",
            },
          },
        },
        CategoryRequest: {
          type: "object",
          required: ["name"],
          properties: {
            name: {
              type: "string",
              minLength: 2,
              maxLength: 100,
              example: "Technology",
            },
            description: {
              type: "string",
              maxLength: 500,
              example: "Articles related to technology",
            },
          },
        },
        CategoryUpdateRequest: {
          type: "object",
          minProperties: 1,
          properties: {
            name: {
              type: "string",
              minLength: 2,
              maxLength: 100,
              example: "Business",
            },
            description: {
              type: "string",
              maxLength: 500,
              example: "Articles related to business and finance",
            },
          },
        },
        CommentRequest: {
          type: "object",
          required: ["article_id", "user_id", "content"],
          properties: {
            article_id: {
              type: "string",
              format: "uuid",
              example: "44444444-4444-4444-8444-444444444444",
            },
            user_id: {
              type: "string",
              format: "uuid",
              example: "11111111-1111-4111-8111-111111111111",
            },
            content: {
              type: "string",
              minLength: 1,
              maxLength: 2000,
              example: "Great article!",
            },
            parent_comment_id: {
              type: "string",
              format: "uuid",
              nullable: true,
              example: null,
            },
          },
        },
        CommentUpdateRequest: {
          type: "object",
          required: ["content"],
          properties: {
            content: {
              type: "string",
              minLength: 1,
              maxLength: 2000,
              example: "Updated comment text",
            },
          },
        },
        SubscriptionRequest: {
          type: "object",
          required: ["user_id", "plan", "start_date", "end_date"],
          properties: {
            user_id: {
              type: "string",
              format: "uuid",
              example: "55555555-5555-4555-8555-555555555555",
            },
            plan: {
              type: "string",
              enum: ["free", "standard", "premium"],
              example: "premium",
            },
            start_date: {
              type: "string",
              pattern: "^\\d{4}-\\d{2}-\\d{2}$",
              example: "2026-01-01",
            },
            end_date: {
              type: "string",
              pattern: "^\\d{4}-\\d{2}-\\d{2}$",
              example: "2026-12-31",
            },
            status: {
              type: "string",
              enum: ["active", "expired", "cancelled"],
              example: "active",
            },
          },
        },
        SubscriptionUpdateRequest: {
          type: "object",
          minProperties: 1,
          properties: {
            user_id: {
              type: "string",
              format: "uuid",
              example: "55555555-5555-4555-8555-555555555555",
            },
            plan: {
              type: "string",
              enum: ["free", "standard", "premium"],
              example: "standard",
            },
            start_date: {
              type: "string",
              pattern: "^\\d{4}-\\d{2}-\\d{2}$",
              example: "2026-01-01",
            },
            end_date: {
              type: "string",
              pattern: "^\\d{4}-\\d{2}-\\d{2}$",
              example: "2026-06-30",
            },
            status: {
              type: "string",
              enum: ["active", "expired", "cancelled"],
              example: "active",
            },
          },
        },
        MediaUpdateRequest: {
          type: "object",
          minProperties: 1,
          properties: {
            file_name: { type: "string", maxLength: 255, example: "image.png" },
            file_type: { type: "string", maxLength: 100, example: "image/png" },
            file_size: {
              type: "number",
              exclusiveMinimum: 0,
              example: 1048576,
            },
            uploaded_by: {
              type: "string",
              format: "uuid",
              example: "11111111-1111-4111-8111-111111111111",
            },
            url: {
              type: "string",
              format: "uri",
              example:
                "https://res.cloudinary.com/demo/image/upload/sample.jpg",
            },
          },
        },
        MessageResponse: {
          type: "object",
          properties: {
            message: { type: "string", example: "Success" },
          },
        },
        UnauthorizedResponse: {
          type: "object",
          properties: {
            status: { type: "string", example: "error" },
            message: { type: "string", example: "No token provided" },
          },
        },
      },
    },

    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  apis: ["./src/routes/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);
