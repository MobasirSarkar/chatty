import { ConvexError, v } from "convex/values";
import { query } from "./_generated/server";
import { getUserByClerkId } from "./_utils";

export const get = query({
  args: {
    id: v.id("conversations"),
  },
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

    const conversation = await ctx.db.get(args.id);

    if (!conversation) {
      throw new ConvexError("Conversation not found");
    }

    const membership = await ctx.db
      .query("conversationsMember")
      .withIndex("by_memberId_conversationId", (q) =>
        q.eq("memberId", currentUser._id).eq("conversationId", conversation._id)
      )
      .unique();

    if (!membership) {
      throw new ConvexError("You aren't a part of this convesation");
    }

    const allConversationMemberships = await ctx.db
      .query("conversationsMember")
      .withIndex("by_conversationId", (q) => q.eq("conversationId", args.id))
      .collect();

    if (conversation.isGroup) {
      const otherMembership = allConversationMemberships.filter(
        (membership) => membership.memberId !== currentUser._id
      )[0];

      const otherMemberDetails = await ctx.db.get(otherMembership.memberId);

      return {
        ...conversation,
        otherMember: {
          ...otherMemberDetails,
          lastSeenMessageId: otherMembership.lastMessageSeen,
        },
        otherMembers: null,
      };
    }
    return conversation;
  },
});
