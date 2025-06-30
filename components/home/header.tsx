"use client";

import { cn } from "@/lib/utils";
import { DotPattern } from "@/components/magicui/dot-pattern";
import {
  HeroSection,
  HeroImageWithStats,
  ContributorsSection,
} from "./_components";

export default function Header() {
  return (
    <div className="relative px-4 sm:px-6 lg:px-8">
      <DotPattern
        className={cn(
          "absolute inset-0 -z-10 [mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
        )}
      />
      <section
        id="header"
        className="flex flex-col items-center justify-center gap-8 pt-32 lg:pt-40 pb-20 sm:pb-28 md:pb-32"
      >
        <HeroSection />
        <HeroImageWithStats />
        <ContributorsSection />
      </section>
    </div>
  );
}
