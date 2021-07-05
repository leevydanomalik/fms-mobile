import React, { Component } from 'react'
import { withNavigationFocus, NavigationEvents } from "react-navigation"
import { View, Text, TouchableOpacity, Dimensions, PermissionsAndroid } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import { RNCamera } from 'react-native-camera'
import { DialogQrInvalid, DialogQrValidator } from './Modules'
import { QRScannerView } from 'react-native-qrcode-scanner-view'
import D from '../Lib/Dimens'
import Api from '../Services/Api'
import M from 'moment'
import { connect } from 'react-redux'
import SealAction from '../Redux/SealRedux'
import NavbarMenu from './Components/NavbarMenu'

var time

const CAM_VIEW_HEIGHT = Dimensions.get('screen').width * 1.5
const CAM_VIEW_WIDTH = Dimensions.get('screen').width

const leftMargin = 200
const topMargin = 200
const frameWidth = 50
const frameHeight = 50

const scanAreaX = leftMargin / CAM_VIEW_HEIGHT
const scanAreaY = topMargin / CAM_VIEW_WIDTH
const scanAreaWidth = frameWidth / CAM_VIEW_HEIGHT
const scanAreaHeight = frameHeight / CAM_VIEW_WIDTH

const viewfinderHeight = 50
const viewfinderWidth = 50

const aabb = (obj1, obj2) => obj1.x < obj2.x + obj2.width
    && obj1.x + obj1.width > obj2.x
    && obj1.y < obj2.y + obj2.height
    && obj1.y + obj1.height > obj2.y

const { height: windowHeight, width: windowWidth } = Dimensions.get('window')
const viewFinderBounds = {
    height: viewfinderHeight,
    width: viewfinderWidth,
    x: viewfinderWidth,
    y: viewfinderHeight,
}

