import mongoose from "mongoose";
import { randomUUID } from "node:crypto";

const mediaSchema = new mongoose.Schema(
  {
    media_id: {
      type: String,
      default: randomUUID,
      unique: true,
    },
    file_name: String,
    file_type: String,
    file_size: Number,
    uploaded_by: String,
    url: String,
  },
  { timestamps: true },
);

export default mongoose.model("Media", mediaSchema);
