import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import authHeader from './auth-header';
import axios from 'axios';

import {
  LOAD_BOOKMARKS_REQUEST,
  LOAD_BOOKMARKS_SUCCESS,
  LOAD_BOOKMARKS_FAILURE,
} from 'reducers/bookmark';

const bookmarkListAPI = (data) => axios.get('/bookmarks/', { headers: authHeader() }, data);

function* bookmarkList(action) {
  try {
    const result = yield call(bookmarkListAPI, action.data);
    yield put({
      type: LOAD_BOOKMARKS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_BOOKMARKS_FAILURE,
      error: err,
    });
  }
}

function* watchInquiryList() {
  yield takeLatest(LOAD_BOOKMARKS_REQUEST, bookmarkList);
}

export default function* bookmarkSaga() {
  yield all([fork(watchInquiryList)]);
}
