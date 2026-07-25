"use client"

import { motion } from "framer-motion"

export default function About() {
  return (
  <section 
    id="about" 
    className="py-24 px-4 relative z-10 overflow-hidden bg-black"
  >
    {/* Deep ambient glow tuned for OLED black */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-black-950/15 rounded-full blur-[160px] z-0 pointer-events-none" />

    <div className="max-w-6xl mx-auto relative z-10">
      
      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-slate-300 to-slate-500 tracking-tight">
          Behind the Code
        </h2>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-auto">
        
        {/* Main Bio Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }}
          className="md:col-span-2 md:row-span-2 backdrop-blur-2xl bg-zinc-950/70 border border-zinc-800 rounded-3xl p-8 md:p-10 flex flex-col justify-center hover:border-zinc-700 hover:bg-zinc-900/40 transition-all shadow-[0_0_40px_rgba(0,0,0,0.8)]"
        >
          <h3 className="text-2xl font-bold text-slate-100 mb-4 flex items-center gap-2">
            Who I Am
          </h3>
          <p className="text-slate-400 leading-relaxed text-base md:text-lg font-normal">
            I'm a B.Tech Computer Science student specializing in Data Science at Kazi Nazrul University. I don't just write code; I build systems. My focus is on the intersection of robust full-stack development (Next.js, Node.js) and machine learning applications.
          </p>
        </motion.div>

        {/* Location Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ delay: 0.1 }}
          className="md:col-span-2 md:row-span-1 backdrop-blur-2xl bg-zinc-950/70 border border-zinc-800 rounded-3xl p-8 relative overflow-hidden group hover:border-zinc-700 transition-all shadow-[0_0_40px_rgba(0,0,0,0.8)]"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-black-500/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-2 relative z-10">Based In</h3>
          <p className="text-black-400 text-2xl md:text-3xl font-bold tracking-tight relative z-10 drop-shadow-[0_0_15px_rgba(6,182,212,0.15)]">
            Asansol, West Bengal
          </p>
        </motion.div>

        {/* Education Stat Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ delay: 0.2 }}
          className="md:col-span-1 md:row-span-1 backdrop-blur-2xl bg-zinc-950/70 border border-zinc-800 rounded-3xl p-6 flex flex-col items-center justify-center text-center hover:border-zinc-700 hover:scale-[1.02] transition-all shadow-[0_0_40px_rgba(0,0,0,0.8)]"
        >
          <span className="text-4xl mb-3">🎓</span>
          <h4 className="text-slate-100 font-bold text-base">B.Tech CS</h4>
          <p className="text-slate-400 text-xs mt-1">Kazi Nazrul University</p>
        </motion.div>

        {/* Focus Area Stat Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ delay: 0.3 }}
          className="md:col-span-1 md:row-span-1 backdrop-blur-2xl bg-zinc-950/70 border border-zinc-800 rounded-3xl p-6 flex flex-col items-center justify-center text-center hover:border-zinc-700 hover:scale-[1.02] transition-all shadow-[0_0_40px_rgba(0,0,0,0.8)]"
        >
          <span className="text-4xl mb-3">🤖</span>
          <h4 className="text-slate-100 font-bold text-base">Data Science</h4>
          <p className="text-slate-400 text-xs mt-1">& Machine Learning</p>
        </motion.div>

      </div>
    </div>
  </section>
)
}