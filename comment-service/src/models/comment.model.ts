import mongoose from "mongoose";
import { randomUUID } from "node:crypto";

const commentSchema = new mongoose.Schema(
  {
    comment_id: {
      type: String,
      default: randomUUID,
      unique: true,
    },
    article_id: { type: String, required: true },
    user_id: { type: String, required: true },
    content: { type: String, required: true },
    parent_comment_id: {
      type: String,
      default: null,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Comment", commentSchema);
