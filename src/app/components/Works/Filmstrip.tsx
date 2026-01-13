"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { MoveRight } from "lucide-react";
import { IMAGES } from "@/lib/constants";

export default function Filmstrip() {
    const [activeProject, setActiveProject] = useState<number | null>(null);

    return (
        <section id="works" className="relative w-full min-h-screen bg-surface flex flex-col justify-end overflow-hidden py-64">
            {/* Background Reveal */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <AnimatePresence mode="popLayout">
                    {activeProject !== null ? (
                        <motion.div
                            key={activeProject}
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 0.3, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
                            className="absolute inset-0"
                        >
                            <img
                                src={IMAGES.projects[activeProject].src}
                                alt="Background"
                                className="w-full h-full object-cover blur-3xl"
                            />
                            <div className="absolute inset-0 bg-background/50" />
                        </motion.div>
                    ) : (
                        <div className="absolute inset-0 bg-surface" />
                    )}
                </AnimatePresence>
            </div>

            {/* Big Title in Background */}
            <div className="absolute top-[20%] left-6 md:left-24 z-10 pointer-events-none mix-blend-overlay opacity-50">
                <AnimatePresence mode="wait">
                    {activeProject !== null && (
                        <motion.h2
                            key={activeProject}
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -50, opacity: 0 }}
                            transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
                            className="text-[15vw] font-bold text-white tracking-tighter leading-none whitespace-nowrap"
                        >
                            {IMAGES.projects[activeProject].title}
                        </motion.h2>
                    )}
                </AnimatePresence>
            </div>

            <div className="z-10 px-6 md:px-12 mb-8 md:mb-12">
                <h3 className="text-sm md:text-xl uppercase tracking-widest text-text-muted">Selected Works</h3>
            </div>

            {/* The Interactive Filmstrip */}
            <div
                onMouseLeave={() => setActiveProject(null)}
                className="relative z-20 w-full h-[50vh] flex px-0 md:px-0 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none no-scrollbar"
            >
                {IMAGES.projects.map((project, index) => (
                    <motion.div
                        key={index}
                        onHoverStart={() => setActiveProject(index)}
                        className="group relative flex-none w-[85vw] md:w-auto md:flex-1 h-full overflow-hidden cursor-pointer transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] md:hover:flex-[4] border-r border-white/5 last:border-r-0 snap-center grayscale md:grayscale-[0.5] hover:grayscale-0 rounded-[32px] mx-2 first:ml-0 last:mr-0"
                    >
                        {/* Image */}
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500 z-10" />
                        <img
                            src={project.src}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                        />

                        {/* Info Overlay */}
                        <div className="absolute inset-0 p-8 flex flex-col justify-end z-20 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/90 to-transparent">
                            <span className="text-primary text-xs font-mono mb-2 uppercase tracking-widest">{project.category}</span>
                            <div className="flex justify-between items-end">
                                <h4 className="text-3xl font-bold leading-none text-white">{project.title}</h4>
                                <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 transform translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                                    <MoveRight size={18} />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
