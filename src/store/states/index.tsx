import { UserInfoIF } from '@/typings/login';

let userInfos: UserInfoIF = {
  id: 100,
  currentPermissions: ['home'],
};

export interface LoginStateIF {
  userInfo: UserInfoIF;
}

const loginState: LoginStateIF = {
  // 用户登录信息
  userInfo: userInfos,
};

export { loginState };
