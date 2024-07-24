export interface Product {
    name: string;
    description: string;
    image: string;
  }
  
  export interface Exchange {
    proposingUser: string;
    receivingUser: string;
    offeredProduct: Product;
    requestedProduct: Product;
  }
  