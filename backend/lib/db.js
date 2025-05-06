import mongoose from "mongoose";
import dontenv from 'dotenv';

dontenv.config()

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to mongo db");
    } catch (error) {
        console.error("Error connecting to mongo db");
    }
};

export default connectDB;