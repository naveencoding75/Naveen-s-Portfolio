export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin/dashboard/', 
        '/api/',             
      ],
    },
    sitemap: 'https://naveen-s-portfolio-one.vercel.app/sitemap.xml',
  }
}