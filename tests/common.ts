import type { AnyElysia } from "elysia";
import { treaty, type Treaty } from "@elysia/eden";

import { app, unifiedApp } from "@/app";



export {
	app,
	unifiedApp,
};



export const getAPI = <
	App extends AnyElysia,
	Head extends {} = {},
>(
	app: App,
	config?: Treaty.Config<Head>,
) => treaty(
	app,
	config,
);



export const api = getAPI(unifiedApp);
