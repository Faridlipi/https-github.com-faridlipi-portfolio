"use client";

import { motion } from "framer-motion";

import { PERSONAL } from "@/lib/constants";

export function About() {
    return (
        <section id="about" className="py-32 px-6 md:px-12 bg-background flex flex-col md:flex-row gap-16 items-start">
            <div className="md:w-1/3">
                <h2 className="text-text-muted uppercase tracking-widest text-sm sticky top-32">About Me</h2>
            </div>
            <div className="md:w-2/3 space-y-8">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-5xl font-light leading-tight text-text-main"
                >
                    I am a <span className="text-primary">{PERSONAL.role}</span> & <span className="text-primary">High-Quality Web Design Specialist</span>.
                    I build complex automation systems from scratch.
                </motion.p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-lg text-text-muted">
                    <div>
                        <h3 className="text-white font-medium mb-2">Experience</h3>
                        <p>{PERSONAL.roles[2]}</p>
                    </div>
                    <div>
                        <h3 className="text-white font-medium mb-2">Languages</h3>
                        <p>{PERSONAL.languages}</p>
                    </div>
                    <div>
                        <h3 className="text-white font-medium mb-2">Contact</h3>
                        <a href={`mailto:${PERSONAL.email}`} className="hover:text-primary transition-colors">{PERSONAL.email}</a>
                    </div>
                </div>
            </div>
        </section>
    );
}

export function Footer() {
    return (
        <footer className="py-12 px-6 md:px-12 border-t border-white/5 bg-background flex justify-between items-center text-text-muted text-sm">
            <p>© {PERSONAL.copyright}. All rights reserved.</p>
            <div className="flex gap-6">
                <a href="#" className="hover:text-primary transition-colors">LinkedIn</a>
                <a href="#" className="hover:text-primary transition-colors">Twitter</a>
                <a href={`mailto:${PERSONAL.email}`} className="hover:text-primary transition-colors">Email</a>
            </div>
        </footer>
    );
}
