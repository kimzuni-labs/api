import { Elysia } from "elysia";

import { options } from "@/config";
import { errorHandler } from "@/shared/error";
import * as plugins from "@/plugins";
import { app, health } from "@/modules";



export const getGlobal = () => new Elysia({
	...options.elysia,
})
	.use(errorHandler)
	.use(plugins.openapi())
	.use(app)
	.use(health);
