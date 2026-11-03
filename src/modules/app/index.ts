import { Elysia } from "elysia";

import { app as info } from "@/config";
import * as plugins from "@/plugins";

import { AppModel } from "./model";



export const app = new Elysia({
	prefix: "",
	tags: ["App"],
})
	.use(plugins.i18n)
	.use(AppModel)
	.get(
		"/",
		{
			response: "info",
			detail: {
				summary: "App Info",
				description: "Returns basic information about the application.",
			},
		},
		({ t }) => ({
			title: t($ => $.app.title),
			description: t($ => $.app.description),
			version: info.version,
		}),
	);
