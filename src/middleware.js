import { NextResponse } from 'next/server'
import acceptLanguage from 'accept-language'

const locales = ['en', 'pt']
const defaultLocale = 'en'

acceptLanguage.languages(locales)

export const config = {
  // Matcher ignoring `/_next/`, `/api/`, static files (e.g. /images, /favicon.ico)
  matcher: '/((?!api|_next/static|_next/image|.*\\.(?:png|jpg|jpeg|gif|svg|ico)).*)',
}

export function middleware(request) {
  console.log('Middleware running for path:', request.nextUrl.pathname);

  let lng
  const acceptLanguageHeader = request.headers.get('accept-language')
  if (acceptLanguageHeader) {
    lng = acceptLanguage.get(acceptLanguageHeader)
  }

  if (!lng) lng = defaultLocale

  // Redirect if locale in path is not supported
  if (
    !locales.some((loc) => request.nextUrl.pathname.startsWith(`/${loc}`)) &&
    !request.nextUrl.pathname.startsWith('/_') // Avoid internal paths like /_next
  ) {
    // Include search parameters in the redirect URL
    const url = request.nextUrl.clone()
    url.pathname = `/${lng}${request.nextUrl.pathname}`
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
} 