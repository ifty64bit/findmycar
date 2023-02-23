import { Request, Response } from "express";
import Cars from "../../models/Cars";

export default async (req: Request, res: Response) => {
    try {
        const car = await Cars.find({ owner: req.user?.userId });
        if (!car) {
            return res.status(404).send({ error: "Car not found" });
        }
        res.send(car);
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
