import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import User from "../../models/User";

export default async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY
        if (!JWT_SECRET_KEY) {
            throw new Error('JWT_SECRET_KEY is not defined');
        }

        // check if user exists in database
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(401).json({ message: 'Invalid email or password' });
        }

        // compare password with hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          return res.status(401).json({ message: 'Invalid email or password' });
        }

        // generate JWT token and send it in response
        const token = jwt.sign({ userId: user._id }, JWT_SECRET_KEY);
        res.json({ token });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
};
