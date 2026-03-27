import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

// Initialize the fonts
const geist = Geist({ subsets: ["latin"] });
const geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata = {
  title: 'Naveen Sharma - Full Stack Developer',
  description: 'Portfolio of Naveen Sharma, MERN Stack Developer. Full-stack developer crafting beautiful, high-performance web experiences.',
  generator: '',
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
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      {/* Applied the Geist font class directly to the body */}
      <body className={`${geist.className} antialiased bg-gray-950 text-white`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}