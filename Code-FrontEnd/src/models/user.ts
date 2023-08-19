export type Role = 'admin' | 'institution';

export interface User {
  userId: number;
  email: string;
  username: string;
  name: string;
  cnpj?: string;
  role: Role;
  phone?: string;
  photoURL?: string;
  state?: string;
  city?: string;
  street?: string;
  number?: string;
  complement?: string;
  postalCode?: string;
  neighborhood?: string;
}
