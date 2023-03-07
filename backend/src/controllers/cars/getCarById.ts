import { Request, Response } from "express";
import mongoose from "mongoose";
import Cars from "../../models/Cars";
import decodeJwt from "../../utils/decodeJwt";

export default async (req: Request, res: Response) => {
    const id = req.params.id;
    const user = decodeJwt(req);
    if (user !== null) {
        const car = await Cars.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(id),
                },
            },
            {
                $lookup: {
                    from: "bookmarks",
                    let: {
                        carId: "$_id",
                        userId: new mongoose.Types.ObjectId(user.userId),
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ["$user", "$$userId"] },
                                        { $eq: ["$car", "$$carId"] },
                                    ],
                                },
                            },
                        },
                    ],
                    as: "bookmark",
                },
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    brand: 1,
                    year: 1,
                    price: 1,
                    description: 1,
                    seats: 1,
                    images: 1,
                    views: 1,
                    isAvailable: 1,
                    owner: 1,
                    bookmarked: {
                        $cond: {
                            if: { $eq: [{ $size: "$bookmark" }, 1] },
                            then: true,
                            else: false,
                        },
                    },
                    offer: 1,
                },
            },
        ]);
        return res.send(car[0]);
    }
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
