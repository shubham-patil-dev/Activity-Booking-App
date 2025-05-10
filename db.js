import mongoose from "mongoose";
import "dotenv/config";

async function dbConnect() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected successfully");
    return;
  } catch (error) {
    console.error(error.message);
    console.log("error connecting MongoDB");
  }
}

export default dbConnect;
