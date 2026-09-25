import { Elysia } from "elysia";

import { options } from "@/config";
import * as plugins from "@/plugins";



export const getV1 = () => new Elysia({
	...options.elysia,
	prefix: "/v1",
})
	.use(plugins.openapi())
	.get("", () => ({ v1: true }));
