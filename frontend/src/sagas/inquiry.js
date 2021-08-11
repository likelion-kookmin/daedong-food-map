import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import authHeader from './auth-header';
import axios from 'axios';

import {
  LOAD_INQUIRIES_REQUEST,
  LOAD_INQUIRIES_SUCCESS,
  LOAD_INQUIRIES_FAILURE,
  ADD_INQUIRIES_REQUEST,
  ADD_INQUIRIES_SUCCESS,
  ADD_INQUIRIES_FAILURE,
} from 'reducers/inquiry';

const inquiryListAPI = (data) => axios.get('/inquiries/', { headers: authHeader() }, data);

function* inquiryList(action) {
  try {
    const result = yield call(inquiryListAPI, action.data);
    yield put({
      type: LOAD_INQUIRIES_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_INQUIRIES_FAILURE,
      error: err,
    });
  }
}

const inquiryNewAPI = (data) => axios.post('/inquiries/new/', data, { headers: authHeader() });

function* inquiryNew(action) {
  try {
    const result = yield call(inquiryNewAPI, action.data);
    yield put({
      type: ADD_INQUIRIES_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: ADD_INQUIRIES_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchInquiryList() {
  yield takeLatest(LOAD_INQUIRIES_REQUEST, inquiryList);
}

function* watchInquiryNew() {
  yield takeLatest(ADD_INQUIRIES_REQUEST, inquiryNew);
}

export default function* inquirySaga() {
  yield all([fork(watchInquiryList), fork(watchInquiryNew)]);
}
