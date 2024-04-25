import SidebarWrapper from "@/components/_shared/sidebar/sidebar-wrapper";
import React from "react";

interface LandingLayoutProps {
  children: React.ReactNode;
}

export default function LandingLayout({ children }: LandingLayoutProps) {
  return <SidebarWrapper>{children}</SidebarWrapper>;
}
