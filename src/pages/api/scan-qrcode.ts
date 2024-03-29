import { BASE_API_URL } from '@/lib/constants';
import checkPhoneLimitsAndOrders from '@/lib/phone-check';
import { Data } from '@/types/index';

import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * API handler function for the 'scan-qrcode' endpoint.
 *
 * This function processes POST requests for scanning a QR code associated with a store.
 * It expects certain fields in the request body, such as storeId, fullName, phoneNumber,
 * qrCodeNumber, and optional notes. The function validates these inputs and constructs
 * a payload for further processing or sending to an external API.
 *
 * @param req - The incoming HTTP request (NextApiRequest).
 * @param res - The outgoing HTTP response (NextApiResponse<Data>).
 */
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

  // Check if the number of submitted phone numbers has reached or exceeded the limit
  const isLimitReached = await checkPhoneLimitsAndOrders(phoneNumber);

  // If the limit is reached or exceeded, return a 403 error
  if (isLimitReached) {
    res.status(429).json({ status: 429, message: 'Phone number limit reached', data: null });
    return;
  }

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
