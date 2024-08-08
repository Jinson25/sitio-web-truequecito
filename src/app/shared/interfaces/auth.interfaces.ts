// shared/interfaces/auth.interfaces.ts
import { Product } from './product.interface';  // Importar la interfaz Product

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
  password?: string;
  avatar?: string;
  token!: string;
  role!: string;
  exchanges?: number;
  reputation?: number;
  following?: string[];
  followers?: string[];
  likes?: string[];
  products?: { title: string, images: string[], _id: string }[]; // Asegurarse de que `images` sea un array de strings
  name?: string;
  location?: string;
  address?: string; // Cambiar a un string simple para la dirección completa
  phone?: string;  // Añadir campo para el teléfono
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
    address?: string;  // Cambiar a un string simple para la dirección completa
    phone?: string;  // Añadir campo para el teléfono
  };
}
