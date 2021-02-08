import React, { FC, ReactElement, CSSProperties } from 'react';
import { Breadcrumb } from 'antd';
import { useHistory, useLocation } from 'react-router-dom';
import routerInsiderConfig from '@/routers/routerInsiderConfig';
import { useSelector } from 'react-redux';
import { PublicReducerIF } from '@/store/reducers';
import { PublicStateIF } from '@/store/states/public';
import { menuRouter } from '@/routers/menuRouter';
import IconFont from '@/components/IconFont';
import { getParentRouter } from '@/routers/routersCommon';
import { styleBtn } from '@/utils';

interface ISProps {
  /*eslint-disable */
  onReload(idx: number): void;
}
const MenuBreadcrumb: FC<ISProps> = ({ onReload }: ISProps): ReactElement => {
  const location = useLocation();
  const history = useHistory();
  const result = useSelector<PublicReducerIF, PublicStateIF>((state) => state.publicReducer);
  const menuTab = result.menuTab;
  const currentTabIndex = result.currentTabIndex;
  const menuTabList = menuTab[currentTabIndex];
  const { pathname, state } = location;
  const findMenuActiveIdx = menuTabList.findIndex((item) => item.active);
  const tabList = getParentRouter(pathname, routerInsiderConfig);
  const index = tabList.findIndex((item) => item.isTab === false);
  tabList.splice(0, index - 1);

  const currentPathList = menuTabList[findMenuActiveIdx]?.pathList;

  // 点击刷新
  const onReloadBread = () => {
    const idx = menuTabList.findIndex((item) => item.active);
    onReload(idx);
  };
  // 点击后退
  const onBack = () => {
    const idx = currentPathList.findIndex((item) => item?.path === pathname);
    if (idx !== -1) {
      history.push({
        pathname: currentPathList[idx - 1].path,
        state: currentPathList[idx - 1].state,
      });
    }
  };

  // 点击前进
  const onPrev = () => {
    const idx = currentPathList.findIndex((item) => item?.path === pathname);
    if (idx !== -1) {
      history.push({
        pathname: currentPathList[idx + 1].path,
        state: currentPathList[idx + 1].state,
      });
    }
  };

  // 过滤返回按钮置灰或黑白
  const filterBack = (): CSSProperties | undefined => {
    let style: CSSProperties | undefined;
    if (tabList[0]?.basePath === '') {
      style = tabList.length > 2 ? undefined : styleBtn;
    } else {
      style = tabList.length > 1 ? undefined : styleBtn;
    }
    return style;
  };
  return (
    <div className="ment-breadcrumb">
      <div className="action-btn">
        <IconFont type="icon-backwardarrow--copy" style={filterBack()} onClick={onBack} />
        <IconFont
          type="icon-backwardarrow-"
          style={tabList.length < currentPathList?.length ? undefined : styleBtn}
          onClick={onPrev}
        />
        <IconFont type="icon-shuaxin" onClick={onReloadBread} />
      </div>
      <Breadcrumb>
        <Breadcrumb.Item>当前位置： {menuRouter[currentTabIndex].name}</Breadcrumb.Item>
        {tabList.map((val) => (
          <Breadcrumb.Item key={val.id}>{val.name}</Breadcrumb.Item>
        ))}
      </Breadcrumb>
    </div>
  );
};
export default MenuBreadcrumb;
