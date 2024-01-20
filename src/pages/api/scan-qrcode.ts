import { BASE_API_URL } from '@/lib/constants';

import type { NextApiRequest, NextApiResponse } from 'next';

// Define the structure of the response data
type Data = {
  status: number;
  message: string;
  data?: any;
};

// The main handler for the API endpoint
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  // Only allow POST requests, return 405 for other methods
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);

    res.status(405).json({ status: 405, message: 'Method Not Allowed' });
    return;
  }

  // Destructure and extract fields from the request body
  const { storeId, fullName, phoneNumber, qrCodeNumber, notes } = req.body;

  // Check for required fields - return 400 error if any are missing
  if (!storeId || !fullName || !phoneNumber) {
    res.status(400).json({ status: 400, message: 'Missing required fields' });
    return;
  }

  // Construct the payload to send to the external API
  const payload = {
    data: {
      storeId,
      fullName,
      qrCodeNumber,
      phoneNumber,
      notes,
    },
  };

  try {
    // Send a POST request to the external API
    const response = await fetch(`${BASE_API_URL}/api/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    // Check if the response from the external API is not ok (non-2xx status)
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    // Parse the response data from the external API
    const { data } = await response.json();

    // Return success response
    res.status(200).json({ status: 200, message: 'QR code scanned successfully', data });
  } catch (error) {
    // Log the error for server-side debugging
    console.error('Error submitting order:', error);

    // Return a generic server error response to the client
    res.status(500).json({ status: 500, message: 'Error submitting order' });
  }
}
