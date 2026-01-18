export const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const isStrongPassword = (password) => {
  return (
    typeof password === "string" &&
    password.length >= 6
  );
};

export const isValidName = (name) => {
  return typeof name === "string" && name.trim().length >= 3;
};

export const isValidRole = (role) => {
  return ["user", "admin"].includes(role);
};
