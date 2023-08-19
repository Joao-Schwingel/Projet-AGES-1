import { Medicament, User, Delivery, DeniedRequest } from 'models';
import { httpService } from './httpService';
import { Request } from 'models';
import { Pagination } from 'models/pagination';
import { formatDateyyyymmdd } from 'utils/formatDate';

export interface RequestFilters {
  page?: number;
  pageSize?: number;
  medicamentNameContains?: string;
  driverNameContains?: string;
  senderNameContains?: string;
  requesterNameContains?: string;
  status: string;
  day?: Date;
  genericAccepted?: boolean;
}

export interface CreateRequestTransportationDto {
  description?: string;
  licensePlate: string;
  driverName: string;
  generalRegister: string;
  phoneNumber: string;
}

export interface GetRequestDto {
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

export interface CreateRequestDto {
  medicament: string;
  doctor: string;
  crm: string;
  principleActive: string;
  medicamentQuantity: string;
  dosage: string;
  amount: string;
  genericAccepted: boolean;
  observation: string;
}

export const requestService = {
  register: async (createRequestDto: CreateRequestDto) => {
    const response = await httpService.post<Request>(
      '/request',
      createRequestDto
    );
    return response.data;
  },

  registerTransport: async (
    id: number,
    createRequestTransportationDto: CreateRequestTransportationDto
  ) => {
    const response = await httpService.post<Request>(
      `/request/transportation/${id}`,
      createRequestTransportationDto
    );
    return response.data;
  },

  getById: async (getRequestDto: number) => {
    const response = await httpService.get<Request>(
      `/request/${getRequestDto}`
    );
    return response;
  },

  reject: async (requestId: number) => {
    try {
      const response = await httpService.post('/request/reject', {
        requestId,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      console.log(requestId);
    }
  },

  accept: async (requestId: number) => {
    try {
      const response = await httpService.patch('/request/accept', {
        requestId,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      console.log(requestId);
    }
  },

  done: async (requestId: number) => {
    try {
      const response = await httpService.patch(`/request/close/${requestId}`);
      return response.data;
    } catch (error) {
      console.log(error);
      console.log(requestId);
    }
  },

  getParamsByFilter(filter: RequestFilters) {
    const params = {
      ...filter,
      day: filter.day ? formatDateyyyymmdd(filter.day) : undefined,
    };
    return params;
  },
  getRequests: async (filter: RequestFilters) => {
    const params = requestService.getParamsByFilter(filter);
    const response = await httpService.get<Pagination<Request>>('/request', {
      params,
    });
    return response.data;
  },
  getSentRequests: async (filter: RequestFilters) => {
    const params = requestService.getParamsByFilter(filter);
    const response = await httpService.get<Pagination<Request>>(
      '/request/sent',
      { params }
    );
    return response.data;
  },
  getReceivedRequests: async (filter: RequestFilters) => {
    const params = requestService.getParamsByFilter(filter);
    const response = await httpService.get<Pagination<Request>>(
      '/request/received',
      { params }
    );
    return response.data;
  },
};
