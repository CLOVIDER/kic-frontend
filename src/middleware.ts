import { NextRequest, NextResponse } from 'next/server'
import { ACCESS_TOKEN, ROLE } from '@/constants'

const protectedRoutes = ['/apply', '/apply/application']
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

  // if (!token && protectedRoutes.includes(pathname)) {
  //   const url = request.nextUrl.clone()
  //   url.pathname = '/'
  //   return NextResponse.redirect(url)
  // }

  // if (token && publicRoutes.includes(pathname)) {
  //   const url = request.nextUrl.clone()
  //   url.pathname = '/'
  //   return NextResponse.redirect(url)
  // }

  // if (role !== 'admin' && pathname.startsWith('/admin')) {
  //   const url = request.nextUrl.clone()
  //   url.pathname = '/'
  //   return NextResponse.redirect(url)
  // }

  return response
}

export const config = {
  matcher: ['/((?!api|_next/static|lib|favicon.ico|fonts|images).*)'],
}
