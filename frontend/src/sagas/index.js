import { all, fork } from 'redux-saga/effects';
import axios from 'axios';

import authenticationSaga from './authentication';
import placeSaga from './place';
import inquirySaga from './inquiry';
import reportSaga from './report';

import { apiUrl } from '../config/api.config';

axios.defaults.baseURL = apiUrl;
axios.defaults.withCredentials = true;

export default function* rootSaga() {
  yield all([fork(authenticationSaga), fork(placeSaga), fork(inquirySaga), fork(reportSaga)]);
}
