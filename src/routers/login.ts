import { RoutersConfigIF } from '../typings/router';
import Login from '@/pages/Login';

export const login: RoutersConfigIF[] = [
  {
    name: '登录',
    path: '/',
    basePath: '/',
    component: Login,
    exact: true,
    cache: false,
  },
];
