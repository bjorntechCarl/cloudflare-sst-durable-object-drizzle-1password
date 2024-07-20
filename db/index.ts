import { drizzle } from "drizzle-orm/d1";

export const database = (d1database : D1Database) => {
  return drizzle(d1database);
}

