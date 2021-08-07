import { put, takeLatest, fork, all } from 'redux-saga/effects';
import { SET_MAP, SET_STORE_LIST, ADD_MARKER } from '../reducers/map';

// const setStoreList = (storeList) => {
//   return {
//     type: SET_STORE_LIST,
//     storeList: storeList,
//   };
// };

// const addMarker = (marker, overlay) => {
//   return {
//     type: ADD_MARKER,
//     marker: marker,
//     overlay: overlay,
//   };
// };

// function* setMap(action) {
//   try {
//     yield console.log('');
//   } catch (err) {
//     console.error(err.response.error);
//   }
// }

// function* watchSetMap() {
//   yield takeLatest(SET_MAP, setMap);
// }

// export default function* mapSaga() {
//   yield all([fork(watchSetMap)]);
// }
