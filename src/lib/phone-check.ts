import { BASE_API_URL } from '@/lib/constants';
import { PhoneLimitResponse, PhoneNumberSubmittedResponse } from '@/types/index';

/**
 * Checks if the number of submitted phone numbers has reached or exceeded the limit.
 *
 * @param phoneNumber - The phone number to check.
 * @returns A promise that resolves to true if the limit is reached or exceeded, otherwise false.
 */

const checkPhoneLimitsAndOrders = async (phoneNumber: string): Promise<boolean> => {
  try {
    const phoneLimitPromise = fetch(`${BASE_API_URL}/api/conf`);
    const countPhoneNumberPromise = fetch(`${BASE_API_URL}/api/orders?filters[phoneNumber][$eq]=${phoneNumber}`);

    // Wait for both promises to resolve
    const responses = await Promise.all([phoneLimitPromise, countPhoneNumberPromise]);

    // Check if any of the responses are not OK
    responses.forEach((response) => {
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
    });

    // Parse the response data from the external API for phone limit configuration
    const phoneLimitData: PhoneLimitResponse = await responses[0].json();

    // Parse the response data from the external API for submitted phone numbers
    const phoneNumberSubmittedData: PhoneNumberSubmittedResponse = await responses[1].json();

    // Check if the number of submitted phone numbers is greater or equal to the phone limit
    return phoneNumberSubmittedData.data.length >= phoneLimitData.data.attributes.phoneNumberLimit;
  } catch (error) {
    console.error('An error occurred:', error);
    // Handle the error as per the requirement (e.g., user notification, logging, etc.)
    return false;
  }
};

export default checkPhoneLimitsAndOrders;
