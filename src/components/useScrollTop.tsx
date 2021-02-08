import { RouterStateIF } from '@/typings/router';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { PublicReducerIF } from '@/store/reducers';
import { PublicStateIF } from '@/store/states/public';

interface ScrollTopIF {
  setScrollTop(): void;
  getScrollTop(): void;
}

const useScrollTop = (): ScrollTopIF => {
  const result = useSelector<PublicReducerIF, PublicStateIF>((state) => state.publicReducer);
  let menuTabList = result.menuTab;
  const currentTabIndex = result.currentTabIndex;
  const location = useLocation<RouterStateIF>();
  const { state } = location;
  let currentTabList = menuTabList[currentTabIndex];

  const scrollTabIndex = currentTabList.findIndex((item) => item.id === state?.id);

  // 设置初始值
  const setScrollTop = () => {
    const scrollTopDom = document.getElementById('scrollTop');
    if (scrollTopDom && scrollTabIndex !== -1) {
      scrollTopDom.scrollTop = currentTabList[scrollTabIndex].scrollTop
        ? currentTabList[scrollTabIndex].scrollTop!
        : 0;
    }
  };

  // 获取当前的设置值
  const getScrollTop = () => {
    const scrollTop = document.getElementById('scrollTop')?.scrollTop;
    if (scrollTabIndex !== -1) {
      menuTabList[currentTabIndex][scrollTabIndex].scrollTop = scrollTop;
    }
  };
  return {
    setScrollTop,
    getScrollTop,
  };
};

export default useScrollTop;
