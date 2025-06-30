"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { GitHubApi } from "@/lib/github-cache";

interface ContributorStat {
  author: {
    login: string;
  };
  weeks: Array<{
    a: number;
    d: number;
  }>;
}

interface Contributor {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
  additions?: number;
  deletions?: number;
  netLines?: number;
}

export default function Contributors() {
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContributors = async () => {
      try {
        setLoading(true);

        const data = await GitHubApi.getContributors(
          "ServerOpenMC",
          "PluginV2"
        );

        const contributorsWithStats = await Promise.all(
          data.slice(0, 12).map(async (contributor: Contributor) => {
            try {
              const statsData = await GitHubApi.getContributorStats(
                "ServerOpenMC",
                "PluginV2"
              );
              const contributorStats = statsData.find(
                (stat: ContributorStat) =>
                  stat.author.login === contributor.login
              );

              if (contributorStats) {
                const totalAdditions = contributorStats.weeks.reduce(
                  (sum: number, week: { a: number; d: number }) => sum + week.a,
                  0
                );
                const totalDeletions = contributorStats.weeks.reduce(
                  (sum: number, week: { a: number; d: number }) => sum + week.d,
                  0
                );

                return {
                  ...contributor,
                  additions: totalAdditions,
                  deletions: totalDeletions,
                  netLines: totalAdditions - totalDeletions,
                };
              }
              return contributor;
            } catch {
              return contributor;
            }
          })
        );

        contributorsWithStats.sort((a: Contributor, b: Contributor) => {
          if (a.additions !== undefined && b.additions !== undefined) {
            return b.additions - a.additions;
          }
          return b.contributions - a.contributions;
        });

        setContributors(contributorsWithStats);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Une erreur est survenue"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchContributors();
  }, []);

  if (loading) {
    return (
      <section className="flex flex-col items-center justify-center py-16 w-full px-4">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-center mb-10">
          Nos Contributeurs
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 w-full max-w-4xl">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gray-300 rounded-full animate-pulse mb-2" />
              <div className="h-4 bg-gray-300 rounded w-16 animate-pulse" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="flex flex-col items-center justify-center py-16 w-full px-4">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-center mb-10">
          Nos Contributeurs
        </h1>
        <p className="text-red-500 text-center">{error}</p>
      </section>
    );
  }

  return (
    <section className="flex flex-col items-center justify-center py-16 w-full px-4">
      <motion.h2
        className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-center mb-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        Nos Contributeurs
      </motion.h2>

      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 w-full max-w-4xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        {contributors.map((contributor, i) => (
          <motion.div
            key={contributor.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 + i * 0.05 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center group"
          >
            <Link
              href={contributor.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center transition-transform group-hover:scale-105"
            >
              <div className="relative w-16 h-16 mb-2">
                <Image
                  src={contributor.avatar_url}
                  alt={`${contributor.login} avatar`}
                  width={64}
                  height={64}
                  className="rounded-full object-cover border-2 border-transparent group-hover:border-primary transition-colors"
                  unoptimized
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://ui-avatars.com/api/?name=${contributor.login}&background=random&color=fff&size=64`;
                  }}
                />
              </div>
              <p className="text-sm font-medium text-center group-hover:text-primary transition-colors">
                {contributor.login}
              </p>
              <p className="text-xs text-muted-foreground">
                {contributor.contributions} commits
              </p>
              {(contributor.additions || contributor.deletions) && (
                <p className="text-xs text-muted-foreground">
                  {contributor.netLines !== undefined &&
                  contributor.netLines >= 0
                    ? "+"
                    : ""}
                  {contributor.netLines || 0} lignes nettes
                </p>
              )}
            </Link>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        viewport={{ once: true }}
        className="mt-8"
      >
        <Link
          href="https://github.com/ServerOpenMC"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:text-primary/80 transition-colors font-medium"
        >
          Voir tous les contributeurs sur GitHub →
        </Link>
      </motion.div>
    </section>
  );
}
