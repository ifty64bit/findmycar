import { Router } from "express";
import checkAuth from "../../middlewares/checkAuth";
import getMostViewedCars from "../../controllers/statistics/getMostViewdCars";

const router = Router();

router.get("/", checkAuth, getMostViewedCars);

export default router;
