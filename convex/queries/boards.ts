import { v } from "convex/values";
import { query } from "../_generated/server";

export const getBoards = query({
  args: {
    orgId: v.string(),
  },

  handler: async (ctx: any, args: any) => {
    const boards = await ctx.db
      .query("boards")
      .filter((q: any) => q.eq(q.field("orgId"), args.orgId))
      .collect();

    boards.sort(
      (a: any, b: any) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    return boards;
  },
});

export const getBoardsById = query({
  args: {
    id: v.id("boards"),
  },
  handler: async (ctx, args) => {
    const board = await ctx.db.get(args.id);

    return board;
  },
});
