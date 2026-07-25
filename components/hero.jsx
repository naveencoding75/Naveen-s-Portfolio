"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { getProfilePhoto } from "@/app/admin/actions"

export default function Hero() {
  const [isCoderMode, setIsCoderMode] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Smooth transition into developer focus mode 1.5 seconds after landing
    const timer = setTimeout(() => setIsCoderMode(true), 1500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    async function fetchAvatar() {
      try {
        const activePhoto = await getProfilePhoto()
        if (activePhoto) {
          setAvatarUrl(activePhoto)
        }
      } catch (error) {
        console.error("Failed to load hero avatar:", error)
        setAvatarUrl("/my_photo.png") // Absolute emergency local fallback
      } finally {
        setIsLoading(false) // Turn off loading once database answers
      }
    }
    fetchAvatar()
  }, [])

  return (
  <section 
    id="hero" 
    className="min-h-screen pt-32 pb-20 px-4 relative z-10 overflow-hidden bg-black"
  >
    {/* Ultra-subtle deep background glow for depth on OLED black */}
    <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-black-950/15 rounded-full blur-[160px] pointer-events-none" />
    <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-950/15 rounded-full blur-[160px] pointer-events-none" />

    <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-12 gap-12 items-center min-h-[calc(100vh-8rem)]">
      
      {/* LEFT COLUMN: Typography & Actions */}
      <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left order-2 lg:order-1">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        > 
          {/* Main Heading: Crisp stark white with electric gradient accent */}
          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-100 tracking-tight leading-none mb-6">
            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white drop-shadow-[0_0_25px_rgba(56,189,248,0.2)]">Naveen Sharma</span>
          </h1>

          {/* Subheading: Softened steel-gray for optimal reading contrast */}
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed font-normal">
            Building intelligent full-stack systems and high-precision deep learning architectures. Specializing in the MERN/Next.js stack and predictive model design.
          </p>

          {/* Action Buttons: High contrast against true black */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-4">
            <a 
              href="#projects" 
              className="px-8 py-4 bg-slate-100 text-black font-bold rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:bg-white hover:shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:text-black-950 transition-all hover:-translate-y-0.5"
            >
              View My Work
            </a>
            <a 
              href="#contact" 
              className="px-8 py-4 bg-zinc-900/80 text-slate-300 font-bold rounded-xl border border-zinc-800 hover:border-zinc-700 hover:text-white hover:bg-zinc-800/80 transition-all backdrop-blur-md"
            >
              Let's Talk
            </a>
          </div>
        </motion.div>
      </div>

      {/* RIGHT COLUMN: Profile Frame Container */}
      <div className="lg:col-span-5 flex justify-center order-1 lg:order-2">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-[420px] md:h-[420px] rounded-[3rem] p-1 border border-zinc-800 bg-zinc-950/50 backdrop-blur-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden"
        >
          <div className="relative w-full h-full rounded-[2.8rem] overflow-hidden bg-black flex items-center justify-center">
            
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="skeleton"
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 w-full h-full bg-zinc-950 animate-pulse flex items-center justify-center"
                >
                  <div className="w-8 h-8 border-2 border-black-500/30 border-t-black-400 rounded-full animate-spin" />
                </motion.div>
              ) : (
                <motion.img
                  key="avatar"
                  src={avatarUrl} 
                  alt="Naveen Sharma Portrait"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: 1,
                    scale: isCoderMode ? 1.08 : 1,
                  }}
                  transition={{ 
                    opacity: { duration: 0.5 },
                    scale: { duration: 1.5, ease: "easeInOut" }
                  }}
                  className="absolute inset-0 w-full h-full object-cover z-10"
                />
              )}
            </AnimatePresence>

            <motion.div animate={{ opacity: isCoderMode ? 0.25 : 0 }} className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black-400/20 to-transparent pointer-events-none z-30" />
            <motion.div animate={{ opacity: isCoderMode ? 0.2 : 0 }} className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-blue-500/20 to-transparent pointer-events-none z-30" />
          </div>

          <div className="absolute top-6 left-6 w-4 h-4 border-t-2 border-l-2 border-black-400/40 pointer-events-none z-40" />
          <div className="absolute top-6 right-6 w-4 h-4 border-t-2 border-r-2 border-black-400/40 pointer-events-none z-40" />
          <div className="absolute bottom-6 left-6 w-4 h-4 border-b-2 border-l-2 border-black-400/40 pointer-events-none z-40" />
          <div className="absolute bottom-6 right-6 w-4 h-4 border-b-2 border-r-2 border-black-400/40 pointer-events-none z-40" />
        </motion.div>
      </div>

    </div>
  </section>
)
}