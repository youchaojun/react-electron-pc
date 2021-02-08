import { FC, ReactNode } from 'react';
import * as H from 'history';
/**
 * 路由配置
 */
export interface RoutersModelIF {
  name: string;
  path: string;
  // id为菜单id 只能是两位数开始的因为截取展开菜单需要用到
  id?: number;
  // 是否在tab显示 true为显示
  isTab?: boolean;
}
/**
 * 需要缓存的页面model
 */
export interface RoutersAllPageConfigIF extends RoutersModelIF {
  component: FC<ReactNode>;
  exact: boolean;
}
export interface RoutersConfigIF extends RoutersModelIF {
  component: FC<ReactNode>;
  exact: boolean;
  cache: boolean;
  basePath: string;
  state?: RouterStateIF;
  children?: RoutersConfigIF[];
}
/**
 * 路由配置中的props
 */
export interface RouterPropsIF {
  component: FC<ReactNode>;
  history: H.History<RouterStateIF>;
}
/**
 * sider菜单model
 */
export interface MenuRoutersIF extends RoutersModelIF {
  icon?: string;
  show?: boolean;
  authority: string[];
  parentId?: number;
  children: MenuRoutersIF[];
}

// 路由state参数定义

export interface RouterStateIF {
  id?: number;
  type?: string;
  tabMore: boolean;
  tabName: string;
  name?: string;
  info?: any;
  flag?: any;
  intentInfo?: any;
  shopId?: string;
  franId?: string;
  Tree?: any;
}
// 路由params参数定义

export interface RouterParamsIF {
  id?: string;
  type?: string;
}

export interface RouterApplyStateIF {
  id: number;
  type?: string;
  tabMore: boolean;
  tabName: string;
  name?: string;
}
