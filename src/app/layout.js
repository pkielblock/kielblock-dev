import { Inter } from 'next/font/google'
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from '@vercel/analytics/react';
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'kielblock.dev',
  description: 'Pedro Kielblock`s personal website.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
