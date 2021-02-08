import { combineReducers } from 'redux';
import { LoginStateIF } from '../states';
import { PublicStateIF } from '../states/public';
import { loginReducer } from './login';
import { publicReducer } from './public';

// 登录的reduer
export interface LoginReducerIF {
  loginReducer: LoginStateIF;
}
// 公用的reduer
export interface PublicReducerIF {
  publicReducer: PublicStateIF;
}

// 所有reducer的类型
type ReduerType = LoginReducerIF | PublicReducerIF;

const reducer = combineReducers<ReduerType>({
  loginReducer,
  publicReducer,
});

export default reducer;
