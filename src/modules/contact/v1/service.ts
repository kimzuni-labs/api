import { Elysia } from "elysia";
import nodemailer from "nodemailer";

import { env } from "@/config";
import { AppError } from "@/shared/error";

import * as model from "./model";



export const transporter = nodemailer.createTransport({
	host: env.SMTP_HOST,
	port: env.SMTP_PORT,
	secure: true,
	auth: {
		user: env.SMTP_USER,
		pass: env.SMTP_PASS,
	},
});



export const emailService = new Elysia({ name: "v1.contact.service" })
	.decorate("email", {
		to: env.MAIL_TO,
		async send({
			subject,
			content,
		}: model.SendEmailRequest): Promise<model.SendEmailResponse> {
			try {
				const info = await transporter.sendMail({
					from: `"Anonymous Mailbox" <${env.MAIL_FROM}>`,
					to: env.MAIL_TO,
					subject: `[Anonymous Email] ${subject}`,
					text: content,
				});

				console.log("Message sent: %s", info.messageId);

				return {
					success: true,
					message: "Successfully sent the email.",
				};
			} catch (error) {
				console.error("Failed to send email:", error);
				throw new AppError(500, "An error occurred while sending the email.");
			}
		},
	});
