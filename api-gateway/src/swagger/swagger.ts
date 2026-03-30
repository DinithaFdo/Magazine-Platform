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
            username: { type: "string", example: "admin" },
            password: { type: "string", example: "StrongPassword123!" },
          },
        },
        UserRequest: {
          type: "object",
          required: ["name", "email"],
          properties: {
            name: { type: "string", example: "John Doe" },
            email: { type: "string", example: "john@example.com" },
            bio: { type: "string", example: "Tech enthusiast" },
            country: { type: "string", example: "Sri Lanka" },
            preferred_categories: {
              type: "array",
              items: { type: "string" },
              example: ["Technology", "Business"],
            },
          },
        },
        FollowRequest: {
          type: "object",
          required: ["follower_id"],
          properties: {
            follower_id: { type: "string", example: "follower-uuid" },
          },
        },
        ArticleRequest: {
          type: "object",
          required: ["title", "content", "author_id", "category_id"],
          properties: {
            title: { type: "string", example: "Introduction to AI" },
            content: { type: "string", example: "Article content..." },
            author_id: { type: "string", example: "author-uuid" },
            category_id: { type: "string", example: "category-uuid" },
            tags: {
              type: "array",
              items: { type: "string" },
              example: ["AI", "Technology"],
            },
            status: {
              type: "string",
              enum: ["draft", "published"],
              example: "draft",
            },
            thumbnail_url: {
              type: "string",
              example: "https://example.com/image.jpg",
            },
          },
        },
        CategoryRequest: {
          type: "object",
          required: ["name"],
          properties: {
            name: { type: "string", example: "Technology" },
            description: {
              type: "string",
              example: "Articles related to technology",
            },
          },
        },
        CommentRequest: {
          type: "object",
          required: ["article_id", "user_id", "content"],
          properties: {
            article_id: { type: "string", example: "article-uuid" },
            user_id: { type: "string", example: "user-uuid" },
            content: { type: "string", example: "Great article!" },
            parent_comment_id: {
              type: "string",
              nullable: true,
              example: null,
            },
          },
        },
        CommentUpdateRequest: {
          type: "object",
          required: ["content"],
          properties: {
            content: { type: "string", example: "Updated comment text" },
          },
        },
        SubscriptionRequest: {
          type: "object",
          required: ["user_id", "plan", "start_date", "end_date"],
          properties: {
            user_id: { type: "string", example: "user-uuid" },
            plan: {
              type: "string",
              enum: ["free", "standard", "premium"],
              example: "premium",
            },
            start_date: { type: "string", example: "2026-01-01" },
            end_date: { type: "string", example: "2026-12-31" },
            status: {
              type: "string",
              enum: ["active", "expired", "cancelled"],
              example: "active",
            },
          },
        },
        MediaUpdateRequest: {
          type: "object",
          properties: {
            file_name: { type: "string", example: "image.png" },
            file_type: { type: "string", example: "image/png" },
            uploaded_by: { type: "string", example: "user-uuid" },
            url: {
              type: "string",
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
