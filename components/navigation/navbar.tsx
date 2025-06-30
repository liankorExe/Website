"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowRightIcon, Menu } from "lucide-react";
import { NAVBAR_LINKS } from "@/config";
import { useEffect, useState } from "react";
import Logo from "@/public/branding/logo.webp";
import { useRouter } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
} from "../ui/sheet";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // S'assurer que le composant est monté pour éviter les problèmes d'hydratation
    setIsLoaded(true);
    
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    
    // Vérifier immédiatement le scroll au montage
    handleScroll();
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Force une re-évaluation après un court délai pour s'assurer que l'animation fonctionne
  useEffect(() => {
    const timer = setTimeout(() => {
      const handleScroll = () => setIsScrolled(window.scrollY > 20);
      handleScroll();
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

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
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-[9999] flex justify-center items-center 
                  ${isLoaded ? 'transition-all duration-300 ease-in-out' : ''}
                  ${isScrolled ? "h-[130px]" : "h-[80px]"}`}
      >
        <div
          className={`flex justify-between items-center bg-primary/70 dark:bg-primary/10 backdrop-blur-[30px] text-white 
                      ${isLoaded ? 'transition-all duration-300 ease-in-out' : ''}
                      ${
                        isScrolled
                          ? "w-[calc(100%-60px)] max-w-[1300px] mx-[30px] rounded-[30px] px-6 py-4"
                          : "w-full max-w-full mx-0 rounded-none px-6 py-4"
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
            <Button className="group" onClick={() => router.push("/join")}>
              Rejoindre le Serveur
              <ArrowRightIcon
                className="-me-1 opacity-60 transition-transform group-hover:translate-x-0.5"
                size={16}
              />
            </Button>
          </div>

          <div className="md:hidden flex items-center">
            <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
              <SheetTitle></SheetTitle>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/10"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-full bg-primary/95 backdrop-blur-xl border-none text-white p-0 z-[10000]"
              >
                <div className="flex flex-col items-center justify-center h-full space-y-12 p-8">
                  <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
                    <SheetClose asChild>
                      <Link href="/">
                        <Image src={Logo} alt="Logo" width={200} height={50} />
                      </Link>
                    </SheetClose>
                  </div>

                  <div className="flex flex-col items-center space-y-8 text-center">
                    {NAVBAR_LINKS.map((link) => (
                      <SheetClose asChild key={link.href}>
                        <Link
                          href={link.href}
                          target={link.external ? "_blank" : undefined}
                          className="text-white text-2xl font-medium hover:text-white/80 transition-colors duration-200"
                        >
                          {link.label}
                        </Link>
                      </SheetClose>
                    ))}
                  </div>

                  <div className="pt-8">
                    <SheetClose asChild>
                      <Button
                        className="group bg-white/10 hover:bg-white/20 border cursor-pointer border-white/20 hover:border-white/30 px-8 py-4 text-lg"
                        onClick={() => router.push("/join")}
                      >
                        Rejoindre le Serveur
                        <ArrowRightIcon className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </SheetClose>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  );
}
