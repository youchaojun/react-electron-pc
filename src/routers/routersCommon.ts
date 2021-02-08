import { StringKey } from '@/typings/common';
import { RoutersConfigIF, RoutersModelIF } from '@/typings/router';
interface MenuBreadcrumbIF extends RoutersModelIF {
  basePath: string;
}
export const getParentRouter = (path: string, list: RoutersConfigIF[]): MenuBreadcrumbIF[] => {
  // 深度遍历查找
  const dfs = (
    list: RoutersConfigIF[],
    path: string,
    parents: MenuBreadcrumbIF[]
  ): MenuBreadcrumbIF[] => {
    for (let val of list) {
      let item: MenuBreadcrumbIF = {
        name: val.name,
        path: val.path,
        basePath: val.basePath,
        id: val.id,
        isTab: val.isTab,
      };
      if (path.startsWith(item.basePath) && item.basePath !== '') {
        parents.push(item);
        return parents;
      }
      if (val.children) {
        parents.push(item);
        if (dfs(val.children, path, parents).length) return parents;
        parents.pop();
      }
    }
    return [];
  };
  return dfs(list, path, []);
};

/**
 * 把search字符串转成json（也可以用node中url解析）
 * @param str 传入的search字符串
 * @return 返回json
 */
export function filterSearch(str: string): StringKey {
  let json: StringKey = {};
  str = str.substr(1);
  const list = str.split('&');
  for (let val of list) {
    const splitJson = val.split('=');
    json[splitJson[0]] = splitJson[1];
  }
  return json;
}
