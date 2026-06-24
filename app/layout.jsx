import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

// Initialize the fonts
const geist = Geist({ subsets: ["latin"] });
const geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata = {
  title: 'Naveen Sharma | Full-Stack Developer & Data Scientist',
  description: 'Portfolio of Naveen Sharma, a Computer Science (Data Science) student at Kazi Nazrul University. Specializing in the MERN stack, Next.js, and high-precision Machine Learning systems.',
  keywords: [
    'Naveen Sharma', 
    'Naveen Sharma KNU', 
    'Naveen Sharma Kazi Nazrul University', 
    'Naveen Sharma Data Science', 
    'Naveen Sharma Asansol',
    'Kazi Nazrul University', 
    'KNU', 
    'MERN Stack Developer Asansol', 
    'Next.js Developer West Bengal', 
    'Data Scientist Asansol', 
    'TruthGuard', 
    'Job Market Pulse',
    'Nabin Sharma',
    'Nobin Sharma',
    'Naveen Sharma Bermo',
    'Naveen Bermo',
    'Bermo',
    'Bermo Station',
    'Naveen MM',
    'Naveen Mini Militia',
  ],
  authors: [{ name: 'Naveen Sharma' }],
  creator: 'Naveen Sharma',
  metadataBase: new URL('https://naveen-s-portfolio-one.vercel.app/'), // Replace with your real URL!
  alternates: {
    canonical: '/',
  },
  verification: {
    // Keeps your Google Webmasters Search Console verification intact
    google: '0E-2wUdvi3JU_n-NUv4qLZlNmueXCmNM75WYjAD3AtE', 
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'Naveen Sharma | Full-Stack Developer & Data Scientist',
    description: 'Computer Science (Data Science) student at Kazi Nazrul University crafting high-performance full-stack web and machine learning systems.',
    url: 'https://naveen-s-portfolio-one.vercel.app/',
    siteName: 'Naveen Sharma Portfolio',
    images: [
      {
        url: '/twitter.jpg',
        width: 1200,
        height: 630,
        alt: 'Naveen Sharma Developer Profile',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Naveen Sharma | Full-Stack Developer & Data Scientist',
    description: 'Computer Science (Data Science) student at Kazi Nazrul University crafting high-performance full-stack web and machine learning systems.',
    images: ['/twitter.jpg'],
  },
}

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Naveen Sharma",
    "alternateName": ["Naveen", "Naveen Sharma KNU"],
    "url": "https://naveen-s-portfolio-one.vercel.app/",
    "jobTitle": "Full-Stack Developer & Data Scientist",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Asansol",
      "addressRegion": "West Bengal",
      "addressCountry": "IN"
    },
    "alumniOf": [
      {
        "@type": "CollegeOrUniversity",
        "name": "Kazi Nazrul University",
        "alternateName": "KNU"
      }
    ],
    "knowsAbout": [
      "Computer Science",
      "Data Science",
      "Full-Stack Web Development",
      "MERN Stack",
      "React",
      "Next.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "MySQL",
      "Machine Learning",
      "Support Vector Machines (SVM)"
    ]
  };

  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${geist.className} antialiased bg-gray-950 text-white`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
