import { Delivery } from './delivery';
import { DeniedRequest } from './deniedRequest';
import { Medicament } from './medicament';
import { User } from './user';

export interface Request {
  requestId: number;
  dateAndTime: Date;
  crm: string;
  doctor: string;
  genericAccepted: boolean;
  observation: string;
  status: string;
  amount: string;
  originInstitution: User;
  originInstitutionId: number;
  userDenies: DeniedRequest[];
  delivery?: Delivery;
  medicament: Medicament;
  medicamentId: number;
  accepterUser?: User;
  accepterUserId?: number;
}
