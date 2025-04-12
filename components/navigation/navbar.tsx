"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowRightIcon } from "lucide-react"
import { NAVBAR_LINKS } from "@/config";
import { useEffect, useState } from "react";

export default function Navbar() {

    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [])

    return (
        <div className="flex justify-center w-full">
            <div
                className={`
                    fixed top-0 z-50 dark:bg-primary/10 transition-all duration-200 ease-in-out text-white flex items-center
                    ${isScrolled
                        ? "w-full py-4 bg-primary/90 backdrop-blur-2xl"
                        : "max-w-screen-2xl w-full p-4 bg-primary/70 dark:bg-primary/10 rounded-2xl mt-4"
                    }`}
            >
                <div>
                    <Link href="/">
                        <Image src={`./branding/logo.webp`} alt="Logo" width={200} height={50} />
                    </Link>
                </div>
                <div className="flex-grow flex justify-center">
                    {NAVBAR_LINKS.map((link) => (
                        <Button
                            key={link.href}
                            variant="link"
                            size="lg"
                            className="text-white"
                            asChild
                        >
                            <Link href={link.href} target={link.external ? "_blank" : undefined}>
                                {link.label}
                            </Link>
                        </Button>
                    ))}
                </div>
                <div>
                    <Button className="group">
                        Rejoindre le Serveur
                        <ArrowRightIcon
                            className="-me-1 opacity-60 transition-transform group-hover:translate-x-0.5"
                            size={16}
                            aria-hidden="true"
                        />
                    </Button>
                </div>
            </div>
        </div>
    );
}