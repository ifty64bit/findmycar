import { Request, Response } from "express";
import Cars from "../../models/Cars";
import { Car } from "../../types";
import updateFileConfirmation from "../../utils/mailtemplates/updateCarConfirmation";

type PartialCar = Partial<Car>;

export default async (req: Request, res: Response) => {
    const id = req.params.id;
    const body = req.body as PartialCar;
    try {
        const car = (await Cars.findByIdAndUpdate(id, body, {
            new: true,
        }).populate("owner", "email")) as Car & {
            owner: { email: string; _id: string };
        };

        if (!car) {
            return res.status(404).json({ message: "Car not found" });
        }
        await updateFileConfirmation(car?.owner?.email, car.name, car._id);
        return res.status(200).json(car);
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
