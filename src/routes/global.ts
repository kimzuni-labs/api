import { createRouter } from "@/shared/create-app";
import { app, health } from "@/modules";



export const getGlobal = () => createRouter()
	.use(app)
	.use(health);
