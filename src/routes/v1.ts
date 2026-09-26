import { createRouter } from "@/shared/create-app";
import * as plugins from "@/plugins";
import { contact } from "@/modules";



export const getV1 = () => createRouter({ prefix: "/v1" })
	.use(plugins.openapi({
		tags: [
			{
				name: "Contact",
				description: "Contact API",
			},
		],
	}))
	.use(contact.v1);
