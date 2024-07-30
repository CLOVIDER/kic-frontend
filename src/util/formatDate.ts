// src/utils/formatDate.ts
export const formatDate = (dateString: string): string => {
    // Split the input date string into year, month, and day
    const [year, month, day] = dateString.split('.').map(Number);
  
    // Create a new Date object
    const date = new Date(year, month - 1, day); // months are 0-based in JavaScript
  
    // Define options for the toLocaleDateString method
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    };
  
    // Return the formatted date string
    return date.toLocaleDateString('en-US', options);
  };
  