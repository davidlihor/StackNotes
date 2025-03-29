import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const uri = process.env.DATABASE_URI;
    if (!uri) throw new Error("DATABASE_URI is not defined in the environment variables");
    await mongoose.connect(uri);
  } catch (err) {
    console.log(err);
  }
};

export default connectDB;
