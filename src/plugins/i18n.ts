import { Elysia } from "elysia";
import i18next, { type TFunction } from "i18next";
import type { InitOptions } from "i18next";

import * as locales from "@/locales";

import { locale } from "./locale";



export interface I18nOptions<T> extends InitOptions<T> {
	languages?: string[];
}

const initI18n = async <T>({
	languages = locales.languages,
	...options
}: I18nOptions<T>) => {
	const defaultLang = languages[0] ?? "en";

	if (!i18next.isInitialized) {
		await i18next.init({
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



const i18nInstance = await initI18n({
});

const getT = (lang: string) => i18nInstance.getFixedT(lang);

export type I18nInstance = ReturnType<typeof getT>;
export interface I18nInstanceOptions {
	t: I18nInstance;
}



const getDotT = (t: TFunction) => (key: locales.LocaleDotTranslations | (string & {})) => t(key as unknown as Parameters<typeof t>[0]);

export const i18n = new Elysia({
	name: "plugin.i18n",
})
	.use(locale)
	.decorate(({ lang }) => {
		const t = getT(lang);
		const dotT = getDotT(t);
		return { lang, t, dotT };
	})
	.onRequest(ctx => {
		ctx.t = getT(ctx.lang);
		ctx.dotT = getDotT(ctx.t);
	})
	.as("global");
