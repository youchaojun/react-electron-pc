import routerInsiderConfig from '@/routers/routerInsiderConfig';
import { addMenuList } from '@/store/actionCreators/public';
import { PublicReducerIF } from '@/store/reducers';
import { PublicStateIF } from '@/store/states/public';
import { listFlat } from '@/utils';
import { useDispatch, useSelector } from 'react-redux';
import { dropByCacheKey } from 'react-router-cache-route';
import { useHistory } from 'react-router-dom';

function useCloseRouter(): Function {
  const result = useSelector<PublicReducerIF, PublicStateIF>((state) => state.publicReducer);
  const menuTab = result.menuTab;
  const currentTabIndex = result.currentTabIndex;
  const menuTabList = menuTab[currentTabIndex];
  const history = useHistory();
  const dispatch = useDispatch();
  const routerList = listFlat(routerInsiderConfig);
  const findMenuActiveIdx = menuTabList.findIndex((item) => item.active);

  // 关闭当前路由跳转到上一路由并刷新
  const closeRouter = () => {
    const newList = [...menuTab];
    const currentPathList = menuTabList[findMenuActiveIdx]?.pathList;
    const newTab = routerList.filter((item) =>
      currentPathList[currentPathList.length - 2].path.startsWith(item.basePath)
    );
    dropByCacheKey(newTab[0].basePath);
    setTimeout(() => {
      history.push({
        pathname: currentPathList[currentPathList.length - 2].path,
        state: currentPathList[currentPathList.length - 2].state,
      });
      newList[currentTabIndex][findMenuActiveIdx].pathList = currentPathList.slice(
        0,
        currentPathList.length - 1
      );
      dispatch(addMenuList(newList));
    }, 100);
  };

  return closeRouter;
}
export default useCloseRouter;
