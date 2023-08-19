export type Role = 'admin' | 'institution';

export interface CurrentUserDto {
  name: string;
  photoURL?: string;
  role: Role;
  userId: number;
  username: string;
}
