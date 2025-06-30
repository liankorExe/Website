"use client";

import Image from "next/image";
import homePageImage from "@/public/placeholder/homepage.webp";
import { motion, useScroll, useTransform } from "framer-motion";

export default function HeroImage() {
  const { scrollY } = useScroll();

  const imageScale = useTransform(scrollY, [0, 500], [1, 1.1]);
  const imageOpacity = useTransform(scrollY, [0, 300], [1, 0.8]);
  const parallaxY = useTransform(scrollY, [0, 500], [0, -50]);

  return (
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
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 pointer-events-none" />
    </motion.div>
  );
}
