import { NextRequest, NextResponse } from 'next/server'
import { ACCESS_TOKEN, ROLE } from '@/constants'

const protectedRoutes = ['/apply', '/apply/application', '/history']
const publicRoutes = ['/login']

export function middleware(request: NextRequest) {
  const token = request.cookies.get(ACCESS_TOKEN)
  const role = request.cookies.get(ROLE)?.value
  const response = NextResponse.next()
  const { pathname } = request.nextUrl

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname.includes('.')
  ) {
    return response
  }

  if (!token && protectedRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (publicRoutes.includes(pathname)) {
    return response
  }

  if (role !== 'ADMIN' && pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return response
}

export const config = {
  matcher: ['/((?!api|_next/static|lib|favicon.ico|fonts|images).*)'],
}
