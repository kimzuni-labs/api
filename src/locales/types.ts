export interface LocaleTranslations {
	app: {
		name: string;
		title: string;
		description: string;
	};

	contact: {
		sendMail: {
			successfully: string;
			failed: string;
		};
	};

	error: {
		validation: {
			contact: {
				subjectIsNotString: string;
				contentIsNotString: string;
				noSubjectAndContent: string;
			};
		};
	};
}
