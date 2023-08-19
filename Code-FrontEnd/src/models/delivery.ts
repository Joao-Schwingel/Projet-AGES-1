import { Driver } from './driver';
import { Request } from './requests';

export interface Delivery {
  deliveryId: number;
  licensePlate: string;
  description: string;
  status: string;
  driver?: Driver;
  driverId?: number;
  request: Request;
  requestId: number;
}
