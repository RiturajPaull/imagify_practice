import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const MONGO_URI = process.env.MONGO_URI;

console.log(MONGO_URI);
console.log();
if (!MONGO_URI) {
  throw new Error("Mongo URI not connected!!!");
}
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("DB is connected");
  } catch (error) {
    console.log(error.message);
  }
};

export default connectDB;
