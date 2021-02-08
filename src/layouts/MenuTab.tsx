import React, { CSSProperties, ReactElement, useCallback, useEffect } from 'react';
import { Tag, Dropdown, Menu } from 'antd';
import { useHistory, useLocation } from 'react-router-dom';
import routerInsiderConfig from '@/routers/routerInsiderConfig';
import { MenuTabIF, PathListIF } from '@/typings/common';
import { useSelector, useDispatch } from 'react-redux';
import { PublicReducerIF } from '@/store/reducers';
import { PublicStateIF } from '@/store/states/public';
import { addMenuList } from '@/store/actionCreators/public';
import { RoutersConfigIF, RouterStateIF } from '@/typings/router';
import { dropByCacheKey } from 'react-router-cache-route';
import { listFlat, styleBtn } from '@/utils';
import MenuBreadcrumb from './MenuBreadcrumb';
import { getParentRouter } from '@/routers/routersCommon';

const MenuTab = (): ReactElement => {
  const history = useHistory();
  const location = useLocation<RouterStateIF>();
  const dispatch = useDispatch();
  const result = useSelector<PublicReducerIF, PublicStateIF>((state) => state.publicReducer);
  const menuTab = result.menuTab;
  const currentTabIndex = result.currentTabIndex;
  const menuTabList = menuTab[currentTabIndex];
  const path = location.pathname;
  const routerList = listFlat(routerInsiderConfig);
  // const params = useParams<{ id: string }>();
  const { state } = location;
  const findMenuActiveIdx = menuTabList.findIndex((item) => item.active);
  const tabList = getParentRouter(path, routerInsiderConfig);
  const index = tabList.findIndex((item) => item.isTab === false);
  tabList.splice(0, index - 1);

  /**
   * 过滤菜单颜色
   * @param index 点击的index
   * @param active 是否选中
   */
  const filterMenuStyle = (index: number, active: boolean): CSSProperties => {
    const left = index === 0 ? '-10px' : index * 105 - 10 + 'px';
    const zIndex = active ? 99 : 0;
    return { left, zIndex };
  };

  // 更新菜单store
  const reloadMent = useCallback(
    (newList: MenuTabIF[]): void => {
      let newMenuTab = [...menuTab];
      newMenuTab[currentTabIndex] = newList;
      dispatch(addMenuList(newMenuTab));
    },
    [currentTabIndex, dispatch, menuTab]
  );

  // 添加菜单
  const addTab = useCallback(
    (val: RoutersConfigIF | MenuTabIF, newList: MenuTabIF[]): void => {
      const newTab = routerList.filter((item) => path.startsWith(item.basePath));
      if (newTab[0].isTab === false) {
        newList[0].path = path;
        newList[0].pathList.push({ path: path, state: val.state });
      } else {
        newList.push({
          id: val.id,
          name: val.name,
          path: path,
          pathList: [
            {
              path: val.path,
              state: val.state,
            },
          ],
          active: true,
          // tabMore: val.tabMore,
          state: val.state,
        });
        reloadMent(newList);
      }
    },
    [reloadMent, path, routerList]
  );

  // 添加菜单
  const addTabMenu = useCallback((): void | boolean => {
    let newList: MenuTabIF[] = [...menuTabList];
    const newTab = routerList.filter((item) => path.startsWith(item.basePath));
    if (!newTab[0]) return false;
    // 全部设置未选中
    newList.map((val) => (val.active = false));
    // 判断同一个路由是否需要添加多个tab
    if (state?.tabMore) {
      const indexActive = newList.findIndex((item) => item.id === state.id);
      if (indexActive !== -1) {
        newList[indexActive].active = true;
        history.push({
          pathname: newList[indexActive].path,
          state: newList[indexActive].state,
        });
      } else {
        addTab(
          {
            id: state.id,
            name: state.tabName,
            path: path,
            pathList: [],
            state,
            tabMore: true,
            active: true,
          },
          newList
        );
      }
    } else {
      /* 如果同一路由不需要添加多个tab的走下边逻辑
        如果tabList的长度为1,并且tab找不到当前的id，则需要有添加tab 
        如果大于1则不需要添加tab,找到当前的tab把path更改为当前的path,
         */
      // 如果isTab为false，则不需要添加tab,他一定有tab，切tab的索引就为当前的索引，所以只需要找出newList中active为true的即可
      if (newTab[0]?.isTab === false) {
        newList[findMenuActiveIdx].path = path;
        newList[findMenuActiveIdx].state = state;
        newList[findMenuActiveIdx].active = true;
        newList[findMenuActiveIdx].pathList[tabList.length - 1] = {
          path: path,
          state: state,
        };
        // 如果newList[findMenuActiveIdx]中没有这个地址则push,如果有则替换
      } else {
        // 判断是否有tab，没有则添加，有则直接替换path
        const findTabIndex = newList.findIndex((item) => item.id === newTab[0].id);
        if (findTabIndex !== -1) {
          newList[findTabIndex].path = path;
          if (state) {
            newList[findMenuActiveIdx].state = state;
          }
          newList[findTabIndex].active = true;
          reloadMent(newList);
        } else {
          newTab[0].state = state;
          addTab(newTab[0], newList);
        }
      }
    }
  }, [
    addTab,
    findMenuActiveIdx,
    reloadMent,
    history,
    path,
    menuTabList,
    state,
    routerList,
    tabList.length,
  ]);

  useEffect(() => {
    // 不走添加tab的页面（目前只有首页和空页面，先写死，之后多了在router中添加一个字段判断）
    let isNoTab = path !== '/' && path !== '/empty';
    if (menuTabList[findMenuActiveIdx]?.path !== path && isNoTab) {
      addTabMenu();
    }
  }, [addTabMenu, menuTabList, findMenuActiveIdx, path]);

  /**
   * 点击关闭菜单
   * @param index 点击的index
   */
  const closeMenu = (index: number): void => {
    let newList: MenuTabIF[] = [...menuTabList];
    // 需要判断是不是当前，不是当前路由可以直接清除，如果 是当前路由需要先跳转到其他再删除，不然不能删除
    if (newList[index].path === path) {
      // 判断当前是否为最后一个，如果为最后一个则跳转到他前一个，如果不是最后一个则调到他后边一个
      if (index === newList.length - 1) {
        newList[index - 1].active = true;
        history.push({
          pathname: newList[index - 1].path,
          state: newList[index - 1].state,
        });
        dropByCache(newList[index].pathList);
      } else {
        history.push(newList[index + 1].path);
        dropByCache(newList[index].pathList);
      }
    } else {
      dropByCache(newList[index].pathList);
    }
    newList.splice(index, 1);
    reloadMent(newList);
  };

  /**
   * 点击菜单切换
   * @param index 点击的index
   */
  const changeMenu = (index: number): void => {
    let newList: MenuTabIF[] = [...menuTabList];
    newList.map((val) => (val.active = false));
    // 点击切换菜单 如果同一路由是多个tab的走下边逻辑
    if (newList[index].state?.tabMore) {
      history.push({
        pathname: newList[index].path,
        state: newList[index].state,
      });
    } else {
      history.push({
        pathname: newList[index].path,
        state: newList[index].state,
      });
    }
    newList[index].active = true;
    reloadMent(newList);
  };

  /**
   * 截取文字，超过5个字符的用省略号显示
   * @param text 文字
   */
  const filterText = (text: string): string => {
    return text.length > 5 ? text.substr(0, 5) + '...' : text;
  };

  /**
   * 重新加载
   * 先跳到空白页，清除路由缓存，在跳转过去则实现刷新
   */
  const onReload = (idx: number) => {
    let newTabList: MenuTabIF[][] = [...menuTab];
    // 先获取basePath
    const newTab = routerList.filter((item) =>
      newTabList[currentTabIndex][idx].path.startsWith(item.basePath)
    );
    dropByCacheKey(newTab[0].basePath);
    history.push('/empty');
    setTimeout(() => {
      history.push({
        pathname: newTabList[currentTabIndex][idx].path,
        state: newTabList[currentTabIndex][idx].state,
      });
    }, 100);
  };

  // 右键关闭当前
  const closeMenuClick = (idx: number) => {
    if (menuTabList[idx].path !== '/home') {
      closeMenu(idx);
    }
  };

  // 关闭左侧
  const closeLeft = (idx: number) => {
    let newList: MenuTabIF[] = [...menuTabList];
    const list = newList.slice(1, idx);
    for (let val of list) {
      dropByCache(val.pathList);
    }
    newList.splice(1, idx);
    reloadMent(newList);
  };

  // 关闭右侧
  const closeRight = (idx: number) => {
    // 如果当前不是选中状态
    if (idx !== findMenuActiveIdx) {
      history.push({
        pathname: menuTabList[idx].path,
        state: menuTabList[idx].state,
      });
    }
    let newList: MenuTabIF[] = [...menuTabList];
    const list = newList.slice(idx + 1, newList.length);
    for (let val1 of list) {
      for (let val2 of val1.pathList) {
        // 先获取basePath
        const newTab = routerList.filter((item) => val2.path.startsWith(item.basePath));
        dropByCacheKey(newTab[0].basePath);
      }
    }
    newList.splice(idx + 1, newList.length - 1);
    reloadMent(newList);
  };

  // 清除路由缓存
  const dropByCache = (list: PathListIF[]) => {
    for (let val of list) {
      // 先获取basePath
      const newTab = routerList.filter((item) => val.path.startsWith(item.basePath));
      dropByCacheKey(newTab[0].basePath);
    }
  };

  const menu = (idx: number, active: boolean): ReactElement => {
    const newTabList: MenuTabIF[][] = [...menuTab];
    const newList: MenuTabIF[] = newTabList[currentTabIndex];
    return (
      <Menu>
        <Menu.Item style={active ? undefined : styleBtn} onClick={() => onReload(idx)}>
          重新加载
        </Menu.Item>
        <Menu.Item onClick={() => closeMenuClick(idx)}>关闭当前</Menu.Item>
        <Menu.Item style={idx > 1 ? undefined : styleBtn} onClick={() => closeLeft(idx)}>
          关闭左侧
        </Menu.Item>
        <Menu.Item
          style={idx < newList.length - 1 ? undefined : styleBtn}
          onClick={() => closeRight(idx)}
        >
          关闭右侧
        </Menu.Item>
      </Menu>
    );
  };
  return (
    <>
      <div className="menu-tab">
        {menuTabList.map((val, index) => (
          <Dropdown
            key={val.id}
            overlay={() => menu(index, val.active)}
            overlayClassName="dropdown-menu"
            trigger={['contextMenu']}
          >
            <Tag
              closable={val.name === '首页' ? false : true}
              onClose={() => closeMenu(index)}
              style={filterMenuStyle(index, val.active)}
              className={`menu-item ${val.active ? 'active' : ''}`}
              onClick={() => changeMenu(index)}
            >
              {filterText(val.name)}
            </Tag>
          </Dropdown>
        ))}
      </div>
      <MenuBreadcrumb onReload={(idx: number) => onReload(idx)} />
    </>
  );
};

export default MenuTab;
