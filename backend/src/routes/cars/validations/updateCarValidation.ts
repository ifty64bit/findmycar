import { body } from "express-validator";

const addCarValidation = [
    body("name").isString().withMessage("Name must be a string").optional(),
    body("brand").isString().withMessage("Brand must be a string").optional(),
    body("year").isInt().withMessage("Year must be a number").optional(),
    body("price").isInt().withMessage("Price must be a number").optional(),
    body("description")
        .isString()
        .withMessage("Description must be a string")
        .optional(),
    body("seats").isInt().withMessage("Seats must be a number").optional(),
    body("images")
        .custom((value, { req }) => {
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
        .optional(),
    body("isAvailable")
        .isBoolean()
        .withMessage("isAvailable must be a boolean")
        .optional(),
];

export default addCarValidation;
