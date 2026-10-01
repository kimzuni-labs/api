import { app } from "@/config";

import * as model from "./model";



export const HealthService = {
	check(): model.HealthCheck {
		return ({
			healthy: true,
			version: app.version,
			uptime: process.uptime(),
			timestamp: Date.now(),
		});
	},
};
