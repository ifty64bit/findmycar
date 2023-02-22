import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../../models/User";

export default async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
        if (!JWT_SECRET_KEY) {
            throw new Error("JWT_SECRET_KEY is not defined");
        }

        // check if user exists in database
        const user = await User.findOne({ email });
        if (!user) {
            return res
                .status(401)
                .json({ message: "Invalid email or password" });
        }

        // In case of 3 failed login attempts within 5 minutes, restrict that user’s login for the next 15 minutes
        if (user.lockedUntil && user.lockedUntil > new Date()) {
            return res.status(401).json({
                message: `You have exceeded maximum login attempts. Please try again after ${Math.ceil(
                    (user.lockedUntil.getTime() - new Date().getTime()) /
                        (60 * 1000)
                )} minutes`,
            });
        }

        // check if user exceeded maximum login attempts
        if (user.loginAttempts >= 3 && user.lastFailedLoginAttempt && user.lastFailedLoginAttempt > new Date(new Date().getTime() - 5 * 60 * 1000)) {
            user.lockedUntil = new Date(new Date().getTime() + 15 * 60 * 1000);
            await user.save();
            return res.status(401).json({
                message: `You have exceeded maximum login attempts. Please try again after ${Math.ceil(
                    (user.lockedUntil.getTime() - new Date().getTime()) /
                        (60 * 1000)
                )} minutes`,
            });
        }

        // compare password with hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            user.loginAttempts += 1;
            if (!user.lastFailedLoginAttempt)
                user.lastFailedLoginAttempt = new Date();
            

            await user.save();
            return res
                .status(401)
                .json({ message: "Invalid email or password" });
        }

        user.lastLoginAttempt = new Date();
        user.lastFailedLoginAttempt = null;
        user.lockedUntil = null;
        user.loginAttempts = 0;
        await user.save();

        // check if user is verified
        if (!user.isVerified) {
            return res.status(401).json({
                message: "Please verify your email before logging in",
            });
        }

        // generate JWT token and send it in response
        const token = jwt.sign({ userId: user._id }, JWT_SECRET_KEY);
        user.loginAttempts = 0;
        await user.save();
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
