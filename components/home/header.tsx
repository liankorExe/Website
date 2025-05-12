"use client";
import Image from "next/image";
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import { cn } from "@/lib/utils";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { DotPattern } from "@/components/magicui/dot-pattern";
import { Button } from "@/components/ui/button";
import homePageImage from "@/public/placeholder/homepage.webp";
import { useRouter } from "next/navigation";

export default function Header() {
    const router = useRouter();
    return (
        <div className="relative px-4 sm:px-6 lg:px-8">
            <DotPattern
                className={cn(
                    "absolute inset-0 -z-10 [mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
                )}
            />
            <section id="header" className="flex flex-col items-center justify-center gap-8 pt-32 lg:pt-40 pb-20 sm:pb-28 md:pb-32">
                <div className="w-full max-w-4xl">
                    <div className="z-10 flex items-center justify-center mb-2">
                        <div
                            className={cn(
                                "group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800",
                            )}
                        >
                            <Link href="https://github.com/ServerOpenMC/" target="_blank">
                                <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
                                    <span>✨ Open-Source</span>
                                    <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
                                </AnimatedShinyText>
                            </Link>
                        </div>
                    </div>
                    <div className="text-center px-2">
                        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold tracking-tight text-dark max-w-3xl mx-auto">
                            Votre Serveur Minecraft Open-Source
                        </h1>
                        <p className="mt-4 leading-7 text-base sm:text-lg max-w-xl mx-auto tracking-tight text-muted-foreground">
                            OpenMC est un projet communautaire open-source dédié à la création d&apos;un serveur Minecraft innovant et collaboratif.
                        </p>
                        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center items-center">
                            <Button className="group w-full sm:w-auto" onClick={() => router.push("/join")}>
                                Rejoindre le Serveur
                                <ArrowRightIcon
                                    className="-me-1 opacity-60 transition-transform group-hover:translate-x-0.5"
                                    size={16}
                                    aria-hidden="true"
                                />
                            </Button>
                            <Button variant="secondary" className="group w-full sm:w-auto" asChild>
                                <Link href="https://github.com/ServerOpenMC/" target="_blank" className="flex items-center">
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
                    </div>
                </div>

                <div className="mt-10 w-full max-w-5xl relative rounded-4xl overflow-hidden">
                    <Image
                        src={homePageImage}
                        alt="Placeholder"
                        width={1280}
                        height={720}
                        quality={100}
                        className="w-full h-auto rounded-4xl object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background pointer-events-none" />
                </div>

                <section className="flex flex-col items-center justify-center py-16 w-full px-4">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-center">
                        Quelques Chiffres Clés
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-10 w-full max-w-5xl">
                        {[
                            { number: "34+", label: "Contributeurs" },
                            { number: "7+", label: "Répertoires" },
                            { number: "1M+", label: "Téléchargements" },
                            { number: "99%", label: "Satisfaction" },
                        ].map((item, i) => (
                            <div key={i} className="text-center">
                                <p className="text-4xl font-extrabold text-primary">{item.number}</p>
                                <p className="text-sm font-medium text-muted-foreground">{item.label}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </section>
        </div>
    );
}
