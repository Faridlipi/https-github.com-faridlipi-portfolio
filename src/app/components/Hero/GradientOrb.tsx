"use client";

export default function GradientOrb() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
            {/* SVG Filter for Liquid Effect */}
            <svg className="hidden">
                <defs>
                    <filter id="goo">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
                        <feColorMatrix
                            in="blur"
                            mode="matrix"
                            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10"
                            result="goo"
                        />
                        <feBlend in="SourceGraphic" in2="goo" />
                    </filter>
                </defs>
            </svg>

            <div className="absolute inset-0 filter url('#goo') opacity-80" style={{ filter: "url(#goo)" }}>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/30 rounded-full animate-float mix-blend-screen blur-xl" />
                <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] bg-accent/30 rounded-full animate-float-delayed mix-blend-screen blur-xl" />
                <div className="absolute bottom-1/3 right-1/3 w-[500px] h-[500px] bg-primary-dark/30 rounded-full animate-pulse-slow mix-blend-screen blur-xl" />
            </div>

            <div className="absolute inset-0 bg-background/20 backdrop-blur-[60px]" />
        </div>
    );
}
