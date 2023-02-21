import express, { Express, Request, Response } from "express";
//import utils files
import dotenv from "dotenv";
import connectDB from "./utils/connectDB";
//import Route Files
import userRoute from "./routes/userRoute";

dotenv.config();
connectDB();

const app: Express = express();

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World");
});

app.use("/users", userRoute);

app.listen(process.env.EXPRESS_PORT || 8080, () => {
    console.log(`Server is running on port ${process.env.EXPRESS_PORT}`);
});
