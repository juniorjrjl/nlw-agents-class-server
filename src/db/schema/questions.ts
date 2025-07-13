import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { rooms } from "./rooms.ts";

export const questions = pgTable('questions', {
    id: uuid().primaryKey().defaultRandom(),
    description: text().notNull(),
    awnser: text(),
    createdAt: timestamp().defaultNow().notNull(),
    roomId: uuid().references(() => rooms.id).notNull()
})