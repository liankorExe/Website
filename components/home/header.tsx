"use client";
import Image from "next/image";
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import { cn } from "@/lib/utils";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { DotPattern } from "@/components/magicui/dot-pattern";
import { Button } from "@/components/ui/button";
import homePageImage from "@/public/placeholder/homepage.webp";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Contributors from "./_components/contributors";
import { GitHubApi } from "@/lib/github-cache";

interface GitHubStats {
  contributors: number;
  commits: number;
  repositories: number;
  creationYear: number;
}

export default function Header() {
  const { scrollY } = useScroll();
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-100px" });
  const [githubStats, setGithubStats] = useState<GitHubStats>({
    contributors: 0,
    commits: 0,
    repositories: 0,
    creationYear: 2024,
  });
  const [loading, setLoading] = useState(true);

  const imageScale = useTransform(scrollY, [0, 500], [1, 1.1]);
  const imageOpacity = useTransform(scrollY, [0, 300], [1, 0.8]);
  const parallaxY = useTransform(scrollY, [0, 500], [0, -50]);

  const textScale = useTransform(scrollY, [0, 400], [1, 0.8]);
  const textOpacity = useTransform(scrollY, [0, 300], [1, 0.6]);
  const textY = useTransform(scrollY, [0, 400], [0, -20]);

  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        setLoading(true);

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

        setGithubStats({
          contributors: 17,
          commits: 223,
          repositories: 7,
          creationYear: 2024,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubStats();
  }, []);

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
        <motion.div
          className="w-full max-w-4xl"
          style={{
            scale: textScale,
            opacity: textOpacity,
            y: textY,
          }}
        >
          <motion.div
            className="z-10 flex items-center justify-center mb-2"
            style={{
              scale: textScale,
            }}
          >
            <div
              className={cn(
                "group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-card dark:hover:bg-bg-card/50"
              )}
            >
              <Link href="https://github.com/ServerOpenMC/" target="_blank">
                <AnimatedShinyText className=" inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
                  <span>✨ Open-Source</span>
                  <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
                </AnimatedShinyText>
              </Link>
            </div>
          </motion.div>
          <motion.div
            className="text-center px-2"
            style={{
              scale: textScale,
            }}
          >
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold tracking-tight text-dark max-w-3xl mx-auto">
              Votre Serveur Minecraft Open-Source
            </h1>
            <p className="mt-4 leading-7 text-base sm:text-lg max-w-xl mx-auto tracking-tight text-muted-foreground">
              OpenMC est un projet communautaire open-source dédié à la création
              d&apos;un serveur Minecraft innovant et collaboratif.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center items-center">
              <Button className="group w-full sm:w-auto" asChild>
                <Link href="/join">
                  Rejoindre le Serveur
                  <ArrowRightIcon
                    className="-me-1 opacity-60 transition-transform group-hover:translate-x-0.5"
                    size={16}
                    aria-hidden="true"
                  />
                </Link>
              </Button>
              <Button
                variant="secondary"
                className="group w-full sm:w-auto"
                asChild
              >
                <Link
                  href="https://github.com/ServerOpenMC/"
                  target="_blank"
                  className="flex items-center"
                >
                  Contribuer
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="ml-1 opacity-60 transition-transform heart-icon"
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  </svg>
                </Link>
              </Button>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-10 w-full max-w-5xl relative rounded-4xl overflow-hidden"
          style={{
            scale: imageScale,
            opacity: imageOpacity,
            y: parallaxY,
          }}
        >
          <Image
            src={homePageImage}
            alt="Placeholder"
            width={1280}
            height={720}
            quality={100}
            className="w-full h-auto rounded-4xl object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 pointer-events-none" />

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
                  number: loading ? "..." : githubStats.contributors.toString(),
                  label: "Contributeurs",
                },
                {
                  number: loading ? "..." : githubStats.commits.toString(),
                  label: "Commits",
                },
                {
                  number: loading ? "..." : `${githubStats.repositories}+`,
                  label: "Répertoires",
                },
                {
                  number: loading ? "..." : githubStats.creationYear.toString(),
                  label: "Création",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
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
        </motion.div>

        <Contributors />
      </section>
    </div>
  );
}
