"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { getSkills } from "@/app/admin/actions"

export default function Skills() {
  const [skills, setSkills] = useState([])

  useEffect(() => {
    async function fetchSkills() {
      const data = await getSkills()
      if (data) setSkills(data)
    }
    fetchSkills()
  }, [])

  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
  <section 
    id="skills" 
    className="py-24 px-4 relative z-10 overflow-hidden bg-black"
  >
    {/* Deep ambient glow tuned for OLED Black */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-black-950/15 rounded-full blur-[160px] -z-10 pointer-events-none" />

    <div className="max-w-6xl mx-auto relative z-10">
      
      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-extrabold flex items-center justify-center gap-4 tracking-tight">
          {/* Left Line */}
          <span className="h-px w-12 bg-gradient-to-r from-cyan-400 to-transparent" />
          
          {/* Text with gradient applied ONLY to itself */}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-slate-300 to-slate-500">
            Technical Arsenal
          </span>

          {/* Right Line */}
          <span className="h-px w-12 bg-gradient-to-l from-cyan-400 to-transparent" />
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {Object.keys(groupedSkills).length === 0 ? (
          <p className="text-center text-slate-500 col-span-full py-12">Loading skills...</p>
        ) : (
          Object.entries(groupedSkills).map(([category, catSkills], index) => (
            <motion.div 
              key={category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="backdrop-blur-2xl bg-zinc-950/70 border border-zinc-800 p-8 rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.8)] flex flex-col hover:border-zinc-700 hover:bg-zinc-900/50 transition-all duration-300"
            >
              {/* Category Title */}
              <h3 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-white tracking-tight">
                {category}
              </h3>
              
              {/* Skill Pills */}
              <div className="flex flex-wrap gap-3 mt-auto">
                {catSkills.map((skill) => (
                  <span
                    key={skill._id}
                    className="px-5 py-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-slate-300 hover:border-black-500/50 hover:text-black-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.25)] hover:bg-black-950/30 transition-all hover:-translate-y-1 cursor-default font-medium text-sm tracking-wide"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  </section>
)
}