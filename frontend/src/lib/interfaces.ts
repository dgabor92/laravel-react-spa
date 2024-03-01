export interface User {
  id?: number;
  name: string;
  email: string;
  email_verified_at?: string | null;
  createdAt?: string;
  updatedAt?: string;
  role?: string;
  password?: string;
}

export interface DashboardProps {
  children: React.ReactNode;
}

export interface LoginFormProps {
  email: string;
  password: string;
}

export interface LoginResponse {
  expires_ind: number;
  token: string;
  token_type: string;
}

export interface NavbarProps {
  user: User;
}
