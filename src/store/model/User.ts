export interface User {
  createdAt: string;
  email: string;
  name: string;
  phone: string;
  role: "customer" | "admin";
  isPhoneVerified: boolean;
  isMailVerified: boolean;
  _id: string;
}

export interface UserPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  termsConditions: boolean;
}
