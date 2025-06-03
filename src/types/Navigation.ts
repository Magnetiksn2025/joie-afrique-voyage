export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  icon?: React.ComponentType<any>;
  isExternal?: boolean;
  subItems?: NavigationSubItem[];
}

export interface NavigationSubItem {
  id: string;
  label: string;
  href: string;
  description?: string;
}

export interface Destination {
  id: string;
  name: string;
  slug: string;
  country: string;
  description: string;
  image: string;
  featured: boolean;
}

export type PageRoute = 
  | '/' 
  | '/destinations' 
  | '/destinations/:slug'
  | '/galerie' 
  | '/a-propos' 
  | '/contact'
  | '/devis'
  | '/reservations'
  | '/mentions-legales';

// Routes publiques
export const PUBLIC_ROUTES: Record<string, string> = {
  HOME: '/',
  DESTINATIONS: '/destinations',
  DESTINATION_DETAIL: '/destinations',
  GALLERY: '/galerie',
  ABOUT: '/a-propos',
  CONTACT: '/contact',
  QUOTE: '/devis',
  BOOKING: '/reservations',
  LEGAL: '/mentions-legales',
} as const;