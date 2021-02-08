// 登录返回的所有数据
export interface LoginResIF {
  access_token: string;
  expires_in: number;
  jti: string;
  refresh_token: string;
  scope: string;
  token_type: string;
  userInfo: string;
}

// 当前角色信息
export interface UserInfoIF {
  avatar: string; // 头像
  currentPermissions: string[]; // 当前角色拥有的权限点
  currentRoleId: number; // 当前角色id
  currentRoleName: string; // 当前角色名
  userId: number;
  loginDate?: number; // 登录时间
  mobile?: string; // 手机号
  orgCode?: string; // 组织代码
  orgId: number; // 组织id
  orgName: string; // 组织名称
  orgFullName: string; // 组织全称
  username: string; // 用户名
  currentRoleCode: string; // 当前角色编号
  jobNo: string;
  business?: boolean;
}
export interface TitleIF {
  id: number;
  name: string;
  rate: number;
  type: number;
}

/**
 * 组织
 */
export interface OrgIF {
  id: number;
  parentId: number;
  enable: boolean;
  type: number;
  status: number;
  name: string;
  fullName: string;
  code: string;
  divisionId: number;
  cityId: number | null;
  countyId: number;
  sort: number;
  childCount: number;
  orgType: string;
  children?: OrgIF[];
  hasNext: boolean;
}
