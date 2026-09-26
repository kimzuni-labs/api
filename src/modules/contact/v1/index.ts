import { createSubRouter } from "@/shared/create-app";

import { EmailModel } from "./model";
import { emailService } from "./service";



export const emails = createSubRouter({
	prefix: "/contact",
	tags: ["Contact"],
})
	.use(EmailModel)
	.use(emailService)
	.get(
		"",
		({ email }) => ({
			email: email.to,
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
		({ body, email }) => email.send(body),
		{
			body: "sendEmailRequest",
			response: "sendEmailResponse",
			detail: {
				summary: "Send Email",
				description: "Send an email using the provided subject and content.",
			},
		},
	);
