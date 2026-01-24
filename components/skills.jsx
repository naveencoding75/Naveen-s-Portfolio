"use client"

import { useEffect, useRef } from "react"

const SKILLS = {
  "Languages & Databases": ["C++", "JavaScript (ES6+)", "Python", "SQL", "MySQL", "MongoDB", "Redis"],
  "Libraries & Frameworks": ["React.js", "Express.js", "Node.js", "Socket.io", "Tailwind CSS", "Mongoose"],
  "Tools & Analytics": ["Git", "GitHub", "Postman", "Tableau", "Excel", "Data Modeling"],
  "Specializations": ["MERN Stack", "Real-Time Systems", "Backend Architecture", "Data Analytics", "REST APIs", "WebSockets"],
}

export default function Skills() {
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
    <section id="skills" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div ref={ref} className="opacity-0 translate-y-10 transition-all duration-1000">
          <h2 className="text-4xl font-bold mb-12 flex items-center gap-4">
            <span className="h-px w-8 bg-gradient-to-r from-blue-400 to-cyan-400" />
            Skills & Expertise
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {Object.entries(SKILLS).map(([category, skills], i) => (
              <div
                key={i}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-cyan-400/50 transition-colors"
              >
                <h3 className="text-xl font-bold mb-4 text-cyan-400">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, j) => (
                    <span
                      key={j}
                      className="px-4 py-2 rounded-lg bg-blue-500/10 text-blue-300 border border-blue-500/20 hover:border-blue-500/50 transition-all hover:scale-105"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
