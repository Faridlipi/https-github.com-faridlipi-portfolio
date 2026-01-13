"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function ImageReveal() {
    const containerRef = useRef<HTMLDivElement>(null);
    const imageWrapperRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        const wrapper = imageWrapperRef.current;
        const image = imageRef.current;

        if (!container || !wrapper || !image) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container,
                start: "top 85%", // Start early
                end: "center center",
                scrub: 1.2,
            },
        });

        // 1. Frame Reveal (Elegant Portrait)
        tl.fromTo(
            wrapper,
            {
                scale: 0.9,
                borderRadius: "50px", // Very rounded start
                boxShadow: "0 0 0 0px rgba(0,0,0,0)",
                border: "1px solid rgba(255,255,255,0)",
            },
            {
                scale: 1,
                borderRadius: "24px", // Elegant tablet-like corner
                boxShadow: "0 25px 80px -20px rgba(255, 255, 255, 0.15)", // White/Main Glow
                border: "2px solid rgba(255,255,255,0.15)", // Thicker Glass Edge
                ease: "power2.out",
                duration: 1,
            }
        );

        // 2. Internal Image Zoom
        tl.fromTo(
            image,
            {
                scale: 1.25,
                filter: "grayscale(100%)",
            } as any,
            {
                scale: 1.0,
                filter: "grayscale(0%)",
                ease: "power2.out",
                duration: 1,
            } as any,
            "<"
        );

        return () => {
            tl.kill();
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    // Hover Effect: Glow Only (No Shine Beam)
    const handleMouseEnter = () => {
        if (!imageWrapperRef.current) return;

        // Light up the frame (Border + Shadow)
        gsap.to(imageWrapperRef.current, {
            borderColor: "rgba(255,255,255,0.5)",
            boxShadow: "0 30px 100px -10px rgba(255, 255, 255, 0.25)", // Brighter Glow
            duration: 0.4,
            overwrite: "auto"
        });
    };

    const handleMouseLeave = () => {
        if (!imageWrapperRef.current) return;

        // Revert to default subtle glow
        gsap.to(imageWrapperRef.current, {
            borderColor: "rgba(255,255,255,0.15)",
            boxShadow: "0 25px 80px -20px rgba(255, 255, 255, 0.15)",
            duration: 0.5,
            overwrite: "auto"
        });
    };

    return (
        // Balanced Padding: Enough space for the Wave, but not breaking the layout
        <div ref={containerRef} className="relative w-full pt-20 pb-48 md:pt-32 md:pb-64 flex justify-center items-center px-6">

            {/* Portrait Frame: 4:5 Aspect Ratio (Wider Portrait) */}
            <div
                ref={imageWrapperRef}
                className="relative w-full max-w-[500px] aspect-[4/5] overflow-hidden bg-neutral-900 group cursor-pointer"
                style={{ willChange: "transform, borderRadius, boxShadow" }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <Image
                    ref={imageRef}
                    src="/farid-profile.jpg"
                    alt="Farid Lipi"
                    fill
                    className="object-cover object-top"
                    priority
                />
            </div>
        </div>
    );
}
