import { UserInfoActions } from '../actionCreators';
import { CHANGE_USER_INFO } from '../actionTypes';
import { loginState, LoginStateIF } from '../states';

const loginReducer = (state: LoginStateIF = loginState, action: UserInfoActions): LoginStateIF => {
  switch (action.type) {
    case CHANGE_USER_INFO:
      return {
        ...state,
        userInfo: action.userInfo,
      };
    default:
      return state;
  }
};

export { loginReducer };
