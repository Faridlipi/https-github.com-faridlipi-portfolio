"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { PERSONAL } from "@/lib/constants";
import { cn } from "@/lib/utils";
import ScrollFloat from "../UI/ScrollFloat";

export default function WorkWithMe() {
    return (
        <section className="relative w-full py-32 md:py-48 px-4 flex flex-col items-center justify-center bg-[#050505] text-white overflow-hidden z-20">

            {/* Header Text */}
            <div className="text-center mb-16 md:mb-24 space-y-4">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="text-neutral-400 text-lg md:text-xl uppercase tracking-widest font-light"
                >
                    Have an idea?
                </motion.h2>

                <ScrollFloat
                    animationDuration={1.5}
                    ease='back.inOut(2)'
                    scrollStart='center bottom+=50%'
                    scrollEnd='bottom bottom-=40%'
                    stagger={0.04}
                    containerClassName="text-5xl md:text-8xl font-bold tracking-tighter leading-tight"
                >
                    Let's work together
                </ScrollFloat>
            </div>

            {/* Magnetic Button Area */}
            <div className="relative z-10">
                <MagneticButton className="w-40 h-40 md:w-56 md:h-56 bg-white text-black rounded-full flex items-center justify-center text-lg md:text-xl font-medium cursor-pointer hover:scale-110 transition-transform duration-300">
                    <a href={`mailto:${PERSONAL.email}`} className="w-full h-full flex items-center justify-center">
                        Get in touch
                    </a>
                </MagneticButton>
            </div>

            {/* Footer Contact Info */}
            <div className="mt-24 flex flex-col items-center gap-4 text-neutral-400">
                <a href={`mailto:${PERSONAL.email}`} className="text-xl md:text-2xl hover:text-white transition-colors duration-300">
                    {PERSONAL.email}
                </a>
                <p className="text-sm uppercase tracking-wide opacity-50">{PERSONAL.location}</p>
            </div>

        </section>
    );
}

function MagneticButton({ children, className }: { children: React.ReactNode; className?: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current?.getBoundingClientRect() || { height: 0, width: 0, left: 0, top: 0 };
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);

        setPosition({ x: middleX * 0.5, y: middleY * 0.5 }); // Physics Factor
    };

    const reset = () => {
        setPosition({ x: 0, y: 0 });
    };

    const { x, y } = position;

    return (
        <motion.div
            ref={ref}
            className={cn("relative", className)}
            animate={{ x, y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
        >
            {children}
        </motion.div>
    );
}
