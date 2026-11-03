import { pkg } from "@/config";

import type { LocaleTranslations } from "./types";



export const ko: LocaleTranslations = {
	app: {
		name: pkg.name,
		title: "REST API 서버",
		description: pkg.description,
	},

	contact: {
		sendMail: {
			successfully: "이메일이 성공적으로 전송되었습니다.",
			failed: "이메일 전송에 실패했습니다.",
		},
	},

	error: {
		validation: {
			contact: {
				subjectIsNotString: "subject는 문자열이어야 합니다.",
				contentIsNotString: "content는 문자열이어야 합니다.",
				noSubjectAndContent: "subject 또는 content 중 하나는 필수입니다.",
			},
		},
	},
};
