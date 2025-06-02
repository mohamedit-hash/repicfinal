import mongoose from "mongoose";

import "dotenv/config";

export default async function connectDB() {
    const URL = "mongodb+srv://moh:1996633@cluster0.zaqwjjt.mongodb.net/?retryWrites=true&w=majority"||process.env.MONGO_DB_URL;
    try {
        await mongoose.connect(URL
        );
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.log("Error connecting to MongoDB: ", error.message);
    }
}

