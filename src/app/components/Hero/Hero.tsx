"use client";

import { motion } from "framer-motion";
import AntigravityHero from "./AntigravityHero";
import { PERSONAL } from "@/lib/constants";

export default function Hero() {
    return (
        <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
            {/* BACKGROUND: Antigravity Particles */}
            <AntigravityHero />

            <div className="z-10 text-center px-4 relative pointer-events-none select-none">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-primary tracking-[0.2em] mb-4 uppercase text-sm md:text-base font-medium"
                >
                    {PERSONAL.role}
                </motion.p>

                <motion.h1
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "circOut" }}
                    className="text-6xl md:text-8xl font-bold tracking-tighter leading-none uppercase text-[#F2F0E6]"
                >
                    FARID <br /> LIPI
                </motion.h1>
            </div>


        </section>
    );
}
