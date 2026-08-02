import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(req: NextRequest) {
  // Only apply this protection in production mode
  if (process.env.NODE_ENV !== 'production') {
    return NextResponse.next();
  }

  // Define the credentials
  // Users can configure these in Vercel environment variables
  const ADMIN_USER = process.env.ADMIN_USER || 'admin';
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'decornish2026';

  const basicAuth = req.headers.get('authorization');

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1];
    const [user, pwd] = atob(authValue).split(':');

    if (user === ADMIN_USER && pwd === ADMIN_PASSWORD) {
      return NextResponse.next();
    }
  }

  return new NextResponse('Auth required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  });
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/admin/:path*',
};
