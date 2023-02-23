import { Request, Response } from "express";
import Bookmarks from "../../models/Bookmarks";

export default async (req: Request, res: Response) => {
    const carId = req.body.carId;

    try {
        const bookmarks = await Bookmarks.findOne({
            user: req?.user?.userId,
            car: carId,
        });
        if (bookmarks === null) {
            const data = await new Bookmarks({
                user: req?.user?.userId,
                car: carId,
            }).save();
            return res.status(200).json({
                msg: "Car added to bookmarks",
            });
        }
        await bookmarks.remove();
        res.status(200).json({
            msg: "Car removed from bookmarks",
        });
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
