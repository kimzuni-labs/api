import { openapi as base, type ElysiaOpenAPIConfig } from "@elysia/openapi";
import type { OpenAPIV3_1 } from "openapi-types";

import { app, constants } from "@/config";



export interface OpenAPIConfig<
	Enabled extends boolean = true,
	Path extends string = string,
> extends Pick<ElysiaOpenAPIConfig<Enabled, Path>, "enabled"> {
	isGlobal?: boolean;
	version?: string;
	tags?: OpenAPIV3_1.TagObject[];
}

export const openapi = <
	const Enabled extends boolean = true,
>({
	enabled,
	isGlobal = false,
	version = app.version,
	tags,
}: OpenAPIConfig<Enabled, typeof constants.API_DOCS_PATH> = {}) => {
	const excludePaths = [];
	if (isGlobal) {
		excludePaths.push(
			// Exclude all paths that versioned (e.g., /v1, /v2, etc.)
			new RegExp("^/v[0-9]+"),
		);
	} else {
		excludePaths.push(
			// Exclude all paths that do not start with the specified version
			new RegExp(`^(?!/v${parseInt(version)})`),
		);
	}

	return base({
		enabled,
		provider: null,
		path: constants.API_DOCS_PATH,
		specPath: constants.API_SPEC_PATH,
		exclude: {
			paths: excludePaths,
		},
		documentation: {
			tags: tags,
			info: {
				title: app.title,
				description: `${app.description}<br/><br/>(Select API version from the top-left dropdown)`,
				version: version,
			},
		},
	});
};
