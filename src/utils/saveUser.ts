export const saveUser = (token: string) => {
  localStorage.setItem("authToken", token);
};
