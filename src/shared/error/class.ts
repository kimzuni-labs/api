import type { Details } from "./model";
import { getStatusMessage } from "./utils";



export interface AppErrorOptions {
	code?: string;
	status?: number;
	message?: string;
	details?: Details;
}

export type AppErrorArgs = Partial<
	| []
	| [number]
	| [string]
	| [number, string]
	| [AppErrorOptions]
>;



export class AppError extends Error {
	#code: string = "APP_ERROR";
	get code() {
		return this.#code;
	}

	readonly error: boolean;
	readonly status: number;
	readonly details: Details;

	constructor(...args: AppErrorArgs) {
		let opts: AppErrorOptions = {};
		for (const arg of args) {
			switch (typeof arg) {
				case "number":
					opts.status = arg;
					break;
				case "string":
					opts.message = arg;
					break;
				case "object":
					opts = arg;
					break;
			}
		}

		const code = opts.code ?? "APP_ERROR";
		const status = opts.status ?? 500;
		const message = opts.message?.trim() ?? getStatusMessage(status);
		const details = opts.details ?? null;

		super(message);
		this.#code = code;
		this.error = 400 <= status;
		this.status = status;
		this.details = details;

		Error.captureStackTrace(this, AppError);
	}

	setCode(code: string) {
		this.#code = code;
		return this;
	}

	toJSON() {
		return {
			error: this.error,
			code: this.code,
			status: this.status,
			message: this.message,
			details: this.details,
		};
	}
}
