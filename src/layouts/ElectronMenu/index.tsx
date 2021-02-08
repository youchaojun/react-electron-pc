import React, { FC, useEffect, useState } from 'react';
import CloseElectron from './CloseElectron';
import IconFont from '@/components/IconFont';
import User from '../User';
import { currentThemeBG, ipcRenderer, isElectron } from '@/utils';
import { useDispatch, useSelector } from 'react-redux';
import { changeModule } from '@/store/actionCreators/public';
import { LoginReducerIF, PublicReducerIF } from '@/store/reducers';
import { PublicStateIF } from '@/store/states/public';
import { menuRouter, ModuleMenuRouterIF } from '@/routers/menuRouter';
import { useHistory } from 'react-router-dom';
import { LoginStateIF } from '@/store/states';

const ElectronMenu: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const result = useSelector<PublicReducerIF, PublicStateIF>((state) => state.publicReducer);
  const resUser = useSelector<LoginReducerIF, LoginStateIF>((state) => state.loginReducer);
  const userInfo = resUser.userInfo;
  const currentTabIndex = result.currentTabIndex;
  const menuTabList = result.menuTab;
  const permissions = userInfo.currentPermissions;
  const [menuList, setMenuList] = useState<ModuleMenuRouterIF[]>([]);
  // change modules
  const changeModules = (idx: number) => {
    dispatch(changeModule(idx));
    const pathTo = menuTabList[idx].filter((item) => item.active);
    /**
     * 切换时判断是否之前有选择的tab
     * 如果有则需要跳转到之前的路由
     * 如果没有则跳转到菜单的第一个路由
     */
    if (pathTo.length > 0) {
      history.push(pathTo[0].path);
    } else {
      history.push(menuRouter[idx].children[0].path);
    }
  };

  useEffect(() => {
    // 处理menuRouter的权限
    // 如果下级菜单中有一个权限则显示 如果没有则不显示 找到一个就终止
    menuRouter.map((item1) => {
      for (let item2 of item1.children) {
        if (permissions.some((authorityOuter) => item2.authority.includes(authorityOuter))) {
          item1.show = true;
          return;
        }
        if (item2.children) {
          for (let item3 of item2.children) {
            if (permissions.some((authorityOuter) => item3.authority.includes(authorityOuter))) {
              item1.show = true;
              return;
            }
          }
        }
      }
      return item1;
    });
    setMenuList(menuRouter);
  }, []);
  return (
    <>
      <div className="electron-menu">
        <div style={{ width: '152px' }}>公司logo</div>
        <li className="system-list">
          <div className="list">
            {menuList?.map((val, idx) =>
              val.show ? (
                <div
                  onClick={() => changeModules(idx)}
                  className={currentTabIndex === idx ? 'active' : ''}
                  key={val.id}
                >
                  <div
                    className="line"
                    style={currentTabIndex === idx ? currentThemeBG('primary') : undefined}
                  ></div>
                  <p> {val.name}</p>
                </div>
              ) : null
            )}
          </div>
          <User />
        </li>
        {isElectron ? (
          <li className="electron-btn">
            <IconFont type="icon-zuixiaohua2" onClick={() => ipcRenderer.send('window-min')} />
            <IconFont type="icon-zuidahua" onClick={() => ipcRenderer.send('window-max')} />
            <CloseElectron />
          </li>
        ) : null}
      </div>
    </>
  );
};
export default ElectronMenu;
