import { app as info } from "@/config";
import { createSubRouter } from "@/shared/create-app";

import { AppModel } from "./model";



export const app = createSubRouter({
	prefix: "",
	tags: ["App"],
})
	.use(AppModel)
	.get(
		"/",
		() => ({
			title: info.title,
			description: info.description,
			version: info.version,
		}),
		{
			response: "info",
			detail: {
				summary: "App Info",
				description: "Returns basic information about the application.",
			},
		},
	);
