import { Router } from "express";
import getAllBookmarks from "../../controllers/bookmarks/getAllBookmarks";
import manageBookmarks from "../../controllers/bookmarks/manageBookmarks";
import checkAuth from "../../middlewares/checkAuth";

const router = Router();

router.get("/", checkAuth, getAllBookmarks);
router.post("/", checkAuth, manageBookmarks);

export default router;