export const validateUsername = (username) => {
    const usernamePattern = /^[a-zA-Z'-]+$/;
    return usernamePattern.test(username);
  };
  
  export const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };
  
  export const validatePassword = (password) => {
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordPattern.test(password);
  };

  export const validateConfirmPassword = (password, confirmPassword) => {
    const confirmPasswordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return confirmPasswordPattern.test(confirmPassword);
    }
  
  export const validateMatchingPassword = (password, confirmPassword) => {
    return password === confirmPassword;
  };

  // Check for the login if the password as dangerous characters
  export const validatePasswordForLogin = (password) => {
    const dangerousCharactersPattern = /<script[^>]*>/g;
    return !dangerousCharactersPattern.test(password);
  };