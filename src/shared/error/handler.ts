import { Elysia, NotFound, ParseError, ValidationError, InvalidCookie, InternalServerError, type ElysiaError } from "elysia";
import type { TFunction } from "i18next";

import * as plugins from "@/plugins";

import { ErrorModel } from "@/shared/error";



function toResponse(t: TFunction, error: ElysiaError) {
	const msg = t(error.message as unknown as Parameters<typeof t>[0]);
	return {
		error: true,
		code: error.code,
		status: error.status,
		message: msg,
	};
};

export const errorHandler = new Elysia({ name: "plugin.errorHandler" })
	.use(ErrorModel)
	.use(plugins.i18n)
	.onError(NotFound, ({ error, t }) => {
		return toResponse(t, error);
	})
	.onError(ParseError, ({ error, t }) => {
		return toResponse(t, error);
	})
	.onError(ValidationError, ({ error, t }) => {
		const res = toResponse(t, error);
		return {
			...res,
			...error.detail(res.message),
		};
	})
	.onError(InvalidCookie, ({ error, t }) => {
		return toResponse(t, error);
	})
	.onError(InternalServerError, ({ error, t }) => {
		console.error("============= ERROR =============");
		console.error(error);
		console.error("============= ERROR END =============");
		return toResponse(t, error);
	})
	.as("plugin");
