import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import authHeader from './auth-header';
import axios from 'axios';

import {
  LOAD_INQUIRIES_REQUEST,
  LOAD_INQUIRIES_SUCCESS,
  LOAD_INQUIRIES_FAILURE,
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

function* watchInquiryList() {
  yield takeLatest(LOAD_INQUIRIES_REQUEST, inquiryList);
}

export default function* inquirySaga() {
  yield all([fork(watchInquiryList)]);
}
