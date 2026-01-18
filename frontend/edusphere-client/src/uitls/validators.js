// src/utils/validators.js

/* ================= EMAIL ================= */
export const isValidEmail = (email) => {
  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/* ================= PASSWORD ================= */
/*
 Password rules (as per project security best practices):
 - Minimum 6 characters
 - At least 1 uppercase letter
 - At least 1 lowercase letter
 - At least 1 number
*/
export const isStrongPassword = (password) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
  return passwordRegex.test(password);
};

/* ================= NAME ================= */
export const isValidName = (name) => {
  return name && name.trim().length >= 3;
};
