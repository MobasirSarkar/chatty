import { ConvexError } from "convex/values";
import { query } from "./_generated/server";
import { getUserByClerkId } from "./_utils";

export const get = query({
  args: {},
  handler: async (ctx, args) => {
    const idendity = await ctx.auth.getUserIdentity();

    if (!idendity) {
      throw new ConvexError("Unauthorized");
    }

    const currentUser = await getUserByClerkId({
      ctx,
      clerkId: idendity.subject,
    });

    if (!currentUser) {
      throw new ConvexError("User Not Found");
    }

    const request = await ctx.db
      .query("requests")
      .withIndex("by_receiver", (q) => q.eq("receiver", currentUser._id))
      .collect();

    const requestsBySender = await Promise.all(
      request.map(async (request) => {
        const sender = await ctx.db.get(request.sender);
        if (!sender) {
          throw new ConvexError("Request sender Could not be Found");
        }

        return { sender, request };
      })
    );

    return requestsBySender;
  },
});

export const count = query({
  args: {},
  handler: async (ctx, args) => {
    const idendity = await ctx.auth.getUserIdentity();

    if (!idendity) {
      throw new ConvexError("Unauthorized");
    }

    const currentUser = await getUserByClerkId({
      ctx,
      clerkId: idendity.subject,
    });

    if (!currentUser) {
      throw new ConvexError("User Not Found");
    }

    const request = await ctx.db
      .query("requests")
      .withIndex("by_receiver", (q) => q.eq("receiver", currentUser._id))
      .collect();

    return request.length;
  },
});
