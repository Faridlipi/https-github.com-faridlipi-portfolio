"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export default function ScrollSnake() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // We need to calculate a path that goes down the screen
    // For a responsive squiggly line, we can use a simpler approach or a fixed SVG
    // A vertical progress bar is simple, but a "snake" implies winding.
    // Let's create a winding path down the left or right side.

    const [pathHeight, setPathHeight] = useState(2000);

    useEffect(() => {
        setPathHeight(document.body.scrollHeight);
    }, []);

    return (
        <div className="fixed top-0 right-10 w-24 h-full pointer-events-none z-40 hidden md:block mix-blend-screen">
            <svg viewBox={`0 0 100 ${pathHeight}`} className="w-full h-full overflow-visible">
                <motion.path
                    d={`M 50 0 Q 100 200 50 400 T 50 800 T 50 1200 T 50 1600 T 50 2000 T 50 2400`} // Simplified winding path
                    fill="none"
                    stroke="#A855F7" // Electric Violet
                    strokeWidth="2"
                    pathLength={scaleX}
                    style={{ pathLength: scaleX }}
                />
            </svg>
        </div>
    );
}

// Alternative: A simpler scroll progress bar if the snake is too complex to match perfectly blindly
export function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <motion.div
            className="fixed top-0 right-0 bottom-0 w-1 bg-primary origin-top z-50"
            style={{ scaleY }}
        />
    )
}
