import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

const isBrowser = typeof window !== 'undefined';
const safeGetCookie = (name: string): string | undefined => {
  try {
    return isBrowser ? Cookies.get(name) : undefined;
  } catch {
    return undefined;
  }
};

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach access token before each request
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = safeGetCookie('access_token');
    if (token) {
      (config.headers as any)['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// On 401, try refreshing token once and retry original request
let isRefreshing = false;
let pendingQueue: Array<{ resolve: (value?: unknown) => void; reject: (reason?: any) => void }> = [];

const processQueue = (error: AxiosError | null, token: string | null = null) => {
  pendingQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });
  pendingQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Queue the request until refresh completes
        return new Promise((resolve, reject) => {
          pendingQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (token) {
              (originalRequest.headers as any)['Authorization'] = `Bearer ${token}`;
            }
            originalRequest._retry = true;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = safeGetCookie('refresh_token');
        if (!refreshToken) throw error;

        const refreshResponse = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api'}/auth/token/refresh/`, {
          refresh: refreshToken,
        });

        const newAccess = (refreshResponse.data as any).access as string;
        if (newAccess) {
          Cookies.set('access_token', newAccess, {
            expires: 1 / 24,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
          });
          (originalRequest.headers as any)['Authorization'] = `Bearer ${newAccess}`;
          processQueue(null, newAccess);
          return api(originalRequest);
        }
      } catch (refreshError) {
        processQueue(refreshError as AxiosError, null);
        // Clean up tokens on failure
        Cookies.remove('access_token');
        Cookies.remove('refresh_token');
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;