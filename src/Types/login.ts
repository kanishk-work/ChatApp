export interface LoginDetails {
  user_id: string;
  client_email: string;
  client_name: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  profile_pic_url: string;
}
export interface Client {
  id: number;
  updatedAt: string;
  createdAt: string;
  deletedAt: string | null;
  name: string;
  email: string;
  status: string;
}

export interface ActiveUser {
  id: number;
  updatedAt: string;
  createdAt: string;
  deletedAt: string | null;
  client_id: number;
  client: Client;
  full_name: string;
  short_name: string | null;
  client_user_id: string;
  role: string;
  email: string;
  mobile_no: string | null;
  profile_pic: string | null;
  status: string;
}
export interface LoginResponse {
  user: ActiveUser;
  accessToken: string;
}
