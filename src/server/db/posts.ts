// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations, sql } from "drizzle-orm";
import { index, integer, pgEnum, pgTableCreator, primaryKey, serial, timestamp, varchar } from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `answerstack_${name}`);
export const rolesEnum = pgEnum("roles", ["Admin", "Moderator", "User"]);
export const threadVisibilityEnum = pgEnum("thread_visibility", [
  "Public",
  "Private",
  "Hidden",
  "Archived",
]);

export const threads = createTable("threads", {
  id: serial("thread_id").primaryKey(),
  name: varchar("name", { length: 20 }).notNull(),
  description: varchar("description", { length: 500 }).notNull(),
  image: varchar("thread_image", { length: 1024 }),
  banner: varchar("thread_banner", { length: 1024 }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  createdBy: varchar("created_by", { length: 255 }),
  visibility: threadVisibilityEnum("visibility").notNull(),
});

export const flairs = createTable("flairs", {
  id: serial("flair_id").primaryKey(),
  threadId: serial("thread_id").references(() => threads.id),
  name: varchar("name", { length: 20 }).notNull(),
  color: varchar("color", { length: 7 }).notNull(),
  description: varchar("description", { length: 100 }),
});

export const postFlairs = createTable(
  "post_flairs",
  {
    postId: serial("post_id").references(() => posts.id),
    flairId: serial("flair_id").references(() => flairs.id),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.postId, table.flairId] }),
    };
  },
);

export const users = createTable("users", {
  id: varchar("user_id", { length: 255 }).primaryKey(),
  username: varchar("username", { length: 16 }),
  email: varchar("email", { length: 80 }).unique().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  profilePicture: varchar("user_profile_picture", { length: 1024 }),
});

export const threadMembers = createTable("thread_members", {
  id: serial("thread_member_id").primaryKey(),
  threadId: serial("thread_id").references(() => threads.id),
  userId: varchar("user_id").references(() => users.id),
  role: rolesEnum("role").default("User").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const posts = createTable(
  "posts",
  {
    id: serial("post_id").primaryKey(),
    threadId: serial("thread_id").references(() => threads.id),
    title: varchar("title", { length: 256 }).notNull(),
    content: varchar("content", { length: 40000 }).notNull(),
    image: varchar("image", { length: 256 }),
    authorId: varchar("author_id").references(() => users.id),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (example) => ({
    titleIndex: index("title_idx").on(example.title),
    threadIndex: index("thread_idx").on(example.threadId),
  }),
);

export const comments = createTable(
  "comments",
  {
    id: serial("comment_id").primaryKey(),
    postId: serial("post_id")
      .references(() => posts.id)
      .notNull(),
    authorId: varchar("user_id")
      .references(() => users.id)
      .notNull(),
    parentCommentId: serial("parent_comment_id"),
    // get the vote count from commentVotes table
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
    postIndex: index("post_idx").on(example.postId),
  }),
);

export const postVotes = createTable("post_votes", {
  id: serial("post_vote_id").primaryKey(),
  postId: serial("post_id").references(() => posts.id),
  userId: varchar("user_id").references(() => users.id),
  vote: integer("vote").notNull(),
});

export const commentVotes = createTable("comment_votes", {
  id: serial("comment_vote_id").primaryKey(),
  commentId: serial("comment_id").references(() => comments.id),
  userId: varchar("user_id").references(() => users.id),
  vote: integer("vote").notNull(),
});

export const postRelations = relations(posts, ({ one, many }) => ({
  author: one(users, {
    fields: [posts.authorId],
    references: [users.id],
  }),
  thread: one(threads, {
    fields: [posts.threadId],
    references: [threads.id],
  }),
  flairs: many(postFlairs),
}));

export const postFlairsRelations = relations(postFlairs, ({ one }) => ({
  post: one(posts, {
    fields: [postFlairs.postId],
    references: [posts.id],
  }),
  flair: one(flairs, {
    fields: [postFlairs.flairId],
    references: [flairs.id],
  }),
}));

export const commentRelations = relations(comments, ({ one }) => ({
  parentComment: one(comments, {
    fields: [comments.parentCommentId],
    references: [comments.id],
  }),
}));

export const flairRelations = relations(flairs, ({ one }) => ({
  thread: one(threads, {
    fields: [flairs.threadId],
    references: [threads.id],
  }),
}));

export const userRelations = relations(users, ({ many }) => ({
  posts: many(posts),
  threadMembers: many(threadMembers),
}));

export const threadRelations = relations(threads, ({ many }) => ({
  threadMembers: many(threadMembers),
  posts: many(posts),
  flairs: many(flairs),
}));

export const threadMemberRelations = relations(threadMembers, ({ one }) => ({
  thread: one(threads, {
    fields: [threadMembers.threadId],
    references: [threads.id],
  }),
  user: one(users, {
    fields: [threadMembers.userId],
    references: [users.id],
  }),
}));
