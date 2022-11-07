import { config } from "dotenv";
config();
const { DB_URI, PORT } = process.env;
export const port = PORT || 8080;
export const dbUri = DB_URI;
export const prefix = "/api";
