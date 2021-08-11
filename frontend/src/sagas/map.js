import { all, fork, put, takeLatest } from 'redux-saga/effects';
import { SET_GEO_FAILURE, SET_GEO_REQUEST, SET_GEO_SUCCESS } from '../reducers/map';
import { useDispatch } from 'react-redux';

const { kakao } = window;

function* getGeo(action) {
  try {
    const geo = navigator.geolocation;
    const kakaoMap = action.map;

    if (!geo) {
      alert('이 브라우저에서는 Geolocation이 지원되지 않습니다.');
    }
    if (!kakaoMap) {
      throw new Error('map이 없습니다.');
    }

    var options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 1,
    };

    const success = (position) => {
      if (kakaoMap !== null) {
        const nowPosition = new kakao.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude,
        );
        kakaoMap.panTo(nowPosition);
      }
    };
    const error = () => {
      throw new Error('현재위치를 가져올 수 없습니다.');
    };
    geo.getCurrentPosition(success, error, options);
    yield put({
      type: SET_GEO_SUCCESS,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SET_GEO_FAILURE,
    });
  }
}

function* watchGetGeo() {
  yield takeLatest(SET_GEO_REQUEST, getGeo);
}

export default function* geoSaga() {
  yield all([fork(watchGetGeo)]);
}
