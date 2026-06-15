export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  bio?: string;
  socialLinks?: string[];
  createdAt?: Date;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
}
