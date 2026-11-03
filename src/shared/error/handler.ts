import { Elysia, NotFound, ParseError, ValidationError, InvalidCookie, InternalServerError, type ElysiaError } from "elysia";

import * as plugins from "@/plugins";

import { ErrorModel } from "@/shared/error";



function toResponse(t: (key: string) => string, error: ElysiaError) {
	const msg = t(error.message);
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
	.onError(NotFound, ({ error, dotT }) => {
		return toResponse(dotT, error);
	})
	.onError(ParseError, ({ error, dotT }) => {
		return toResponse(dotT, error);
	})
	.onError(ValidationError, ({ error, dotT }) => {
		const res = toResponse(dotT, error);
		return {
			...res,
			...error.detail(dotT(res.message)),
		};
	})
	.onError(InvalidCookie, ({ error, dotT }) => {
		return toResponse(dotT, error);
	})
	.onError(InternalServerError, ({ error, dotT }) => {
		console.error("============= ERROR =============");
		console.error(error);
		console.error("============= ERROR END =============");
		return toResponse(dotT, error);
	})
	.as("plugin");
