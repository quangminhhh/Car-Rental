import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

function connectDB() {
    mongoose.connect(process.env.MONGODB_URI)
        .then(() => console.log("Connected to MongoDB"))
        .catch((err) => console.error("Failed to connect to MongoDB", err));

    const connection = mongoose.connection;
    connection.on('connected', () => {
        console.log('Mongoose connected to DB');
    });
    connection.on('error', (err) => {
        console.error('Mongoose connection error:', err);
    });
    connection.on('disconnected', () => {
        console.log('Mongoose disconnected');
    });
}

export default connectDB;
