import { NextRequest, NextResponse } from 'next/server'

const protectedPaths = ['/dashboard', '/users', '/merchants', '/transactions', '/suspensions', '/kyc']

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const isProtected = protectedPaths.some((path) => pathname.startsWith(path))

  if (isProtected) {
    const accessToken = req.cookies.get('sebpay_access_token')?.value
    if (!accessToken) {
      const loginUrl = new URL('/login', req.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/users/:path*', '/merchants/:path*', '/transactions/:path*', '/suspensions/:path*', '/kyc/:path*'],
}
