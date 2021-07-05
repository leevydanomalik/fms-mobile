import { call, put } from 'redux-saga/effects';
import AuthActions from '../Redux/AuthRedux';

export function* getAuth(api, action) {
	const { data } = action;
	const response = yield call(api.userAuth, data);

	if (typeof atob !== 'undefined') {
		console.log(response);
		console.log('^^^ GET AUTH ^^^');
	}

	if (response.ok && typeof response.data == "object") {
		switch (response.data.status) {
			case 'F':
				yield put(AuthActions.authFailure(true));
				break;
			case 'S':
				let checkAllow = response.data.data.roles.some(val => val == "R_MOBILE_ACCESS")
				console.log("rule mobile ===> ", checkAllow)
				if (checkAllow) yield put(AuthActions.authSuccess(response.data));
				else yield put(AuthActions.authFailure(true));
				break;
			default:
				yield put(AuthActions.authFailure(true));
				break;
		}
	} else {
		// if (response.data && response.data.status == 500) {
			// return yield put(AuthActions.authFailure({
			// 	path: 'Sign In',
			// 	message: response.data.message, response
			// }));
		// }
		yield put(AuthActions.authFailure(true));
	}
}