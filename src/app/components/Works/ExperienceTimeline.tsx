"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const experienceData = [
    {
        date: "May 2025 – Present",
        company: "Techivation",
        title: "Full Stack Developer",
        description: "Building and maintaining Techivation's full web and SaaS ecosystem, powering audio plugin licensing and management."
    },
    {
        date: "2023 – 2025",
        company: "Freelance",
        title: "Creative Frontend Developer",
        description: "Delivered high-end websites with WebGL and GSAP animations for various international clients in the creative industry."
    },
    {
        date: "2022",
        company: "StartUp Inc",
        title: "Junior React Developer",
        description: "Collaborated on a large-scale dashboard application, implementing complex data visualization and real-time updates."
    }
];

export default function ExperienceTimeline() {
    const containerRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const pathRef = useRef<SVGPathElement>(null); // New Wave Ref

    useEffect(() => {
        const container = containerRef.current;
        const line = lineRef.current;
        const ring = ringRef.current;
        const path = pathRef.current;

        if (!container || !line || !ring) return;

        const ctx = gsap.context(() => {
            // 1. Dynamic Curve Animation (Wave)
            // SET STATIC CURVE: We want it to be a wave immediately upon entry.
            if (path) {
                const curvedPath = "M0,320 Q720,0 1440,320 L1440,320 L0,320 Z";
                gsap.to(path, {
                    attr: { d: curvedPath }, // Ensure it stays curved or animates if needed
                    duration: 0
                });
            }

            // 2. Background & Text Color Transition
            const tlColor = gsap.timeline({
                scrollTrigger: {
                    trigger: container,
                    start: "top 90%", // Start immediately
                    end: "top 70%",   // Finish VERY quickly (High twitch speed)
                    scrub: 0.5,
                }
            });

            tlColor
                .to(container, { backgroundColor: "#050505", duration: 1, ease: "power2.inOut" })
                .to(container.querySelectorAll("h2, h3"), { color: "#ffffff", duration: 1 }, "<")
                .to(container.querySelectorAll("p, h4"), { color: "#a3a3a3", duration: 1 }, "<")
                .to(container.querySelectorAll(".spine-bg"), { backgroundColor: "rgba(255,255,255,0.1)", duration: 1 }, "<")
                // Animate Wave Fill to match Dark Theme - Crucial!
                .to(path, { fill: "#050505", duration: 1 }, "<");

            // 3. Spine Animation (Fill & Ring)
            gsap.fromTo(line,
                { height: "0%" },
                {
                    height: "100%",
                    ease: "none",
                    scrollTrigger: {
                        trigger: container,
                        start: "top center",
                        end: "bottom bottom",
                        scrub: 0,
                    }
                }
            );

            // 4. Item Animations
            const items = gsap.utils.toArray<HTMLElement>(".timeline-item");

            items.forEach((item) => {
                const textElements = item.querySelectorAll(".text-slide-up");

                // Animate Text Sliding Up (Staggered)
                if (textElements.length > 0) {
                    gsap.fromTo(textElements,
                        { y: "110%", opacity: 0 },
                        {
                            y: "0%",
                            opacity: 1,
                            duration: 1.2,
                            stagger: 0.08, // Stagger text lines
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: item,
                                start: "top 80%", // Trigger earlier
                                toggleActions: "play none none reverse"
                            }
                        }
                    );
                }

                // Animate Divider Line (Optional)
                gsap.fromTo(item.querySelectorAll(".item-divider"),
                    { scaleX: 0 },
                    {
                        scaleX: 1,
                        duration: 1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: item,
                            start: "top 80%"
                        }
                    }
                );
            });

        }, container);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative w-full min-h-[300vh] py-64 overflow-hidden flex flex-col items-center bg-white text-neutral-900 z-30"
            style={{ marginTop: "-100px" }}
        >

            {/* DYNAMIC SCROLL CURVE SVG (Wave) */}
            <div className="absolute top-0 left-0 w-full h-[200px] md:h-[320px] -translate-y-[99%] overflow-hidden leading-none z-30 pointer-events-none">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1440 320"
                    preserveAspectRatio="none"
                    className="w-full h-full block"
                >
                    <path
                        ref={pathRef}
                        fill="#ffffff" // Starts White
                        d="M0,320 Q720,0 1440,320 L1440,320 L0,320 Z" // Default CURVED
                    />
                </svg>
            </div>

            {/* Header */}
            <div className="relative z-20 text-center mb-60 px-4">
                <h2 className="text-5xl md:text-8xl font-bold tracking-tighter transition-colors">
                    Experience
                </h2>
            </div>

            {/* Central Spine Container */}
            <div className="spine-bg absolute top-[45vh] bottom-[10vh] left-1/2 -translate-x-1/2 w-[2px] h-[80%] bg-neutral-200 z-0 transition-colors">
                {/* The Green Fill Line - DEEPER GLOW */}
                <div
                    ref={lineRef}
                    className="absolute top-0 left-0 w-full bg-[#8b5cf6] shadow-[0_0_40px_rgba(139,92,246,1)]"
                    style={{ height: "0%" }}
                >
                    {/* The Hollow Ring - DEEPER GLOW */}
                    <div
                        ref={ringRef}
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-5 h-5 border-[3px] border-[#8b5cf6] rounded-full bg-black z-10 shadow-[0_0_30px_rgba(139,92,246,1),0_0_60px_rgba(139,92,246,0.8)]"
                    />
                </div>
            </div>

            {/* Timeline Items Items */}
            <div className="w-full max-w-[1200px] relative z-10 flex flex-col gap-80 px-4 md:px-0">
                {experienceData.map((item, index) => (
                    <div
                        key={index}
                        className={cn(
                            "timeline-item w-full flex items-center justify-between",
                            index % 2 === 0 ? "flex-row" : "flex-row-reverse" // Alternating
                        )}
                    >
                        {/* Content Card */}
                        <div className={cn(
                            "w-full md:w-[42%] p-8 md:p-12",
                            index % 2 === 0 ? "text-right" : "text-left"
                        )}>
                            <div className={cn(
                                "flex flex-col gap-4",
                                index % 2 === 0 ? "items-end" : "items-start"
                            )}>
                                <div className="overflow-hidden">
                                    <span className="text-slide-up inline-block px-4 py-1 rounded-full border border-[#8b5cf6]/30 text-[#8b5cf6] font-mono text-sm tracking-wider bg-[#8b5cf6]/5">
                                        {item.date}
                                    </span>
                                </div>
                                <div className="overflow-hidden">
                                    <h3 className="text-slide-up text-4xl md:text-6xl font-bold text-neutral-900 dark:text-white leading-tight">
                                        {item.company}
                                    </h3>
                                </div>
                                <div className="overflow-hidden">
                                    <h4 className="text-slide-up text-xl md:text-2xl text-neutral-500 dark:text-neutral-400 font-light">
                                        {item.title}
                                    </h4>
                                </div>
                                <div className="overflow-hidden">
                                    <p className="text-slide-up text-lg md:text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-xl">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Spacer for opposite side */}
                        <div className="w-full md:w-[42%] hidden md:block" />
                    </div>
                ))}
            </div>

            {/* Decorative Snake Background (Optional/Subtle) */}
            <svg
                className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20 mix-blend-overlay"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
            >
                <path
                    d="M 20 0 Q 30 20 20 40 T 20 80 T 20 120"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.2"
                    className="text-[#8b5cf6]"
                />
                <path
                    d="M 80 0 Q 70 20 80 40 T 80 80 T 80 120"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.2"
                    className="text-[#8b5cf6]"
                />
            </svg>

        </section>
    );
}
