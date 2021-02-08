import { UserInfoIF } from '@/typings/login';
import { CHANGE_USER_INFO } from '../actionTypes';
// 返回用户的actions
export interface UserInfoActions {
  type: CHANGE_USER_INFO;
  userInfo: UserInfoIF;
}
// 登录获取用户信息action
export const userInfoGet = (parmas: UserInfoIF): UserInfoActions => ({
  type: CHANGE_USER_INFO,
  userInfo: parmas,
});
