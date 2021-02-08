import { MenuRoutersIF } from '@/typings/router';
import { test } from './test';
import { test2 } from './test2';
import { test3 } from './test3';

export interface ModuleMenuRouterIF {
  name: string;
  id: number;
  show?: boolean;
  children: MenuRoutersIF[];
}

export const menuRouter: ModuleMenuRouterIF[] = [
  {
    name: '测试系统1',
    id: 1,
    children: test,
  },
  {
    name: '测试系统2',
    id: 2,
    children: test2,
  },
  {
    name: '测试系统3',
    id: 3,
    children: test3,
  },
];
