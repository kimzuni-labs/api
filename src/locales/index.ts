export * from "./types";
import { en } from "./en";
import { ko } from "./ko";



export const DEFAULT_NS = "translation";

export const ENABLE_SELECTOR = true;

export const languages = ["en", "ko"];

export const resources = {
	en: { translation: en },
	ko: { translation: ko },
};
