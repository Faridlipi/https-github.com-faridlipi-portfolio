"use client";

import { useState, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AudioToggle() {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const toggleAudio = () => {
        if (!audioRef.current) {
            audioRef.current = new Audio("/audio/ambient.mp3"); // Placeholder path
            audioRef.current.loop = true;
            audioRef.current.volume = 0.5;
        }

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch((e) => console.log("Audio autoplay blocked", e));
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <button
            onClick={toggleAudio}
            className={cn(
                "fixed bottom-8 left-8 z-50 p-3 rounded-full border border-white/10 bg-background/50 backdrop-blur-md transition-all hover:scale-110",
                isPlaying && "border-primary/50 text-primary"
            )}
        >
            {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
        </button>
    );
}
