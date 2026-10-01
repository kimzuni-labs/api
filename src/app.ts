import { Elysia } from "elysia";

import { options } from "@/config";

import * as routes from "@/routes";



export const app = new Elysia({
	...options.elysia,
})
	.all("*", (ctx) => routes.global.handle(ctx.request))
	.all("/v1*", (ctx) => routes.v1.handle(ctx.request));
