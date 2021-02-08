import { all } from 'redux-saga/effects';
import { testSaga } from './test';

function* mySaga(): Generator {
  // 合并多个saga
  yield all([testSaga()]);
}
export default mySaga;
