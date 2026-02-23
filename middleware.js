import { NextResponse } from 'next/server';

export function middleware(request) {
  const path = request.nextUrl.pathname;
  
  if (path.startsWith('/admin/dashboard')) {
    const token = request.cookies.get('admin_token')?.value;
    if (!token) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }
}

export const config = {
  matcher: ['/admin/dashboard/:path*'],
};