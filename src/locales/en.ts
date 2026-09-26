import { pkg } from "@/config";

import type { LocaleTranslations } from "./types";



export const en: LocaleTranslations = {
	app: {
		name: pkg.name,
		title: "REST API Server",
		description: pkg.description,
	},

	error: {
		validation: {
			contact_no_subject_and_content: "subject or content is required.",
		},
	},
};
