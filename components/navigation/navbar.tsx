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
                    fixed top-0 z-50 p-4 bg-primary/70 dark:bg-primary/10 text-white flex items-center
                    transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] will-change-transform
                    ${isScrolled
                        ? "w-full backdrop-blur-2xl scale-100 translate-y-0 rounded-none shadow-xl"
                        : "max-w-screen-2xl w-full rounded-2xl mt-4 scale-95 translate-y-2 shadow-none"
                    }`}
            >


                <div>
                    <Link href="/">
                        <Image src={`./branding/logo.webp`} alt="Logo" width={200} height={50} />
                    </Link>
                </div>
                <div className="flex-grow flex justify-center gap-4 items-center">
                    {NAVBAR_LINKS.map((link) => (
                        <div
                            key={link.href}
                            className="text-white px-2 py-0.5 rounded-md hover:bg-black/40 border border-transparent hover:border-white/10 relative group transition-all duration-300 ease-in-out"
                        >
                            <Link
                                href={link.href}
                                target={link.external ? "_blank" : undefined}
                                className="transition-all duration-300 ease-in-out group-hover:py-1 block py-0.5"
                            >
                                {link.label}
                            </Link>
                        </div>
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