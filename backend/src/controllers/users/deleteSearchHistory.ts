import { Request, Response } from "express";
import Searchs from "../../models/Searchs";

export default async (req: Request, res: Response) => {
    try {
        const deleted = await Searchs.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ errors: [{ msg: "Not found" }] });
        }
        res.status(200).json(deleted);
    } catch (error) {
        console.error(error);
        res.status(500).json({ errors: [{ msg: "Server Error" }] });
    }
};
