import { config } from "../config/env.js";
import { User } from "../models/user.model.js";
import logger from "./logger.js";
import { Resend } from "resend";
const resend = new Resend(config.RESEND_APIKEY);
export async function sendNotification(payload) {
    try {
        let user = await User.findById(payload.userId);
        // TODO: Implement notification sending logic
        logger.info("Sending notification:", payload);
        // TODO: add email notification - done ✅
        try {
            const { data, error } = await resend.emails.send({
                from: "Rodin <alert@deadal.us>",
                to: user?.email,
                subject: payload.title,
                html: payload?.message,
            });
        }
        catch (error) {
            logger.error("Error sending email:", error);
        }
        // TODO: add SMS notification
        // TODO: add push notification
        console.log("🔔 NOTIFICATION:", {
            title: payload.title,
            message: payload.message,
            type: payload.type,
        });
    }
    catch (error) {
        logger.error("Error sending notification:", error);
    }
}
