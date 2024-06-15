export interface User {
  createdAt: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: string;
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
