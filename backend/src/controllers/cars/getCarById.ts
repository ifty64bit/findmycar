import { Request, Response } from "express";
import Cars from "../../models/Cars";

export default async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const car = await Cars.findById(id);
        if (!car) {
            return res.status(404).send({ error: "Car not found" });
        }
        car.views += 1;
        await car.save();
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
