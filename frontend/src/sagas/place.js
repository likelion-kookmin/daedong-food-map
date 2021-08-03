import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';

import { LOAD_PLACES_REQUEST, LOAD_PLACES_SUCCESS, LOAD_PLACES_FAILURE } from '../reducers/place';

const placeListAPI = (data) => axios.get('/places/', data);

function* placeList(action) {
  try {
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

function* watchGetPlaceList() {
  yield takeLatest(LOAD_PLACES_REQUEST, placeList);
}
}

export default function* placeSaga() {
  yield all([fork(watchGetPlaceList)]);
}
