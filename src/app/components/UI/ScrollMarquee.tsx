"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

// Register ScrollTrigger
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const GreenClover = ({ className }: { className?: string }) => (
    <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("w-full h-full", className)}
        aria-hidden="true"
    >
        <path
            d="M50 50C50 50 20 20 20 50C20 80 50 50 50 50Z"
            fill="#8b5cf6"
            className="origin-center"
            style={{ transform: "rotate(0deg)" }}
        />
        <path
            d="M50 50C50 50 80 80 80 50C80 20 50 50 50 50Z"
            fill="#8b5cf6"
            className="origin-center"
            style={{ transform: "rotate(0deg)" }}
        />
        <path
            d="M50 50C50 50 20 80 50 80C80 80 50 50 50 50Z"
            fill="#8b5cf6"
            className="origin-center"
            style={{ transform: "rotate(0deg)" }}
        />
        <path
            d="M50 50C50 50 80 20 50 20C20 20 50 50 50 50Z"
            fill="#8b5cf6"
            className="origin-center"
            style={{ transform: "rotate(0deg)" }}
        />
        {/* Center detail */}
        <circle cx="50" cy="50" r="5" fill="#1a1a1a" />
    </svg>
);

export default function ScrollMarquee() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const iconRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        const text = textRef.current;
        const icon = iconRef.current;

        if (!container || !text || !icon) return;

        // Create the timeline
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container,
                start: "top bottom",
                end: "bottom top",
                scrub: 1, // Heavy inertia
            },
        });

        // 1. Move Text Horizontally
        // From right (0%) to left (-20%) - subtle movement like the ref
        tl.fromTo(
            text,
            { xPercent: 10 },
            { xPercent: -30, ease: "none" },
            0
        );

        // 2. Rotate Icon
        // Spin 360 degrees during the scroll
        tl.to(
            icon,
            { rotation: 360, ease: "none" },
            0
        );

        return () => {
            tl.kill();
        };
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative w-full py-64 overflow-hidden bg-background flex items-center justify-center cursor-default"
        >
            <div
                ref={textRef}
                className="relative whitespace-nowrap flex items-center gap-8 md:gap-16 will-change-transform"
            >
                <h2 className="text-[12vw] md:text-[10vw] font-bold tracking-tighter leading-none text-text-main flex items-center">
                    FULL STACK DEVELOPER
                    <span
                        ref={iconRef}
                        className="inline-block w-[10vw] h-[10vw] mx-4 md:mx-8"
                    >
                        <GreenClover />
                    </span>
                    UI & UX DESIGNER
                </h2>
                <h2 className="text-[12vw] md:text-[10vw] font-bold tracking-tighter leading-none text-text-main/20 flex items-center" aria-hidden="true">
                    FULL STACK DEVELOPER
                </h2>
            </div>
        </section>
    );
}
