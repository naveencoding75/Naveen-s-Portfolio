"use client"

import { useState, useEffect, useRef } from "react"

export default function CVSection() {
  const [showPDF, setShowPDF] = useState(false)
  const ref = useRef(null)

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
    <section className="py-20 px-4 bg-white/5">
      <div className="max-w-4xl mx-auto">
        <div ref={ref} className="opacity-0 translate-y-10 transition-all duration-1000">
          <h2 className="text-4xl font-bold mb-12 text-center flex items-center justify-center gap-4">
            <span className="h-px w-8 bg-gradient-to-r from-blue-400 to-cyan-400" />
            My CV
          </h2>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* CV Preview Info */}
            <div className="space-y-6">
              <div className="p-6 rounded-lg bg-white/5 border border-white/10">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path
                      fillRule="evenodd"
                      d="M4 5a2 2 0 012-2 1 1 0 000 2 1 1 0 100 2H3a1 1 0 000 2h1a1 1 0 000 2H4a2 2 0 01-2-2V5zm16 0a2 2 0 00-2-2 1 1 0 000 2 1 1 0 110 2h1a1 1 0 100-2h-1a1 1 0 000-2h-4a2 2 0 00-2 2v10a2 2 0 002 2h4a2 2 0 002-2V5z"
                    />
                  </svg>
                  My Resume
                </h3>
                <p className="text-gray-300">
                  Download my CV to see my detailed work experience, education, skills, and achievements.
                </p>
              </div>

              <div className="flex gap-4 flex-col sm:flex-row">
                <a
                  href="/resume.pdf"
                  download="Resume.pdf"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105 text-center"
                >
                  Download CV
                </a>
                <button
                  onClick={() => setShowPDF(!showPDF)}
                  className="flex-1 px-6 py-3 border border-cyan-400/50 text-cyan-400 rounded-lg font-medium hover:bg-cyan-400/10 transition-all duration-300"
                >
                  {showPDF ? "Hide Preview" : "View Preview"}
                </button>
              </div>
            </div>

            {/* PDF Preview Modal */}
            {showPDF && (
              <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                <div className="bg-gray-950 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/10">
                  <div className="sticky top-0 bg-gray-900 p-4 border-b border-white/10 flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Resume Preview</h3>
                    <button
                      onClick={() => setShowPDF(false)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <div className="p-6">
                    {/* Option 1: Using an Iframe (Most reliable for modern browsers) */}
                    <iframe 
                      src="/resume.pdf" 
                      className="w-full h-[600px] rounded-lg border border-white/10"
                      title="Resume Preview"
                    >
                    </iframe>

                    {/* Option 2: Fallback text for mobile devices that don't support embedding */}
                    <div className="mt-4 text-center text-sm text-gray-500 sm:hidden">
                      <p>
                        PDF previews may not be available on all mobile devices. 
                        <a href="/resume.pdf" download className="text-cyan-400 underline ml-1">
                          Download the file
                        </a> 
                        to view it.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
