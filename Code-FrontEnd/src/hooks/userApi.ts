import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API,
});

export const userApi = () => ({
  validateToken: async (token: string) => {
    return {
      // user: {
      //   id: 3,
      //   cnpj: '88630413000796',
      //   role: 'user',
      //   email: 'jose@gmail.com',
      // },
    };
    const response = await api.post('/validate', { token });
    return response.data;
  },

  signin: async (userName: string, password: string) => {
    return {
      user: {
        id: 3,
        cnpj: '88630413000796',
        role: 'user',
        email: 'jose@gmail.com',
      },
      token: '1234456565',
    };
    const response = await api.post('/signin', { userName, password });
    return response.data;
  },

  logout: async () => {
    return { status: true };
    const response = await api.post('/logout');
    return response.data;
  },
});
