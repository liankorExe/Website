import Image from "next/image";
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import { cn } from "@/lib/utils";
import { ArrowRightIcon, Heart } from "lucide-react";
import Link from "next/link";
import { DotPattern } from "@/components/magicui/dot-pattern";
import { Button } from "@/components/ui/button";

export default function Header() {
    return (
        <div className="relative">
            <DotPattern
                className={cn(
                    "absolute inset-0 -z-10 [mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
                )}
            />
            <section id="header" className="flex flex-col items-center justify-center gap-8 py-24 md:py-32 lg:py-40">
                <div>
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
                    <div className="text-center">
                        <h1 className="scroll-m-20 text-4xl max-w-3xl mx-auto text-dark font-extrabold tracking-tight lg:text-6xl">
                            Votre Serveur Minecraft Open-Source
                        </h1>
                        <p className="leading-7 max-w-xl mx-auto [&:not(:first-child)]:mt-6 tracking-tight">
                            OpenMC est un projet communautaire open-source dédié à la création d&apos;un serveur Minecraft innovant et collaboratif.
                        </p>
                        <div className="m-4 gap-2 flex items-center justify-center">
                            <Button className="group">
                                Rejoindre le Serveur
                                <ArrowRightIcon
                                    className="-me-1 opacity-60 transition-transform group-hover:translate-x-0.5"
                                    size={16}
                                    aria-hidden="true"
                                />
                            </Button>
                            <Button variant="secondary" className="group" asChild>
                                <Link href="https://github.com/ServerOpenMC/" target="_blank">
                                    Contribuer
                                    <Heart
                                        className="-me-1 opacity-60 transition-transform group-hover:translate-x-0.5"
                                        size={16}
                                        aria-hidden="true"
                                    />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="mt-8 relative">
                    <Image
                        src="placeholder/homepage.webp"
                        alt="Placeholder"
                        width={1280}
                        height={50}
                        quality={100}
                        className="rounded-4xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background rounded-4xl pointer-events-none"></div>
                </div>
                <section className="flex flex-col items-center justify-center py-16">
                    <h2 className="text-2xl font-bold tracking-tight text-center lg:text-4xl">
                        Quelques Chiffres Clés
                    </h2>
                    <div className="grid grid-cols-1 gap-8 mt-8 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="text-center">
                            <p className="text-4xl font-extrabold text-primary">34+</p>
                            <p className="text-sm font-medium text-muted-foreground">Contributeurs</p>
                        </div>
                        <div className="text-center">
                            <p className="text-4xl font-extrabold text-primary">7+</p>
                            <p className="text-sm font-medium text-muted-foreground">Répertoires</p>
                        </div>
                        <div className="text-center">
                            <p className="text-4xl font-extrabold text-primary">1M+</p>
                            <p className="text-sm font-medium text-muted-foreground">Téléchargements</p>
                        </div>
                        <div className="text-center">
                            <p className="text-4xl font-extrabold text-primary">99%</p>
                            <p className="text-sm font-medium text-muted-foreground">Satisfaction</p>
                        </div>
                    </div>
                </section>
            </section>
        </div>
    );
}
