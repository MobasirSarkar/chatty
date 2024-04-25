import { Card } from "@/components/ui/card";
import React from "react";

type Props = {};

const Conversationfallback = (props: Props) => {
  return (
    <Card
      className="hidden lg:flex w-full h-full items-center
    justify-center p-2 bg-secondary text-secondary-foreground"
    >
      Select or Start a converstion to get started
    </Card>
  );
};

export default Conversationfallback;
