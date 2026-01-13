"use client";

import { useEffect, useRef } from 'react';

export default function AntigravityHero() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Register the Paint Worklet from UNPKG as requested in the snippet
        if ('paintWorklet' in CSS) {
            (CSS as any).paintWorklet.addModule(
                'https://unpkg.com/css-houdini-ringparticles/dist/ringparticles.js'
            );
        }
    }, []);

    const handleMouseMove = (e: React.MouseEvent) => {
        const container = containerRef.current;
        if (!container) return;

        // Calculate normalized mouse position (0-100)
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;

        container.style.setProperty('--ring-x', x.toString());
        container.style.setProperty('--ring-y', y.toString());
        container.style.setProperty('--ring-interactive', '1');
    };

    const handleMouseLeave = () => {
        const container = containerRef.current;
        if (!container) return;

        container.style.setProperty('--ring-interactive', '0');
        container.style.setProperty('--ring-x', '50');
        container.style.setProperty('--ring-y', '50');
    };

    return (
        <div
            id="welcome"
            ref={containerRef}
            className="absolute inset-0 w-full h-full z-0 pointer-events-auto"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                background: 'paint(ring-particles)',

                // EXACT PROPS FROM SNIPPET
                '--ring-radius': '100', // Initial value, animated by CSS
                '--ring-thickness': '600',
                '--particle-count': '80',
                '--particle-rows': '25',
                '--particle-size': '2',
                '--particle-color': '#4352c7', // "navy" in snippet, keeping Indigo for visibility
                '--particle-min-alpha': '0.1',
                '--particle-max-alpha': '1.0',
                '--seed': '200',

                // ANIMATIONS FROM SNIPPET
                animation: 'ripple 6s linear infinite, ring 6s ease-in-out infinite alternate',

                // INIT PROPS
                '--ring-x': '50',
                '--ring-y': '50',
                '--ring-interactive': '0',
                '--animation-tick': '0',

                // TRANSITION FROM SNIPPET
                transition: '--ring-x 3s ease, --ring-y 3s ease',
            } as React.CSSProperties}
        />
    );
}
