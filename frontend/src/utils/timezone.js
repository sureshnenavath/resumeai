/**
 * Converts a UTC timestamp string to IST formatted string
 * @param {string} utcTimestamp - UTC timestamp string (e.g., "2025-09-12T19:16:40.123456+00:00")
 * @returns {string} Formatted IST timestamp string
 */
export const formatToIST = (utcTimestamp) => {
  try {
    // Parse the UTC timestamp - it should already be in ISO format with timezone info
    const utcDate = new Date(utcTimestamp);
    
    // Format to IST using Indian locale and timezone
    return utcDate.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Asia/Kolkata'
    });
  } catch (error) {
    console.error('Error formatting timestamp:', error);
    return 'Invalid Date';
  }
};
