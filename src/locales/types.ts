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



type DotPaths<T> = T extends object
	? {
		[K in keyof T & string]: T[K] extends object
			? `${K}.${DotPaths<T[K]>}`
			: K;
	}[keyof T & string]
	: never;
export type LocaleDotTranslations = DotPaths<LocaleTranslations>;
