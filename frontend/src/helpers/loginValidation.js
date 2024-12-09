export const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

export const validatePassword = (password) => {
  const minLength = 6;
  const requireUppercase = /[A-Z]/;
  const requireLowercase = /[a-z]/;
  const requireDigit = /\d/;
  const requireNonAlphanumeric = /[@$!%*?&]/;

  if (password.length < minLength) {
    return false; // Password must be at least 6 characters long
  }
  if (!requireUppercase.test(password)) {
    return false; // Password must contain at least one uppercase letter
  }
  if (!requireLowercase.test(password)) {
    return false; // Password must contain at least one lowercase letter
  }
  if (!requireDigit.test(password)) {
    return false; // Password must contain at least one digit
  }
  if (!requireNonAlphanumeric.test(password)) {
    return false; // Password must contain at least one non-alphanumeric character
  }

  return true; // All conditions met
};
