import { Elysia } from "elysia";



export const url = new Elysia({
	name: "plugin.url",
})
	.derive(({ request }) => {
		const proto = request.headers.get("x-forwarded-proto") ?? "http";
		const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");

		const url = new URL(request.url);
		url.protocol = proto;
		if (host) url.host = host;

		return {
			url,
		};
	})
	.as("scoped");
