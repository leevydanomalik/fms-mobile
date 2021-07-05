import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import configureStore from './CreateStore';
import rootSaga from '../Sagas/';
import ReduxPersist from '../Config/ReduxPersist';
import { reducer as network } from 'react-native-offline';

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
	nav: require('./NavigationRedux').reducer,
	config: require('./ConfigRedux').reducer,
	// search: require('./SearchRedux').reducer,
	auth: require('./AuthRedux').reducer,
	// units: require('./UnitRedux').reducer,
	// apparels: require('./ApparelRedux').reducer,
	// delivorders: require('./DeliveryOrderRedux').reducer,
	// cart: require('./CartRedux').reducer,
	// pricelists: require('./PricelistRedux').reducer,
	// inventories: require('./InventoryRedux').reducer,
	// fincos: require('./FincoRedux').reducer,
	// orders: require('./OrderRedux').reducer,
	// pic: require('./PicRedux').reducer,
	// fcm: require('./FcmRedux').reducer,
	// masterdata: require('./MasterDataRedux').reducer,
	seal: require('./SealRedux').reducer,
	network
});

export default () => {
	let finalReducers = reducers;
    // If rehydration is on use persistReducer otherwise default combineReducers
	if (ReduxPersist.active) {
		const persistConfig = ReduxPersist.storeConfig;
		finalReducers = persistReducer(persistConfig, reducers);
	}

    let { store, sagasManager, sagaMiddleware } = configureStore(finalReducers, rootSaga);

	if (module.hot) {
		module.hot.accept(() => {
			const nextRootReducer = require('./').reducers;
			store.replaceReducer(nextRootReducer);

			const newYieldedSagas = require('../Sagas').default;
			sagasManager.cancel();
			sagasManager.done.then(() => {
				sagasManager = sagaMiddleware.run(newYieldedSagas);
			});
		});
	}

	return store;
};
