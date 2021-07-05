import React, { Component } from 'react'
import { View, Text } from 'react-native'
import NavbarMenu from './Components/NavbarMenu'
import Validating from './Components/Validating'
import {connect} from 'react-redux'
import SealAction from '../Redux/SealRedux'

var time

class ValidatorScreen extends Component {
    constructor(props) {
        super(props)
        this.state =  {}
    }
    componentDidMount() {
        time = setTimeout(() => {
            this.moveScreen()
        }, 2000);
    }
    moveScreen = () => {
        const {params} = this.props.navigation.state
        let rlName = ''
        let rlRoleName = ''
        if (params.role !== 'SEAL') {
            switch (params.role) {
                case 'GATE':
                    rlName = 'Ms. Security'
                    rlRoleName = 'GATE SECURITY'
                    break;
                case 'LUM':
                    rlName = 'Mr. Loading'
                    rlRoleName = 'LOADING UNLOAD MASTER'
                    break;
                case 'PUTAWAY':
                    rlName = 'Mr. Putaway'
                    rlRoleName = 'PUTAWAY'
                    break;
                case 'GR':
                    rlName = 'Mr. Good Receipt'
                    rlRoleName = 'GOOD RECEIPT'
                    break;
                case 'GI':
                    rlName = 'Mr. Good Issue'
                    rlRoleName = 'GOOD ISSUE'
                    break;
                case 'MTO':
                    rlName = 'Mr. Transfer Order'
                    rlRoleName = 'MTO'
                    break;
                case 'FLD':
                    rlName = 'Kelvin Clain'
                    rlRoleName = 'FORKLIFT DRIVER'
                    break;
                case 'STORING':
                    rlName = 'Mr. Storing'
                    rlRoleName = 'STORING'
                    break;
                case 'MATERIALMOVEMENT':
                    rlName = 'Mr. Movement'
                    rlRoleName = 'MATERIAL MOVEMENT'
                    break;
                case 'LABELING':
                    rlName = 'Mr. Labeling'
                    rlRoleName = 'LABELING'
                    break;
                case 'CYCLECOUNT':
                    rlName = 'Mr. Cycle Count'
                    rlRoleName = 'CYCLECOUNT'
                    break;
                default:
                    rlName = ''
                    rlRoleName = ''
                    break;
            }
            var data = {
                role: params.role ? params.role : "",
                name: rlName,
                roleName: rlRoleName,
                roleID: "M4756-2020",
                imageUrl: "https://techwithsadprog.com/assets/images/testimonial/1595348801user-3.jpeg"
            }
            let newParams = {
                ...params,
                rowData: {
                    ...params.rowData,
                    item: {
                        ...params.rowData.item,
                        workflow_info: {
                            ...params.rowData.item.workflow_info,
                            fc_status: "CONFIRMED"
                        }
                    }
                }
            }
            this.props.navigation.goBack()
            this.props.navigation.navigate('TicketDetailScreen', {
                data,
                rowData: newParams.rowData ? newParams.rowData : [],
                allData: newParams.allData ? newParams.allData : []
            })
        } else {
            switch (params.type) {
                case 'MATERIAL':
                    this.props.changeStatusMaterial(true, 'good')
                    break
                case 'PALLET':
                    this.props.changeStatusPallet(true, 'good')
                    break
                case 'HU':
                    this.props.changeStatusHU(true, 'good')
                    break
                case 'VX':
                    this.props.changeStatusVX(true, 'good')
                    break
                case 'BQ':
                    this.props.changeStatusBQ(true, 'good')
                    break
                case 'DRIVER':
                    this.props.changeStatusDriver(true, 'good')
                    break
                case 'SIM':
                    this.props.changeStatusSIM(true, 'good')
                    break
                case 'FLEET':
                    this.props.changeStatusFleet(true, 'good')
                    break
                case 'KIR':
                    this.props.changeStatusKIR(true, 'good')
                    break
                case 'REFERENCE':
                    this.props.changeStatusReference(true, 'good')
                    break
                case 'DO':
                    this.props.changeStatusDO(true, 'good')
                    break
                default:
                    this.props.changeStatus(true, 'good')
                    break
            }
            this.props.navigation.goBack()
        }
        clearTimeout(time)
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <NavbarMenu onBack={() => this.props.navigation.goBack()} title={'LevLog Ayes'} />
                <Validating title={'Validating your code...'} />
            </View >
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
        seal: state.seal
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeStatus: (status, qrType) => dispatch(SealAction.changeStatus(status, qrType)),
        changeStatusMaterial: (status, qrType) => dispatch(SealAction.changeStatusMaterial(status, qrType)),
        changeStatusPallet: (status, qrType) => dispatch(SealAction.changeStatusPallet(status, qrType)),
        changeStatusBQ: (status, qrType) => dispatch(SealAction.changeStatusBQ(status, qrType)),
        changeStatusHU: (status, qrType) => dispatch(SealAction.changeStatusHU(status, qrType)),
        changeStatusVX: (status, qrType) => dispatch(SealAction.changeStatusVX(status, qrType)),
        changeStatusDriver: (status, qrType) => dispatch(SealAction.changeStatusDriver(status, qrType)),
        changeStatusSIM: (status, qrType) => dispatch(SealAction.changeStatusSIM(status, qrType)),
        changeStatusFleet: (status, qrType) => dispatch(SealAction.changeStatusFleet(status, qrType)),
        changeStatusKIR: (status, qrType) => dispatch(SealAction.changeStatusKIR(status, qrType)),
        changeStatusReference: (status, qrType) => dispatch(SealAction.changeStatusReference(status, qrType)),
        changeStatusDO: (status, qrType) => dispatch(SealAction.changeStatusDO(status, qrType))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ValidatorScreen)