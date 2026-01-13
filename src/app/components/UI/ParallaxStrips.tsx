"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ParallaxStrips() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const x1 = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
    const x2 = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

    return (
        <section
            ref={containerRef}
            className="relative w-full py-48 overflow-hidden bg-background flex flex-col items-center justify-center gap-0"
        >
            {/* Strip 1 - Rotated and Scrolling Left */}
            <motion.div
                style={{ x: x1, rotate: -3 }}
                className="w-[120%] bg-surface border-y border-white/10 py-6 whitespace-nowrap z-10 origin-center"
            >
                <div className="flex gap-8 text-4xl md:text-6xl font-bold tracking-tighter text-white/20 uppercase">
                    {Array(8).fill("Creative Developer • UI/UX Designer • ").map((text, i) => (
                        <span key={i}>{text}</span>
                    ))}
                </div>
            </motion.div>

            {/* Strip 2 - Rotated and Scrolling Right */}
            <motion.div
                style={{ x: x2, rotate: 3 }}
                className="w-[120%] bg-primarys border-y border-white/10 py-6 whitespace-nowrap z-20 -mt-12 mix-blend-lighten origin-center bg-primary/10"
            >
                <div className="flex gap-8 text-4xl md:text-6xl font-bold tracking-tighter text-primary uppercase">
                    {Array(8).fill("Driven by Passion • Built with Code • ").map((text, i) => (
                        <span key={i}>{text}</span>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
