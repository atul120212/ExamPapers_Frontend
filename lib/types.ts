export interface Paper {
  id: string;
  title: string;
  subject: string;
  school: string;
  year: number;
  description?: string;
  file_url: string;
  file_size: number;
  file_type: string;
  uploaded_at: string;
  created_at?: string;
  updated_at?: string;
}

export interface User {
  id: string;
  email: string;
  full_name?: string;
  is_admin?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface AuthResponse {
  user: User | null;
  session: {
    access_token: string;
    refresh_token?: string;
    expires_in: number;
    expires_at?: number;
    token_type: string;
  } | null;
}

export interface PapersResponse {
  data: Paper[];
  total: number;
  limit: number;
  offset: number;
}

export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

export interface FilterOptions {
  boards: string[];
  classes: string[];
  subjects: string[];
  years: number[];
}
