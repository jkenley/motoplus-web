import { NextResponse } from 'next/server';

import { WEB_URL } from '@/lib/constants';

import type { NextRequest } from 'next/server';

/**
 * Middleware function for handling page access based on JWT authentication.
 *
 * This middleware checks if the user has a valid JWT (access token) in the cookies.
 * If a user tries to access certain protected pages without a valid JWT, they are
 * redirected to the login page. Conversely, if the user is already authenticated
 * and tries to access the login page, they are redirected to the home page.
 *
 * @param request - The incoming HTTP request (NextRequest).
 * @returns - A NextResponse object to redirect the user or undefined to continue the request.
 */
export function middleware(request: NextRequest): NextResponse | undefined {
  const url = request.nextUrl.clone();

  // Extracting the JWT from the cookie
  const cookies = request.headers.get('cookie');

  const cookieMap = new Map<string, string>(
    cookies?.split('; ').map((c) => {
      const [key, value] = c.split('=');
      return [key, value]; // Map each cookie to a key-value pair
    }) || [],
  );

  const jwt = cookieMap.get('access_token'); // Accessing the JWT token

  // Define protected pages that require authentication
  const pages: string[] = ['/'];

  // Redirect to login page if trying to access a protected page without a JWT
  if (pages.includes(url.pathname) && !jwt) {
    return NextResponse.redirect(new URL('/login', WEB_URL).toString());
  } else if (url.pathname === '/login' && jwt) {
    // Redirect to home page if trying to access login page with a JWT
    return NextResponse.redirect(new URL('/', WEB_URL).toString());
  }

  // Continue with the request if none of the above conditions are met
  return undefined;
}
