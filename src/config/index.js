import { config } from "dotenv";
config();
const {
  DB_URI,
  PORT,
  JWT_SECRET_KEY,
  REFRESH_TOKEN_SECRET_KEY,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_REGION,
  BUCKET_NAME,
} = process.env;
export const port = PORT || 8080;
export const dbUri = DB_URI;
export const prefix = "/api";
