import { put, takeEvery } from 'redux-saga/effects';
import { homeApi } from '@/services/home';
import { SagaIterator } from 'redux-saga';
import { CHANGE_USER_INFO } from '../actionTypes';

export interface UnitListGetSagaIF {
  type: CHANGE_USER_INFO;
  unitList: any;
}
// 测试saga
function* unitListGet({ parmas }: any) {
  try {
    const res: unknown = yield homeApi.test({ params: parmas });
    const action: UnitListGetSagaIF = {
      type: CHANGE_USER_INFO,
      unitList: res,
    };

    yield put(action);
  } catch (err) {
    throw new Error(err);
  }
}
export function* testSaga(): SagaIterator {
  yield takeEvery(CHANGE_USER_INFO, (params: any) => unitListGet(params));
}
