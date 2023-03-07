import { Request } from "express";
import jwt from "jsonwebtoken";

export default (req: Request) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        return null;
    }

    try {
        // Verify the token and extract the user id
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!) as {
            userId: string;
        };
        return decoded;
    } catch (error) {
        console.error(error);
        return null;
    }
};
