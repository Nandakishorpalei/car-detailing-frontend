import { Car } from "./Car";
import { File, LocalFile } from "./File";
import { User } from "./User";

export type ServiceDetailsResponse = {
  _id: string;
  user_details: User;
  model: string; // Car model (e.g., Toyota Corolla)
  registration_number: string; // License plate number
  color: string; // Car color
  year: string; // Year of manufacture
  pre_service_photos: File[]; // Uploaded photos
  created_at: string; // ISO date string for creation time
  car_details: Car;
  approval_status: "created" | "approved" | "rejected";
  work_status: "pending" | "in_progress" | "completed";
};

export type ServiceDetailsPayload = {
  user_id: string;
  username: string;
  model: string;
  registration_number: string;
  color: string;
  year: string;
  pre_service_photos: File[];
};

export type UpdateServicePayload = {
  post_service_photos: File[];
  approval_status: boolean;
};
