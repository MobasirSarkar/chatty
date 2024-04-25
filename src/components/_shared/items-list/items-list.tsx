"use client";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import React, { PropsWithChildren } from "react";
import { useConversations } from "../../../../hooks/useConversations";

type Props = PropsWithChildren<{
  title: string;
  action?: React.ReactNode;
}>;

const Itemslist = ({ children, title, action: Action }: Props) => {
  const { isActive } = useConversations();
  return (
    <Card
      className={cn("hidden w-full h-full lg:flex-none lg:w-80 p-2", {
        block: !isActive,
        "lg:block": isActive,
      })}
    >
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl tracking-tight font-semibold">{title}</h1>
        {Action ? Action : null}
      </div>
      <div className="w-full h-full flex flex-col items-center justify-start gap-2">
        {children}
      </div>
    </Card>
  );
};

export default Itemslist;
