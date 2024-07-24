export interface interfaceLogin {
  email: string;
  password: string;
}

export interface interfaceRegister {
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export class User {
  id!: string;
  username!: string;
  email!: string;
  password?: string; // Optional for profile update
  avatar?: string;
  token!: string;
  role!: string;
  exchanges?: number; // Add exchanges property
  reputation?: number; // Add reputation property
  following?: string[];
  followers?: string[];
  likes?: number;
}


export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    username?: string;
    avatar?: string;
    password?: string;
    role: string;
    exchanges?: number;
    reputation?: number;
  };
}
