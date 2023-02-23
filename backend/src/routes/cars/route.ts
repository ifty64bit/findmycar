import { Router } from "express";
import checkAuth from "../../middlewares/checkAuth";
import {
    addCar,
    deleteCar,
    getAllCars,
    getCarById,
    updateCar,
} from "../../controllers/cars";
import validate from "../../middlewares/validate";
import addCarValidation from "./validations/addCarValidation";
import upload from "../../middlewares/upload";

const router = Router();

router.get("/", getAllCars);
router.get("/:id", getCarById);
router.post("/", checkAuth, upload('cars').array('images'), validate(addCarValidation), addCar);
router.put("/:id", checkAuth, upload('cars').array('images'), updateCar);
router.delete("/:id", checkAuth, deleteCar);

export default router;
