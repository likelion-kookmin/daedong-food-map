import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import authHeader from './auth-header';
import axios from 'axios';

import {
  LOAD_REPORTS_REQUEST,
  LOAD_REPORTS_SUCCESS,
  LOAD_REPORTS_FAILURE,
  ADD_REPORT_REQUEST,
  ADD_REPORT_SUCCESS,
  ADD_REPORT_FAILURE,
} from 'reducers/report';

const reportListAPI = (data) => axios.get('/reports/', { headers: authHeader() }, data);

function* reportList(action) {
  try {
    const result = yield call(reportListAPI, action.data);
    yield put({
      type: LOAD_REPORTS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_REPORTS_FAILURE,
      error: err,
    });
  }
}

const reportNewAPI = (data) => axios.post('/reports/new/', { headers: authHeader() }, data);

function* reportNew(action) {
  try {
    const result = yield call(reportNewAPI, action.data);
    yield put({
      type: ADD_REPORT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: ADD_REPORT_FAILURE,
      error: err.respose.data,
    });
  }
}

function* watchReportList() {
  yield takeLatest(LOAD_REPORTS_REQUEST, reportList);
}

function* watchReportNew() {
  yield takeLatest(ADD_REPORT_REQUEST, reportNew);
}

export default function* reportSaga() {
  yield all([fork(watchReportList), fork(watchReportNew)]);
}
