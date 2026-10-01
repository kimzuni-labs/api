import { t } from "elysia";



export const Integer: typeof t.Number = (opts) => t.Number({
	title: "Integer",
	examples: [1],
	...opts,
});
