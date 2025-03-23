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

// Define section IDs type for type safety
export type SectionId = 'home' | 'about' | 'services' | 'our-purpose' | 'contact';

export interface NavItem {
  id: SectionId,
  title: string;
  href: string;
  order: number;
}