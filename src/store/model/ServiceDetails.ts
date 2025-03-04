import { Car } from "./Car";
import { File, LocalFile } from "./File";
import { User } from "./User";

export type ServiceDetailsResponse = {
  _id: string;
  user_details: User;
  model: string;
  color: string;
  year: string;
  pre_service_photos: File[];
  post_service_photos: File[];
  created_at: string;
  car_details: Car;
  work_status: "pending" | "in_progress" | "completed" | "rejected";
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
