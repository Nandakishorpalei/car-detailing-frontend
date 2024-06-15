export const isStrongPassword = (password: string) => {
  const passwordRegex =
    /^(?=.*[A-Za-z].*[A-Za-z].*[A-Za-z])(?=.*\d.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};
