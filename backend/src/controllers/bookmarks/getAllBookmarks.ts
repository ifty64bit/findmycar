import { Request, Response } from "express";
import Bookmarks from "../../models/Bookmarks";

export default async (req: Request, res: Response) => {
    try {
        const bookmarks = await Bookmarks.find({ user: req?.user?.userId}).populate("car");
        res.status(200).json(bookmarks);
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
};
