import { Request, Response, Router } from "express";
import register from "../../controllers/auth/register";
import upload from "../../middlewares/upload";
import validate from "../../middlewares/validate";
import registerValidation from "./validations/registerValidation";
import verifyEmail from "../../controllers/auth/verifyEmail";
import login from "../../controllers/auth/login";
import loginValidation from "./validations/loginValidation";

const router = Router();

router.post("/login", upload.none(), validate(loginValidation), login);

router.post(
    "/register",
    upload.single("displayPhoto"),
    validate(registerValidation),
    register
);

router.get("/verify/:token/:email", verifyEmail);

export default router;
