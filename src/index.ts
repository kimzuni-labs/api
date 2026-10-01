import { env } from "@/config";
import { app } from "@/app";



app.listen({
	reusePort: true,
	development: env.NODE_ENV !== "production",
	port: env.PORT,
}, ({ url }) => {
	console.log(`🦊 Elysia is running at ${url.toString()}`);
});
