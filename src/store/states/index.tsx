import { UserInfoIF } from '@/typings/login';

let userInfos: UserInfoIF = {
  avatar: '',
  currentPermissions: ['home'],
  currentRoleId: 0,
  currentRoleName: '',
  userId: 0,
  orgId: 0,
  orgName: '',
  orgFullName: '',
  username: '',
  currentRoleCode: '',
  jobNo: '',
};

export interface LoginStateIF {
  userInfo: UserInfoIF;
}

const loginState: LoginStateIF = {
  // 用户登录信息
  userInfo: userInfos,
};

export { loginState };
