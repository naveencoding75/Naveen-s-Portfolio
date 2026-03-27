"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { getProjects } from "@/app/admin/actions"

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [selectedId, setSelectedId] = useState(null)

  // Fetch live projects from MongoDB
  useEffect(() => {
    async function fetchProjects() {
      const data = await getProjects()
      if (data && data.length > 0) {
        setProjects(data)
      }
    }
    fetchProjects()
  }, [])

  // Lock body scroll when the modal is open
  useEffect(() => {
    if (selectedId) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
  }, [selectedId])

  // Find the full data of the currently clicked project
  const selectedProject = projects.find(p => p._id === selectedId)

  return (
    <section id="projects" className="py-24 px-4 relative z-10">
      <div className="max-w-7xl mx-auto">
        
        <h2 className="text-4xl md:text-5xl font-extrabold flex items-center justify-center gap-4 text-white mb-16">
          <span className="h-px w-12 bg-gradient-to-r from-blue-500 to-cyan-400" />
          Featured Projects
          <span className="h-px w-12 bg-gradient-to-l from-blue-500 to-cyan-400" />
        </h2>

        {/* 1. The Small Compact Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.length === 0 ? (
            <p className="text-gray-400 text-center col-span-full">Loading projects...</p>
          ) : (
            projects.map((project) => (
              <motion.div
                key={project._id}
                layoutId={`card-container-${project._id}`}
                onClick={() => setSelectedId(project._id)}
                className="group cursor-pointer bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-400/50 hover:shadow-[0_0_30px_-5px_rgba(6,182,212,0.15)] transition-colors duration-300"
              >
                {/* Small Image */}
                <motion.div layoutId={`image-${project._id}`} className="relative h-56 overflow-hidden">
                  <img
                    // Uses thumbnail, falls back to full image if thumbnail doesn't exist
                    src={project.thumbnail || project.image || "/placeholder.svg"} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-80" />
                </motion.div>

                {/* Small Details (Name & Tagline) */}
                <motion.div layoutId={`text-container-${project._id}`} className="p-6 relative -mt-10">
                  <motion.h3 layoutId={`title-${project._id}`} className="text-xl font-bold text-white mb-2 shadow-sm">
                    {project.title}
                  </motion.h3>
                  {/* Now uses shortDescription */}
                  <motion.p layoutId={`desc-${project._id}`} className="text-gray-400 text-sm">
                    {project.shortDescription || project.description}
                  </motion.p>
                  
                  <div className="mt-4 flex items-center gap-2 text-cyan-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                    View Details
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </div>
                </motion.div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* 2. The Expanded Full-Screen Modal */}
      <AnimatePresence>
        {selectedId && selectedProject && (
          <>
            {/* The blurred dark background overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="fixed inset-0 bg-gray-950/80 backdrop-blur-md z-[60] cursor-pointer"
            />

            {/* The Floating Expanded Card Container */}
            <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6 md:p-12 pointer-events-none">
              <motion.div
                layoutId={`card-container-${selectedProject._id}`}
                className="bg-gray-900 w-full max-w-6xl max-h-[95vh] md:max-h-[85vh] rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex flex-col md:flex-row pointer-events-auto relative"
              >
                {/* Close 'X' Button */}
                <button
                  onClick={() => setSelectedId(null)}
                  className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 p-2 bg-black/40 hover:bg-red-500/80 backdrop-blur-md rounded-full text-white transition-all duration-300 hover:rotate-90"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>

                {/* Left Side: Expanded Image */}
                <motion.div layoutId={`image-${selectedProject._id}`} className="w-full md:w-1/2 h-64 md:h-auto relative flex-shrink-0">
                  <img
                    src={selectedProject.image || "/placeholder.svg"}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Smooth gradient fade into the text section */}
                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-gray-900 via-transparent to-transparent opacity-90 md:opacity-100" />
                </motion.div>

                {/* Right Side: Full Details */}
                <motion.div 
                  layoutId={`text-container-${selectedProject._id}`} 
                  className="w-full md:w-1/2 p-6 sm:p-10 flex flex-col overflow-y-auto bg-gray-900"
                >
                  <motion.h3 layoutId={`title-${selectedProject._id}`} className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                    {selectedProject.title}
                  </motion.h3>
                  
                  {/* Uses full description */}
                  <motion.p layoutId={`desc-${selectedProject._id}`} className="text-gray-300 text-base md:text-lg leading-relaxed mb-8 whitespace-pre-wrap">
                    {selectedProject.description}
                  </motion.p>

                  {/* Tags (Fade in quickly after modal opens) */}
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                    className="flex flex-wrap gap-3 mb-10 mt-auto"
                  >
                    {selectedProject.tags?.map((tag, i) => (
                      <span key={i} className="px-4 py-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-sm font-medium">
                        {tag}
                      </span>
                    ))}
                  </motion.div>

                  {/* Action Buttons */}
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                    className="flex flex-wrap items-center gap-4"
                  >
                    {selectedProject.link && (
                      <a href={selectedProject.link} target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-xl hover:shadow-[0_0_30px_5px_rgba(6,182,212,0.2)] transition-all hover:scale-105 flex items-center gap-2">
                        View Live Project
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                      </a>
                    )}
                    
                    {selectedProject.github && (
                      <a href={selectedProject.github} target="_blank" rel="noopener noreferrer" className="px-6 py-4 bg-gray-800 text-gray-300 font-bold rounded-xl border border-gray-700 hover:border-cyan-500/50 hover:text-cyan-400 transition-all flex items-center gap-2">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
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