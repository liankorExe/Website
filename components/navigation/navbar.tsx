"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowRightIcon } from "lucide-react"
import { NAVBAR_LINKS } from "@/config";
import { useEffect, useState } from "react";
import Logo from "@/public/branding/logo.webp";
import { useRouter } from "next/navigation";

export default function Navbar() {

    const [isScrolled, setIsScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [])

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) setMenuOpen(false);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (menuOpen) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "";
        return () => { document.body.style.overflow = ""; };
    }, [menuOpen]);

    return (
        <div className="flex justify-center w-full h-full">
            <div
                className={`fixed top-0 z-50 p-4 bg-primary/70 dark:bg-primary/10 text-white flex items-center justify-between
                    transition-all duration-500 ease-[cubic-bezier(4,0,2,1)] will-change-transform
                    ${isScrolled || menuOpen
                        ? `w-full backdrop-blur-2xl scale-100 translate-y-0 rounded-none ${menuOpen ? "" : "shadow-lg"}`
                        : "max-w-screen-2xl w-full rounded-2xl mt-4 scale-95 translate-y-2 shadow-none"
                    }`}
            >
                <div className="flex items-center gap-4">
                    <Link href="/">
                        <Image src={Logo} alt="Logo" width={200} height={50} />
                    </Link>
                </div>
                <div className="hidden md:flex flex-grow justify-center gap-4 items-center">
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
                <div className="hidden md:flex">
                    <Button className="group" onClick={() => router.push("/rejoindre")}>
                        Rejoindre le Serveur
                        <ArrowRightIcon
                            className="-me-1 opacity-60 transition-transform group-hover:translate-x-0.5"
                            size={16}
                        />
                    </Button>
                </div>

                <div className="md:hidden flex items-center">
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="text-white focus:outline-none relative h-6 w-6"
                        aria-label="Toggle Menu"
                    >
                        <div className="absolute inset-0 flex flex-col justify-center items-center">
                            <span className={`block bg-white h-0.5 w-5 transition-all duration-300 ease-in-out ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
                            <span className={`block bg-white h-0.5 w-5 my-1 transition-all duration-300 ${menuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                            <span className={`block bg-white h-0.5 w-5 transition-all duration-300 ease-in-out ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
                        </div>
                    </button>
                </div>
            </div>

            {menuOpen ? (
                <div
                    className="fixed inset-0 bg-black/40 z-40 backdrop-blur-md transition-all duration-300 opacity-100"
                    onClick={() => setMenuOpen(false)}
                >
                    <div
                        className="fixed top-20 left-0 right-0 z-50 bg-primary/70 dark:bg-primary/10 backdrop-blur-2xl p-6 md:hidden transition-all duration-300 opacity-100 transform translate-y-0"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <nav className="flex flex-col gap-4 max-w-md mx-auto">
                            {NAVBAR_LINKS.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    target={link.external ? "_blank" : undefined}
                                    className="text-white py-3 px-5 rounded-lg active:bg-black/30 focus:bg-black/40 
                                    transition-all duration-200 font-medium border border-white/10 
                                    active:border-white/20 active:scale-[1.02]"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            ))}

                            <div className="h-px w-full bg-white/10 my-2" />

                            <Button
                                className="w-full group py-6 text-base mt-2 bg-white/10 active:bg-white/20
                                border border-white/20 active:border-white/30 transition-all duration-300"
                                onClick={() => { setMenuOpen(false); router.push("/rejoindre"); }}
                            >
                                Rejoindre le Serveur
                                <ArrowRightIcon
                                    className="-me-1 ml-2 opacity-60 transition-transform group-active:translate-x-1"
                                    size={18}
                                />
                            </Button>
                        </nav>
                    </div>
                </div>
            ) : (
                <div className="fixed inset-0 bg-black/40 z-40 transition-all duration-300 opacity-0 pointer-events-none"></div>
            )}
        </div>
    );
}