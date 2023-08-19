import { Medicament } from 'models';
import { Pagination } from 'models/pagination';
import { httpService } from './httpService';

export interface RegisterMedicamentDto {
  name: string;
  principleActive: string;
  dosage: string;
}

export interface MedicamentFilters {
  page?: number;
  pageSize?: number;
  name?: string;
}

export const medicamentService = {
  search: async (name: string) => {
    const response = await httpService.get<Pagination<Medicament>>(
      '/medicament',
      {
        params: { name },
      }
    );
    return response.data;
  },
  getParamsByFilter(filter: MedicamentFilters) {
    const params = {
      ...filter,
    };
    return params;
  },
  register: async (registerMedicamentDto: RegisterMedicamentDto) => {
    const response = await httpService.post<Medicament>(
      '/medicament',
      registerMedicamentDto
    );
    return response.data;
  },
  getMedicaments: async (filter: MedicamentFilters) => {
    const params = medicamentService.getParamsByFilter(filter);
    const response = await httpService.get<Pagination<Medicament>>(
      '/medicament',
      {
        params,
      }
    );
    return response.data;
  },
};
