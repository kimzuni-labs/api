import { Elysia } from "elysia";

import { options } from "@/config";
import * as plugins from "@/plugins";
import { app, health } from "@/modules";



export const getGlobal = () => new Elysia({
	...options.elysia,
})
	.use(plugins.openapi())
	.use(app)
	.use(health);
