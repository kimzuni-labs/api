import { Elysia, t } from "elysia";



export type Info = typeof info.static;
export const info = t.Object({
	title: t.String(),
	description: t.String(),
	version: t.String(),
}, {
	title: "Application Info",
});



export const AppModel = new Elysia({
	name: "app.model",
})
	.model({
		info,
	});

export const models = AppModel.models;
