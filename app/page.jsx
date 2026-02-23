"use client"

import { useState, useEffect } from "react"
import Navigation from "@/components/navigation"
import Hero from "@/components/hero"
import About from "@/components/about"
import Projects from "@/components/projects"
import Skills from "@/components/skills"
import CVSection from "@/components/cv-section"
import Contact from "@/components/contact"
import Footer from "@/components/footer"

export default function Home() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    // 1. Handle Mouse Movement for the Spotlight
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }

    // 2. Handle Scroll Progress for the Top Bar
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scroll = `${totalScroll / windowHeight}`
      setScrollProgress(scroll)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("scroll", handleScroll)
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    // Added selection color so when users highlight text, it matches your theme
    <div className="relative bg-gray-950 text-gray-100 min-h-screen selection:bg-cyan-500/30 overflow-hidden font-sans">
      
      {/* Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 z-50 transition-all duration-75"
        style={{ width: `${scrollProgress * 100}%` }}
      />

      {/* Static Tech/Data Grid Background */}
      <div className="fixed inset-0 -z-10 h-full w-full bg-gray-950 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]">
        {/* Central ambient glow to prevent the background from feeling too flat */}
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[500px] w-[500px] rounded-full bg-blue-500 opacity-20 blur-[120px]"></div>
      </div>

      {/* Interactive Mouse Spotlight (Masking the grid) */}
      <div
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
        style={{
          background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(34, 211, 238, 0.04), transparent 40%)`,
        }}
      />

      {/* Added z-40 to ensure content stays above the background effects */}
      <div className="relative z-40">
        <Navigation />
        <main className="flex flex-col gap-16 sm:gap-32 pb-24">
          <Hero />
          <About />
          <Projects />
          <Skills />
          <CVSection />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  )
}