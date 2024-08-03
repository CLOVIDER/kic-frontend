import { ACCESS_TOKEN, ROLE } from '@/constants'
import { NextRequest, NextResponse } from 'next/server'

export const config = {
  matcher: ['/((?!api|_next/static|lib|favicon.ico|fonts|images).*)'],
}
const protectedRoutes = ['/apply', '/apply/application']
const publicRoutes = ['/login']

export function middleware(request: NextRequest) {
  const token = request.cookies.get(ACCESS_TOKEN)
  const role = request.cookies.get(ROLE)?.value
  const currentPath = request.nextUrl.pathname

  if (!token && protectedRoutes.includes(currentPath)) {
    const url = request.nextUrl.clone()
    url.pathname = '/'
    return NextResponse.redirect(url)
  }

  if (token && publicRoutes.includes(currentPath)) {
    const url = request.nextUrl.clone()
    url.pathname = '/'
    return NextResponse.redirect(url)
  }

  if (role !== 'admin' && currentPath.startsWith('/admin')) {
    const url = request.nextUrl.clone()
    url.pathname = '/'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}
