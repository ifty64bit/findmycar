import mongoose from "mongoose";

const connectDB = () => {
    mongoose.set("strictQuery", false);
    mongoose
        .connect(process.env.MONGODB_URI || "")
        .then(() => {
            console.log("Connected to database");
        })
        .catch((err) => {
            console.log("Error connecting to database");
            console.log(err);
        });
};

export default connectDB;
