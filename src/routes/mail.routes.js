import express from "express";
// import { getMyMails } from "../controllers/mail.controller";
// import { protect } from "../middlewares/auth.middleware";
import { protect } from "../middlewares/auth.middleware.js";
import { getMyMails } from "../controllers/mail.controller.js";
import { sendMail } from "../controllers/sendMail.controller.js";
// import { getMyMails } from "../controllers/mail.controller.js";
// import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/my", protect, getMyMails);
router.post("/send", protect, sendMail);

export default router;