import { Elysia, type ElysiaConfig } from "elysia";

import { constants } from "@/config";
import { errorHandler } from "@/shared/error";
import * as plugins from "@/plugins";



export interface CreateAppOptions<
	Prefix extends string = "",
> extends ElysiaConfig<Prefix> {
}



const createBaseApp = <
	Prefix extends string = "",
>(opts: CreateAppOptions<Prefix> = {}) => new Elysia({
	strictPath: constants.STRICT_PATH,
	...opts,
})
	.use(plugins.i18n());



export const createApp = <
	Prefix extends string = "",
>(opts: CreateAppOptions<Prefix> = {}) => createBaseApp(opts)
	.use(errorHandler);

export const createRouter = <
	Prefix extends string = "",
>(opts: CreateAppOptions<Prefix> = {}) => createBaseApp(opts)
	.use(errorHandler);

export const createSubRouter = <
	Prefix extends string = "",
>(opts: CreateAppOptions<Prefix> = {}) => createBaseApp(opts);
