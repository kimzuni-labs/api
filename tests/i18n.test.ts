import { describe, expect, test } from "bun:test";
import { Elysia } from "elysia";

import { i18n } from "@/plugins";

import { getAPI } from "./common";



describe("i18n Plugin & Locale Integration", () => {
	const testApp = new Elysia()
		.use(i18n())
		.get("/", ({ lang, t }) => ({
			lang,
			appTitle: t($ => $.app.title),
		}));
	const testApi = getAPI(testApp);

	test("should resolve Korean (ko) when Accept-Language is set to ko-KR", async () => {
		const res = await testApi.get({
			headers: {
				"accept-language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
			},
		});

		expect(res.status).toBe(200);
		expect(res.data).toEqual({
			lang: "ko",
			appTitle: "REST API 서버",
		});
	});

	test("should resolve English (en) when Accept-Language is set to en-US", async () => {
		const res = await testApi.get({
			headers: {
				"accept-language": "en-US,en;q=0.9",
			},
		});

		expect(res.status).toBe(200);
		expect(res.data).toEqual({
			lang: "en",
			appTitle: "REST API Server",
		});
	});

	test("should fallback to default language (en) when Accept-Language header is missing", async () => {
		const res = await testApi.get();

		expect(res.status).toBe(200);
		expect(res.data).toEqual({
			lang: "en",
			appTitle: "REST API Server",
		});
	});
});
