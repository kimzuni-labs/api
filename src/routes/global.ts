import { createRouter } from "@/shared/create-app";
import * as plugins from "@/plugins";
import { app, health } from "@/modules";



export const getGlobal = () => createRouter()
	.use(plugins.openapi({
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
