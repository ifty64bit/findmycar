import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { randomBytes } from "crypto";
import User from "../../models/User";
import sendVerificationEmail from "../../utils/mailtemplates/emailConfirmation";

async function register(req: Request, res: Response) {
    const { name, email, password } = req.body;
    try {
        //check if email already exists
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                errors: [
                    {
                        msg: "Email already exists",
                    },
                ],
            });
        } else {
            const enc_password = await bcrypt.hash(
                password,
                parseInt(process.env.saltRounds || "10")
            );
            const token = randomBytes(20).toString("hex");
            //create a new user
            const newUser = new User({
                name,
                email,
                displayPhoto: req?.file?.filename,
                password: enc_password,
                verificationToken: token,
            });
            //save user to db
            await newUser.save();
            await sendVerificationEmail(email, name, token);
            res.status(201).json({
                msg: "User created successfully",
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            errors: [
                {
                    msg: "Server Error",
                },
            ],
        });
    }
}

export default register;
