import { Elysia } from "elysia";

import { ContactModel } from "./model";
import { contactService } from "./service";



export const contact = new Elysia({
	prefix: "/contact",
	tags: ["Contact"],
})
	.use(ContactModel)
	.use(contactService)
	.get(
		"",
		({ contact }) => ({
			email: contact.to,
		}),
		{
			response: "contactResponse",
			detail: {
				summary: "Get Contact Email",
				description: "Get the contact email address.",
			},
		},
	)
	.post(
		"",
		async ({ status, body, contact }) => status(201, await contact.send(body)),
		{
			body: "sendEmailRequest",
			response: {
				201: "sendEmailResponse",
			},
			detail: {
				summary: "Send Email",
				description: "Send an email using the provided subject and content.",
			},
		},
	);
