export interface Product {
  _id: string;
  title: string;
  description: string;
  images: string[];
  estado: string;
  preference: string;
}

export interface User {
  _id: string;
  username: string;
  email: string;
}

export interface Exchange {
  _id: string;
  status: string;
  productOffered: Product;
  productRequested: Product;
  userOffered: User;
  userRequested: User;
  uniqueCode: string;
  createdAt: string;
  receiptRequested?: string;
  receiptOffered?: string;
  addressOffered?: string;
  addressRequested?: string;
  phoneOffered?: string;
  phoneRequested?: string;
}
