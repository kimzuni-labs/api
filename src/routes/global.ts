import { Elysia } from "elysia";

import { options } from "@/config";
import { app, health } from "@/modules";



export const global = new Elysia({
	...options.elysia,
})
	.use(app)
	.use(health);
