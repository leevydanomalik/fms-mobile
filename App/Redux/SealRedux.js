import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
    changeStatus: ['status', 'qrType'],
    changeStatusMaterial: ['status', 'qrType'],
    changeStatusPallet: ['status', 'qrType'],
    changeStatusBQ: ['status', 'qrType'],
    changeStatusHU: ['status', 'qrType'],
    changeStatusVX: ['status', 'qrType'],
    changeStatusDriver: ['status', 'qrType'],
    changeStatusSIM: ['status', 'qrType'],
    changeStatusFleet: ['status', 'qrType'],
    changeStatusKIR: ['status', 'qrType'],
    changeStatusReference: ['status', 'qrType'],
    changeStatusDO: ['status', 'qrType']
});

export const ConfigTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
    // qr
    qrType: '',
    qrTypeMaterial: '',
    qrTypePallet: '',
    qrTypeBQ: '',
    qrTypeHU: '',
    qrTypeVX: '',
    qrTypeDriver: '',
    qrTypeSIM: '',
    qrTypeFleet: '',
    qrTypeKIR: '',
    qrTypeReference: '',
    qrTypeDO: '',
    // status
    status: false,
    statusMaterial: false,
    statusPallet: false,
    statusBQ: false,
    statusHU: false,
    statusVX: false,
    statusDriver: false,
    statusSIM: false,
    statusFleet: false,
    statusKIR: false,
    statusReference: false,
    statusDO: false
});

/* ------------- Selectors ------------- */
export const ConfigSelectors = {
	getData: state => state.status
};

/* ------------- Reducers ------------- */
export const changeStatus = (state, data) => {
    return state.merge({ 
        status: data.status,
        qrType: data.qrType ? data.qrType : '' 
    });
}
export const changeStatusMaterial = (state, data) => {
    return state.merge({ 
        statusMaterial: data.status, 
        qrTypeMaterial: data.qrType ? data.qrType : '' 
    });
}
export const changeStatusPallet = (state, data) => {
    return state.merge({ 
        statusPallet: data.status,
        qrTypePallet: data.qrType ? data.qrType : ''  
    });
}
export const changeStatusBQ = (state, data) => {
    return state.merge({ 
        statusBQ: data.status,
        qrTypeBQ: data.qrType ? data.qrType : '' 
    });
}
export const changeStatusHU = (state, data) => {
    return state.merge({ 
        statusHU: data.status,
        qrTypeHU: data.qrType ? data.qrType : '' 
    });
}
export const changeStatusVX = (state, data) => {
    return state.merge({ 
        statusVX: data.status,
        qrTypeVX: data.qrType ? data.qrType : '' 
    });
}
export const changeStatusDriver = (state, data) => {
    return state.merge({ 
        statusDriver: data.status,
        qrTypeDriver: data.qrType ? data.qrType : ''
    });
}
export const changeStatusSIM = (state, data) => {
    return state.merge({ 
        statusSIM: data.status,
        qrTypeSIM: data.qrType ? data.qrType : ''
    });
}
export const changeStatusFleet = (state, data) => {
    return state.merge({ 
        statusFleet: data.status,
        qrTypeFleet: data.qrType ? data.qrType : ''
    });
}
export const changeStatusKIR = (state, data) => {
    return state.merge({ 
        statusKIR: data.status,
        qrTypeKIR: data.qrType ? data.qrType : ''
    });
}
export const changeStatusReference = (state, data) => {
    return state.merge({ 
        statusReference: data.status,
        qrTypeReference: data.qrType ? data.qrType : '' 
    });
}
export const changeStatusDO = (state, data) => {
    return state.merge({ 
        statusDO: data.status,
        qrTypeDO: data.qrType ? data.qrType : '' 
    });
}

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.CHANGE_STATUS]: changeStatus,
    [Types.CHANGE_STATUS_MATERIAL]: changeStatusMaterial,
    [Types.CHANGE_STATUS_PALLET]: changeStatusPallet,
    [Types.CHANGE_STATUS_BQ]: changeStatusBQ,
    [Types.CHANGE_STATUS_HU]: changeStatusHU,
    [Types.CHANGE_STATUS_VX]: changeStatusVX,
    [Types.CHANGE_STATUS_DRIVER]: changeStatusDriver,
    [Types.CHANGE_STATUS_SIM]: changeStatusSIM,
    [Types.CHANGE_STATUS_FLEET]: changeStatusFleet,
    [Types.CHANGE_STATUS_KIR]: changeStatusKIR,
    [Types.CHANGE_STATUS_REFERENCE]: changeStatusReference,
    [Types.CHANGE_STATUS_DO]: changeStatusDO
});