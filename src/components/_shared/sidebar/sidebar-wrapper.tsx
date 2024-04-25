import MobileNav from "@/components/navbar/nav-mobile";
import Navbar from "@/components/navbar/navbar";
import React from "react";

type Props = React.PropsWithChildren<{}>;

const SidebarWrapper = ({ children }: Props) => {
  return (
    <div className="flex w-full h-full p-3 flec-col lg:flex-row">
      <main className="h-[calc(100%-80px)] lg:h-full w-full flex gap-3">
        <MobileNav />
        <Navbar />
        {children}
      </main>
    </div>
  );
};

export default SidebarWrapper;
