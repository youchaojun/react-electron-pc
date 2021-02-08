import { PublicReducerIF } from '@/store/reducers';
import { PublicStateIF } from '@/store/states/public';
import { useDispatch, useSelector } from 'react-redux';
import { MenuTabIF } from '@/typings/common';
import { useHistory, useLocation } from 'react-router-dom';
import { addMenuList } from '@/store/actionCreators/public';
import { dropByCacheKey } from 'react-router-cache-route';

const useCloseMenuTab = (): Function => {
  const result = useSelector<PublicReducerIF, PublicStateIF>((state) => state.publicReducer);
  const menuTabList = result.menuTab;
  const currentTabIndex = result.currentTabIndex;
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const closeTab = () => {
    history.go(-1);
    setTimeout(() => {
      const path = location.pathname;
      let newList: MenuTabIF[][] = [...menuTabList];
      const newFilterList = newList[currentTabIndex].filter((item) => item.path !== path);
      newList[currentTabIndex] = newFilterList;
      dropByCacheKey(path);
      dispatch(addMenuList(newList));
    }, 100);
  };
  return closeTab;
};

export default useCloseMenuTab;
