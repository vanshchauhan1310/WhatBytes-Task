import api from './api';
import Cookies from 'js-cookie';
import { LoginCredentials, RegisterData } from '@/lib/types';

const cookieOptions = (hours: number) => ({
  expires: hours / 24, // days
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax' as const,
});

export const register = async (userData: RegisterData) => {
  const response = await api.post('/auth/register/', userData);
  return response.data;
};

export const login = async (credentials: LoginCredentials) => {
  const response = await api.post('/auth/login/', credentials);
  if (response.data.access) {
    // access: 1 hour, refresh: 7 days
    Cookies.set('access_token', response.data.access, cookieOptions(1));
    Cookies.set('refresh_token', response.data.refresh, cookieOptions(24 * 7));
  }
  return response.data;
};

export const logout = () => {
  Cookies.remove('access_token');
  Cookies.remove('refresh_token');
};

export const getAccessToken = () => Cookies.get('access_token');

export const getRefreshToken = () => Cookies.get('refresh_token');