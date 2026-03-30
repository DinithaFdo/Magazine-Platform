import mongoose from "mongoose";
import { randomUUID } from "node:crypto";

const articleSchema = new mongoose.Schema(
  {
    article_id: {
      type: String,
      default: () => randomUUID(),
      unique: true,
    },
    title: { type: String, required: true },
    content: { type: String, required: true },
    author_id: { type: String, required: true },
    category_id: { type: String, required: true },
    tags: [String],
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
    thumbnail_url: String,
  },
  { timestamps: true },
);

export default mongoose.model("Article", articleSchema);
