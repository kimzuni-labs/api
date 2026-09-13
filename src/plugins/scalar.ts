import { Elysia } from "elysia";

import { app, constants } from "@/config";



const VERSION = "1.68";
const CDN = `https://cdn.jsdelivr.net/npm/@scalar/api-reference@${VERSION}`;



interface ScalarOptions {
	title?: string,
	description?: string,
	config?: Record<string, unknown>,
}



const getHTML = ({
	title,
	description,
	config,
}: Required<ScalarOptions>) => `
<!doctype html>
<html>
	<head>
		<title>${title}</title>
		<meta name="description" content="${description}" />
		<meta name="og:description" content="${description}" />
		<meta charset="utf-8" />
		<meta
			name="viewport"
			content="width=device-width, initial-scale=1" />
	</head>

	<body>
		<div id="app"></div>

		<!-- Load the Script -->
		<script src="${CDN}"></script>

		<!-- Initialize the Scalar API Reference -->
		<script>
			Scalar.createApiReference('#app', ${JSON.stringify(config)})
		</script>
	</body>
</html>
`;



export const scalar = ({
	title,
	description,
	config,
}: ScalarOptions = {}) => {
	const plugin = new Elysia({
		name: "scalar",
	});

	plugin.get(
		constants.API_DOCS_PATH,
		() => new Response(
			getHTML({
				title: title ?? app.title,
				description: description ?? app.description,
				config: config ?? {},
			}),
			{
				headers: { "content-type": "text/html; charset=utf8" },
			},
		),
		{ detail: { hide: true } },
	);

	return plugin;
};
