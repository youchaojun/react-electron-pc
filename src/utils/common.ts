import { StringKey } from '@/typings/common';
import { OrgIF } from '@/typings/login';
import { CSSProperties } from 'react';
import { themeList } from './basic';

/**
 * 当前设置颜色过滤
 * @param color primary' | 'primaryS 主题颜色和副标题颜色
 * 返回一个十六进制颜色字符串
 */
export const currentThemeColor = (color: 'primary' | 'primaryS'): string => {
  const themeCount = localStorage.getItem('themeCount');
  const count = themeCount ? Number(themeCount) : 0;

  return color === 'primary'
    ? themeList[count]['@btn-primary-bg']
    : themeList[count]['@secondary-color'];
};
/**
 * 过滤主背景色
 * @param type primary' | 'primaryS 主题颜色和副标题颜色
 * 返回React CSS背景颜色样式
 */
export const currentThemeBG = (type: 'primary' | 'primaryS'): CSSProperties => {
  return { backgroundColor: currentThemeColor(type), color: '#fff' };
};
/**
 * 过滤主背景色
 * @param type primary' | 'primaryS 主题颜色和副标题颜色
 * 返回React CSS字体颜色样式
 */
export const currentThemeC = (type: 'primary' | 'primaryS'): CSSProperties => {
  return { color: currentThemeColor(type) };
};
/**
 * 构建联动菜单
 * @param tree 传入过滤的树结构
 */
interface TreeRenderIF extends OrgIF {
  value?: number;
  label?: string;
}
export const renderTree = (tree: TreeRenderIF[]): TreeRenderIF[] =>
  tree.map(
    (value: TreeRenderIF): TreeRenderIF => {
      value.value = value.id;
      value.label = value.name;
      if (value.children) {
        renderTree(value.children);
      }
      return value;
    }
  );
// 置灰按钮 不能点击
export const styleBtn: CSSProperties = {
  cursor: 'not-allowed',
  pointerEvents: 'none',
  color: '#a7a5a5',
};

// number---->boolean
export const stringConvertBoolean = (val: number): boolean | null => {
  if (val === 2) {
    return null;
  }
  return Boolean(val);
};

// boolean---->number
export const booleanConvertString = (val: boolean | undefined | null): number => {
  if (val === null) {
    return 2;
  }
  return Number(val);
};

// json转formData
export const jsonToFromData = (json: StringKey): FormData => {
  let formData = new FormData();
  for (let key in json) {
    if (key === 'file') {
      if (json.file.length > 1) {
        for (let val of json.file) {
          formData.append('file', val);
        }
      } else {
        formData.append('file', json.file);
      }
    } else {
      formData.append(key, json[key]);
    }
  }
  return formData;
};

// 生成UUID
export const uuid = (): string => {
  let s: any[] = [],
    hexDigits = '0123456789abcdef';

  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = '4';
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);

  // eslint-disable-next-line no-multi-assign
  s[8] = s[13] = s[18] = s[23] = '-';
  const uuid = s.join('');
  return uuid;
};
export const loginFixedParam = {
  client_id: 'android_v1',
  client_secret: 'android_v1_secret',
};

/**
 * 过滤undefined和空字符串的字段
 * @param obj 传入的参数
 */
export function filterUndefined<T extends StringKey>(obj: T): T {
  for (let key in obj) {
    if (obj[key] === undefined || obj[key] === '') {
      delete obj[key];
    }
  }
  return obj;
}
