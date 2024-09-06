import { mutation } from "../_generated/server";
import { v } from "convex/values";

export const createMutation = mutation({
  args: {
    orgId: v.string(),
    title: v.string(),
    image: v.string(),
  },
  handler: async (ctx: any, args: any) => {
    const userIdentity = await ctx.auth.getUserIdentity();

    if (!userIdentity) {
      throw new Error("unauthorized");
    }

    const boards = await ctx.db.insert("boards", {
      title: args.title,
      orgId: args.orgId,
      authorId: userIdentity.subject,
      authorName: userIdentity.name!,
      imageUrl: args.image,
    });
    return boards;
  },
});

export const updateMutation = mutation({
  args: {
    id: v.id("boards"),
    title: v.string(),
    image: v.string(),
  },
  handler: async (ctx: any, args: any) => {
    try {
      const userIdentity = await ctx.auth.getUserIdentity();

      if (!userIdentity) {
        throw new Error("Unauthorized");
      }

      console.log(`Updating board with id: ${args.id}`);

      const result = await ctx.db.patch(args.id, {
        title: args.title,
        imageUrl: args.image,
      });

      console.log("Update result:", result);
      return result;
    } catch (error) {
      console.error("Error in updateMutation:", error);
      throw new Error("Update failed");
    }
  },
});
