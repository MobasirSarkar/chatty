"use client";
import { ModeToggle } from "@/providers/themeProvider/mode-toggle";
import { UserButton } from "@clerk/nextjs";
import React from "react";
import { useNavigations } from "../../../hooks/useNavigation";
import { Card } from "../ui/card";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Button } from "../ui/button";
import { icons } from "lucide-react";
import { useConversations } from "../../../hooks/useConversations";
import { Badge } from "../ui/badge";

export default function MobileNav() {
  const paths = useNavigations();
  const { isActive } = useConversations();

  if (isActive) return null;
  return (
    <Card className="fixed bottom-4 w-[calc(100vw-36px)] flex items-center h-16 lg:hidden">
      <nav className="w-full">
        <ul className="flex justify-evenly items-center text-lg">
          {paths.map((path, id) => {
            return (
              <li key={id} className="relative transition-all delay-75">
                <Link href={path.href}>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Button
                          size="icon"
                          variant={path.active ? "default" : "outline"}
                        >
                          {path.icon}
                        </Button>
                        {path.count ? (
                          <Badge className="absolute left-6 bottom-7 px-2">
                            {path.count}
                          </Badge>
                        ) : null}
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{path.name}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Link>
              </li>
            );
          })}
          <li>
            <ModeToggle />
          </li>
          <li className="mt-2 text-2xl">
            <UserButton />
          </li>
        </ul>
      </nav>
    </Card>
  );
}
