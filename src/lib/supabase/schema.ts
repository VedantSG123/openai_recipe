import { pgTable, timestamp, uuid, text } from "drizzle-orm/pg-core"

export const chats = pgTable("chats", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "string",
  })
    .defaultNow()
    .notNull(),
  chatOwner: uuid("chat_owner").notNull(),
  responseType: text("response_type"),
  ingredients: text("ingredients"),
  response: text("response"),
})
