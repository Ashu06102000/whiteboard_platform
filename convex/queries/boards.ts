import { v } from "convex/values";
import { query } from "../_generated/server";

export const getBoards = query({
  args: {
    orgId: v.string(),
  },

  handler: async (ctx: any, args: any) => {
    const boards = await ctx.db
      .query("boards", {
        filter: { orgId: args.orgId },
        orderBy: [{ field: "createdAt", direction: "desc" }],
      })
      .collect();

    return boards;
  },
});
