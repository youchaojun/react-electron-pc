import { menuRouter } from '@/routers/menuRouter';
import { MenuTabIF } from '@/typings/common';

export interface PublicStateIF {
  menuTab: MenuTabIF[][];
  currentTabIndex: number;
}

let menuTab: MenuTabIF[][] = [];
for (let i = 0; i < menuRouter.length; i++) {
  menuTab.push([
    {
      active: true,
      id: 1,
      name: '首页',
      path: '/home',
      pathList: [
        {
          path: '/home',
        },
      ],
    },
  ]);
}

const publicState: PublicStateIF = {
  // tab切换
  menuTab,
  currentTabIndex: 0,
};

export { publicState };
