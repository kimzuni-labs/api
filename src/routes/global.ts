import { Elysia } from "elysia";
import * as plugins from "@/plugins";
import { app, health } from "@/modules";



export const global = new Elysia()
	.use(plugins.openapi({
		isGlobal: true,
		tags: [
			{
				name: "App",
				description: "Application Info",
			},
			{
				name: "Health",
				description: "Health Check",
			},
		],
	}))
	.use(app)
	.use(health);
