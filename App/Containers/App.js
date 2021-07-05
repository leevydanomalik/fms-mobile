import React, { Component } from 'react';
import { AppState, Text } from 'react-native';
import { Provider } from 'react-redux';
import RootContainer from './RootContainer';
import createStore from '../Redux';
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore, persistReducer } from 'redux-persist'
import  messaging from '@react-native-firebase/messaging'

// create our store
const store = createStore();
const persistor = persistStore(store)

class App extends Component {
	componentDidMount() {
		AppState.addEventListener('change', this._handleAppStateChange);
		const cekOmbak = messaging().onMessage(async remoteMessage => {
			console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
		});
		return cekOmbak
	}
	componentWillUnmount() {
		AppState.removeEventListener('change', this._handleAppStateChange);
	}
	_handleAppStateChange = nextAppState => {
		console.log(`App state changed : ${JSON.stringify(nextAppState)}`);
	};
	render() {
		return (
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<RootContainer />
				</PersistGate>
			</Provider>
		);
	}
}

export default (App);