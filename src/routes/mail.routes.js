import express from "express";
// import { getMyMails } from "../controllers/mail.controller";
// import { protect } from "../middlewares/auth.middleware";
import { protect } from "../middlewares/auth.middleware.js";
import { getMyMails } from "../controllers/mail.controller.js";
// import { getMyMails } from "../controllers/mail.controller.js";
// import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/my", protect, getMyMails);

export default router;