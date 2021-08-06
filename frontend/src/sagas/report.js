import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import authHeader from './auth-header';
import axios from 'axios';

import { LOAD_REPORTS_REQUEST, LOAD_REPORTS_SUCCESS, LOAD_REPORTS_FAILURE } from 'reducers/report';

const reportListAPI = (data) => axios.get('/reports/', { headers: authHeader() }, data);

function* reportList(action) {
  try {
    const result = yield call(reportListAPI, action.data);
    yield put({
      type: LOAD_REPORTS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: LOAD_REPORTS_FAILURE,
      error: err.respose.data,
    });
  }
}

function* watchReportList() {
  yield takeLatest(LOAD_REPORTS_REQUEST, reportList);
}

export default function* reportSaga() {
  yield all([fork(watchReportList)]);
}
