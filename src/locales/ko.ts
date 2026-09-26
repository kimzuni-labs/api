import { pkg } from "@/config";

import type { LocaleTranslations } from "./types";



export const ko: LocaleTranslations = {
	app: {
		name: pkg.name,
		title: "REST API 서버",
		description: pkg.description,
	},

	error: {
		validation: {
			contact_no_subject_and_content: "subject 또는 content 중 하나는 필수입니다.",
		},
	},
};
