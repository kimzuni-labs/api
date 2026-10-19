import { env, constants } from "@/config";
import { app } from "@/app";



app.listen({
	reusePort: true,
	development: env.NODE_ENV !== "production",
	port: env.PORT,
}, ({ url }) => {
	const router = app.routes;
	const docs = router
		.filter(x => x.path.endsWith(constants.API_SPEC_PATH))
		.map(x => {
			if (x.path === constants.API_SPEC_PATH) {
				return "global";
			}
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			return x.path.split("/")[1]!;
		});

	const maxLen = docs.reduce((acc, x) => Math.max(acc, x.length), 0);
	const urlStr = url.toString();
	console.log(`🦊 Elysia is running at ${urlStr}`);
	console.log("   Docs:");
	for (const doc of docs) {
		console.log(`   - ${doc.padEnd(maxLen)}: ${urlStr}docs#${doc}`);
	}
});
