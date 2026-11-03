import { describe, expect, test } from "bun:test";
import { Elysia, t } from "elysia";

import { errorHandler } from "@/shared/error";

import { app, getAPI } from "../common";



describe("Error Handler Plugin", () => {
	test("should return 404 JSON response for unknown routes", async () => {
		const res = await app.handle(new Request("http://localhost/non-existent-route"));

		expect(res.status).toBe(404);
		expect(res.headers.get("content-type") ?? "").toContain("application/json");
		expect(res.json()).resolves.toMatchObject({
			error: true,
			status: 404,
		});
	});

	test("should handle validation error with status 422 and parsed details", async () => {
		const testApi = getAPI(new Elysia()
			.use(errorHandler)
			.post("/", {
				body: t.Object({
					name: t.String(),
				}),
			}, ({ body }) => body),
		);

		const res = await testApi.post(
			{ name: 123 as unknown as string },
			{
				headers: { "content-type": "application/json" },
			},
		);

		expect(res.status).toBe(422);
		expect(res.error?.value).toMatchObject({
			error: true,
			status: 422,
		});
	});

	test("should handle invalid JSON parse error", async () => {
		const testApp = new Elysia()
			.use(errorHandler)
			.post("/", {
				body: t.Object({
					name: t.String(),
				}),
			}, ({ body }) => body);

		const res = await testApp.handle(
			new Request("http://localhost/", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: "{ invalid json",
			}),
		);

		expect(res.status).toBe(400);
		expect(res.json()).resolves.toMatchObject({
			error: true,
			status: 400,
		});
	});
});
