import { createStore, applyMiddleware, compose } from 'redux';
import ReduxPersist from '../Config/ReduxPersist';
import createSagaMiddleware from 'redux-saga';
import ScreenTracking from './ScreenTrackingMiddleware';
import EventTrackMiddleware from './EventTrackMiddleware';
import { appNavigatorMiddleware } from '../Navigation/AppNavigation';
import thunk from 'redux-thunk';

// creates the store
export default (rootReducer, rootSaga) => {
	/* ------------- Redux Configuration ------------- */

	const middleware = [];
	const enhancers = [];

	/* ------------- Thunk ------------ */
	middleware.push(thunk)

	/* ------------- Navigation Middleware ------------ */
	middleware.push(appNavigatorMiddleware)

	/* ------------- Analytics Middleware ------------- */
	middleware.push(ScreenTracking);
	middleware.push(EventTrackMiddleware);

	/* ------------- Saga Middleware ------------- */

	const sagaMonitor = null;
	const sagaMiddleware = createSagaMiddleware({ sagaMonitor });
	middleware.push(sagaMiddleware);

	/* ------------- Assemble Middleware ------------- */

	enhancers.push(applyMiddleware(...middleware));

	// if Reactotron is enabled (default for __DEV__), we'll create the store through Reactotron
	const createAppropriateStore = createStore;
	const store = createAppropriateStore(rootReducer, compose(...enhancers));

	// kick off root saga
	
	// let sagasManager = process.env.NODE !== 'com.wmsv2' && sagaMiddleware.run(rootSaga)
	let sagasManager = sagaMiddleware.run(rootSaga);

	return {
		store,
		sagasManager,
		sagaMiddleware
	};
};