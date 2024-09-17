import { v } from "convex/values";
import { query } from "../_generated/server";
import { getAllOrThrow } from "convex-helpers/server/relationships";
export const getBoards = query({
  args: {
    orgId: v.string(),
    search: v.optional(v.string()),
    favorites: v.optional(v.string()),
  },

  handler: async (ctx: any, args: any) => {
    const userIdentity = await ctx.auth.getUserIdentity();

    if (args.favorites) {
      const favoratedBoards = await ctx.db
        .query("userFavorites")
        .withIndex("by_user_org", (q: any) =>
          q.eq("userId", userIdentity.subject).eq("orgId", args.orgId)
        )
        .order("desc")
        .collect();

      const ids = favoratedBoards.map((boardId: any) => boardId.boardId);
      const boards = await getAllOrThrow(ctx.db, ids);
      return boards.map((board) => ({
        ...board,
        isFavorite: true,
      }));
    }

    const title = args.search as string;
    let boards = [];
    if (title) {
      boards = await ctx.db
        .query("boards")
        .withSearchIndex("search_title", (q: any) =>
          q.search("title", title).eq("orgId", args.orgId)
        )
        .collect();
    } else {
      boards = await ctx.db
        .query("boards")
        .filter((q: any) => q.eq(q.field("orgId"), args.orgId))
        .collect();

      boards.sort(
        (a: any, b: any) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }

    const boardsWithFavorites = boards.map((board: any) => {
      return ctx.db
        .query("userFavorites")
        .withIndex("by_user_board", (q: any) =>
          q.eq("userId", userIdentity.subject).eq("boardId", board._id)
        )
        .unique()
        .then((favorite: any) => {
          return {
            ...board,
            isFavorite: !!favorite,
          };
        });
    });

    const boardsWithFavoritesBoolean = Promise.all(boardsWithFavorites);
    return boardsWithFavoritesBoolean;
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

export const getAllUsers = query({
  handler: async (ctx: any) => {
    const users = await ctx.db.query("users").collect();
    return users;
  },
});

export const boards = query({
  args: {
    id: v.id("boards"),
  },
  handler: async (ctx, args) => {
    const board = await ctx.db.get(args.id);
    return board;
  },
});
