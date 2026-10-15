import { Elysia } from "elysia";

import { constants } from "@/config";
import * as plugins from "@/plugins";
import { errorHandler } from "@/shared/error";

import * as routes from "@/routes";



export const app = new Elysia({
	strictPath: constants.STRICT_PATH,
})
	.use(errorHandler)
	.use(plugins.i18n)
	.use(plugins.scalar({
		config: {
			// https://scalar.com/products/api-references/configuration#properties
			version: "1.68",
			theme: "default",
			hideModels: true,
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
	.use(routes.global)
	.use(routes.v1);
