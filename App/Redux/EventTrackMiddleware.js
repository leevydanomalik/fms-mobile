import { Alert } from 'react-native';

const eventTrackMiddleware = store => next => action => {
	let result = next(action);
	let actionType = action.type;
	if (actionType) {
		if (actionType.includes('CONNECTION_CHANGE')) {
			if (action.payload != store.getState().network.isConnected) {
				if (action.payload) {
					console.log('== BACK ONLINE ==');
					// TODO Process Queue
				} else console.log('== WORKING OFFLINE ==');
			}
		}
		if (actionType.includes('FAILURE')) {
			// console.log(`eventTrackMiddleware : ${JSON.stringify(action)}`);
			// if (action.error) {
			// 	if(action.error == "Username atau Password Salah !") return result
			// 	if (typeof action.error == "string") {
			// 		Alert.alert('Informasi', action.error);
			// 	}
			// }
			if (typeof action.error == "string") {
				Alert.alert('Informasi', action.error);
				// console.log('Informasi', action.error);
			}
		}
	}
	// console.warn('dispatching', action)
	
	// console.warn('next state', store.getState())
	return result;
};

export default eventTrackMiddleware;
