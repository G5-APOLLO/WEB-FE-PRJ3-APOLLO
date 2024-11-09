export type Opportunity = {
    id: number;
    name: string;
};


  export type ListClientType = {
    id: number | null;
    nit: string;
    name: string;
    address: string;
    city: string;
    country: string;
    phone: string;
    email: string;
    active: boolean;
    opportunities?: Opportunity[]; 
    contacts?: number[];
};

export type Contact = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
};