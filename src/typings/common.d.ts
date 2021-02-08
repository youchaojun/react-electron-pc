import { RouterStateIF } from './router';

/**
 *  key和value
 */
export interface KeyValue {
  key: string | number;
  value: string;
}

// json interface
export interface StringKey {
  [propName: string]: any;
}

/**
 * 错误代码
 */
export type HttpCode =
  | '200'
  | '201'
  | '202'
  | '204'
  | '400'
  | '401'
  | '403'
  | '404'
  | '406'
  | '410'
  | '422'
  | '422'
  | '500'
  | '502'
  | '503'
  | '504';
/**
 * 请求参数
 */
export interface HttpParams<T> {
  // 传入成功提示的消息
  message?: string | undefined;
  // 传入的参数
  params?: T;
  // 是否显示错误提示 默认提示接口返回的错误提示
  // 'no'不需要显示  '错误提示'传入具体的值显示值
  error?: string | undefined;
}

// 后端接口 响应的数据model
export interface ResponseData<T> {
  stateCode: string;
  data: T;
  stateInfo: string | null;
  success: boolean;
}

export interface SearchListReqIF {
  pageNo: number;
  pageSize?: number;
}

/**
 * 请求params公共model
 */
export interface BasicPropsIF {
  id?: number;
  type?: string;
}

/**
 * 菜单切换model
 */
export interface MenuTabIF {
  id?: number;
  name: string;
  path: string;
  active: boolean;
  tabMore?: boolean;
  state?: RouterStateIF;
  scrollTop?: number;
  pathList: PathListIF[];
}

export interface PathListIF {
  path: string;
  state?: RouterStateIF;
}
/**
 * 列表公共返回
 */

export interface ListPublicIF {
  pageNo: number;
  pageSize: number;
  total: number;
}
/**
 * 弹框组建传参
 */
export interface ModalIF {
  /*eslint-disable */
  // 关闭弹框的时候是否刷新列表
  closeModal(isReload?: boolean): boolean | void;
  visible: boolean;
}

// 页面错误监听(request)
export interface ErrorReqIF {
  // 问题域名
  source: string;
  // 错误行
  lineno: number;
  // 错误列
  colno: number;
  // 错误信息
  error: ErrorIF;
  // 错误时间
  errorDate: number;
  // 用户信息
  user: UserErrorReqIF;
}

// 页面错误监听(response)
export interface ErrorResIF {
  id: number;
  // 问题域名
  source: string;
  // 错误行
  lineno: number;
  // 错误列
  colno: number;
  // 错误信息
  error: ErrorIF;
  // 错误时间
  errorDate: number;
  // 用户信息
  user: UserErrorReqIF;
  // 是否解决
  handled: boolean;
  // 解决日期
  handedDate: number;
}

interface UserErrorReqIF {
  // 用户id
  id: number;
  // 用户名
  name: string;
  // 用户电话
  mobile: string;
  // 岗位id
  uorId: number | undefined;
  // 角色名称
  roleName: string | undefined;
  // 角色id
  roleId: number | undefined;
  // 组织id
  orgId: number | undefined;
  // 组织名称
  orgName: string | undefined;
  // 组织编号
  orgCode: string | undefined;
}
// 错误信息
export interface ErrorIF {
  name: string;
  message: string;
  stack: string | undefined;
}

// 列表外边data列表 公共部分
export interface DataListIF<T> {
  count: number; // 总共条数
  list: T[]; // 数组
}

// 父组件调用子组件的方法类型
export interface RefAddTargetIF {
  putData(): any;
}

// checkedIF
export interface CheckedIF {
  value?: string;
  checked?: boolean;
}