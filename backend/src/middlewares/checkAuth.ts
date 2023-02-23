import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticateUser = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // Get the token from the request header
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        return res
            .status(401)
            .json({ message: "Authentication failed. No token provided." });
    }

    try {
        // Verify the token and extract the user id
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!) as {
            userId: string;
        };
        req.user = decoded;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({
            message: "Authentication failed. Invalid token.",
        });
    }
};

export default authenticateUser;
