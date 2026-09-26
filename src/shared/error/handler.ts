import { Elysia } from "elysia";
import type { ValidationError, TSchema } from "elysia";

import { env } from "@/config";
import * as plugins from "@/plugins";

import { AppError, ErrorModel, type ValidationErrorResponse } from "@/shared/error";



type ValueErrorWithSummary = ValidationError["all"][number];
type ErrorType = Extract<ValueErrorWithSummary, { path: string }> & { schema: { anyOf?: TSchema[] } };

const parseError = (
	error: ErrorType,
	t: (key: string) => string,
) => {
	const data: ValidationErrorResponse["details"]["errors"][number] = {
		key: null,
		message: error.summary && t(error.summary),
	};

	if ("path" in error) {
		data.key = error.path.slice(1).trim() || null;
		data.message = error.schema.error !== undefined && typeof error.schema.error !== "function" ? t(String(error.schema.error)) : error.summary && t(error.summary);
		data.pattern = typeof error.schema.pattern === "string" ? error.schema.pattern : undefined;
		data.enum = Array.isArray(error.schema.enum) ? (error.schema.enum as (string | number)[]) : undefined;
		data.minimum = typeof error.schema.minimum === "number" ? error.schema.minimum : undefined;
		data.maximum = typeof error.schema.maximum === "number" ? error.schema.maximum : undefined;
		data.minLength = typeof error.schema.minLength === "number" ? error.schema.minLength : undefined;
		data.maxLength = typeof error.schema.maxLength === "number" ? error.schema.maxLength : undefined;

		if (error.schema.anyOf) {
			const anyOf = error.schema.anyOf;
			const msgChange = typeof data.message === "string" && data.message.startsWith("Value should be one of");

			data.union = [];
			for (const { type, title, properties } of anyOf) {
				if (title && msgChange && typeof type === "string") {
					data.message = data.message?.replace(type, title);
				}
				data.union.push({
					title: title ?? (typeof type === "string" ? type : "unknown"),
					properties: properties,
				});
			}
		}
	}

	return data;
};

const parseErrors = (
	errors: ValueErrorWithSummary[],
	t: (key: string) => string,
) => errors.reduce<ValidationErrorResponse["details"]["errors"]>((acc, cur) => {
	if (cur.summary !== undefined && "path" in cur) {
		acc.push(parseError(cur, t));
	}
	return acc;
}, []);



export const errorHandler = new Elysia({ name: "plugin.errorHandler" })
	.error({
		APP_ERROR: AppError,
	})
	.use(ErrorModel)
	.use(plugins.i18n())
	.onError({ as: "global" }, ({ code, error, set, t }) => {
		const dt = (key: string) => t(key as unknown as Parameters<typeof t>[0]);

		let err: Readonly<AppError>;
		let errors: ValidationErrorResponse["details"]["errors"] | undefined;
		switch (code) {
			case "APP_ERROR":
				err = error;
				break;
			case "NOT_FOUND":
				err = new AppError(404).setCode("NOT_FOUND_ERROR");
				break;
			case "VALIDATION":
				errors = parseErrors(error.all, dt);
				err = new AppError({
					status: error.status,
					message: dt(errors[0]?.message ?? error.messageValue?.message ?? error.message),
					details: {
						location: error.type as ValidationErrorResponse["details"]["location"],
						errors,
					} satisfies ValidationErrorResponse["details"],
				});
				break;
			case "PARSE":
			case "INVALID_FILE_TYPE":
			case "INVALID_COOKIE_SIGNATURE":
			case "INTERNAL_SERVER_ERROR":
				err = new AppError(error.status, error.message);
				break;
			case "UNKNOWN":
				err = new AppError(500, error.message);
				break;
			default:
				err = new AppError(code);
				break;
		}
		if (typeof code !== "number") {
			err.setCode(code);
		}
		if (!err.code.endsWith("ERROR")) {
			err.setCode(`${err.code.toUpperCase().replace(/ /g, "_")}_ERROR`);
		}

		if (500 <= err.status && env.NODE_ENV !== "test") {
			console.error(error);
		}

		set.status = err.status;
		return err.toJSON();
	});
