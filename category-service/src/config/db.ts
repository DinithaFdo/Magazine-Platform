import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("MongoDB Connected (Category Service)");
  } catch (error) {
    console.error("DB Connection Failed", error);
    process.exit(1);
  }
};
