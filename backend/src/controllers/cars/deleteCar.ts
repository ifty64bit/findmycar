import { Request, Response } from "express";
import Cars from "../../models/Cars";
import { Car } from "../../types";
import deleteCarConfirmation from "../../utils/mailtemplates/deleteConfirmation";

export default async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const car = (await Cars.findById(id).populate(
            "owner",
            "email"
        )) as Car & { owner: { email: string; _id: string } };

        if (!car) {
            return res.status(404).send({ error: "Car not found" });
        }

        if (car.owner._id.toString() !== req?.user?.userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        await car.remove();
        await deleteCarConfirmation(car.owner.email, car.name);
        res.status(200).json({
            msg: "Car deleted",
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
