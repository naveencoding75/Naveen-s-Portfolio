"use client"

import { useState, useEffect } from "react"

export default function Hero() {
  const [text, setText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [loopNum, setLoopNum] = useState(0)
  const [typingSpeed, setTypingSpeed] = useState(150)

  const roles = [
    "Full-Stack Developer",
    "Data Engineer",
    "B.Tech CS Student",
    "Data Science Enthusiast"
  ]

  useEffect(() => {
    let ticker = setInterval(() => handleType(), typingSpeed)
    return () => clearInterval(ticker)
  }, [text, isDeleting, loopNum])

  const handleType = () => {
    const i = loopNum % roles.length
    const fullText = roles[i]

    setText(isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1))
    setTypingSpeed(isDeleting ? 50 : 150)

    if (!isDeleting && text === fullText) {
      setTimeout(() => setIsDeleting(true), 1500)
    } else if (isDeleting && text === "") {
      setIsDeleting(false)
      setLoopNum(loopNum + 1)
      setTypingSpeed(100)
    }
  }

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-8 py-32 bg-no-repeat"
    >
      {/* The Floating Glassmorphism Card */}
      <div className="relative z-10 max-w-5xl w-full backdrop-blur-xl bg-white/5 border border-white/10 rounded-[2.5rem] p-8 sm:p-16 shadow-2xl flex flex-col items-center text-center">
        
        {/* Greeting Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 border border-white/10 mb-8">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
          </span>
          <span className="text-cyan-300 text-sm font-medium tracking-wide uppercase">
            Available for new opportunities
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-white leading-[1.1] mb-6">
          Hi, I'm <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-300">
            Naveen
          </span>
        </h1>

        {/* Typewriter Effect */}
        <h2 className="text-2xl sm:text-4xl font-bold text-gray-300 h-[40px] sm:h-[50px] flex items-center justify-center mb-6">
          I am a <span className="text-white ml-2">{text}</span>
          <span className="animate-pulse text-cyan-400 ml-1">|</span>
        </h2>

        {/* Short Bio */}
        <p className="max-w-2xl text-lg sm:text-xl text-gray-400 leading-relaxed mb-10">
          Bridging the gap between robust software architecture and advanced analytics. I build scalable web applications and automated data pipelines that drive real-world impact.
        </p>

        {/* Interactive CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-6">
          <a 
            href="#projects" 
            className="group relative px-8 py-4 bg-cyan-500/20 text-cyan-300 font-bold rounded-xl border border-cyan-500/50 hover:bg-cyan-500 hover:text-gray-900 transition-all duration-300"
          >
            <span className="relative flex items-center gap-2">
              Explore My Work
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </a>

          <a 
            href="#contact" 
            className="px-8 py-4 bg-transparent text-white font-bold rounded-xl border border-white/20 hover:bg-gray-900/40 transition-all backdrop-blur-md"
          >
            Let's Connect
          </a>
        </div>
      </div>
    </section>
  )
}