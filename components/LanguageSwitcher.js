'use client'

import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LanguageSwitcher() {
  const pathname = usePathname()
  const router = useRouter()

  const getLocalizedPath = (locale) => {
    if (!pathname) return '/'
    const segments = pathname.split('/')
    segments[1] = locale
    return segments.join('/')
  }

  return (
    <div className="flex items-center space-x-2 me-4 md:me-6">
      <Link 
        href={getLocalizedPath('en')} 
        className={`p-1 text-sm dark:text-white ${pathname.startsWith('/en') ? 'font-bold underline' : 'hover:underline'}`}
      >
        EN
      </Link>
      <span className="text-gray-400">|</span>
      <Link 
        href={getLocalizedPath('pt')} 
        className={`p-1 text-sm dark:text-white ${pathname.startsWith('/pt') ? 'font-bold underline' : 'hover:underline'}`}
      >
        PT
      </Link>
    </div>
  )
} 