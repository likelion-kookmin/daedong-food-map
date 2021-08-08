import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import authHeader from './auth-header';
import axios from 'axios';

import {
  LOAD_BOOKMARKS_REQUEST,
  LOAD_BOOKMARKS_SUCCESS,
  LOAD_BOOKMARKS_FAILURE,
  ADD_BOOKMARK_REQUEST,
  ADD_BOOKMARK_SUCCESS,
  ADD_BOOKMARK_FAILURE,
} from 'reducers/bookmark';

const bookmarkListAPI = (data) => axios.get('/bookmarks/', { headers: authHeader() }, data);

const bookmarkNewAPI = (data) =>
  axios.post('/bookmarks/new/', { headers: authHeader() }, { place_id: data.id });

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

function* bookmarkNew(action) {
  try {
    const result = yield call(bookmarkNewAPI, action.data);
    yield put({
      type: ADD_BOOKMARK_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_BOOKMARK_FAILURE,
      error: err,
    });
  }
}

function* watchBookmarkList() {
  yield takeLatest(LOAD_BOOKMARKS_REQUEST, bookmarkList);
}

function* watchBookmarkNew() {
  yield takeLatest(ADD_BOOKMARK_REQUEST, bookmarkNew);
}

export default function* bookmarkSaga() {
  yield all([fork(watchBookmarkList), fork(watchBookmarkNew)]);
}
