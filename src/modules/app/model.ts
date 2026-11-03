import { Elysia, t, type UnwrapSchema } from "elysia";



export type Info = UnwrapSchema<typeof info>;
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
