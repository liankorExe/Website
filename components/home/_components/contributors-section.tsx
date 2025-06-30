"use client";

import { Suspense, lazy } from "react";
import { motion } from "framer-motion";
const ContributorsAsync = lazy(() => import("./contributors"));

function ContributorsSkeleton() {
  return (
    <motion.div
      className="mt-16 w-full max-w-6xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <div className="text-center mb-8">
        <div className="h-8 w-48 bg-muted rounded-lg mx-auto mb-4 animate-pulse" />
        <div className="h-4 w-64 bg-muted/60 rounded mx-auto animate-pulse" />
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center space-y-2">
            <div className="w-12 h-12 bg-muted rounded-full animate-pulse" />
            <div className="h-3 w-16 bg-muted/60 rounded animate-pulse" />
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function ContributorsSection() {
  return (
    <Suspense fallback={<ContributorsSkeleton />}>
      <ContributorsAsync />
    </Suspense>
  );
}
