import { Request, Response } from "express";
import Cars from "../../models/Cars";
import Searchs from "../../models/Searchs";
import jwt from "jsonwebtoken";

export default async (req: Request, res: Response) => {
    const filters = req.query;

    let query: any = {};

    if (filters?.name) query.name = { $regex: filters.name, $options: "i" };
    if (filters?.brand) query.brand = { $regex: filters.brand, $options: "i" };
    if (filters?.year) query.year = filters.year;
    if (filters?.price) query.price = { $lte: filters.price }; //max price
    if (filters?.seats) query.seats = { $gte: filters.seats }; //min seats

    //save search if user logged in
    if (req.header("Authorization") && filters?.name) {
        const token = req.header("Authorization")?.replace("Bearer ", "");
        if (token) {
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!) as {
                userId: string;
            };

            await Searchs.create({
                query: filters.name,
                user: decoded.userId,
            });
        }
    }

    let count = await Cars.countDocuments(query);
    let cars = await Cars.find(query)
        .skip(parseInt(filters?.skip as string) || 0)
        .limit(parseInt(filters?.limit as string) || 10);

    res.status(200).json({
        status: 200,
        data: cars,
        count,
    });
};
