import express, { Express, Request, Response, NextFunction } from "express";
//import utils files
import dotenv from "dotenv";
import connectDB from "./utils/connectDB";
//import Route Files
import authRoute from "./routes/auth/route";
import userRoute from "./routes/users/route";
import carRoute from "./routes/cars/route";
import path from "path";

dotenv.config();
connectDB();

const app: Express = express();
//Common Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res;
});

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World");
});

app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/cars", carRoute);

app.listen(process.env.EXPRESS_PORT || 8080, () => {
    console.log(`Server is running on port ${process.env.EXPRESS_PORT}`);
});
