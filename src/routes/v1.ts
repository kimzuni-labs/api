import { Elysia } from "elysia";

import { options } from "@/config";



export const v1 = new Elysia({
	...options.elysia,
	prefix: "/v1",
})
	.get("", () => ({ v1: true }));
