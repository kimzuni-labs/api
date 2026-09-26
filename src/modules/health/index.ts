import { createSubRouter } from "@/shared/create-app";

import { HealthModel } from "./model";
import { HealthService } from "./service";



export const health = createSubRouter({
	prefix: "/health",
	tags: ["Health"],
})
	.use(HealthModel)
	.get(
		"",
		() => HealthService.check(),
		{
			response: "healthCheck",
			detail: {
				summary: "Health Check",
				description: "The current operational status of the API server",
			},
		},
	);
