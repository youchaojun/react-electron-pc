import theme from '@/assets/variableChange';
import { RoutersConfigIF } from '@/typings/router';
// 判断是否是electron
export const isElectron: boolean = navigator.userAgent.includes('Electron');
// 定义的几套主题颜色
export const themeList = [theme.theme, theme.redTheme, theme.blueTheme, theme.greenTheme];

export const electron = window.electron;
export const ipcRenderer = window.ipcRenderer;

/**
 * 查找tree中所有父节点
 * @param {*} data 整个tree
 * @param {*} id 需要查找的id
 * @param {*} indexArray 空数组
 * @return 返回 查找的数组
 */
interface Test {
  id: number;
  path: string;
  children: Test[];
}
export const findAllParent = <T extends Test>(
  data: T[],
  id: number,
  indexArray: number[]
): boolean | number[] => {
  let arr: number[] = Array.from(indexArray);
  for (let val of data) {
    arr.push(val.id);
    if (val.id === id) {
      return arr;
    }
    let children = val.children;
    if (children && children.length) {
      let result = findAllParent(children, id, arr);
      if (result) return result;
    }
    arr.pop();
  }
  return false;
};

// 递归查找组织id
interface RecursionFindIF {
  path: string;
  children?: RecursionFindIF[];
}
export const recursionFind = <T extends RecursionFindIF>(data: T[], equal: string): T => {
  for (let val of data) {
    if (val.path === equal) {
      return val;
    } else if (val.children) {
      recursionFind(val.children, equal);
    }
  }
  return data[0];
};

// 路由扁平
export const listFlat = (
  list: RoutersConfigIF[],
  newList: RoutersConfigIF[] = []
): RoutersConfigIF[] => {
  for (let val of list) {
    if (val.path !== '') {
      newList.push(val);
    }
    if (val.children) {
      listFlat(val.children, newList);
    }
  }
  return newList;
};
