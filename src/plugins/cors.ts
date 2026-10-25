import { cors as base } from "@elysia/cors";



export const cors = base({
	credentials: false,
	methods: ["OPTIONS", "GET", "POST", "PATCH", "PUT", "DELETE", "HEAD"],
});
