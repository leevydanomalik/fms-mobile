import { takeLatest, takeEvery, all, take, fork } from 'redux-saga/effects';
// import { networkEventsListenerSaga } from 'react-native-offline';
import { AuthTypes } from '../Redux/AuthRedux';
import API from '../Services/Api'
import { getAuth } from './AuthSagas';

const mainApi = API.create();

export default function* root() {
	yield all([
		takeLatest(AuthTypes.AUTH_REQUEST, getAuth, mainApi),
		
		// fork(networkEventsListenerSaga, { timeout: 2000, checkConnectionInterval: 20000 })
	]);
}