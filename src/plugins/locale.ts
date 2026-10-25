import { Elysia } from "elysia";

import * as locales from "@/locales";



const languages = locales.languages;
const defaultLang = languages[0] ?? "en";



interface Item {
	lang: string;
	q: number;
}

export const locale = new Elysia({
	name: "plugin.locale",
})
	.decorate("lang", defaultLang)
	.onRequest(ctx => {
		const header = ctx.request.headers.get("accept-language")?.trim();
		if (header) {
			const langs: Item[] = header
				.split(",")
				.flatMap(part => {
					const [langInfo, qInfo] = part.trim().split(";");
					const lang = langInfo?.split("-")[0]?.toLowerCase();
					if (lang === undefined) return [];

					const q = qInfo?.startsWith("q=") ? parseFloat(qInfo.replace("q=", "")) : 1.0;
					return [{
						lang,
						q: Number.isNaN(q) ? 1.0 : q,
					}];
				})
				.sort((a, b) => b.q - a.q);

			const lang = langs.find(({ lang }) => languages.includes(lang))?.lang ?? defaultLang;

			ctx.lang = lang;
		}
	})
	.as("scoped");
