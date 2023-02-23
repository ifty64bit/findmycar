import { Request, Response } from "express";
import Cars from "../../models/Cars";

export default async (req: Request, res: Response) => {
    const skip = Number(req.query.skip) || 0;
    const limit = Number(req.query.limit) || 10;
    try {
        const cars = await Cars.find().skip(skip).limit(limit);
        const count = await Cars.countDocuments();
        res.status(200).json({
            cars,
            count,
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
