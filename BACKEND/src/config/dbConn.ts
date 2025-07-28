import mongoose from "mongoose";

const connectWithRetry = async (retries = 5, delay = 3000): Promise<boolean> => {
  const uri = process.env.DATABASE_URI;
  if (!uri) {
    console.error("DATABASE_URI is not defined");
    return false;
  }

  for (let i = 1; i <= retries; i++) {
    try {
      console.log(`MongoDB: Attempt ${i} to connect...`);
      await mongoose.connect(uri);
      return true;
    } catch (err) {
      console.error(`MongoDB connection failed (attempt ${i}):`, err);
      if (i < retries) {
        console.log(`Retrying in ${delay / 1000} seconds...`);
        await new Promise(res => setTimeout(res, delay));
      }
    }
  }

  return false;
};

export default connectWithRetry;
