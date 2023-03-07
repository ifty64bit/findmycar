import { Router, Request, Response } from "express";
import deleteAllSearchHistory from "../../controllers/users/deleteAllSearchHistory";
import deleteSearchHistory from "../../controllers/users/deleteSearchHistory";
import searchHistory from "../../controllers/users/searchHistory";
import checkAuth from "../../middlewares/checkAuth";

const router = Router();

router.get("/", (req: Request, res: Response) => {
    res.send("Hello Admin");
});

router.get("/search-history", checkAuth, searchHistory);
router.delete("/search-history/:id", checkAuth, deleteSearchHistory);
router.delete("/search-history-all", checkAuth, deleteAllSearchHistory);

export default router;
