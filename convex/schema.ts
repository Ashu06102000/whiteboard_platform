import { v } from "convex/values";
import { defineSchema, defineTable } from "convex/server";

export default defineSchema({
  boards: defineTable({
    orgId: v.string(),
    title: v.string(),
    authorId: v.string(),
    authorName: v.string(),
    imageUrl: v.string(),
    updatedAt: v.number(),
  })
    .index("by_org", ["orgId"])
    .searchIndex("search_title", {
      searchField: "title",
      filterFields: ["orgId"],
    }),
  userFavorites: defineTable({
    orgId: v.string(),
    userId: v.string(),
    boardId: v.id("boards"),
  })
    .index("by_board", ["boardId"])
    .index("by_user_org", ["orgId", "userId"])
    .index("by_user_board", ["boardId", "userId"])
    .index("by_user_board_org", ["userId", "boardId", "orgId"]),
});
