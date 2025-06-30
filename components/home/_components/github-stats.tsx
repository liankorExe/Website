"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { GitHubApi } from "@/lib/github-cache";

interface GitHubStats {
  contributors: number;
  commits: number;
  repositories: number;
  creationYear: number;
}

export default function GitHubStats() {
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-100px" });
  const [githubStats, setGithubStats] = useState<GitHubStats>({
    contributors: 17,
    commits: 223,
    repositories: 7,
    creationYear: 2024,
  });

  useEffect(() => {
    if (!statsInView) return;

    const fetchGitHubStats = async () => {
      try {

        const contributors = await GitHubApi.getContributors(
          "ServerOpenMC",
          "PluginV2"
        );
        const repoData = await GitHubApi.getRepository(
          "ServerOpenMC",
          "PluginV2"
        );
        const orgsData = await GitHubApi.getOrgRepositories("ServerOpenMC");

        const totalCommits = contributors.reduce(
          (sum: number, contributor: { contributions: number }) =>
            sum + contributor.contributions,
          0
        );

        const creationYear = new Date(repoData.created_at).getFullYear();

        setGithubStats({
          contributors: contributors.length,
          commits: totalCommits,
          repositories: orgsData.length,
          creationYear: creationYear,
        });
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des stats GitHub:",
          error
        );
        // Garder les valeurs par défaut en cas d'erreur
      }
    };

    const timer = setTimeout(() => {
      fetchGitHubStats();
    }, 500);

    return () => clearTimeout(timer);
  }, [statsInView]);

  return (
    <motion.div
      ref={statsRef}
      className="absolute bottom-8 left-0 right-0 px-8"
      initial={{ opacity: 0, y: 40 }}
      animate={statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {[
          {
            number: githubStats.contributors.toString(),
            label: "Contributeurs",
          },
          {
            number: githubStats.commits.toString(),
            label: "Commits",
          },
          {
            number: `${githubStats.repositories}+`,
            label: "Répertoires",
          },
          {
            number: githubStats.creationYear.toString(),
            label: "Création",
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{
              duration: 0.6,
              delay: 0.2 + i * 0.1,
              ease: "easeOut",
            }}
          >
            <p className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-primary">
              {item.number}
            </p>
            <p className="text-xs sm:text-sm font-medium text-white">
              {item.label}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
