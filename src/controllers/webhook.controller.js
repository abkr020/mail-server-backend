// controllers/webhook.controller.js
import { saveMail } from "../models/Mail.model.save.js";
import logger from "../utils/logger.js";

export const saveMailFromWebhook_resend = async (req, res) => {
    const event = req.body;

    try {
        logger.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        logger.log("📩 RESEND WEBHOOK RECEIVED");
        logger.log("📌 Event Type:", event?.type);

        // Only process inbound emails
        if (event?.type !== "email.received") {
            logger.log("ℹ️ Ignored event:", event?.type);
            return res.status(200).json({ ignored: true });
        }

        const email = event.data;

        const mailData = {
            envelopeFrom: email.from,
            from: email.from,
            headerFrom: email.from_name || email.from,

            to: email.to?.[0]?.email?.toLowerCase(),

            subject: email.subject || "(no subject)",
            text: email.text || "",
            html: email.html || "",

            messageId: email.message_id,
            date: email.created_at ? new Date(email.created_at) : new Date(),

            attachments: (email.attachments || []).map(att => ({
                filename: att.filename,
                contentType: att.content_type,
                size: att.size,
            })),
        };

        await saveMail(mailData);

        logger.log("✅ MAIL SAVED FROM RESEND WEBHOOK");
        logger.log("   To:", mailData.to);
        logger.log("   Subject:", mailData.subject);
        logger.log("   Attachments:", mailData.attachments.length);
        logger.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

        return res.status(200).json({ success: true });
    } catch (err) {
        logger.error("❌ RESEND WEBHOOK ERROR", err);

        return res.status(500).json({
            success: false,
            message: "Webhook processing failed",
        });
    }
};