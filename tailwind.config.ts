import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#0A0A0F",
                surface: "#12121A",
                primary: {
                    DEFAULT: "#A855F7", // Electric Violet
                    glow: "#C084FC",
                    dark: "#7E22CE",
                },
                text: {
                    main: "#FAFAFA",
                    muted: "#A1A1AA",
                },
                accent: "#22D3EE",
            },
            fontFamily: {
                sans: ["var(--font-manrope)", "sans-serif"],
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
            },
            animation: {
                "spin-slow": "spin 20s linear infinite",
                "pulse-slow": "pulse 10s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                marquee: "marquee 25s linear infinite",
                "marquee-reverse": "marquee-reverse 25s linear infinite",
            },
            keyframes: {
                marquee: {
                    "0%": { transform: "translateX(0%)" },
                    "100%": { transform: "translateX(-100%)" },
                },
                "marquee-reverse": {
                    "0%": { transform: "translateX(-100%)" },
                    "100%": { transform: "translateX(0%)" },
                },
            },
        },
    },
    plugins: [],
};
export default config;
