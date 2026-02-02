import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata = {
  title: 'Naveen Sharma - Full Stack Developer',
  description: 'Portfolio of Naveen Sharma, MERN Stack Developer. Full-stack developer crafting beautiful, high-performance web experiences.',
  generator: '',
  icons: {
    icon: [
      {
        url: '/placeholder-user.png',
        media: '(prefers-color-scheme: light)',
      }
    ],
    apple: '/placeholder-user.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}