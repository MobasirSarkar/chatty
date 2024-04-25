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
import { Badge } from "../ui/badge";

export default function Navbar() {
  const paths = useNavigations();
  return (
    <Card
      className="hidden lg:flex lg:flex-col 
    lg:w-16 lg:justify-between 
    lg:items-center lg:px-2 lg:py-4 lg:h-full"
    >
      <nav>
        <ul className="flex flex-col gap-4 text-lg">
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
        </ul>
      </nav>
      <div className="flex flex-col gap-4">
        <ModeToggle />
        <UserButton />
      </div>
    </Card>
  );
}
