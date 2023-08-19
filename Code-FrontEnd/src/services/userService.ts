import { Role } from 'models';
import { CurrentUserDto } from 'models/currentUserDto';
import { User } from 'types/User';
import { Url } from 'url';
import { httpService } from './httpService';

export const userService = {
  getCurrentUser: async () => {
    if (localStorage.getItem('currentUser')) {
      return JSON.parse(localStorage.getItem('currentUser')!);
    } else {
      const response = await httpService.get<CurrentUserDto>('/user/me');
      localStorage.setItem('currentUser', JSON.stringify(response.data));
      return response.data;
    }
  },

  clearCache: () => {
    localStorage.removeItem('currentUser');
  },
};
