import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    saveConfig: ['data'],
    saveHistory: ['data'],
    clearHistory: null,

    onOffSwitch: null,
});

export const ConfigTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
	config: {
        deviceId: Math.floor(100000 + Math.random() * 900000),
        serverUrl: "",
        accuracy: 0,
        frequency: 1,
        distance: 0,
        angle: 0
    },
    active: false,
    history: []
});

/* ------------- Selectors ------------- */

export const ConfigSelectors = {
	getData: state => state.data
};

/* ------------- Reducers ------------- */

export const saveConfig = (state, action) => {
	const { data } = action;
	return state.merge({ config: data });
};

export const saveHistory = (state, action) => {
    const { data } = action;
    let history = Object.assign([], state.history)
    history.push(data)
	return state.merge({ history });
};

export const clearHistory = (state, action) => {
	return state.merge({ history: [] });
};

export const onOffSwitch = (state, action) => {
	return state.merge({ active: !state.active });
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.SAVE_CONFIG]: saveConfig,
    [Types.SAVE_HISTORY]: saveHistory,
    [Types.CLEAR_HISTORY]: clearHistory,

    [Types.ON_OFF_SWITCH]: onOffSwitch,
});
