"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function AboutMe() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const pathRef = useRef<SVGPathElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const textLines = textRef.current?.querySelectorAll(".word-line-inner");
        const path = pathRef.current;

        if (!section || !textLines || !path) return;

        const ctx = gsap.context(() => {

            // 1. Dynamic Curve Animation
            if (path) {
                const flatPath = "M0,320 Q720,320 1440,320 L1440,320 L0,320 Z";
                const curvedPath = "M0,320 Q720,0 1440,320 L1440,320 L0,320 Z";

                gsap.set(path, { attr: { d: flatPath } });

                gsap.to(path, {
                    attr: { d: curvedPath },
                    ease: "none",
                    scrollTrigger: {
                        trigger: section,
                        start: "top bottom",
                        end: "center center",
                        scrub: 1,
                    }
                });
            }

            // 2. Masked Text Reveal
            if (textLines && textLines.length > 0) {
                gsap.fromTo(textLines,
                    { y: "100%", opacity: 0 },
                    {
                        y: "0%",
                        opacity: 1,
                        duration: 1.1,
                        stagger: 0.1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: textRef.current, // Use ref directly
                            start: "top 75%", // Relaxed trigger
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            }

        }, section);

        // Refresh triggers after mount to account for layout shifts
        setTimeout(() => ScrollTrigger.refresh(), 100);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative w-full bg-white text-black pb-32 md:pb-64 z-20"
            style={{ marginTop: "-100px" }}
        >
            {/* DYNAMIC SCROLL CURVE SVG */}
            <div className="absolute top-0 left-0 w-full h-[250px] -translate-y-[99%] overflow-hidden leading-none z-20 pointer-events-none">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1440 320"
                    preserveAspectRatio="none"
                    className="w-full h-full block"
                    shapeRendering="geometricPrecision"
                >
                    <path
                        ref={pathRef}
                        fill="#ffffff"
                        d="M0,320 Q720,320 1440,320 L1440,320 L0,320 Z" // Default flat
                    ></path>
                </svg>
            </div>

            <div className="container mx-auto px-6 pt-20 md:pt-40 flex flex-col items-center text-center">

                {/* Text Content - Centered (Image Removed) */}
                <div ref={textRef} className="space-y-6 max-w-4xl mx-auto">
                    <div className="overflow-hidden">
                        <h2 className="text-5xl md:text-8xl font-bold leading-[0.9] tracking-tighter">
                            <div className="word-line-inner">I&apos;m Farid – a</div>
                        </h2>
                    </div>

                    <div className="overflow-hidden">
                        <h2 className="text-5xl md:text-8xl font-bold leading-[0.9] tracking-tighter text-[#8b5cf6]">
                            <div className="word-line-inner">Full Stack</div>
                        </h2>
                    </div>

                    <div className="overflow-hidden mb-8">
                        <h2 className="text-5xl md:text-8xl font-bold leading-[0.9] tracking-tighter text-[#8b5cf6]">
                            <div className="word-line-inner">Developer</div>
                        </h2>
                    </div>

                    <div className="space-y-2 text-xl md:text-3xl text-neutral-600 font-light leading-relaxed pt-8 max-w-2xl mx-auto">
                        <div className="overflow-hidden">
                            <p className="word-line-inner">crafting fast, scalable, and immersive digital</p>
                        </div>
                        <div className="overflow-hidden">
                            <p className="word-line-inner">experiences that merge creativity with</p>
                        </div>
                        <div className="overflow-hidden">
                            <p className="word-line-inner">engineering precision.</p>
                        </div>
                    </div>

                    <div className="overflow-hidden pt-12">
                        <div className="word-line-inner">
                            <button className="px-12 py-6 bg-black text-white rounded-full text-xl font-medium hover:bg-[#8b5cf6] hover:text-white transition-all duration-300 transform hover:scale-105">
                                About Me
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
