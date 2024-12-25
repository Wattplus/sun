export const validateEmail = (email: string) => {
  return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
};

export const validatePhone = (phone: string) => {
  return phone.match(/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/);
};

export const validatePostalCode = (code: string) => {
  return code.match(/^[0-9]{5}$/);
};