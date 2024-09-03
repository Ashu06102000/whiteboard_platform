"use client";

import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { Authenticated, ConvexReactClient, AuthLoading } from "convex/react";
import Loading from "@/components/auth/loading";
import { ChildrenProp } from "@/interface/interface";

const CONVEX_URL = process.env.NEXT_PUBLIC_CONVEX_URL!;

const convex = new ConvexReactClient(CONVEX_URL as string);

export const ConvexClientProvider = ({ children }: ChildrenProp) => {
  return (
    <ClerkProvider>
      <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
        <Authenticated>{children}</Authenticated>
        <AuthLoading>
          <Loading />
        </AuthLoading>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
};
