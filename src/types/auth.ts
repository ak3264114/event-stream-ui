// src/types/auth.ts
export interface User {
  _id: string
  name: string | null;
  phone: string;
  email: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}


