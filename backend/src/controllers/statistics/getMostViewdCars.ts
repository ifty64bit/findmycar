import { Request, Response } from "express";
import Cars from "../../models/Cars";

export default async (req: Request, res: Response) => {
    try {
        const cars = await Cars.find({ owner: req.user?.userId })
            .sort({ views: -1 })
            .limit(10);
        res.status(200).json({
            cars,
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
