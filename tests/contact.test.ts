import { afterEach, beforeEach, describe, expect, spyOn, test, type Mock } from "bun:test";

import { transporter } from "@/modules/contact/v1/service";
import { env } from "@/config";

import { api } from "./common";



describe("Contact API (v1/contact)", () => {
	let sendMailSpy: Mock<typeof transporter.sendMail>;

	beforeEach(() => {
		sendMailSpy = spyOn(transporter, "sendMail").mockImplementation(() =>
			Promise.resolve({
				messageId: "<mock-message-id@example.com>",
				envelope: { from: "", to: [] },
				accepted: [],
				rejected: [],
				pending: [],
				response: "250 OK",
			}),
		);
	});

	afterEach(() => {
		sendMailSpy.mockRestore();
	});

	test("should return the contact email address", async () => {
		const res = await api.v1.contact.get();

		expect(res.status).toBe(200);
		expect(res.data?.email).toBe(env.MAIL_TO);
	});

	test("should successfully send an email via HTTP request", async () => {
		const res = await api.v1.contact.post({
			subject: "Test Subject",
			content: "Test Content Hello World",
		});

		expect(res.status).toBe(200);
		expect(res.data).toEqual({
			success: true,
			message: "Successfully sent the email.",
		});

		expect(sendMailSpy).toHaveBeenCalledTimes(1);
	});

	test("should successfully send an email via Eden Treaty API client", async () => {
		const { data, error, status } = await api.v1.contact.post({
			subject: "Eden Treaty Subject",
			content: "Eden Treaty Content",
		});

		expect(status).toBe(200);
		expect(error).toBeNull();
		expect(data).toEqual({
			success: true,
			message: "Successfully sent the email.",
		});

		expect(sendMailSpy).toHaveBeenCalledTimes(1);
	});

	test("should return 422 validation error when request body is missing required fields", async () => {
		const res = await api.v1.contact.post({
			subject: undefined,
			content: undefined,
		});

		expect(res.status).toBe(422);
		expect(res.error?.value).toMatchObject({
			error: true,
			message: "subject or content is required.",
			details: {
				location: "body",
			},
		});

		expect(sendMailSpy).not.toHaveBeenCalled();
	});

	test("should handle SMTP failure and return 500 AppError", async () => {
		sendMailSpy.mockImplementation(() => Promise.reject(new Error("SMTP Connection Error")));

		const res = await api.v1.contact.post({
			subject: "Failure Test",
			content: "This should fail",
		});

		expect(res.status).toBe(500);
		expect(res.error?.value).toMatchObject({
			error: true,
			status: 500,
			message: "An error occurred while sending the email.",
			details: null,
		});
	});
});
