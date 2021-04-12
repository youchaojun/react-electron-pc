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
  id: number;
  currentPermissions: string[];
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
