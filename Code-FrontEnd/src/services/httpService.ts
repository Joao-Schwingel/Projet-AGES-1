import axios from 'axios';
import { authService } from './authService';

// Se REACT_APP_API == undefined -> porta 3001
// Se REACT_APP_API é número -> hostname:porta
// Senão -> usa o próprio REACT_APP_API como base url
function getBaseUrl() {
  const value = process.env.REACT_APP_API ?? '3001';
  const num = Number(value);
  if (Number.isInteger(num)) {
    return `${location.protocol}//${location.hostname}:${num}`;
  }
  return value;
}

export const httpService = axios.create({
  baseURL: getBaseUrl(),
});

httpService.interceptors.request.use((request) => {
  const token = authService.getToken();
  if (token) {
    request.headers['Authorization'] = `Bearer ${token}`;
  }
  return request;
});
