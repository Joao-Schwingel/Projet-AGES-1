import { Driver, Medicament } from 'models';
import { Pagination } from 'models/pagination';
import { httpService } from './httpService';

export interface DriverFilters {
  page?: number;
  pageSize?: number;
  generalRegister?: string;
}

export const driverService = {
  search: async (name: string) => {
    const response = await httpService.get<Medicament[]>('/driver', {
      params: { name },
    });
    return response.data;
  },
  getParamsByFilter(filter: DriverFilters) {
    const params = {
      ...filter,
    };
    return params;
  },
  getDrivers: async (filter: DriverFilters) => {
    const params = driverService.getParamsByFilter(filter);
    const response = await httpService.get<Pagination<Driver>>('/driver', {
      params,
    });
    return response.data;
  },
};
