// src/utils/validators.js

/* ================= EMAIL VALIDATION ================= */
export const isValidEmail = (email) => {
  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/* ================= PASSWORD VALIDATION =================
   Rules (portfolio standard):
   - Minimum 8 characters
   - At least 1 letter
   - At least 1 number
*/
export const isValidPassword = (password) => {
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return passwordRegex.test(password);
};

/* ================= SIGNUP VALIDATION ================= */
export const validateSignup = ({ name, email, password }) => {
  const errors = {};

  if (!name || name.trim().length < 3) {
    errors.name = "Name must be at least 3 characters long";
  }

  if (!email) {
    errors.email = "Email is required";
  } else if (!isValidEmail(email)) {
    errors.email = "Please enter a valid email address";
  }

  if (!password) {
    errors.password = "Password is required";
  } else if (!isValidPassword(password)) {
    errors.password =
      "Password must be at least 8 characters and contain letters and numbers";
  }

  return errors;
};

/* ================= LOGIN VALIDATION ================= */
export const validateLogin = ({ email, password }) => {
  const errors = {};

  if (!email) {
    errors.email = "Email is required";
  } else if (!isValidEmail(email)) {
    errors.email = "Invalid email format";
  }

  if (!password) {
    errors.password = "Password is required";
  }

  return errors;
};
