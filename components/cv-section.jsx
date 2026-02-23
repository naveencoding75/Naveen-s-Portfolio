"use client"

import { useState, useEffect, useRef } from "react"
import { getResume } from "@/app/admin/actions" 

export default function CVSection() {
  const [showPDF, setShowPDF] = useState(false)
  const [resumeUrl, setResumeUrl] = useState("/resume.pdf") 
  const ref = useRef(null)

  useEffect(() => {
    async function fetchResume() {
      const dbResume = await getResume()
      if (dbResume) setResumeUrl(dbResume)
    }
    fetchResume()
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("opacity-100", "translate-y-0")
          entry.target.classList.remove("opacity-0", "translate-y-10")
        }
      },
      { threshold: 0.1 },
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="cv" className="py-24 px-4 relative">
      <div className="max-w-3xl mx-auto relative z-10">
        <div ref={ref} className="opacity-0 translate-y-10 transition-all duration-1000">
          
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold flex items-center justify-center gap-4 text-white">
              <span className="h-px w-12 bg-gradient-to-r from-blue-500 to-cyan-400" />
              My Resume
              <span className="h-px w-12 bg-gradient-to-l from-blue-500 to-cyan-400" />
            </h2>
          </div>

          {/* Centered Content Block */}
          <div className="flex flex-col items-center text-center space-y-8 p-10 rounded-3xl bg-gray-900/40 border border-white/5 backdrop-blur-md shadow-2xl">
            
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
              <svg className="w-10 h-10 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 1 1 0 000 2 1 1 0 100 2H3a1 1 0 000 2h1a1 1 0 000 2H4a2 2 0 01-2-2V5zm16 0a2 2 0 00-2-2 1 1 0 000 2 1 1 0 110 2h1a1 1 0 100-2h-1a1 1 0 000-2h-4a2 2 0 00-2 2v10a2 2 0 002 2h4a2 2 0 002-2V5z" />
              </svg>
            </div>
            
            <div>
              <p className="text-gray-300 text-lg max-w-lg mx-auto">
                Review my full work history, technical skills, and educational background. Available for download or immediate viewing.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-6 w-full mt-4">
              <a
                href={resumeUrl}
                download="Naveen_Sharma_Resume.pdf"
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-xl overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_30px_5px_rgba(6,182,212,0.2)]"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <span className="relative flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                  Download PDF
                </span>
              </a>
              
              <button
                onClick={() => setShowPDF(!showPDF)}
                className="px-8 py-4 bg-gray-800 text-cyan-400 font-bold rounded-xl border border-cyan-500/30 hover:bg-cyan-500/10 transition-all flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                {showPDF ? "Hide Preview" : "View Preview"}
              </button>
            </div>
          </div>

          {/* PDF Preview Modal remains the same */}
          {showPDF && (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
               {/* ... Keep your existing modal code here ... */}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}