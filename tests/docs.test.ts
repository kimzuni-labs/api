import { describe, expect, test } from "bun:test";

import { app } from "./common";



describe("API Docs", () => {
	test("should return Scalar API documentation HTML", async () => {
		const docs = await app.handle(new Request("http://localhost/docs"));
		expect(docs.status).toBe(200);
		expect(docs.text()).resolves.toInclude("scalar");

		const res = await app.handle(new Request("http://localhost/v1/docs"));
		expect(res.status).toBe(404);
	});

	test("should return OpenAPI JSON", async () => {
		const globalSpec = await app.handle(new Request("http://localhost/openapi.json"));
		expect(globalSpec.status).toBe(200);
		expect(globalSpec.json()).resolves.toContainKey("openapi");

		const v1Spec = await app.handle(new Request("http://localhost/v1/openapi.json"));
		expect(v1Spec.status).toBe(200);
		expect(v1Spec.json()).resolves.toContainKey("openapi");
	});
});
