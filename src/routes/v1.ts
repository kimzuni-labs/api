import { Elysia } from "elysia";

import { options } from "@/config";
import { errorHandler } from "@/shared/error";
import * as plugins from "@/plugins";
import { contact } from "@/modules";



export const getV1 = () => new Elysia({
	...options.elysia,
	prefix: "/v1",
})
	.use(errorHandler)
	.use(plugins.openapi())
	.use(contact.v1);
