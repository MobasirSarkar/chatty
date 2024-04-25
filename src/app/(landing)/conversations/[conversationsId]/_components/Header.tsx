import { Card } from "@/components/ui/card";
import { CircleArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  imageUrl?: string;
  name: string;
};

const Header = ({ imageUrl, name }: Props) => {
  return (
    <Card className="w-full rounded-lg flex p-2 items-center justify-between">
      <div className="flex items-center gap-2">
        <Link className="block lg:hidden" href="/conversations">
          <CircleArrowLeft />
        </Link>
      </div>
    </Card>
  );
};

export default Header;
