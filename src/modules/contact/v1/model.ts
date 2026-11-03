import { Elysia, t, type UnwrapSchema } from "elysia";



export type ContactResponse = UnwrapSchema<typeof contactResponse>;
export const contactResponse = t.Object({
	email: t.String({ format: "email" }),
}, {
	title: "Contact Response",
});



export type SendEmailRequest = UnwrapSchema<typeof sendEmailRequest>;
export const sendEmailRequest = t.Object({
	subject: t.Optional(t.String()),
	content: t.Optional(t.String()),
}, {
	title: "Send Email Request",
	minProperties: 1,
	error: "error.validation.contact_no_subject_and_content",
});

export type SendEmailResponse = UnwrapSchema<typeof sendEmailResponse>;
export const sendEmailResponse = t.Object({
	success: t.Literal(true),
	message: t.String(),
}, {
	title: "Send Email Response",
});



export const ContactModel = new Elysia({
	name: "v1.contact.model",
})
	.model({
		contactResponse,
		sendEmailRequest,
		sendEmailResponse,
	});

export const models = ContactModel.models;
