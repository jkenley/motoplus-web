/**
 * Checks if all keys in the given object are neither undefined nor null.
 *
 * This function iterates through each key-value pair in the object.
 * It returns `false` as soon as it encounters a value that is either
 * undefined or null. If all values are defined and not null, it returns `true`.
 *
 * @param {Record<string, any>} obj - The object to be checked. It is a generic
 *                                    object with keys as strings and values of any type.
 * @returns {boolean} - `true` if all keys in the object have values that are
 *                      neither undefined nor null, otherwise `false`.
 */
export const areAllKeysDefined = (obj: Record<string, any>): boolean => {
  for (const key in obj) {
    if (obj[key] === undefined || obj[key] === null) {
      return false;
    }
  }
  
  return true;
};
