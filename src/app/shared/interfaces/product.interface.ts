export interface Product {
  _id: string;
  title: string;
  description: string;
  images: string[];
  user: {
    _id: string;
    username: string;
  };
  estado:string;
  preference:string;
}

export interface ExchangeProposal {
  productOffered: {
    _id: string;
    images: string[];
    user: {
      _id: string;
      username: string;
    };
  };
  productRequested: string;
  userRequested: {
    username: string;
  };
}

export interface Proposal {
  _id: string;
  productOffered: {
    _id: string;
    title: string;
    description: string;
    images: string[];
    user: {
      _id: string;
      username: string;
    };
  };
  productRequested: {
    _id: string;
    title: string;
    description: string;
    images: string[];
    user: {
      _id: string;
      username: string;
    };
  };
  userOffered: {
    _id: string;
    username: string;
  };
  userRequested: {
    _id: string;
    username: string;
  };
  status: string;
  uniqueCode?: string;
}
