"use client";
import React from "react";
import { Id } from "../../../../../convex/_generated/dataModel";
import { Card } from "@/components/ui/card";
import { UserButton } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Check, User, X } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useMutation } from "convex/react";
import { useMutationState } from "../../../../../hooks/useMutationState";
import { api } from "../../../../../convex/_generated/api";
import { useToast } from "@/components/ui/use-toast";
import { ConvexError } from "convex/values";

type Props = {
  id: Id<"requests">;
  username: string;
  email: string;
  imageUrl: string;
};

const Request = ({ id, username, email, imageUrl }: Props) => {
  const { toast } = useToast();

  const { mutate: denyRequest, pending: denyPending } = useMutationState(
    api.request.deny
  );
  const { mutate: acceptRequest, pending: acceptPending } = useMutationState(
    api.request.accept
  );
  return (
    <Card className="w-full p-2 flex flex-row items-center justify-between gap-2">
      <div className="flex items-center gap-4 truncate">
        <Avatar>
          <AvatarImage src={imageUrl} />
          <AvatarFallback>
            <User />
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col truncate">
          <h4 className="truncate">{username}</h4>
          <p className="text-xs text-muted-foreground truncate">{email}</p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="icon"
            onClick={() => {
              acceptRequest({ id })
                .then(() => {
                  toast({ description: "Request accept" });
                })
                .catch((error) => {
                  toast({
                    variant: "destructive",
                    description:
                      error instanceof ConvexError
                        ? error.data
                        : "Unexpected Error",
                  });
                });
            }}
            disabled={denyPending || acceptPending}
          >
            <Check />
          </Button>
          <Button
            size="icon"
            onClick={() => {
              denyRequest({ id })
                .then(() => {
                  toast({ description: "Request Denied" });
                })
                .catch((error) => {
                  toast({
                    variant: "destructive",
                    description:
                      error instanceof ConvexError
                        ? error.data
                        : "Unexpected Error",
                  });
                });
            }}
            variant={"destructive"}
            disabled={denyPending || acceptPending}
          >
            <X />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default Request;
