import { Router } from "express";
import checkAuth from "../../middlewares/checkAuth";
import {
    addCar,
    deleteCar,
    getAllCars,
    getCarById,
    updateCar,
    search,
} from "../../controllers/cars";
import validate from "../../middlewares/validate";
import addCarValidation from "./validations/addCarValidation";
import upload from "../../middlewares/upload";
import getMyCars from "../../controllers/cars/getMyCars";

const router = Router();

router.get("/", getAllCars);
router.get("/search", search);
router.get("/my", checkAuth, getMyCars);
router.get("/:id", getCarById);
router.post(
    "/",
    checkAuth,
    upload("cars").array("images"),
    validate(addCarValidation),
    addCar
);
router.put("/:id", checkAuth, upload("cars").array("images"), updateCar);
router.delete("/:id", checkAuth, deleteCar);

export default router;
