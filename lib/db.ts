import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URL as string;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_ATLAS_URL environment variable in your .env file");
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function connect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI)
      .then((mongoose) => {
        console.log("DB CONNECTION SUCCESSFUL");
        return mongoose;
      })
      .catch((error) => {
        console.log("DB Connection Failed");
        console.error(error);
        process.exit(1);
      });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export { connect };