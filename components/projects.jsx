"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { getProjects } from "@/app/admin/actions"

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [selectedId, setSelectedId] = useState(null)

  useEffect(() => {
    async function fetchProjects() {
      const data = await getProjects()
      if (data && data.length > 0) setProjects(data)
    }
    fetchProjects()
  }, [])

  useEffect(() => {
    if (selectedId) document.body.style.overflow = "hidden"
    else document.body.style.overflow = "auto"
  }, [selectedId])

  const selectedProject = projects.find(p => p._id === selectedId)

  return (
  <section 
    id="projects" 
    className="py-24 px-4 relative z-10 overflow-hidden bg-black"
  >
    {/* Ambient Glow tuned for OLED Black */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-black-950/15 rounded-full blur-[160px] -z-10 pointer-events-none" />

    <div className="max-w-7xl mx-auto relative z-10">
      
      {/* Section Title */}
      <h2 className="text-4xl md:text-5xl font-extrabold flex items-center justify-center gap-4 text-slate-100 mb-16 tracking-tight">
        <span className="h-px w-12 bg-gradient-to-r from-blue-500 to-black-400" />
        Featured Projects
        <span className="h-px w-12 bg-gradient-to-l from-blue-500 to-black-400" />
      </h2>

      {/* 1. Cards Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.length === 0 ? (
          <p className="text-slate-500 text-center col-span-full py-12">Loading projects...</p>
        ) : (
          projects.map((project) => (
            <motion.div
              key={project._id}
              layoutId={`card-container-${project._id}`}
              onClick={() => setSelectedId(project._id)}
              className="group cursor-pointer backdrop-blur-2xl bg-zinc-950/70 border border-zinc-800 rounded-3xl overflow-hidden hover:border-black-500/50 hover:bg-zinc-900/60 transition-all duration-300 flex flex-col h-full shadow-[0_0_30px_rgba(0,0,0,0.8)]"
            >
              {/* Card Image Header */}
              <motion.div layoutId={`image-${project._id}`} className="relative h-56 overflow-hidden bg-black">
                <img
                  src={project.thumbnail || project.image || "/placeholder.svg"} 
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-75 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90" />
              </motion.div>

              {/* Card Details */}
              <motion.div layoutId={`text-container-${project._id}`} className="p-6 relative -mt-10 flex flex-col flex-grow">
                <motion.h3 layoutId={`title-${project._id}`} className="text-xl font-bold text-slate-100 mb-2 tracking-tight group-hover:text-black-300 transition-colors">
                  {project.title}
                </motion.h3>
                <motion.p layoutId={`desc-${project._id}`} className="text-slate-400 text-sm line-clamp-2 leading-relaxed">
                  {project.shortDescription || project.description}
                </motion.p>
                
                <div className="mt-auto pt-6 flex items-center gap-2 text-black-400 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 duration-300">
                  View Details
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </motion.div>
              
            </motion.div>
          ))
        )}
      </div>
    </div>

    {/* 2. Expanded Modal */}
    <AnimatePresence>
      {selectedId && selectedProject && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedId(null)}
            className="fixed inset-0 bg-black/85 backdrop-blur-md z-[60] cursor-pointer"
          />

          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6 md:p-12 pointer-events-none">
            <motion.div
              layoutId={`card-container-${selectedProject._id}`}
              className="bg-zinc-950 w-full max-w-6xl max-h-[95vh] md:max-h-[85vh] rounded-3xl overflow-hidden border border-zinc-800 shadow-[0_0_60px_rgba(0,0,0,0.9)] flex flex-col md:flex-row pointer-events-auto relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedId(null)}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 p-2.5 bg-zinc-900/80 hover:bg-red-500/80 backdrop-blur-md rounded-full text-slate-300 hover:text-white transition-all duration-300 hover:rotate-90 border border-zinc-700"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Modal Left Image Container */}
              <motion.div layoutId={`image-${selectedProject._id}`} className="w-full md:w-1/2 h-64 md:h-auto relative flex-shrink-0 bg-black flex items-center justify-center p-4">
                <img
                  src={selectedProject.image || "/placeholder.svg"}
                  alt={selectedProject.title}
                  className="w-full h-full object-contain" 
                />
                <div className="absolute inset-y-0 right-0 w-px bg-zinc-800 hidden md:block" />
              </motion.div>

              {/* Modal Right Content */}
              <motion.div 
                layoutId={`text-container-${selectedProject._id}`} 
                className="w-full md:w-1/2 p-8 sm:p-12 flex flex-col overflow-y-auto bg-zinc-950 relative"
              >
                <motion.h3 layoutId={`title-${selectedProject._id}`} className="text-3xl md:text-4xl font-extrabold text-slate-100 mb-6 leading-tight tracking-tight">
                  {selectedProject.title}
                </motion.h3>
                
                <div className="prose prose-invert max-w-none mb-10">
                  <motion.p layoutId={`desc-${selectedProject._id}`} className="text-slate-300 text-base md:text-lg leading-relaxed whitespace-pre-wrap font-normal">
                    {selectedProject.description}
                  </motion.p>
                </div>

                {/* Tech Tags */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                  className="flex flex-wrap gap-2 mb-10 mt-auto"
                >
                  {selectedProject.tags?.map((tag, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-lg bg-black-950/40 border border-black-500/30 text-black-300 text-xs tracking-wider uppercase font-bold">
                      {tag}
                    </span>
                  ))}
                </motion.div>

                {/* Action Links */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                  className="flex flex-wrap items-center gap-4 border-t border-zinc-800 pt-6"
                >
                  {selectedProject.link && (
                    <a 
                      href={selectedProject.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="px-6 py-3.5 bg-slate-100 text-black font-bold rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:bg-white hover:shadow-[0_0_25px_rgba(6,182,212,0.3)] transition-all hover:-translate-y-0.5 flex items-center gap-2 text-sm"
                    >
                      View Live Project
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                  
                  {selectedProject.github && (
                    <a 
                      href={selectedProject.github} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="px-6 py-3.5 bg-zinc-900 text-slate-300 font-bold rounded-xl border border-zinc-800 hover:bg-zinc-800 hover:text-white transition-all hover:-translate-y-0.5 flex items-center gap-2 text-sm"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                      Source Code
                    </a>
                  )}
                </motion.div>

              </motion.div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  </section>
)
}