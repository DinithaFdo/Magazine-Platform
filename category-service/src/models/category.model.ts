import mongoose from "mongoose";
import { randomUUID } from "node:crypto";

const categorySchema = new mongoose.Schema(
  {
    category_id: {
      type: String,
      default: randomUUID,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: String,
  },
  { timestamps: true },
);

export default mongoose.model("Category", categorySchema);
