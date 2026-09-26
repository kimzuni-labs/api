import { Elysia } from "elysia";
import i18next from "i18next";
import type { InitOptions } from "i18next";

import * as locales from "@/locales";

import { locale, type LocaleOptions } from "./locale";



export interface I18nOptions<T> extends InitOptions<T>, LocaleOptions {
}

const initI18n = <T>({
	languages = locales.languages,
	...options
}: I18nOptions<T>) => {
	const defaultLang = languages[0] ?? "en";

	if (!i18next.isInitialized) {
		void i18next.init({
			fallbackLng: defaultLang,
			resources: locales.resources,
			...options,
			interpolation: {
				escapeValue: false,
				...options.interpolation,
			},
		});
	}

	return i18next;
};



export function i18n<T = object>(options: I18nOptions<T> = {}) {
	const i18nInstance = initI18n(options);
	const getInstance = (lang: string) => i18nInstance.cloneInstance().getFixedT(lang);

	return new Elysia({
		name: "plugin.i18n",
	})
		.use(locale())
		.decorate(({ lang }) => {
			const t = getInstance(lang);
			return { lang, t };
		})
		.onRequest(ctx => {
			ctx.t = getInstance(ctx.lang);
		});
}
