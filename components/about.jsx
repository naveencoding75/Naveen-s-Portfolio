"use client"

import { motion } from "framer-motion"

export default function About() {
  return (
    <section 
      id="about" 
      // Added background image classes including bg-fixed for the parallax effect
      className="py-24 px-4 relative z-10 overflow-hidden"
      // Using a moody, data-science/tech themed background image
    >
      
      {/* Subtle color tint orb to keep some of that cyan/indigo branding */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-cyan-600/20 rounded-full blur-[150px] z-0 pointer-events-none mix-blend-screen" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
            Behind the Code
          </h2>
        </div>

        {/* The Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[200px]">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="md:col-span-2 md:row-span-2 backdrop-blur-2xl bg-gray-900/40 border border-white/20 rounded-3xl p-8 flex flex-col justify-center hover:bg-white/20 transition-colors shadow-2xl"
          >
            <h3 className="text-2xl font-bold text-white mb-4">Who I Am</h3>
            <p className="text-gray-200 leading-relaxed text-lg">
              I'm a 3rd-year B.Tech Computer Science student specializing in Data Science at Kazi Nazrul University. I don't just write code; I build systems. My focus is on the intersection of robust full-stack development (Next.js, Node.js) and machine learning applications.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="md:col-span-2 md:row-span-1 backdrop-blur-2xl bg-gray-900/40 border border-white/20 rounded-3xl p-8 relative overflow-hidden group shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-cyan-500/30 opacity-0 group-hover:opacity-100 transition-opacity" />
            <h3 className="text-xl font-bold text-white mb-2 relative z-10">Based In</h3>
            <p className="text-cyan-300 text-2xl font-semibold relative z-10">Asansol, West Bengal</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="md:col-span-1 md:row-span-1 backdrop-blur-2xl bg-gray-900/40 border border-white/20 rounded-3xl p-6 flex flex-col items-center justify-center text-center hover:scale-[1.05] transition-transform shadow-2xl"
          >
            <span className="text-4xl mb-2">🎓</span>
            <h4 className="text-white font-bold">B.Tech CS</h4>
            <p className="text-gray-300 text-sm">Class of 2027</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
            className="md:col-span-1 md:row-span-1 backdrop-blur-2xl bg-gray-900/40 border border-white/20 rounded-3xl p-6 flex flex-col items-center justify-center text-center hover:scale-[1.05] transition-transform shadow-2xl"
          >
            <span className="text-4xl mb-2">🤖</span>
            <h4 className="text-white font-bold">Data Science</h4>
            <p className="text-gray-300 text-sm">& Machine Learning</p>
          </motion.div>

        </div>
      </div>
    </section>
  )
}