import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import authHeader from './auth-header';
import axios from 'axios';

import {
  LOAD_REVIEW_REQUEST,
  LOAD_REVIEW_SUCCESS,
  LOAD_REVIEW_FAILURE,
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

const reviewListAPI = (data) => axios.get('/reviews/', { headers: authHeader() }, data);
const reviewNewAPI = (data) => axios.post('/reviews/new/', data, { headers: authHeader() });
const reviewEditAPI = (data, id) =>
  axios.patch(`/reviews/${id}/edit/`, data, { headers: authHeader() });
const reviewDestroyAPI = (id) => axios.delete(`/reviews/${id}/destroy/`, { headers: authHeader() });

function* reviewList(action) {
  try {
    const result = yield call(reviewListAPI, action.data);
    yield put({
      type: LOAD_REVIEW_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_REVIEW_FAILURE,
      error: err.response?.data,
    });
  }
}

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
      error: err.response?.data,
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
    const result = yield call(reviewDestroyAPI, action.id);
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

function* watchReviewList() {
  yield takeLatest(LOAD_REVIEW_REQUEST, reviewList);
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
  yield all([
    fork(watchReviewList),
    fork(watchReviewNew),
    fork(watchReviewEdit),
    fork(watchReviewDestroy),
  ]);
}
