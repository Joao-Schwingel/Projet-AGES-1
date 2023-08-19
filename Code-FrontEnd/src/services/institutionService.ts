import { User } from 'models';
import { Pagination } from 'models/pagination';
import { httpService } from './httpService';

export interface RegisterInstitutionDto {
  email: string;
  name: string;
  username: string;
  password: string;
  cnpj: string;
  phone: string;
  photoURL?: string;
  state: string;
  city: string;
  street: string;
  number: string;
  complement?: string;
  postalCode: string;
  neighborhood: string;
}

export interface InstitutionFilters {
  page?: number;
  pageSize?: number;
  name?: string;
}

export const institutionService = {
  register: async (registerInstitutionDto: RegisterInstitutionDto) => {
    const response = await httpService.post<User>(
      '/user/institution',
      registerInstitutionDto
    );
    return response.data;
  },
  getParamsByFilter(filter: InstitutionFilters) {
    const params = {
      ...filter,
    };
    return params;
  },
  getInstitutions: async (filter: InstitutionFilters) => {
    const params = institutionService.getParamsByFilter(filter);
    const response = await httpService.get<Pagination<User>>(
      '/user/institution',
      {
        params,
      }
    );
    return response.data;
  },
  getById: async (getInstitutionDto: number) => {
    const response = await httpService.get<User>(
      `/user/institution/${getInstitutionDto}`
    );
    return response;
  },
};
