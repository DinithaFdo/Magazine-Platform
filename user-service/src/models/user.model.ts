import mongoose from "mongoose";
import { randomUUID } from "node:crypto";

const userSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      default: randomUUID,
      unique: true,
    },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    bio: String,
    country: String,
    preferred_categories: [String],
    role: {
      type: String,
      default: "reader",
    },
    followers: [String], // user_ids
    following: [String],
  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);
