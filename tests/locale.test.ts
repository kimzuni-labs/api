import { describe, expect, test } from "bun:test";
import { Elysia } from "elysia";

import { locale } from "@/plugins";

import { getAPI } from "./common";



describe("Locale Plugin", () => {
	const supportedLanguages = ["en", "ko"];
	const testApp = new Elysia()
		.use(locale({ languages: supportedLanguages }))
		.get("/", ({ lang }) => ({
			lang,
		}));
	const testApi = getAPI(testApp);

	test("should return default language (en) when Accept-Language header is missing", async () => {
		const res = await testApi.get();

		expect(res.status).toBe(200);
		expect(res.data).toEqual({
			lang: "en",
		});
	});

	test("should parse Accept-Language header and select matching language (ko)", async () => {
		const res = await testApi.get({
			headers: {
				"accept-language": "ko-KR,ko;q=0.9,en-US;q=0.8",
			},
		});

		expect(res.status).toBe(200);
		expect(res.data).toEqual({
			lang: "ko",
		});
	});

	test("should sort languages by q-factor weight and pick highest weighted supported language", async () => {
		const res = await testApi.get({
			headers: {
				"accept-language": "en;q=0.7, ko;q=0.9, fr;q=0.8",
			},
		});

		expect(res.status).toBe(200);
		expect(res.data).toEqual({
			lang: "ko",
		});
	});

	test("should fallback to default language when requested languages are unsupported", async () => {
		const res = await testApi.get({
			headers: {
				"accept-language": "fr-FR,fr;q=0.9,ja;q=0.8",
			},
		});

		expect(res.status).toBe(200);
		expect(res.data).toEqual({
			lang: "en",
		});
	});

	test("should handle uppercase and subtag language codes properly", async () => {
		const res = await testApi.get({
			headers: {
				"accept-language": "KO-KR,KO;q=0.9",
			},
		});

		expect(res.status).toBe(200);
		expect(res.data).toEqual({
			lang: "ko",
		});
	});
});
