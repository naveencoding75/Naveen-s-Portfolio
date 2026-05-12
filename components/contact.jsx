"use client"

import { useState, useEffect, useRef } from "react"

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [status, setStatus] = useState("")
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus("sending")

    try {
      const response = await fetch("https://formspree.io/f/mlgjonwb", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setStatus("success")
        setFormData({ name: "", email: "", message: "" })
        setTimeout(() => setStatus(""), 3000)
      } else {
        setStatus("error")
        setTimeout(() => setStatus(""), 3000)
      }
    } catch (error) {
      console.error("Form submission error:", error)
      setStatus("error")
      setTimeout(() => setStatus(""), 3000)
    }
  }

  return (
    <section 
      id="contact" 
      // 1. Unified Parallax Background
      className="py-24 px-4 relative z-10 overflow-hidden"
    >
      
      {/* 3. Glowing ambient orb for glass refraction */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div ref={ref} className="opacity-0 translate-y-10 transition-all duration-1000">
          
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold flex items-center justify-center gap-4 text-white">
              <span className="h-px w-12 bg-gradient-to-r from-blue-500 to-cyan-400" />
              Let's Work Together
              <span className="h-px w-12 bg-gradient-to-l from-blue-500 to-cyan-400" />
            </h2>
            <p className="text-gray-300 mt-4 max-w-2xl mx-auto text-lg leading-relaxed">
              Have a project in mind or looking for a full-stack developer? I'm currently available for new opportunities.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-12 lg:gap-8 items-start">
            
            {/* Left Column: Contact Info Cards with Glassmorphism */}
            <div className="lg:col-span-2 space-y-4">
              
              {/* Email Card */}
              <div className="group p-6 rounded-2xl backdrop-blur-2xl bg-gray-900/40 border border-white/20 hover:border-cyan-500/50 transition-all duration-300 flex items-center gap-6 shadow-xl">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-cyan-500/30 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <svg className="w-7 h-7 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-cyan-400 font-bold mb-1 uppercase tracking-widest">Email</p>
                  <h3 className="font-semibold text-white text-lg">naveenthor27@gmail.com</h3>
                </div>
              </div>

              {/* Phone Card */}
              <div className="group p-6 rounded-2xl backdrop-blur-2xl bg-gray-900/40 border border-white/20 hover:border-cyan-500/50 transition-all duration-300 flex items-center gap-6 shadow-xl">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-cyan-500/30 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <svg className="w-7 h-7 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-cyan-400 font-bold mb-1 uppercase tracking-widest">Phone</p>
                  <h3 className="font-semibold text-white text-lg">+91-8084026171</h3>
                </div>
              </div>

              {/* Location Card */}
              <div className="group p-6 rounded-2xl backdrop-blur-2xl bg-gray-900/40 border border-white/20 hover:border-cyan-500/50 transition-all duration-300 flex items-center gap-6 shadow-xl">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-cyan-500/30 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <svg className="w-7 h-7 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-cyan-400 font-bold mb-1 uppercase tracking-widest">Location</p>
                  <h3 className="font-semibold text-white text-lg">Asansol, West Bengal</h3>
                </div>
              </div>
            </div>

            {/* Right Column: The Form with Glassmorphism */}
            <div className="lg:col-span-3 backdrop-blur-2xl bg-gray-900/40 p-8 md:p-10 rounded-[2.5rem] border border-white/20 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <input type="text" name="_gotcha" style={{ display: "none" }} />

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-300 ml-1 uppercase tracking-wider">Name</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-black/40 border border-white/10 rounded-xl focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all text-white placeholder-gray-600"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-300 ml-1 uppercase tracking-wider">Email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-black/40 border border-white/10 rounded-xl focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all text-white placeholder-gray-600"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-300 ml-1 uppercase tracking-wider">Message</label>
                  <textarea
                    name="message"
                    placeholder="Tell me about your project..."
                    rows="6"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-5 py-4 bg-black/40 border border-white/10 rounded-xl focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all text-white placeholder-gray-600 resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-xl overflow-hidden transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_5px_rgba(6,182,212,0.3)] disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed mt-4"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                  <span className="relative flex items-center justify-center gap-2">
                    {status === "sending" ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : status === "success" ? (
                      "✓ Message Sent!"
                    ) : (
                      <>
                        Send Message
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </>
                    )}
                  </span>
                </button>

                {status === "success" && (
                  <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <p className="text-green-400 text-sm text-center font-medium">Thank you! I'll get back to you as soon as possible.</p>
                  </div>
                )}
                {status === "error" && (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <p className="text-red-400 text-sm text-center font-medium">Something went wrong. Please try again or email me directly.</p>
                  </div>
                )}
              </form>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  )
}