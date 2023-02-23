import { Request } from "express";
import multer from "multer";
import path from "path";

function upload(save_path?: string) {
    const storage = multer.diskStorage({
        destination: function (req: Request, file: any, cb: any) {
            cb(null, `src/public/images/${save_path}/`);
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
    
    return multer({ storage: storage, fileFilter });
}

export default upload;
