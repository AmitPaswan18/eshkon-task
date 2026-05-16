import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/request';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Simple RBAC simulation using a cookie or header
  // In a real app, this would be a session or JWT
  const userRole = request.cookies.get('user-role')?.value || 'editor';

  if (pathname.startsWith('/studio')) {
    if (userRole === 'viewer') {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
  }

  if (pathname.startsWith('/api/publish')) {
    if (userRole !== 'publisher') {
      return new NextResponse(
        JSON.stringify({ error: 'Only publishers can perform this action' }),
        { status: 403, headers: { 'content-type': 'application/json' } }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/studio/:path*', '/api/:path*'],
};
