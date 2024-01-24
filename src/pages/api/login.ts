import cookie from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';

// import { BASE_API_URL } from '@/lib/constants';
import { Data } from '@/types/index';

// Regular expression for email validation
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// The main handler for the API endpoint
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  // Only allow POST requests, return 405 for other methods
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ status: 405, message: 'Method Not Allowed' });
    return;
  }

  // Destructure and extract fields from the request body
  const { email, password } = req.body;

  // Validate email - return 400 error if invalid
  if (!email || !emailRegex.test(email)) {
    res.status(400).json({ status: 400, message: 'Invalid or missing email' });
    return;
  }

  // Check for required password field - return 400 error if missing
  if (!password) {
    res.status(400).json({ status: 400, message: 'Missing password' });
    return;
  }

  // Construct the payload for login
  const payload = {
    identifier: email,
    password,
  };

  try {
    // Send a POST request to the Strapi API for authentication
    // const response = await fetch(`${BASE_API_URL}/api/auth/local`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(payload),
    // });

    // Check if the response from the Strapi API is not ok (non-2xx status)
    // if (!response.ok) {
    //   throw new Error(`Error: ${response.status}`);
    // }

    if (payload.identifier !== 'admin@motoplus.com.do' || payload.password !== 'Adm!nP@ss1.') {
      throw new Error(`Error: 403`);
    }

    // Parse the response data from the Strapi API
    // const data = await response.json();

    const cookieValue =
      'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJNb3RvcGx1cyIsIlVzZXJuYW1lIjoiYWRtaW5AbW90b3BsdXMuY29tLmRvIiwiZXhwIjoxNzA2NzI2MzYxLCJpYXQiOjE3MDYxMjE1NjF9.l0vJiBFNqrvjZkCQq-E2Ia2AfMN6EIM52SNx2CtKNg4';

    // Set a cookie on successful login
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('access_token', cookieValue, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        maxAge: 604800, // 1 week
        sameSite: 'strict',
        path: '/',
      }),
    );

    // Return success response
    res.status(200).json({
      status: 200,
      message: 'Login successful',
      data: {
        jwt: cookieValue,
      },
    });
  } catch (error) {
    // Log the error for server-side debugging
    console.error('Error during login:', error);

    // Return a generic server error response to the client
    res.status(500).json({ status: 500, message: 'Error during login' });
  }
}
