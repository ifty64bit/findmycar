import { count } from "console";
import { Request, Response } from "express";
import Cars from "../../models/Cars";

export default async (req: Request, res: Response) => {
    try {
        const cars = await Cars.find({ owner: req.user?.userId });
        const count = await Cars.countDocuments({ owner: req.user?.userId });
        if (!cars) {
            return res.status(404).send({ error: "Car not found" });
        }
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
