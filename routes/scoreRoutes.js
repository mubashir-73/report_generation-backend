import { Router } from "express";
import { getGdScores, getScore } from "../controllers/scoreController";

const router = Router();

router.route("/").get(getGdScores);
router.route("/:id").get(getGdScore);
router.route("/").get(getaptScores);
router.route("/:id").get(getaptScore);
export default router;
