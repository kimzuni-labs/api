export const NODE_ENV = process.env.NODE_ENV?.trim().toLowerCase() ?? "development";

export const PORT = parseInt(process.env.PORT?.trim() ?? "") || 3000;
