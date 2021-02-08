import { MenuTabIF } from '@/typings/common';
import { CHANGE_ORGANIZATIONTREE, CHANHE_MODULE_INDEX, MENU_TAB_LIST } from '../actionTypes/public';
// 返回用户的actions
export interface MentTabActions {
  type: MENU_TAB_LIST;
  mentTab: MenuTabIF[][];
}
// 登录获取用户信息action
export const addMenuList = (parmas: MenuTabIF[][]): MentTabActions => ({
  type: MENU_TAB_LIST,
  mentTab: parmas,
});

export interface ChangeModuleActions {
  type: CHANHE_MODULE_INDEX;
  currentTabIndex: number;
}
// 切换模块（获取index）
export const changeModule = (parmas: number): ChangeModuleActions => ({
  type: CHANHE_MODULE_INDEX,
  currentTabIndex: parmas,
});
export interface OrgTreeActions {
  type: CHANGE_ORGANIZATIONTREE;
}

// 组织树结构(dispatch到saga)action
export const ogrTreeGet = (): OrgTreeActions => ({
  type: CHANGE_ORGANIZATIONTREE,
});
