import type { DEFAULT_NS, ENABLE_SELECTOR, LocaleTranslations } from "@/locales";



declare module "i18next" {
	// Extend CustomTypeOptions
	interface CustomTypeOptions {
		defaultNS: typeof DEFAULT_NS;
		enableSelector: typeof ENABLE_SELECTOR;
		resources: {
			translation: LocaleTranslations;
		};
	}
}
