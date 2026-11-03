import { STATUS_CODES } from "node:http";
import { t } from "elysia";
import type { TObject, TProperties, TObjectOptions } from "typebox";



export const getStatusMessage = (status: number | string) => STATUS_CODES[status] ?? "UNKNOWN";



const baseErrorResponse = t.Object({
	error: t.Literal(true),
	code: t.String({ description: "A unique error code identifying the type of error." }),
	status: t.Number({ description: "HTTP status code representing the type of error." }),
	message: t.String({ description: "Human-readable error message." }),
}, {
	title: "Error Response",
	description: "All error responses follow this standardized structure.",
	additionalProperties: true,
});

export const createErrorResponse = <
	T extends TProperties,
>(
	obj: TObject<T>,
	opts?: TObjectOptions,
) => t.Object({
	...baseErrorResponse.properties,
	...obj.properties,
}, {
	additionalProperties: true,
	...opts,
});
