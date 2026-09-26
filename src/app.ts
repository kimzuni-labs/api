import { createApp } from "@/shared/create-app";
import * as plugins from "@/plugins";

import * as routes from "@/routes";



export const unifiedApp = createApp()
	.use(routes.getGlobal())
	.use(routes.getV1());



export const app = createApp()
	.use(plugins.scalar({
		config: {
			// https://scalar.com/products/api-references/configuration#properties
			version: "1.68",
			theme: "default",
			persistAuth: true,
			showOperationId: false,
			defaultOpenFirstTag: false,
			defaultOpenAllTags: false,
			orderRequiredPropertiesFirst: false,
			defaultRequestBodyView: "form",
			orderSchemaPropertiesBy: "preserve",
			agent: {
				disabled: true,
			},
			sources: [
				{
					slug: "global",
					title: "Global",
					url: "/openapi.json",
				},
				{
					slug: "v1",
					title: "v1",
					url: "/v1/openapi.json",
				},
			],
		},
	}))
	.all("*", (ctx) => routes.getGlobal().handle(ctx.request))
	.all("/v1*", (ctx) => routes.getV1().handle(ctx.request));
