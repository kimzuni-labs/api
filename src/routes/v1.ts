import { createRouter } from "@/shared/create-app";
import { contact } from "@/modules";



export const getV1 = () => createRouter({ prefix: "/v1" })
	.use(contact.v1);
