const requireEnv = (key: string): string => {
	const value = process.env[key]?.trim();
	if (!value) {
		console.error(`Environment variable ${key} is not set.`);
		process.exit(1);
	}
	return value;
};



export const NODE_ENV = process.env.NODE_ENV?.trim().toLowerCase() ?? "development";

export const PORT = parseInt(process.env.PORT?.trim() ?? "") || 3000;



export const MAIL_TO = requireEnv("MAIL_TO");
export const MAIL_FROM = requireEnv("MAIL_FROM");
export const SMTP_HOST = requireEnv("SMTP_HOST");
export const SMTP_PORT = parseInt(process.env.SMTP_PORT?.trim() ?? "") || 465;
export const SMTP_USER = requireEnv("SMTP_USER");
export const SMTP_PASS = requireEnv("SMTP_PASS");
