import { createContext, ReactNode, useContext, useState } from 'react';

import { AxiosError } from 'axios';
import dayjs from 'dayjs';
import Cookies from 'js-cookie';
import route from 'next/router';

import { api } from '../lib/axios';
import { LoginModel } from '../models/login_model';
import UserModel from '../models/user_model';
import { Api } from '../utils/urls';

interface AuthContextProps {
  children?: ReactNode;
}

type AuthContextData = {
  user?: UserModel;
  setUser: (user: UserModel | undefined) => void;
  loading?: boolean;
  login: (data: LoginModel) => Promise<void>;
  getMe: () => Promise<void>;
  logout: () => Promise<void>;
};

const cookieAuth = 'bookStore-userId';

const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthContextProps) {
  const [user, setUser] = useState<UserModel>();
  const [loading, setLoading] = useState<boolean>(true);

  async function login(data: LoginModel) {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const response = await api.post<UserModel>(`${Api.url}/login`, data);

      Cookies.set(cookieAuth, response.data.id!, {
        expires: dayjs().add(1, 'hour').toDate(),
        path: '/',
        sameSite: 'strict',
        secure: process.env.NODE_ENV !== 'development'
      });

      setUser(response.data);
      setLoading(false);

      route.push('/');
    } catch (err) {
      if (err instanceof AxiosError && err?.response?.data?.message) {
        console.log(err.response.data.message);
        return;
      }
    }
  }

  async function getMe() {
    try {
      const userId = Cookies.get(cookieAuth);
      const response = await api.get<UserModel>(`/user?id=${userId}`);

      setLoading(false);
      setUser(response.data);
    } catch (err) {
      if (err instanceof AxiosError && err?.response?.data?.message) {
        setLoading(false);
      }
    }
  }

  async function logout() {
    try {
      await api.get(`${Api.url}/logout`);

      Cookies.remove(cookieAuth);
      route.push('/login');
    } catch (err) {
      if (err instanceof AxiosError && err?.response?.data?.message) {
        console.log(err.response.data.message);
      }
    }
  }

  return (
    <AuthContext.Provider value={{ user, setUser, loading, login, getMe, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
