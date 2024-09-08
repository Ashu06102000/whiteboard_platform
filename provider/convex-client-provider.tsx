"use client";

import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { Authenticated, AuthLoading, ConvexReactClient } from "convex/react";
import { AnimatePresence, motion } from "framer-motion";
import Loading from "@/components/auth/loading";
import { ChildrenProp } from "@/interface/interface";

const CONVEX_URL = process.env.NEXT_PUBLIC_CONVEX_URL!;

const convex = new ConvexReactClient(CONVEX_URL as string);

export const ConvexClientProvider = ({ children }: ChildrenProp) => {
  return (
    <ClerkProvider>
      <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
        <AnimatePresence>
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <AuthLoading>
              <Loading />
            </AuthLoading>
          </motion.div>
          <Authenticated>{children}</Authenticated>
        </AnimatePresence>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
};
