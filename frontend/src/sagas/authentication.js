import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';
import camelize from 'camelize';

import { SIGN_IN_REQUEST, SIGN_IN_SUCCESS, SIGN_IN_FAILURE } from '../reducers/authentication';

const signinAPI = (data) => axios.post('/users/login/', data);

function* signin(action) {
  try {
    const result = yield call(signinAPI, action.data);
    yield put({
      type: SIGN_IN_SUCCESS,
      data: camelize(result.data),
    });
  } catch (err) {
    yield put({
      type: SIGN_IN_FAILURE,
      error: camelize(err.response.data),
    });
  }
}

function* watchSignin() {
  yield takeLatest(SIGN_IN_REQUEST, signin);
}

export default function* authenticationSaga() {
  yield all([fork(watchSignin)]);
}
