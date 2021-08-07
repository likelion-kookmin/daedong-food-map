import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';

import {
  LOAD_PLACES_REQUEST,
  LOAD_PLACES_SUCCESS,
  LOAD_PLACES_FAILURE,
  LOAD_PLACE_SUCCESS,
  LOAD_PLACE_FAILURE,
  LOAD_PLACE_REQUEST,
  PAGE_SIZE,
} from '../reducers/place';

const placeListAPI = (data) => {
  let queryString = `/places/?page_size=${PAGE_SIZE}`;

  if (data) {
    queryString += `&search=${data.value}`;
  }

  return axios.get(queryString);
};

function* placeList(action) {
  try {
    console.log(1, action);
    const result = yield call(placeListAPI, action.data);
    yield put({
      type: LOAD_PLACES_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_PLACES_FAILURE,
      error: err.reponse.data,
    });
  }
}

const placeDetailAPI = (id) => axios.get(`/places/${id}/`);

function* placeDetail(action) {
  try {
    const result = yield call(placeDetailAPI, action.id);
    yield put({
      type: LOAD_PLACE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_PLACE_FAILURE,
      error: err.reponse.data,
    });
  }
}

function* watchPlaceList() {
  yield takeLatest(LOAD_PLACES_REQUEST, placeList);
}

function* watchPlaceDetail() {
  yield takeLatest(LOAD_PLACE_REQUEST, placeDetail);
}

export default function* placeSaga() {
  yield all([fork(watchPlaceList), fork(watchPlaceDetail)]);
}
