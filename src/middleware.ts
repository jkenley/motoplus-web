import { NextResponse } from 'next/server';

import { WEB_URL } from '@/lib/constants';

import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest): NextResponse | undefined {
  const url = request.nextUrl.clone();

  // Extract the JWT from the cookie in a more robust way
  const cookies = request.headers.get('cookie');

  const cookieMap = new Map<string, string>(
    cookies?.split('; ').map((c) => {
      const [key, value] = c.split('=');
      return [key, value]; // Explicitly defining as a tuple
    }) || [],
  );
  const jwt = cookieMap.get('access_token'); // This is the cookie name

  const pages: string[] = ['/'];

  if (pages.includes(url.pathname) && !jwt) {
    return NextResponse.redirect(new URL('/login', WEB_URL).toString());
  } else if (url.pathname === '/login' && jwt) {
    return NextResponse.redirect(new URL('/', WEB_URL).toString());
  }

  return undefined;
}
