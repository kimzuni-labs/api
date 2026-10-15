import { spyOn } from "bun:test";
import type { AnyElysia } from "elysia";
import { treaty, type Treaty } from "@elysia/eden";

import { app } from "@/app";



export {
	app,
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



export const api = getAPI(app);



export const consoleErrorSpy = async (
	levels: ("error" | "warn" | "info" | "debug" | "trace" | "log")[],
	cb: () => unknown,
) => {
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	const spys = levels.map(level => spyOn(console, level).mockImplementation(() => {}));
	try {
		await cb();
	} finally {
		spys.map(spy => spy.mockRestore());
	}
};
