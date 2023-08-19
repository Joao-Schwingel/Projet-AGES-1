import { User } from './user';
import { Request } from './requests';

export interface DeniedRequest {
  deniedId: number;
  user?: User;
  userUserId?: number;
  request?: Request;
  requestId?: number;
}
