import { Request, Response } from "express";
import Cars from "../../models/Cars";
import User from "../../models/User";
import { Car } from "../../types";
import createCarConfirmation from "../../utils/mailtemplates/createCarConfirmation";

export default async (req: Request, res: Response) => {
    try {
        const files = req.files as Express.Multer.File[];
        const car = req.body as Partial<Car>;
        const newCar = new Cars();
        newCar.name = car.name!;
        newCar.brand = car.brand!;
        newCar.year = car.year!;
        newCar.price = car.price!;
        newCar.description = car.description!;
        newCar.seats = car.seats!;
        newCar.images =
            files.map((file: Express.Multer.File) => file.filename) || [];
        newCar.isAvailable = car.isAvailable || true;
        newCar.owner = req.user?.userId!;
        await newCar.save();
        const user = await User.findById(req.user?.userId).select("email") as {_id: string, email: string};
        await createCarConfirmation(user?.email, newCar.name, newCar._id);
        res.status(201).json(newCar);
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
