import { Elysia, t } from "elysia";



export type ContactResponse = typeof contactResponse.static;
export const contactResponse = t.Object({
	email: t.String({ format: "email" }),
}, {
	title: "Contact Response",
});



export type SendEmailRequest = typeof sendEmailRequest.static;
export const sendEmailRequest = t.Object({
	subject: t.Optional(t.String()),
	content: t.Optional(t.String()),
}, {
	title: "Send Email Request",
	minProperties: 1,
	error: "subject or content is required.",
});

export type SendEmailResponse = typeof sendEmailResponse.static;
export const sendEmailResponse = t.Object({
	success: t.Boolean(),
	message: t.String(),
}, {
	title: "Send Email Response",
});



export const EmailModel = new Elysia({
	name: "email.model",
})
	.model({
		contactResponse,
		sendEmailRequest,
		sendEmailResponse,
	});

export const models = EmailModel.models;
