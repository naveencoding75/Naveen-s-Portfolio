import { getProjects } from "@/app/admin/actions"

export default async function sitemap() {
  const baseUrl = "https://naveen-s-portfolio-one.vercel.app"

  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/admin`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    }
  ]

  try {
    const projects = await getProjects()
    const projectRoutes = projects.map((project) => ({
      url: `${baseUrl}/projects/${project._id}`, 
      lastModified: new Date(project.updatedAt || new Date()),
      changeFrequency: 'weekly',
      priority: 0.8,
    }))

    return [...staticRoutes, ...projectRoutes]
  } catch (error) {
    console.error("Failed to generate dynamic sitemap routes:", error)
    return staticRoutes
  }
}