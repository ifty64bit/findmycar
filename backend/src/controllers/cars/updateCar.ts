import { Request, Response } from "express";
import Cars from "../../models/Cars";
import { Car } from "../../types";
import updateCarConfirmation from "../../utils/mailtemplates/updateCarConfirmation";
import notifyUpdate from "../../utils/mailtemplates/notifyUpdate";
import Bookmarks from "../../models/Bookmarks";

type PartialCar = Partial<Car>;

export default async (req: Request, res: Response) => {
    const id = req.params.id;
    const body = req.body as PartialCar;
    try {
        const car = (await Cars.findByIdAndUpdate(
            id,
            {
                ...body,
                offer: JSON.parse(body.offer) as { percentage: number },
            },
            {
                new: true,
            }
        ).populate("owner", "email")) as Car & {
            owner: { email: string; _id: string };
        };

        if (!car) {
            return res.status(404).json({ message: "Car not found" });
        }
        await updateCarConfirmation(car?.owner?.email, car.name, car._id);

        //notifying the bookmarked user that the car has been updated
        const bookmarks = await Bookmarks.find({ car: id }).populate(
            "user",
            "email"
        );
        bookmarks.forEach((bookmark) => {
            //Not used asyc/await here because it will slow down the process
            notifyUpdate(bookmark?.user?.email, car.name, car._id).catch(
                (err) => {
                    console.error(err);
                }
            );
        });

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
