import { describe, expect, test } from "bun:test";
import { Elysia, t } from "elysia";

import { AppError, errorHandler } from "@/shared/error";

import { app, unifiedApp, getAPI } from "./common";



describe("AppError Class", () => {
	test("should instantiate with default values", () => {
		const err = new AppError();
		expect(err.code).toBe("APP_ERROR");
		expect(err.status).toBe(500);
		expect(err.message).toBe("Internal Server Error");
		expect(err.error).toBe(true);
		expect(err.details).toBeNull();
		expect(err.toJSON()).toEqual({
			error: true,
			code: "APP_ERROR",
			status: 500,
			message: "Internal Server Error",
			details: null,
		});
	});

	test("should instantiate with status code only", () => {
		const err = new AppError(404);
		expect(err.status).toBe(404);
		expect(err.message).toBe("Not Found");
		expect(err.error).toBe(true);
	});

	test("should instantiate with message string only", () => {
		const err = new AppError("Something went wrong");
		expect(err.status).toBe(500);
		expect(err.message).toBe("Something went wrong");
		expect(err.error).toBe(true);
	});

	test("should instantiate with status and message", () => {
		const err = new AppError(400, "Bad Request Parameter");
		expect(err.status).toBe(400);
		expect(err.message).toBe("Bad Request Parameter");
		expect(err.error).toBe(true);
	});

	test("should instantiate with options object", () => {
		const err = new AppError({
			code: "INVALID_CREDENTIALS",
			status: 401,
			message: "Invalid email or password",
			details: { attemptsLeft: 3 },
		});

		expect(err.code).toBe("INVALID_CREDENTIALS");
		expect(err.status).toBe(401);
		expect(err.message).toBe("Invalid email or password");
		expect(err.details).toEqual({ attemptsLeft: 3 });
	});

	test("should set code properly with setCode", () => {
		const err = new AppError(403, "Access denied");
		err.setCode("FORBIDDEN_CUSTOM");
		expect(err.code).toBe("FORBIDDEN_CUSTOM");
	});
});

describe("Error Handler Plugin", () => {
	test("should return 404 JSON response for unknown routes on app", async () => {
		const res = await app.handle(new Request("http://localhost/non-existent-route"));

		expect(res.status).toBe(404);
		expect(res.headers.get("content-type") ?? "").toContain("application/json");
		expect(res.json()).resolves.toEqual({
			error: true,
			code: "NOT_FOUND_ERROR",
			status: 404,
			message: "Not Found",
			details: null,
		});
	});

	test("should return 404 JSON response for unknown routes on unifiedApp", async () => {
		const res = await unifiedApp.handle(new Request("http://localhost/v1/non-existent-route"));

		expect(res.status).toBe(404);
		expect(res.headers.get("content-type") ?? "").toContain("application/json");
		expect(res.json()).resolves.toEqual({
			error: true,
			code: "NOT_FOUND_ERROR",
			status: 404,
			message: "Not Found",
			details: null,
		});
	});

	test("should handle thrown AppError in route handlers", async () => {
		const testApi = getAPI(new Elysia()
			.use(errorHandler)
			.get("/", () => {
				throw new AppError(400, "Custom bad request");
			}),
		);

		const res = await testApi.get();

		expect(res.status).toBe(400);
		expect(res.error?.value).toMatchObject({
			error: true,
			code: "APP_ERROR",
			status: 400,
			message: "Custom bad request",
			details: null,
		});
	});

	test("should handle thrown AppError with status and custom options", async () => {
		const testApi = getAPI(new Elysia()
			.use(errorHandler)
			.get("/", () => {
				throw new AppError({
					status: 403,
					message: "Account is suspended",
					details: { reason: "Policy violation" },
				});
			}),
		);

		const res = await testApi.get();

		expect(res.status).toBe(403);
		expect(res.error?.value).toMatchObject({
			error: true,
			code: "APP_ERROR",
			status: 403,
			message: "Account is suspended",
			details: { reason: "Policy violation" },
		});
	});

	test("should handle validation error with status 422 and parsed details", async () => {
		const testApi = getAPI(new Elysia()
			.use(errorHandler)
			.post("/", ({ body }) => body, {
				body: t.Object({
					name: t.String(),
				}),
			}),
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
			code: "VALIDATION_ERROR",
			status: 422,
			details: {
				location: "body",
			},
		});
	});

	test("should handle invalid JSON parse error", async () => {
		const testApp = new Elysia()
			.use(errorHandler)
			.post("/", ({ body }) => body, {
				body: t.Object({
					name: t.String(),
				}),
			});

		const res = await testApp.handle(
			new Request("http://localhost/", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: "{ invalid json",
			}),
		);

		expect(res.status).toBe(400);
		expect(res.json()).resolves.toEqual({
			error: true,
			code: "PARSE_ERROR",
			status: 400,
			message: "Bad Request",
			details: null,
		});
	});
});
