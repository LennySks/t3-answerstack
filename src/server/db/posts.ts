// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  index,
  integer,
  pgEnum,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `answerstack_${name}`);
export const rolesEnum = pgEnum("roles", ["admin", "moderator", "user"]);
export const threadVisibilityEnum = pgEnum("thread_visibility", [
  "public",
  "private",
  "hidden",
  "archived",
]);

export const posts = createTable(
  "posts",
  {
    id: serial("post_id").primaryKey(),
    threadId: serial("thread_id").references(() => thread.id),
    title: varchar("title", { length: 256 }).notNull(),
    content: varchar("content", { length: 256 }).notNull(),
    image: varchar("image", { length: 256 }),
    authorId: integer("author_id").references(() => users.id),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (example) => ({
    titleIndex: index("title_idx").on(example.title),
  }),
);

export const thread = createTable("threads", {
  id: serial("thread_id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  description: varchar("description", { length: 256 }).notNull(),
  image: varchar("image", { length: 256 }),
  banner: varchar("banner", { length: 256 }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  createdBy: serial("created_by").notNull(),
});

export const threadMembers = createTable("thread_members", {
  id: serial("thread_member_id").primaryKey(),
  threadId: serial("thread_id").references(() => thread.id),
  userId: serial("user_id").references(() => users.id),
  role: rolesEnum("role").default("user").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const users = createTable("users", {
  id: serial("user_id").primaryKey(),
  username: varchar("username", { length: 256 }).notNull(),
  email: varchar("email", { length: 256 }).notNull(),
  password: varchar("password", { length: 256 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  profilePicture: varchar("profile_picture", { length: 256 }),
});

export const comments = createTable(
  "comments",
  {
    id: serial("comment_id").primaryKey(),
    postId: serial("post_id").references(() => posts.id),
    authorId: serial("user_id").references(() => users.id),
    parentCommentId: serial("parent_comment_id").notNull(),
    // vote count
    content: varchar("content", { length: 256 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (example) => ({
    contentIndex: index("content_idx").on(example.content),
  }),
);

export const postVotes = createTable("post_votes", {
  id: serial("post_vote_id").primaryKey(),
  postId: serial("post_id").notNull(),
  userId: serial("user_id").notNull(),
  vote: varchar("vote", { length: 256 }).notNull(),
});

export const commentVotes = createTable("comment_votes", {
  id: serial("comment_vote_id").primaryKey(),
  commentId: serial("comment_id").notNull(),
  userId: serial("user_id").notNull(),
  vote: varchar("vote", { length: 256 }).notNull(),
});
