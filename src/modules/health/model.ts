import { Elysia, t } from "elysia";

import * as schemas from "@/schemas";



export type HealthCheck = typeof healthCheck.static;
export const healthCheck = t.Object({
	healthy: t.Literal(true),
	version: t.String(),
	uptime: t.Number(),
	timestamp: schemas.Integer(),
}, {
	title: "Health Check",
});



export const HealthModel = new Elysia({
	name: "health.model",
})
	.model({
		healthCheck,
	});

export const models = HealthModel.models;
