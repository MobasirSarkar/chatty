"use client";
import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexReactClient, Authenticated, AuthLoading } from "convex/react";
import React from "react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import Loading from "./_shared/loading";

interface ConvexClientProviderProps {
  children: React.ReactNode;
}
const CONVEX_URL = process.env.NEXT_PUBLIC_CONVEX_URL || "";
const convex = new ConvexReactClient(CONVEX_URL);

export default function ConvexClientProvider({
  children,
}: ConvexClientProviderProps) {
  return (
    <ClerkProvider>
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <Authenticated>{children}</Authenticated>
        <AuthLoading>
          <Loading />
        </AuthLoading>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
