import { mutation } from "./_generated/server";
import { v } from "convex/values";

const images = [
  "./placeholders/ph1.svg",
  "./placeholders/ph2.svg",
  "./placeholders/ph3.svg",
  "./placeholders/ph4.svg",
  ",./placeholders/ph5.svg",
  "./placeholders/ph6.svg",
  "./placeholders/ph7.svg",
  "./placeholders/ph8.svg",
  "./placeholders/ph9.svg",
  "./placeholders/ph10.svg ",
];

export const createMutation = mutation({
  args: {
    orgId: v.string(),
    title: v.string(),
  },
  handler: async (ctx: any, args: any) => {
    const userIdentity = await ctx.auth.getUserIdentity();

    if (!userIdentity) {
      throw new Error("unauthorized");
    }

    const randomImages = images[Math.floor(Math.random() * images.length)];

    const boards = await ctx.db.insert("boards", {
      title: args.title,
      orgId: args.orgId,
      authorId: userIdentity.subject,
      authorName: userIdentity.name!,
      imageUrl: randomImages,
    });
  },
});
