import mongoose from "mongoose";
import { randomUUID } from "node:crypto";

const subscriptionSchema = new mongoose.Schema(
  {
    subscription_id: {
      type: String,
      default: randomUUID,
      unique: true,
    },
    user_id: { type: String, required: true },
    plan: {
      type: String,
      enum: ["free", "standard", "premium"],
      required: true,
    },
    start_date: { type: String, required: true },
    end_date: { type: String, required: true },
    status: {
      type: String,
      enum: ["active", "expired", "cancelled"],
      default: "active",
    },
  },
  { timestamps: true },
);

export default mongoose.model("Subscription", subscriptionSchema);
