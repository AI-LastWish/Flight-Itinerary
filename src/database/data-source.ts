import * as dotenv from "dotenv";
import { DataSource } from "typeorm";
import { Itinerary } from "./entities/Itinerary";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "127.0.0.1",
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USERNAME || "user",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_DATABASE || "bookie",
  logging: ["query"],
  synchronize: false,
  entities: [Itinerary],
  subscribers: [],
  migrations: ["src/database/migrations/*.ts"],
});
