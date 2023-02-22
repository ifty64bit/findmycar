import { body } from "express-validator";

const loginValidation = [
    body("email")
        .isEmail()
        .withMessage("Email is not valid")
        .withMessage("Email is required"),
    body("password").isLength({ min: 5 }),
];

export default loginValidation;
