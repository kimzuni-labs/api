import { describe, expect, test } from "bun:test";

import { global } from "@/routes";

import { getAPI } from "./common";



const api = getAPI(global);



describe("APP", () => {
	test("should return a app information", async () => {
		const { data, status } = await api.get();
		expect(status).toBe(200);
		expect(data?.title).toBeString();
	});
});



describe("Health Check", () => {
	test("should return a healthy status", async () => {
		const { data, status } = await api.health.get();
		expect(status).toBe(200);
		expect(data?.healthy).toBe(true);
	});
});
