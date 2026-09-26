import { openapi as base, type ElysiaOpenAPIConfig } from "@elysia/openapi";
import type { OpenAPIV3_1 } from "openapi-types";

import { app, constants } from "@/config";



export interface OpenAPIConfig<
	Enabled extends boolean = true,
	Path extends string = string,
> extends Pick<ElysiaOpenAPIConfig<Enabled, Path>, "enabled"> {
	version?: string;
	tags?: OpenAPIV3_1.TagObject[];
}

export const openapi = <
	const Enabled extends boolean = true,
>({
	enabled,
	version,
	tags,
}: OpenAPIConfig<Enabled, typeof constants.API_DOCS_PATH> = {}) => base({
	enabled,
	provider: null,
	path: constants.API_DOCS_PATH,
	specPath: constants.API_SPEC_PATH,
	documentation: {
		tags: tags,
		info: {
			title: app.title,
			description: app.description,
			version: version ?? app.version,
		},
	},
});
