"use client";

import SmoothScroll from "@/app/components/SmoothScroll";
import Header from "@/app/components/Layout/Header";
import Hero from "@/app/components/Hero/Hero";
import Filmstrip from "@/app/components/Works/Filmstrip";
import { Footer } from "@/app/components/Layout/Sections";
import Cursor from "@/app/components/UI/Cursor";
import AudioToggle from "@/app/components/UI/AudioToggle";
import { ScrollProgress } from "@/app/components/UI/ScrollSnake";

import ParallaxStrips from "@/app/components/UI/ParallaxStrips";
import RolesMarquee from "@/app/components/Hero/RolesMarquee";
import ScrollMarquee from "@/app/components/UI/ScrollMarquee";
import ImageReveal from "@/app/components/UI/ImageReveal";
import AboutMe from "@/app/components/About/AboutMe";
import ExperienceTimeline from "@/app/components/Works/ExperienceTimeline";
import WorkWithMe from "@/app/components/Contact/WorkWithMe";

export default function Home() {
  return (
    <SmoothScroll>
      <main className="relative min-h-screen selection:bg-primary selection:text-white">
        <ScrollProgress />
        <Cursor />
        <Header />

        {/* Sticky Hero Container - z-0 to stay behind content but visible */}
        <div className="sticky top-0 left-0 w-full h-screen z-0">
          <Hero />
        </div>

        {/* Spacer with Glass Effect - z-10 to slide over */}
        <div className="w-full h-[70vh] bg-black/5 backdrop-blur-[1px] relative z-10" />

        {/* Page Content - Solid Background, z-10 to cover Hero */}
        <div className="relative z-10 bg-background">
          <RolesMarquee />
          <ScrollMarquee />
          <ImageReveal />
          <AboutMe />
          <ExperienceTimeline />
          <ParallaxStrips />
          <Filmstrip />
          <WorkWithMe />
          <Footer />
        </div>

        <AudioToggle />
      </main>
    </SmoothScroll>
  );
}
