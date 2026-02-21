import { Mail } from "../models/Mail.model.js";

export const getMyMails = async (req, res) => {
  try {
    const userEmail = req.user.email; // 🔥 from verified JWT

    const mails = await Mail.find({ to: userEmail })
      .sort({ createdAt: -1 })
      .limit(50);

    res.json({
      count: mails.length,
      mails,
    });
  } catch (error) {
    console.error("Get mails error:", error);
    res.status(500).json({ message: "Server error" });
  }
};