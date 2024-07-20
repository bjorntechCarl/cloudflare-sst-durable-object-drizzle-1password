import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const notes = sqliteTable('notes', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  content: text('content').notNull()
});