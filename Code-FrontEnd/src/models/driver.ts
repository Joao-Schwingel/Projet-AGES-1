import { Delivery } from './delivery';

export interface Driver {
  driverId: number;
  name: string;
  phoneNumber: string;
  generalRegister: string;
  deliveries: Delivery[];
}
