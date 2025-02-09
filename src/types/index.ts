export interface Service {
    id: string;
    title: string;
    description: string;
    number: string;
  }
  
  export interface CoreValue {
    title: string;
    description: string;
  }
  
  export interface ContactInfo {
    email: string;
    phone: string;
    address: string[];
  }
  
  export interface NavItem {
    title: string;
    href: string;
  }