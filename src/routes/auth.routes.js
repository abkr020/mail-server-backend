import express from "express";
console.log("🚀 ROUTER LOADED from:", import.meta.url);
console.log("🚀 Express version:", express?.name || "unknown");

const router = express.Router();
console.log("🚀 Router created. Type:", typeof router, "Constructor:", router.constructor.name);

import { signup, login, googleAuth, me } from "../controllers/auth.controller.js";
import { protect, verifyTokenFromBody } from "../middlewares/auth.middleware.js";

router.get("/test", (req, res) => res.json({ ok: true }));
router.post("/signup", signup);
router.post("/login", login);
// router.post("/google", googleAuth);

router.post("/sso-login", verifyTokenFromBody, (req, res) => {
    try {
        const token = req.token;

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "lax",
            secure: false,
            path: "/"
        });

        res.json({
            success: true,
            user: req.user
        });

    } catch (error) {
        res.status(500).json({ message: "SSO login failed" });
    }
});
// 🔐 Check logged-in user
router.get("/me", protect, me);


export default router;
