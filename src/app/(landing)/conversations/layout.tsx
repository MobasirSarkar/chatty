"use client";
import Itemslist from "@/components/_shared/items-list/items-list";
import { useQuery } from "convex/react";
import React, { PropsWithChildren } from "react";
import { api } from "../../../../convex/_generated/api";
import { Loader2 } from "lucide-react";
import DMConversationItem from "./_components/DMConversationItem";

type Props = PropsWithChildren<{}>;

const ConversationsLayout = ({ children }: Props) => {
  const conversations = useQuery(api.conversations.get);
  return (
    <>
      <Itemslist title={"Conversations"}>
        {conversations ? (
          conversations.length === 0 ? (
            <p className="w-full h-full flex justify-center items-center">
              No Conversations Found
            </p>
          ) : (
            conversations.map((conversations) => {
              return conversations.conversation.isGroup ? null : (
                <DMConversationItem
                  key={conversations.conversation._id}
                  id={conversations.conversation._id}
                  username={conversations.otherMember?.name || ""}
                  imageUrl={conversations.otherMember?.imageUrl || ""}
                />
              );
            })
          )
        ) : (
          <Loader2 />
        )}
      </Itemslist>
      {children}
    </>
  );
};

export default ConversationsLayout;
