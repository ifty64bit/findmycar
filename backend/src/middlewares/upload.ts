import { Request } from "express";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: function (req: Request, file: any, cb: any) {
        cb(null, "src/public/images/displayphoto/");
    },
    filename: function (req: Request, file, cb) {
        cb(null, `${Date.now()}${path.extname(file.originalname)}`);
    },
});

const fileFilter = (req: Request, file: any, cb: any) => {
    // Check if file type is allowed
    if (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/gif"
    ) {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type."));
    }
};

const upload = multer({ storage: storage, fileFilter });

export default upload;
