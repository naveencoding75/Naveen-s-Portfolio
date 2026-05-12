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
      // 1. Unified Parallax Background
      className="py-24 px-4 relative z-10 overflow-hidden"
    >
      

      {/* 2. Glowing Orbs for the Glass Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
            Technical Arsenal
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {Object.keys(groupedSkills).length === 0 ? (
            <p className="text-center text-gray-400 col-span-full">Loading skills...</p>
          ) : (
            Object.entries(groupedSkills).map(([category, catSkills], index) => (
              // 3. Upgraded to Framer Motion for smooth scrolling animations
              <motion.div 
                key={category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                // Stagger the animation so they drop in one after another
                transition={{ duration: 0.5, delay: index * 0.1 }}
                // 4. Premium Frosted Glass Container
                className="backdrop-blur-2xl bg-gray-900/40border border-white/20 p-8 rounded-3xl shadow-2xl flex flex-col hover:bg-white/20 transition-colors duration-300"
              >
                <h3 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                  {category}
                </h3>
                
                <div className="flex flex-wrap gap-3 mt-auto">
                  {catSkills.map((skill) => (
                    <span
                      key={skill._id}
                      // Sleek, interactive pills for each skill
                      className="px-5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-gray-300 hover:border-cyan-400 hover:text-cyan-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all hover:-translate-y-1 cursor-default font-medium tracking-wide"
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