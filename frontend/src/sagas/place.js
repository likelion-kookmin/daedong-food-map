import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';
import { useSelector } from 'react-redux';

import {
  LOAD_PLACES_REQUEST,
  LOAD_PLACES_SUCCESS,
  LOAD_PLACES_FAILURE,
  LOAD_PLACE_SUCCESS,
  LOAD_PLACE_FAILURE,
  LOAD_PLACE_REQUEST,
  PAGE_SIZE,
} from '../reducers/place';

function* placeList(action) {
  // const { map } = useSelector((state) => state.map);
  try {
    const data = action.data;
    let queryString = `/places/?page_size=${PAGE_SIZE}`;
    const longitude = localStorage.getItem('longitude');
    const latitude = localStorage.getItem('latitude');

    data && data.value && (queryString += `&search=${data.value}`);
    data && data.page && (queryString += `&page=${data.page}`);
    longitude && (queryString += `&longitude=${longitude}`);
    latitude && (queryString += `&latitude=${latitude}`);
    const result = yield call(axios.get, queryString);
    yield put({
      type: LOAD_PLACES_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_PLACES_FAILURE,
      error: err,
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
      error: err,
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
