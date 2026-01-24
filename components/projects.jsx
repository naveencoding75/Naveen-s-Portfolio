"use client"

import { useEffect, useRef } from "react"

const PROJECTS = [
  {
    title: "Automated Data Collection & Monitoring Platform",
    description:
      "Engineered an automated system using Node.js and MySQL to schedule, scrape, and validate data from multiple external APIs. Implemented Redis for efficient job queuing and WebSockets to broadcast real-time alerts for data collection failures.",
    tags: ["Node.js", "MySQL", "Redis", "REST APIs"],
    image: "/ecommerce-dashboard.png",
    link: "https://github.com/naveencoding75/Data_Platform/blob/main/README.md",
    github: "https://github.com/naveencoding75/Data_Platform",
  },
  {
    title: "Real-Time Collaborative Data Dashboard",
    description:
      "Developed a live analytics platform allowing multiple users to visualize and filter datasets simultaneously using Socket.io. Optimized performance by implementing Node.js streams to parse large CSV/Excel uploads without server lag.",
    tags: ["React", "Socket.io", "MySQL", "Node.js"],
    image: "/ai-chat-interface.png",
    link: "https://collab-dashboard.vercel.app/login",
    github: "https://github.com/naveencoding75/Collab-Dashboard",
  },
  {
    title: "Google OAuth 2.0 Integration",
    description:
      "Secured user access across projects using Google OAuth 2.0 and JWT with refresh tokens for safe and reliable session management. Implemented robust authentication patterns for multi-user applications.",
    tags: ["OAuth 2.0", "JWT", "Google API", "Backend"],
    image: "/project-management-dashboard.png",
    link: "https://sync-board-iota.vercel.app/",
    github: "https://github.com/naveencoding75/Sync-Board",
  },
  {
    title: "Data Analytics Dashboard",
    description:
      "Created interactive dashboards using Tableau and Excel to visualize customer demographics, identify data anomalies, and model business strategies. Part of Deloitte Data Analytics Virtual Internship on Forage.",
    tags: ["Tableau", "Excel", "Data Visualization", "Analytics"],
    image: "/analytics-dashboard-charts.png",
    link: "#",
    github: "https://github.com/naveencoding75/",
  },
  {
    title: "E-Commerce Inventory System",
    description:
      "Full-stack e-commerce solution with real-time inventory tracking, payment integration, and comprehensive analytics built with React and Node.js.",
    tags: ["React", "Node.js", "MySQL", "Tailwind"],
    image: "/mobile-learning-app-interface.jpg",
    link: "#",
    github: "https://github.com/naveencoding75/",
  },
  {
    title: "Advanced Backend Architecture",
    description:
      "Designed and implemented structured MySQL schemas to ensure data consistency during high-load scraping. Optimized database queries and implemented caching strategies for improved performance.",
    tags: ["MySQL", "Database Design", "Performance Optimization", "Backend"],
    image: "/design-system-components.png",
    link: "#",
    github: "https://github.com/naveencoding75/",
  },
]

export default function Projects() {
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
    <section id="projects" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div ref={ref} className="opacity-0 translate-y-10 transition-all duration-1000">
          <h2 className="text-4xl font-bold mb-12 flex items-center gap-4">
            <span className="h-px w-8 bg-gradient-to-r from-blue-400 to-cyan-400" />
            Featured Projects
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS.map((project, i) => (
              <div
                key={i}
                className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:border-cyan-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10"
              >
                <div className="relative h-48 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, j) => (
                      <span
                        key={j}
                        className="text-xs px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4">
                    <a
                      href={project.link}
                      className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium text-sm transition-colors"
                    >
                      View Project →
                    </a>
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-cyan-400 transition-colors"
                        title="View on GitHub"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
