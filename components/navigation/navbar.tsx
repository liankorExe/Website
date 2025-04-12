import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowRightIcon } from "lucide-react"
import { NAVBAR_LINKS } from "@/config";
import { prefix } from "@/lib/prefix";

export default function Navbar() {
    return (
        <div className="p-4 bg-primary/70 dark:bg-primary/10 text-white flex items-center rounded-2xl mt-4">
            <div>
                <Link href="/">
                    <Image src={`${prefix}/branding/logo.webp`} alt="Logo" width={200} height={50} />
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
    );
}