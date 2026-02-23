"use client"

import { useEffect, useRef, useState } from "react"
import { getSkills } from "@/app/admin/actions"

export default function Skills() {
  const ref = useRef(null)
  const [skills, setSkills] = useState([])

  useEffect(() => {
    async function fetchSkills() {
      const data = await getSkills()
      if (data) setSkills(data)
    }
    fetchSkills()
  }, [])

  // Animation observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("opacity-100", "translate-y-0")
          entry.target.classList.remove("opacity-0", "translate-y-10")
        }
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <section id="skills" className="py-20 px-4 bg-white/5">
      <div className="max-w-4xl mx-auto">
        <div ref={ref} className="opacity-0 translate-y-10 transition-all duration-1000">
          <h2 className="text-4xl font-bold mb-12 text-center flex items-center justify-center gap-4">
            <span className="h-px w-8 bg-gradient-to-r from-blue-400 to-cyan-400" />
            Technical Arsenal
          </h2>

          <div className="flex flex-col gap-8">
            {Object.keys(groupedSkills).length === 0 ? (
              <p className="text-center text-gray-400">Loading skills...</p>
            ) : (
              Object.entries(groupedSkills).map(([category, catSkills]) => (
                <div key={category} className="bg-gray-900/50 border border-white/10 p-6 rounded-xl">
                  <h3 className="text-xl font-semibold mb-4 text-cyan-400">{category}</h3>
                  <div className="flex flex-wrap gap-3">
                    {catSkills.map((skill) => (
                      <span
                        key={skill._id}
                        className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-200 hover:border-cyan-400/50 hover:text-cyan-300 transition-colors cursor-default"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  )
}