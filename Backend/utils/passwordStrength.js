function checkPasswordStrength(password) {
  let strength = 0;
  const regex = {
    lowerCase: /[a-z]/,
    upperCase: /[A-Z]/,
    numbers: /[0-9]/,
    specialChars: /[^A-Za-z0-9]/,
    consecutiveChars: /(.)\1/,
    specialChars: /[^A-Za-z0-9]/
  };

  if (password.length >= 8) strength++;
  if (password.length >= 12) strength++;
  if (regex.lowerCase.test(password)) strength++;
  if (regex.upperCase.test(password)) strength++;
  if (regex.numbers.test(password)) strength++;
  if (regex.specialChars.test(password)) strength++;

  return {
    score: strength,
    message: getStrengthMessage(strength)
  };
}

function getStrengthMessage(strength) {
  switch (strength) {
    case 0:
    case 1:
      return "Very weak";
    case 2:
      return "Weak";
    case 3:
      return "Medium";
    case 4:
      return "Strong";
    case 5:
    case 6:
      return "Very strong";
    default:
      return "Invalid strength";
  }
}

module.exports = { checkPasswordStrength };