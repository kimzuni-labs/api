import { Elysia, t, type UnwrapSchema } from "elysia";

import * as schemas from "@/schemas";



export type HealthCheck = UnwrapSchema<typeof healthCheck>;
export const healthCheck = t.Object({
	healthy: t.Literal(true),
	version: t.String(),
	uptime: t.Number(),
	timestamp: schemas.Integer(),
}, {
	title: "Health Check",
});



export const HealthModel = new Elysia({
	name: "v1.health.model",
})
	.model({
		healthCheck,
	});

export const models = HealthModel.models;
