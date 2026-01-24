"use client"

import { useEffect, useRef } from "react"

export default function About() {
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
    <section id="about" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div ref={ref} className="opacity-0 translate-y-10 transition-all duration-1000">
          <h2 className="text-4xl font-bold mb-12 flex items-center gap-4">
            <span className="h-px w-8 bg-gradient-to-r from-blue-400 to-cyan-400" />
            About Me
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                I'm a pre-final year B.Tech Computer Science student at Kazi Nazrul University, specializing in building real-time, data-intensive web applications. Proficient in the MERN Stack, MySQL, and Socket.io, with a strong focus on scalable backend architecture and collaborative dashboards.
              </p>
              <p>
                My journey started with a passion for full-stack development and real-time systems. I gained practical experience through the Deloitte Data Analytics Virtual Internship, where I worked with Tableau and Excel to visualize customer data and identify anomalies. I've since built several production-ready projects including automated data collection platforms and collaborative analytics dashboards.
              </p>
              <p>
                I'm actively seeking a Software Engineering internship to leverage my technical expertise in full-stack development, create scalable solutions, and contribute to meaningful projects. Always eager to learn, collaborate, and solve complex technical challenges.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Projects Built", value: "6+" },
                { label: "CGPA", value: "8.20" },
                { label: "Technologies", value: "15+" },
                { label: "Years of Learning", value: "4+" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 hover:border-cyan-400/50 transition-colors"
                >
                  <div className="text-2xl font-bold text-cyan-400">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
