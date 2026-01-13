"use client";

import { PERSONAL } from "@/lib/constants";

export default function RolesMarquee() {
    return (
        <div className="w-full overflow-hidden whitespace-nowrap bg-black py-12 z-20 relative">
            <div className="relative flex select-none overflow-hidden">
                <div className="animate-marquee inline-block text-5xl md:text-8xl font-bold tracking-tight text-[#F2F0E6]">
                    {PERSONAL.roles[0]} — {PERSONAL.roles[1]} — {PERSONAL.roles[2]} — {PERSONAL.roles[3]} —
                </div>
                <div className="animate-marquee inline-block text-5xl md:text-8xl font-bold tracking-tight text-[#F2F0E6]" aria-hidden="true">
                    {PERSONAL.roles[0]} — {PERSONAL.roles[1]} — {PERSONAL.roles[2]} — {PERSONAL.roles[3]} —
                </div>
            </div>
        </div>
    );
}
