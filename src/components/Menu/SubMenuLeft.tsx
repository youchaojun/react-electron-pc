import React, { FC, ReactNode, useState, useEffect, useCallback } from 'react';
import { Layout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { MenuRoutersIF } from '@/typings/router';
import { useSelector } from 'react-redux';
import { LoginReducerIF, PublicReducerIF } from '@/store/reducers';
import { PublicStateIF } from '@/store/states/public';
import { menuRouter } from '@/routers/menuRouter';
import IconFont from '../IconFont';
import { LoginStateIF } from '@/store/states';
const { SubMenu } = Menu;
const { Sider } = Layout;

const SubMenuLeft: FC = () => {
  const result = useSelector<PublicReducerIF, PublicStateIF>((state) => state.publicReducer);
  const resUser = useSelector<LoginReducerIF, LoginStateIF>((state) => state.loginReducer);
  const userInfo = resUser.userInfo;
  const menuTabList = result.menuTab;
  const currentTabIndex = result.currentTabIndex;
  const location = useLocation();
  const [openKey, setOpenKey] = useState<string>('0');
  const [selectKey, setSelectKey] = useState<string>('0');
  const historyPath = location.pathname;
  const siderRouter = menuRouter[currentTabIndex].children;

  const recursionFind = useCallback((): void => {
    for (let val of siderRouter) {
      if (val.path === historyPath) {
        setKey(val);
      } else {
        for (let item of val.children) {
          if (item.path === historyPath) {
            setKey(item);
          }
        }
      }
    }
  }, [historyPath, siderRouter]);

  useEffect(() => {
    // 循环查找path的菜单的id
    recursionFind();
  }, [menuTabList, recursionFind]);

  const setKey = (val: MenuRoutersIF) => {
    const stringRes = String(val.id);
    // 需要更改成查找当前的父级的id（展开的id为父级的id）
    if (val.parentId) {
      setOpenKey(val.parentId.toString());
    }
    setSelectKey(stringRes);
  };
  /**
   * 菜单权限处理
   * @routerConfig 路由配置
   */
  const filterAuthority = (): MenuRoutersIF[] => {
    const permissions = userInfo.currentPermissions;
    /** 添加一个parentId用于展开菜单用 */
    let idNumber = 0;
    // 处理一级菜单是否有权限
    for (let val of siderRouter) {
      idNumber++;
      if (permissions.some((authorityOuter) => val.authority.includes(authorityOuter))) {
        val.show = true;
        val.id = idNumber;
      } else {
        val.id = idNumber;
        val.show = false;
      }
      let parentId = idNumber;
      // 处理二级菜单是否有权限
      for (let valChildren of val.children) {
        idNumber++;
        if (permissions.some((authorityInner) => valChildren.authority.includes(authorityInner))) {
          valChildren.id = idNumber;
          valChildren.parentId = parentId;
          valChildren.show = true;
          // 如果子菜单中有显示的菜单，则父级菜单也显示
          val.show = true;
        } else {
          valChildren.id = idNumber;
          valChildren.parentId = parentId;
          valChildren.show = false;
        }
      }
    }
    return siderRouter;
  };

  /**
   *一级菜单
   @val 
   */
  function firstMenu(val: MenuRoutersIF): ReactNode {
    return val.show ? (
      <Menu.Item key={`${val.id}`}>
        <Link to={val.path}>
          <IconFont type={val.icon!} />
          <span>{val.name}</span>
        </Link>
      </Menu.Item>
    ) : null;
  }
  /**
   *二级菜单
   @val 二级菜单
   */
  function secondMenu(val: MenuRoutersIF): ReactNode {
    return val.show ? (
      <SubMenu
        key={`${val.id}`}
        title={
          <>
            <IconFont type={val.icon!} />
            <span>{val.name}</span>
          </>
        }
      >
        {secondInnerMenu(val.children)}
      </SubMenu>
    ) : null;
  }
  /**
   *二级菜单子菜单
   @children 子菜单 
   */
  function secondInnerMenu(children: MenuRoutersIF[]): ReactNode {
    return children.map((v: MenuRoutersIF) =>
      v.show ? (
        <Menu.Item key={`${v.id}`}>
          <Link to={v.path}>
            <span>{v.name}</span>
          </Link>
        </Menu.Item>
      ) : null
    );
  }

  return (
    <Sider className="menu-sider" id="menuSider" width="140">
      <Menu
        onOpenChange={(openKeys: (string | number)[]) => setOpenKey(String(openKeys[1]))}
        theme="dark"
        onClick={({ key }: { key: string | number }) => setSelectKey(String(key))}
        openKeys={[openKey]}
        selectedKeys={[selectKey]}
        defaultSelectedKeys={['0']}
        mode="inline"
      >
        {filterAuthority().map((val) => {
          return val.path !== '' ? firstMenu(val) : secondMenu(val);
        })}
      </Menu>
    </Sider>
  );
};

export default SubMenuLeft;
