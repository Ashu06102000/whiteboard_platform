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

export const deleteMutation = mutation({
  args: {
    id: v.id("boards"),
  },
  handler: async (ctx: any, args: any) => {
    try {
      const userIdentity = await ctx.auth.getUserIdentity();

      if (!userIdentity) {
        throw new Error("Unauthorized");
      }

      const board = await ctx.db.get(args.id);

      if (board?.authorId !== userIdentity.subject) {
        throw new Error("Unauthorized to delete this board");
      }

      await ctx.db.delete(args.id);

      return { deletedId: args.id };
    } catch (error) {
      console.error("Error in deleteMutation:", error);
      throw new Error("Delete failed");
    }
  },
});
export const addFavoriteBoard = mutation({
  args: {
    id: v.id("boards"),
    orgId: v.string(),
  },
  handler: async (ctx: any, args: any) => {
    console.log("hi");
    const userIdentity = await ctx.auth.getUserIdentity();
    if (!userIdentity) {
      throw new Error("Unauthorized");
    }
    const board = await ctx.db.get(args.id);

    if (!board) {
      throw new Error("Board not found");
    }

    const userId = userIdentity.subject;
    console.log(userId, "iff");
    const existFavorites = await ctx.db
      .query("userFavorites")
      .withIndex("by_user_board_org", (q: any) =>
        q.eq("userId", userId).eq("boardId", board._id).eq("orgId", args.orgId)
      )
      .unique();

    console.log(existFavorites, "existFavorites");
    console.log("hello");
    if (existFavorites) {
      throw new Error("Favorites not found");
    }

    await ctx.db.insert("userFavorites", {
      userId,
      boardId: board._id,
      orgId: args.orgId,
    });
    return board;
  },
});

export const unFavoriteBoard = mutation({
  args: {
    id: v.id("boards"),
  },
  handler: async (ctx: any, args: any) => {
    const userIdentity = await ctx.auth.getUserIdentity();
    if (!userIdentity) {
      throw new Error("Unauthorized");
    }
    const board = await ctx.db.get(args.id);

    if (!board) {
      throw new Error("favorite board not found");
    }

    const userId = userIdentity.subject;

    const existFavorites = await ctx.db
      .query("userFavorites")
      .withIndex("by_user_board", (q: any) =>
        q.eq("userId", userId).eq("boardId", board._id)
      )
      .unique();
    if (!existFavorites) {
      throw new Error("Favorites not found");
    }

    await ctx.db.delete(existFavorites._id);
  },
});
