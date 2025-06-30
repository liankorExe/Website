"use client";

import HeroImage from "./hero-image";
import GitHubStats from "./github-stats";

export default function HeroImageWithStats() {
  return (
    <div className="relative">
      <HeroImage />
      <GitHubStats />
    </div>
  );
}
