import { Elysia, t } from "elysia";

import { createErrorResponse } from "./utils";



export type Details = typeof details.static;
export const details = t.Nullable(t.Union([
	t.Array(t.Any()),
	t.Record(t.String(), t.Any()),
], {
	default: null,
	title: "Error Details",
	description: "Optional detailed information about the error, which can be an array or an object.",
}));



export type ErrorResponse = typeof errorResponse.static;
export const errorResponse = createErrorResponse(
	t.Object({
		details,
	}),
	{
		title: "Error Response",
		description: "All error responses follow this standardized structure.",
	},
);



export type ValidationErrorResponse = typeof validationErrorResponse.static;
export const validationErrorResponse = createErrorResponse(
	t.Object({
		details: t.Object({
			location: t.UnionEnum(["body", "query", "params", "headers"]),
			errors: t.Array(t.Object({
				key: t.Nullable(t.String()),
				message: t.Optional(t.String()),
				pattern: t.Optional(t.String()),
				enum: t.Optional(t.Array(t.Union([
					t.String(),
					t.Number(),
				], {
					title: "Enum Value",
				}))),
				minimum: t.Optional(t.Number()),
				maximum: t.Optional(t.Number()),
				minLength: t.Optional(t.Number()),
				maxLength: t.Optional(t.Number()),
				union: t.Optional(t.Array(t.Object({
					title: t.String(),
					properties: t.Optional(t.Unknown({ description: "TypeBox TObject.properties" })),
				}, {
					title: "Model",
				}))),
			})),
		}, {
			title: "Validation Error Details",
			description: "Detailed information about the validation error.",
		}),
	}),
	{
		title: "Validation Error Response",
		description: "All validation error responses follow this standardized structure.",
	},
);



export const ErrorModel = new Elysia({
	name: "email.model",
})
	.model({
		errorResponse,
		validationErrorResponse,
	});

export const models = ErrorModel.models;
