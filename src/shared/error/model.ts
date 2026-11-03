import { Elysia, t, type UnwrapSchema } from "elysia";

import { createErrorResponse } from "./utils";



export type Details = UnwrapSchema<typeof details>;
export const details = t.Nullable(t.Union([
	t.Array(t.Any()),
	t.Record(t.String(), t.Any()),
], {
	default: null,
	title: "Error Details",
	description: "Optional detailed information about the error, which can be an array or an object.",
}));



export type ErrorResponse = UnwrapSchema<typeof errorResponse>;
export const errorResponse = createErrorResponse(
	t.Object({
		details,
	}),
	{
		title: "Error Response",
		description: "All error responses follow this standardized structure.",
	},
);



export const ErrorModel = new Elysia({
	name: "email.model",
})
	.model({
		errorResponse,
	});

export const models = ErrorModel.models;
