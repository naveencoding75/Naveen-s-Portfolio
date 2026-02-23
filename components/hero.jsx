"use client"

import { useState, useEffect } from "react"

export default function Hero() {
  const [text, setText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [loopNum, setLoopNum] = useState(0)
  const [typingSpeed, setTypingSpeed] = useState(150)

  // The roles that will cycle in the typewriter effect
  const roles = [
    "Full-Stack Developer",
    "Data Engineer",
    "B.Tech CS Student",
    "Data Science Enthusiast"
  ]

  useEffect(() => {
    let ticker = setInterval(() => {
      handleType()
    }, typingSpeed)

    return () => clearInterval(ticker)
  }, [text, isDeleting, loopNum])

  const handleType = () => {
    const i = loopNum % roles.length
    const fullText = roles[i]

    setText(
      isDeleting
        ? fullText.substring(0, text.length - 1)
        : fullText.substring(0, text.length + 1)
    )

    // Adjust typing speed dynamically
    setTypingSpeed(isDeleting ? 50 : 150)

    if (!isDeleting && text === fullText) {
      // Pause at the end of typing a word
      setTimeout(() => setIsDeleting(true), 1500)
    } else if (isDeleting && text === "") {
      setIsDeleting(false)
      setLoopNum(loopNum + 1)
      setTypingSpeed(100) // Small pause before typing next word
    }
  }

  return (
    <section id="home" className="relative pt-32 pb-20 px-4 sm:pt-40 min-h-[90vh] flex items-center">
      {/* Subtle floating background glow just for the hero */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto w-full relative z-10">
        <div className="flex flex-col items-start gap-6">
          
          {/* Greeting Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
            </span>
            <span className="text-cyan-300 text-sm font-medium tracking-wide uppercase">
              Available for new opportunities
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
            Hi, I'm <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-300 animate-gradient-x">
              Naveen
            </span>
          </h1>

          {/* Typewriter Effect */}
          <h2 className="text-2xl sm:text-4xl font-bold text-gray-400 h-[40px] sm:h-[50px] flex items-center">
            I am a <span className="text-white ml-2">{text}</span>
            <span className="animate-pulse text-cyan-400 ml-1">|</span>
          </h2>

          {/* Short Bio */}
          <p className="max-w-2xl text-lg sm:text-xl text-gray-400 leading-relaxed mt-4">
            Bridging the gap between robust software architecture and advanced analytics. I build scalable web applications and automated data pipelines that drive real-world impact.
          </p>

          {/* Interactive CTA Buttons */}
          <div className="flex flex-wrap items-center gap-6 mt-8">
            {/* Primary Button */}
            <a 
              href="#projects" 
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-lg overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_8px_rgba(6,182,212,0.3)]"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <span className="relative flex items-center gap-2">
                Explore My Work
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </a>

            {/* Secondary Button */}
            <a 
              href="#contact" 
              className="group px-8 py-4 bg-transparent text-cyan-400 font-bold rounded-lg border border-cyan-500/50 hover:bg-cyan-500/10 transition-all flex items-center gap-2"
            >
              Let's Connect
            </a>
          </div>

          {/* Tech Stack Mini-Icons (Optional flex) */}
          <div className="mt-16 pt-8 border-t border-white/10 w-full">
            <p className="text-sm text-gray-500 mb-4 uppercase tracking-widest font-semibold">Current Stack</p>
            <div className="flex gap-4 sm:gap-8 flex-wrap text-gray-400 font-medium">
              <span className="hover:text-cyan-400 transition-colors cursor-default">Next.js</span>
              <span className="hover:text-cyan-400 transition-colors cursor-default">Node.js</span>
              <span className="hover:text-cyan-400 transition-colors cursor-default">MySQL</span>
              <span className="hover:text-cyan-400 transition-colors cursor-default">MongoDB</span>
              <span className="hover:text-cyan-400 transition-colors cursor-default">Redis</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}