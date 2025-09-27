import { pgTable, serial, varchar, text } from "drizzle-orm/pg-core"

export const blogPosts = pgTable("blog_db", {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    content: text("content").notNull()
} )