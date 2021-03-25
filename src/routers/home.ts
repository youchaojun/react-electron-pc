import { lazy } from 'react';
import { RoutersConfigIF } from '../typings/router';

const Home = lazy(() => import('@/pages/Home'));
const HomeChildren = lazy(() => import('@/pages/Home/HomeChildren'));
const ScrollTop = lazy(() => import('@/pages/ScrollTop'));
const PageCache = lazy(() => import('@/pages/PageCache'));
const IframeTest = lazy(() => import('@/pages/IframeTest'));

export const home: RoutersConfigIF[] = [
  {
    name: '首页',
    path: '/home',
    basePath: '/home',
    component: Home,
    exact: true,
    cache: false,
    children: [
      {
        name: '子页面',
        path: '/children',
        basePath: '/children',
        component: HomeChildren,
        isTab: false,
        exact: true,
        cache: false,
        children: [],
      },
    ],
  },
  {
    name: '页面滚动',
    path: '/scrollTop/:id',
    basePath: '/scrollTop',
    component: ScrollTop,
    exact: true,
    cache: true,
    tabMore: true,
  },
  {
    name: '多个页面',
    path: '/iframeTest/:id',
    basePath: '/iframeTest',
    component: IframeTest,
    exact: true,
    cache: false,
    tabMore: true,
  },
  {
    name: '页面缓存',
    path: '/pageCache',
    basePath: '/pageCache',
    component: PageCache,
    exact: true,
    cache: true,
    children: [],
  },
];
