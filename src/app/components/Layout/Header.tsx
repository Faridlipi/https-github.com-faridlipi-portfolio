"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

import { PERSONAL } from "@/lib/constants";

const NAV_ITEMS = [
    { label: "About", href: "#about" },
    { label: "Expertise", href: "#expertise" },
    { label: "Works", href: "#works" },
    { label: "Contact", href: "#contact" },
];

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-6 md:px-12 backdrop-blur-sm">
            <Link href="/" className="text-2xl font-bold tracking-tighter uppercase">
                {PERSONAL.name}
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex gap-8">
                {NAV_ITEMS.map((item) => (
                    <Link
                        key={item.label}
                        href={item.href}
                        className="text-sm font-medium uppercase tracking-widest hover:text-primary transition-colors"
                    >
                        {item.label}
                    </Link>
                ))}
            </nav>

            {/* Mobile Nav Button */}
            <button
                className="md:hidden p-2 z-50 relative"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <X /> : <Menu />}
            </button>

            {/* Mobile Menu Overlay */}
            <div
                className={cn(
                    "fixed inset-0 bg-background flex flex-col items-center justify-center gap-8 transition-transform duration-500 ease-in-out md:hidden",
                    isOpen ? "translate-y-0" : "-translate-y-full"
                )}
            >
                {NAV_ITEMS.map((item) => (
                    <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="text-4xl font-bold tracking-tighter hover:text-primary transition-colors"
                    >
                        {item.label}
                    </Link>
                ))}
            </div>
        </header>
    );
}
