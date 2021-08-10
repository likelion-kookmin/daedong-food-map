import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import authHeader from './auth-header';
import axios from 'axios';

import {
  ADD_REVIEW_REQUEST,
  ADD_REVIEW_SUCCESS,
  ADD_REVIEW_FAILURE,
  UPDATE_REVIEW_REQUEST,
  UPDATE_REVIEW_SUCCESS,
  UPDATE_REVIEW_FAILURE,
  DESTROY_REVIEW_REQUEST,
  DESTROY_REVIEW_SUCCESS,
  DESTROY_REVIEW_FAILURE,
} from 'reducers/review';

const reviewNewAPI = (data) => axios.post('/reviews/new/', data, { headers: authHeader() });
const reviewEditAPI = (data, id) =>
  axios.patch(`/reviews/${id}/edit/`, data, { headers: authHeader() });
const reviewDestroyAPI = (data, id) =>
  axios.delete(`/reviews/${id}/destroy/`, data, { headers: authHeader() });

function* reviewNew(action) {
  try {
    const result = yield call(reviewNewAPI, action.data);
    yield put({
      type: ADD_REVIEW_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: ADD_REVIEW_FAILURE,
      error: err.response.data,
    });
  }
}

function* reviewEdit(action) {
  try {
    const result = yield call(reviewEditAPI, action.data, action.id);
    yield put({
      type: UPDATE_REVIEW_SUCCESS,
      data: result?.data,
    });
  } catch (err) {
    yield put({
      type: UPDATE_REVIEW_FAILURE,
      error: err.response?.data,
    });
  }
}

function* reviewDestroy(action) {
  try {
    const result = yield call(reviewDestroyAPI, action.data, action.id);
    yield put({
      type: DESTROY_REVIEW_SUCCESS,
      data: result?.data,
    });
  } catch (err) {
    yield put({
      type: DESTROY_REVIEW_FAILURE,
      error: err.response?.data,
    });
  }
}

function* watchReviewNew() {
  yield takeLatest(ADD_REVIEW_REQUEST, reviewNew);
}

function* watchReviewEdit() {
  yield takeLatest(UPDATE_REVIEW_REQUEST, reviewEdit);
}

function* watchReviewDestroy() {
  yield takeLatest(DESTROY_REVIEW_REQUEST, reviewDestroy);
}

export default function* reviewSaga() {
  yield all([fork(watchReviewNew), fork(watchReviewEdit), fork(watchReviewDestroy)]);
}
