import { Elysia } from "elysia";
import * as config from "@/config";
import * as plugins from "@/plugins";
import { contact } from "@/modules";



export const v1 = new Elysia({ prefix: "/v1" })
	.use(plugins.openapi({
		version: config.app.version,
		tags: [
			{
				name: "Contact",
				description: "Contact API",
			},
		],
	}))
	.use(contact.v1);
