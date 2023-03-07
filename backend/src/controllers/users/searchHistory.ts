import { Request, Response } from "express";
import Searchs from "../../models/Searchs";

export default async (req: Request, res: Response) => {
    try {
        const history = await Searchs.find({ user: req?.user?.userId })
            .sort({ createdAt: -1 })
            .limit(10);
        res.status(200).json(history);
    } catch (error) {
        console.error(error);
        res.status(500).json({ errors: [{ msg: "Server Error" }] });
    }
};
