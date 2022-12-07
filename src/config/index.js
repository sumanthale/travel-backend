import { config } from "dotenv";
config();
const { PORT } = process.env;
export const port = PORT || 8080;
export const dbUri =
  "mongodb+srv://admin:admin123@travel.zldvkug.mongodb.net/diary?retryWrites=true&w=majority";
export const prefix = "/api";