class QrScanner extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fetching: false,
            dialogVisible: false,
            dialogValidator: false,
            loaded: false
        }
    }

    componentDidMount = async () => {
        let perms = [PermissionsAndroid.PERMISSIONS.CAMERA, PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE];

        const granted = await PermissionsAndroid.requestMultiple(perms, {
            title: "Cool Photo App Camera Permission",
            message: "Cool Photo App needs access to your camera so you can take awesome pictures.",
            buttonNegative: "Cancel",
            buttonPositive: "OK"
        })
        console.log("gra", granted);
        for (let [key, value] of Object.entries(granted)) {
            if (value === PermissionsAndroid.RESULTS.GRANTED) {
                this.setState({ isFocused: true })
                console.log("You can use the camera");
            } else {
                console.log("Camera permission denied");
            }
            console.log(`${key}: ${value}`);
        }
    }

    // updateTrucks = async (fcID, params, type) => {
    //     let roleType = ''
    //     let isUpdate = false
    //     switch (type) {
    //         case 'GI':
    //             roleType = 'DOCK'
    //             isUpdate = true
    //             break
    //         case 'GR':
    //             roleType = 'DOCK'
    //             isUpdate = true
    //             break
    //         case 'YND':
    //             roleType = 'YARD'
    //             isUpdate = true
    //             break
    //         case 'GATE':
    //             roleType = 'GATE_IN'
    //             break
    //         default:
    //             roleType = ''
    //             break
    //     }

    //     let freightContractID = fcID
    //     let plantName = this.props.auth.user.data.esCommonDTO.plant.plantName
    //     let count = await Api.create().getCountHumanTaskListByFcID(freightContractID + "/DRIVER_ASSIGNMENT")
    //     let payloadFc = { limit: count.data.data, offset: 0, params: { freightContractID, humanTaskType: "DRIVER_ASSIGNMENT" } }
    //     let results = await Api.create().getHumanTaskListByFcID(payloadFc)
    //     if (results.data && results.data.status === "S") {
    //         results.data.data && results.data.data.map(async item => {
    //             let dataPayload = JSON.parse(item.payload)
    //             let orderBy = item.orderBy
    //             let driverID = dataPayload.driver_info.id
    //             let fleetID = dataPayload.fleet_info.id
    //             console.log('isUpdate', isUpdate)
    //             if (!isUpdate) {
    //                 let payloadTruck = {
    //                     "arriveTime": M().format("DD-MM-YYYY HH:mm:ss"),
    //                     "dock": { "name": "", "timeIn": "", "timeOut": "" },
    //                     driverID, fleetID,
    //                     "gateIn": {
    //                         "name": plantName,
    //                         "time": M().format("DD-MM-YYYY HH:mm:ss")
    //                     },
    //                     "es": {
    //                         "clientID": orderBy && orderBy.esCommonDTO && orderBy.esCommonDTO.client && orderBy.esCommonDTO.client.clientID ? orderBy.esCommonDTO.client.clientID : "",
    //                         "companyID": orderBy && orderBy.esCommonDTO && orderBy.esCommonDTO.company && orderBy.esCommonDTO.company.compID ? orderBy.esCommonDTO.company.compID : "",
    //                         "plantID": orderBy && orderBy.esCommonDTO && orderBy.esCommonDTO.plant && orderBy.esCommonDTO.plant.plantID ? orderBy.esCommonDTO.plant.plantID : "",
    //                         "slocID": orderBy && orderBy.esCommonDTO && orderBy.esCommonDTO.sloc && orderBy.esCommonDTO.sloc.slocID ? orderBy.esCommonDTO.sloc.slocID : "",
    //                         "whID": orderBy && orderBy.esCommonDTO && orderBy.esCommonDTO.warehouse && orderBy.esCommonDTO.warehouse.whID ? orderBy.esCommonDTO.warehouse.whID : "",
    //                     },
    //                     "taskID": item.humanTaskID,
    //                     "gateOut": { "name": "", "time": "" },
    //                     "loading": { "name": "", "timeIn": "", "timeOut": "" },
    //                     "location": roleType,
    //                     "locationName": plantName,
    //                     "tmCreational": {
    //                         "createdBy": "SYSTEM",
    //                         "createdDate": M().format("DD-MM-YYYY HH:mm:ss"),
    //                         "modifiedBy": "",
    //                         "modifiedDate": ""
    //                     },
    //                     "truckMonitoringID": M().format("x"),
    //                     "type": params.rowData.item.doc_info.source === "INBOUND DELIVERY" ? "INBOUND_DELIVERY" : "OUTBOUND_DELIVERY",
    //                     "yard": { "name": "", "timeIn": "", "timeOut": "" }

    //                 }
    //                 let postTruck = isUpdate ? await Api.create().updateTruckMonitoring(payloadTruck) : await Api.create().postTruckMonitoring(payloadTruck)
    //                 console.log("postTruck", postTruck)
    //                 if (postTruck.data && postTruck.data.status === "S") {
    //                     this.props.navigation.goBack()
    //                     this.props.navigation.navigate('TicketDetailScreen', {
    //                         data: params.data ? params.data : [],
    //                         rowData: params.rowData ? params.rowData : [],
    //                         allData: params.allData ? params.allData : []
    //                     })
    //                 } else {
    //                     this.setState({ dialogVisible: true, dialogValidator: false })
    //                 }
    //             } else {
    //                 let truck = await Api.create().getTruckMonitoringByDrvID(driverID)
    //                 console.log('driverID', driverID)
    //                 console.log('truck.data', truck)
    //                 if (truck.data && truck.data.status === "S") {
    //                     let payloadTruckUpdate = truck.data && truck.data.data && truck.data.data[0]
    //                     if (payloadTruckUpdate) {
    //                         payloadTruckUpdate = {
    //                             ...payloadTruckUpdate,
    //                             "es": {
    //                                 "clientID": payloadTruckUpdate && payloadTruckUpdate.es && payloadTruckUpdate.es.client && payloadTruckUpdate.es.client.clientID ? payloadTruckUpdate.es.client.clientID : "",
    //                                 "companyID": payloadTruckUpdate && payloadTruckUpdate.es && payloadTruckUpdate.es.company && payloadTruckUpdate.es.company.compID ? payloadTruckUpdate.es.company.compID : "",
    //                                 "plantID": payloadTruckUpdate && payloadTruckUpdate.es && payloadTruckUpdate.es.plant && payloadTruckUpdate.es.plant.plantID ? payloadTruckUpdate.es.plant.plantID : "",
    //                                 "slocID": payloadTruckUpdate && payloadTruckUpdate.es && payloadTruckUpdate.es.sloc && payloadTruckUpdate.es.sloc.slocID ? payloadTruckUpdate.es.sloc.slocID : "",
    //                                 "whID": payloadTruckUpdate && payloadTruckUpdate.es && payloadTruckUpdate.es.warehouse && payloadTruckUpdate.es.warehouse.whID ? payloadTruckUpdate.es.warehouse.whID : "",
    //                             },
    //                             "location": roleType,
    //                             "driverID": payloadTruckUpdate && payloadTruckUpdate.driverID.drvID,
    //                             "fleetID": payloadTruckUpdate && payloadTruckUpdate.fleetID.flID,
    //                             "locationName": plantName,
    //                             "arriveTime": M().format("DD-MM-YYYY HH:mm:ss"),
    //                             "tmCreational": { ...payloadTruckUpdate.tmCreational, modifiedBy: "SYSTEM", modifiedDate: M().format("DD-MM-YYYY HH:mm:ss") }
    //                         }
    //                         switch (type) {
    //                             case 'GI':
    //                                 payloadTruckUpdate = {
    //                                     ...payloadTruckUpdate,
    //                                     "dock": {
    //                                         "name": params.rowData.item.ynd_info.dock,
    //                                         "timeIn": M().format("DD-MM-YYYY HH:mm:ss"),
    //                                         "timeOut": M().format("DD-MM-YYYY HH:mm:ss")
    //                                     }
    //                                 }
    //                                 break
    //                             case 'GR':
    //                                 payloadTruckUpdate = {
    //                                     ...payloadTruckUpdate,
    //                                     "dock": {
    //                                         "name": params.rowData.item.ynd_info.dock,
    //                                         "timeIn": M().format("DD-MM-YYYY HH:mm:ss"),
    //                                         "timeOut": M().format("DD-MM-YYYY HH:mm:ss")
    //                                     }
    //                                 }
    //                                 break
    //                             case 'YND':
    //                                 payloadTruckUpdate = {
    //                                     ...payloadTruckUpdate,
    //                                     "yard": {
    //                                         "name": params.rowData.item.ynd_info.yard,
    //                                         "timeIn": M().format("DD-MM-YYYY HH:mm:ss"),
    //                                         "timeOut": M().format("DD-MM-YYYY HH:mm:ss")
    //                                     }
    //                                 }
    //                                 break
    //                             default:
    //                                 payloadTruckUpdate = { ...payloadTruckUpdate }
    //                                 break
    //                         }

    //                         console.log("payloadTruckUpdate", payloadTruckUpdate)
    //                         let updateTruck = await Api.create().updateTruckMonitoring(payloadTruckUpdate)
    //                         console.log("updateTruck", updateTruck)
    //                         if (updateTruck.data && updateTruck.data.status === "S") {
    //                             this.props.navigation.goBack()
    //                             this.props.navigation.navigate('TicketDetailScreen', {
    //                                 data: params.data ? params.data : [],
    //                                 rowData: params.rowData ? params.rowData : [],
    //                                 allData: params.allData ? params.allData : []
    //                             })
    //                         } else {
    //                             this.setState({ dialogVisible: true, dialogValidator: false })
    //                         }
    //                     } else {
    //                         this.setState({ dialogVisible: true, dialogValidator: false })
    //                     }
    //                 } else {
    //                     this.setState({ dialogVisible: true, dialogValidator: false })
    //                 }
    //             }
    //         })
    //     } else {
    //         this.setState({ dialogVisible: true, dialogValidator: false })
    //     }
    // }

    validateFreightContract = (id) => {
        const { params } = this.props.navigation.state
        const driverFreightContract = params.rowData.item.ticket_info && params.rowData.item.ticket_info.freight_contract_id ? params.rowData.item.ticket_info.freight_contract_id : ""
        console.log('params', params.role)
        console.log('id', id)
        console.log('driverFreightContract', driverFreightContract)
        // if (driverFreightContract === id) {
        //     let newParams = {
        //         ...params,
        //         rowData: {
        //             ...params.rowData,
        //             item: {
        //                 ...params.rowData.item,
        //                 workflow_info: {
        //                     ...params.rowData.item.workflow_info,
        //                     fc_status: "CONFIRMED"
        //                 }
        //             }
        //         }
        //     }
        //     this.updateTrucks(driverFreightContract, newParams, params.role)
        // } else {
        //     this.setState({ dialogVisible: true, dialogValidator: false })
        // }
        
        time = setTimeout(() => {
            if (driverFreightContract === id) {
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
                    data: newParams.data ? newParams.data : [],
                    rowData: newParams.rowData ? newParams.rowData : [],
                    allData: newParams.allData ? newParams.allData : []
                })
            } else {
                this.setState({ dialogVisible: true, dialogValidator: false })
            }
            clearTimeout(time)
        }, 1000);
    }

    barcodeReceived = async (event) => {
        let dialogVisible = false
        let dialogValidator = false
        if (event.data) {
            this.camera.pausePreview()
            this.setState({ fetching: true, dialogValidator: true })
            this.validateFreightContract(event.data)
        } else {
            dialogVisible = true
            this.setState({ fetching: false, dialogVisible, dialogValidator })
        }
    }

    setSealStatus = (type, status, qrType) => {
        switch (type) {
            case 'MATERIAL':
                this.props.changeStatusMaterial(status, qrType)
                break
            case 'PALLET':
                this.props.changeStatusPallet(status, qrType)
                break
            case 'HU':
                this.props.changeStatusHU(status, qrType)
                break
            case 'VX':
                this.props.changeStatusVX(status, qrType)
                break
            case 'BQ':
                this.props.changeStatusBQ(status, qrType)
                break
            case 'DRIVER':
                this.props.changeStatusDriver(status, qrType)
                break
            case 'SIM':
                this.props.changeStatusSIM(status, qrType)
                break
            case 'FLEET':
                this.props.changeStatusFleet(status, qrType)
                break
            case 'KIR':
                this.props.changeStatusKIR(status, qrType)
                break
            case 'REFERENCE':
                this.props.changeStatusReference(status, qrType)
                break
            case 'DO':
                this.props.changeStatusDO(status, qrType)
                break
            default:
                this.props.changeStatus(status, qrType)
                break
        }
    }

    validateSeal = (id) => {
        const { params } = this.props.navigation.state
        const validateID = params.validateID
        console.log('id', id)
        console.log('validateID', validateID)
        time = setTimeout(() => {
            if (validateID === id) {
                this.setSealStatus(params.type, true, 'good')
                this.props.navigation.goBack()
            } else {
                this.camera.pausePreview()
                this.setState({ dialogVisible: true, dialogValidator: false })
            }
            clearTimeout(time)
        }, 2000);
    }

    barcodeReceivedSeal = async (event) => {
        let dialogVisible = false
        let dialogValidator = false
        if (event.data) {
            this.camera.pausePreview()
            this.setState({ fetching: true, dialogValidator: true })
            this.validateSeal(event.data)
        } else {
            dialogVisible = true
            this.setState({ fetching: false, dialogVisible, dialogValidator })
        }
    }

    handleDialog = () => {
        this.setState({ dialogVisible: false }, () => {
            this.camera.resumePreview()
        })
    }

    handleCloseDialog = () => {
        const { params } = this.props.navigation.state
        if (params.type === 'SL') {
            this.setSealStatus(params.type, false, 'notgood')
        } else {
            this.setSealStatus(params.type, true, 'notgood')
        }
        this.setState({ dialogVisible: false })
        this.props.navigation.goBack()
    }

    handleMeasure(event) {
        console.log("ev", event)
    }

    render() {
        const { fetching, dialogVisible, loaded, dialogValidator, isFocused } = this.state
        const { params } = this.props.navigation.state
        return (
            <View style={{ flex: 1 }}>
                <View>
                    <NavbarMenu
                        onBack={() => this.props.navigation.goBack()}
                        title={params.title ? params.title : 'LevLog Ayes'} />
                    {params.role && (
                        <TouchableOpacity
                            onPress={!dialogValidator ? () => {
                                this.props.navigation.goBack()
                                this.props.navigation.navigate('ValidatorScreen', {
                                    role: params.role,
                                    type: params.type ? params.type : null,
                                    data: params.data ? params.data : [],
                                    rowData: params.rowData ? params.rowData : [],
                                    allData: params.allData ? params.allData : []
                                })
                            } : null}
                            style={{ position: 'absolute', right: 0, top: 0, padding: 10, paddingTop: 11 }}>
                            <Icon size={18} color="#fff" name="forward" />
                        </TouchableOpacity>
                    )}
                </View>
                <NavigationEvents
                    onWillFocus={() => this.setState({ loaded: true })}
                    onDidBlur={() => this.setState({ loaded: true })} />
                <View style={{ flex: 1, backgroundColor: "#fff" }}>
                    {loaded && isFocused && (
                        <RNCamera
                            style={{ flex: 1 }}
                            ref={ref => {
                                this.camera = ref;
                            }}
                            rectOfInterest={{
                                x: 0.5,
                                y: 0.5,
                                width: scanAreaWidth,
                                height: scanAreaHeight,
                            }}
                            cameraViewDimensions={{
                                width: 50,
                                height: 50,
                            }}
                            type={RNCamera.Constants.Type.back}
                            androidCameraPermissionOptions={{
                                title: 'Permission to use camera',
                                message: 'We need your permission to use your camera',
                                buttonPositive: 'Ok',
                                buttonNegative: 'Cancel',
                            }}
                            androidRecordAudioPermissionOptions={{
                                title: 'Permission to use audio recording',
                                message: 'We need your permission to use your audio',
                                buttonPositive: 'Ok',
                                buttonNegative: 'Cancel',
                            }}
                        >
                            <QRScannerView
                                onScanResult={params.role === 'SEAL' ? this.barcodeReceivedSeal : this.barcodeReceived}
                                scanInterval={8000}
                                hintText={''}
                                rectStyle={{ marginBottom: D.dp80 }}
                                cornerStyle={{
                                    height: D.dp16,
                                    width: D.dp16,
                                    borderWidth: D.dp3,
                                }}
                                scanBarImage={require("../assets/ic_douyin_scan_line.png")}
                                scanBarStyle={{ marginHorizontal: 0, height: D.dp56 }}
                            />
                            <View style={{ position: "absolute", top: (CAM_VIEW_HEIGHT - 90), width: '100%' }}>
                                <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center", alignContent: "center" }}>
                                    <Text style={{ width: "65%", lineHeight: 20, color: "#fff", fontSize: 14, fontWeight: "normal", textAlign: "center" }}>
                                        {params.description ? params.description : ''}
                                    </Text>
                                </View>
                            </View>
                        </RNCamera>
                    )}
                </View>
                {dialogValidator && (
                    <DialogQrValidator />
                )}
                {dialogVisible && (
                    <DialogQrInvalid
                        action={this.handleDialog}
                        close={this.handleCloseDialog} />
                )}
            </View >
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
        seal: state.seal
    }
}

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
    }
}

export default withNavigationFocus(connect(mapStateToProps, mapDispatchToProps)(QrScanner))