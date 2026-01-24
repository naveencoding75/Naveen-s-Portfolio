"use client"

import { useState } from "react"
import Link from "next/link"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: "smooth" })
    setIsOpen(false)
  }

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <Link
            href="/"
            className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
          >
            NS
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8">
          {["about", "projects", "skills", "contact"].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item)}
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors capitalize"
            >
              {item}
            </button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden flex items-center gap-2 text-white">
          <div className="w-6 h-5 flex flex-col justify-between">
            <span className={`h-0.5 w-full bg-white transition-all ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`h-0.5 w-full bg-white transition-all ${isOpen ? "opacity-0" : ""}`} />
            <span className={`h-0.5 w-full bg-white transition-all ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </div>
        </button>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="absolute top-16 left-0 right-0 bg-background/95 backdrop-blur-md border-b border-white/5 md:hidden">
            <div className="flex flex-col gap-4 p-4">
              {["about", "projects", "skills", "contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="text-sm font-medium text-gray-300 hover:text-white transition-colors capitalize text-left"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
