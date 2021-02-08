import { MenuRoutersIF } from '@/typings/router';

export const test: MenuRoutersIF[] = [
  {
    name: '首页',
    icon: 'icon-home',
    path: '/home',
    authority: ['home'],
    children: [],
  },
  {
    name: '测试1',
    icon: 'icon-home',
    path: '',
    authority: ['home'],
    children: [
      {
        name: '子菜单1',
        path: '/pageCache',
        authority: ['home'],
        children: [],
      },
      {
        name: '子菜单2',
        path: '/pageCache',
        authority: ['home'],
        children: [],
      },
    ],
  },
  {
    name: '缓存页面',
    icon: 'icon-home',
    path: '/pageCache',
    authority: ['home'],
    children: [],
  },
  {
    name: '测试3',
    icon: 'icon-home',
    path: '/test',
    authority: ['home'],
    children: [],
  },
];
