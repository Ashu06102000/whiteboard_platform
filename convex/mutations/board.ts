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
      updatedAt: Date.now(),
    });
    return boards;
  },
});

export const updateMutation = mutation({
  args: {
    id: v.id("boards"),
    title: v.optional(v.string()),
    image: v.optional(v.string()),
  },
  handler: async (ctx: any, args: any) => {
    try {
      const userIdentity = await ctx.auth.getUserIdentity();

      if (!userIdentity) {
        throw new Error("Unauthorized");
      }

      const updateFields: any = {};
      if (args.title) {
        updateFields.title = args.title;
      }
      if (args.image) {
        updateFields.imageUrl = args.image;
      }
      updateFields.updatedAt = Date.now();
      if (Object.keys(updateFields).length === 0) {
        throw new Error("No fields to update");
      }

      const result = await ctx.db.patch(args.id, updateFields);

      return result;
    } catch (error) {
      console.error("Error in updateMutation:", error);
      throw new Error("Update failed");
    }
  },
});
