import { openapi as base, type ElysiaOpenAPIConfig } from "@elysia/openapi";

import { app, constants } from "@/config";



export interface OpenAPIConfig<
	Enabled extends boolean = true,
	Path extends string = string,
> extends Pick<ElysiaOpenAPIConfig<Enabled, Path>, "enabled"> {
	version?: string;
}

export const openapi = <
	const Enabled extends boolean = true,
>({
	enabled,
	version,
}: OpenAPIConfig<Enabled, typeof constants.API_DOCS_PATH> = {}) => base({
	enabled,
	provider: null,
	path: constants.API_DOCS_PATH,
	specPath: constants.API_SPEC_PATH,
	documentation: {
		info: {
			title: app.title,
			description: app.description,
			version: version ?? app.version,
		},
	},
});
