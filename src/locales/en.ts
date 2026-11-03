import { pkg } from "@/config";

import type { LocaleTranslations } from "./types";



export const en: LocaleTranslations = {
	app: {
		name: pkg.name,
		title: "REST API Server",
		description: pkg.description,
	},

	contact: {
		sendMail: {
			successfully: "Email has been sent successfully.",
			failed: "Failed to send email.",
		},
	},

	error: {
		validation: {
			contact: {
				subjectIsNotString: "subject must be a string.",
				contentIsNotString: "content must be a string.",
				noSubjectAndContent: "subject or content is required.",
			},
		},
	},
};
