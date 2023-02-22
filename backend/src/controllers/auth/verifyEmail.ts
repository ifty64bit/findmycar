import { Request, Response } from "express";
import User from "../../models/User";

async function verify(req: Request, res: Response) {
    const token = req.params.token;
    const email = req.params.email;
    try {
        //verify user token
        const user = await User.findOne({ email, verificationToken: token });
        if (user) {
            user.isVerified = true;
            user.verificationToken = "";
            await user.save();
            res.status(200).json({
                msg: "Email verified successfully",
            });
        }
        else {
            res.status(400).json({
                errors: [
                    {
                        msg: "Invalid Token",
                    },
                ],
            });
        }
    }
    catch (error) {
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
export default verify;
