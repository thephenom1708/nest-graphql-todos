export const isValidMobileNumber = (mobile: string): boolean => /^[0-9]{10}$/.test(mobile);

export const isValidEmail = (email: string): boolean => /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
