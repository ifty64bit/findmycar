import { body } from "express-validator";

const addCarValidation = [
    body("name")
        .isString()
        .withMessage("Name must be a string")
        .withMessage("Name is required"),
    body("brand")
        .isString()
        .withMessage("Brand must be a string")
        .withMessage("Brand is required"),
    body("year")
        .isInt()
        .withMessage("Year must be a number")
        .withMessage("Year is required"),
    body("price")
        .isInt()
        .withMessage("Price must be a number")
        .withMessage("Price is required"),
    body("description")
        .isString()
        .withMessage("Description must be a string")
        .withMessage("Description is required"),
    body("seats")
        .isInt()
        .withMessage("Seats must be a number")
        .withMessage("Seats is required"),
    body("images")
        .custom((value, { req }) => {
            if (!req.files) {
                throw new Error("Images is required");
            }
            const files = Array.isArray(req.files) ? req.files : [req.files];
            const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif"];

            // Check that all uploaded files have allowed mime types
            for (const file of files) {
                if (!allowedMimeTypes.includes(file.mimetype)) {
                    return false;
                }
            }
            return true;
        })
        .withMessage("Only JPEG, PNG, and GIF images are allowed")
        .withMessage("Images is required"),
    body("isAvailable")
        .isBoolean()
        .withMessage("isAvailable must be a boolean")
        .withMessage("isAvailable is required"),
];

export default addCarValidation;
