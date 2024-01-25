import cookie from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';

import { Data } from '@/types/index';

/**
 * API handler function for logging out a user.
 *
 * Clears the access token cookie, effectively logging the user out of the session.
 * It sets the 'access_token' cookie's maxAge to 0, which immediately expires the cookie.
 *
 * @param req - The incoming HTTP request (NextApiRequest).
 * @param res - The outgoing HTTP response (NextApiResponse).
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>): Promise<void> {
  // Set the 'Set-Cookie' header to clear the 'access_token' cookie
  res.setHeader(
    'Set-Cookie',
    cookie.serialize('access_token', '', {
      httpOnly: true, // Makes the cookie inaccessible to client-side JavaScript (enhances security)
      secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
      maxAge: 0, // Sets the cookie to expire immediately
      sameSite: 'strict', // Strictly limit the cookie to same-site requests
      path: '/', // The cookie will be accessible for all paths under the domain
    }),
  );

  // Return success response
  res.status(200).json({ status: 200, message: 'Logged out successfully', data: null });
}
