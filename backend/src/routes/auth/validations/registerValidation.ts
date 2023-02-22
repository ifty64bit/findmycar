import { body } from "express-validator";

const registerValidation = [
    body("email")
        .isEmail()
        .withMessage("Email is not valid")
        .withMessage("Email is required"),
    body("displayPhoto").custom((value, { req }) => {
        if (!req.file) {
            throw new Error("Image file is required");
        }
        const allowedExtensions = ["jpg", "jpeg", "png", "gif"];
        const { mimetype, size } = req.file;
        const fileExtension = mimetype.split("/")[1];
        if (!allowedExtensions.includes(fileExtension)) {
            throw new Error(
                "Invalid file type. Only JPG, JPEG, PNG and GIF are allowed"
            );
        }
        if (size > 5000000) {
            throw new Error("File size should be less than 5MB");
        }
        return true;
    }),
    body("password").isLength({ min: 5 }),
    body("passwordConfirmation").custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("Password confirmation does not match password");
        }
        return true;
    }),
];

export default registerValidation;
