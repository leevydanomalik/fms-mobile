import React from 'react'
import { View, ScrollView, Alert } from 'react-native'
import Multistep from '../Components/Multistep'
import { DriverInfo, TruckInfo, DocInfo, SealNumber, YardDock, CheckIn, CheckOut } from './gatesecurity'
import NavbarMenu from '../Components/NavbarMenu'
import Pusher from 'pusher-js/react-native'
import Toast from 'react-native-toast-message'
import messaging from '@react-native-firebase/messaging'
import Api from '../../Services/Api'
import M from 'moment'
import { connect } from 'react-redux'
import DialogQrValidator from './DialogQrValidator'
import { generateDiferenceMilisecond, updateTrucks } from '../../Utils/'

var time
var payloadTimer = {
    "finalDuration": "NONE",
    "lastDuration": 0,
    "onPause": true
}

class CardGate extends React.Component {
    constructor(props) {
        super(props)
        const { ynd_info, doc_info } = props.rowData.item
        this.state = {
            activeIndex: 0,
            startMsecs: 0,
            stopMsecs: 0,
            startTime: '-',
            stopTime: '-',
            isInboundDev: true,
            visibleButtonLoader: false,
            visibleLoader: false,
            isDriverCorrect: false,
            isLicenseCorrect: false,
            isTruckCorrect: false,
            isKIRCorrect: false,
            isDOCorrect: false,
            isSealCorrect: false,
            rowData: props.rowData,
            ynd: {
                id: ynd_info.id,
                yard: ynd_info.yard,
                dock: ynd_info.dock,
                master: ynd_info.master,
                master_image_path: ynd_info.ynd_img_path,
                origin: ynd_info.es,
                org_time: doc_info.delivery.leg_org_ETD,
                org_etd: '',
                dest: ynd_info.es,
                dest_eta: '',
                dest_time: doc_info.delivery.leg_dest_ETA,
            }
        }
    }

    static defaultProps = {
        onVerifiedPress: () => null
    }

    componentDidMount() {
        const { activeIndex } = this.state
        const { ticket_info, duration_info, workflow_info } = this.props.rowData.item
        const { org_time, dest_time } = this.state.ynd
        if (ticket_info.status === "DONE") {
            if (duration_info) {
                const {lastDuration} = duration_info
                this.setState({ 
                    activeIndex: 2,
                    isDone: true,
                    stopMsecs: lastDuration, 
                    stopTime: dest_time,
                    startTime: org_time
                })
            }
        }

        if (ticket_info.status === 'STARTED') {
            this.resumeTimer()
            this.setState({ stopTime: '-', startTime: org_time, visibleLoader: false, activeIndex: (activeIndex + 1) })
            // this.setState({visibleLoader: true})
            // time = setTimeout(() => {
            //     this.setState({ stopTime: '-', startTime: org_time, visibleLoader: false, activeIndex: (activeIndex + 1) })
            //     clearTimeout(time)
            // }, 1000)
        }

        console.log('ticket_info', ticket_info.ticket_no)

        if (workflow_info) {
            let payload = {
                isDriverCorrect: workflow_info.driver_status === 'CONFIRMED' ? true : false,
                isLicenseCorrect: workflow_info.sim_status === 'CONFIRMED' ? true : false,
                isTruckCorrect: workflow_info.fleet_status === 'CONFIRMED' ? true : false,
                isKIRCorrect: workflow_info.kir_status === 'CONFIRMED' ? true : false,
                isDOCorrect: workflow_info.document_status === 'CONFIRMED' ? true : false,
                isSealCorrect: workflow_info.seal_status === 'CONFIRMED' ? true : false
            }
            this.setState(payload)
        }

        // this.startPusher()
        messaging().onMessage(async remoteMessage => {
            if (remoteMessage.data.title == "YND Information Gate") {
                let info = JSON.parse(remoteMessage.data.body)
                this.setState({
                    ynd: {
                        ...this.state.ynd,
                        origin: info.ynd_info.es,
                        dest: info.ynd_info.es,
                        yard: info.ynd_info.yard,
                        dock: info.ynd_info.dock,
                        master: info.ynd_info.master
                    }
                })
            }
            console.log('Cek Ombak Brayyy', JSON.stringify(remoteMessage));
        })
    }

    resumeTimer() {
        const { ticket_info } = this.props.rowData.item
        const { org_time } = this.state.ynd

        if (ticket_info.status === 'STARTED') {
            const now_time = M().format("DD-MM-YYYY hh:mm:ss A")
            const calculate = generateDiferenceMilisecond(org_time, now_time)

            console.log('now_time', now_time)
            console.log('org_time', org_time)
            console.log('calculate', calculate)

            this.setState({ stopMsecs: calculate })
        }
    }

    startPusher() {
        var pusher = new Pusher('7ac57e99c8c3cce7698e', {
            cluster: 'ap1'
        });

        var channel = pusher.subscribe('wms-channel-ynd');
        channel.bind('wms-event-ynd', function (data) {
            console.log('dataaa', data)
            let datas = (data.message)
            let message = Object.assign([], this.state.message)
            message.push(datas)
            let info = JSON.parse(datas.description)
            this.setState({
                message,
                ynd: {
                    ...this.state.ynd,
                    yard: info.ynd_info.yard,
                    dock: info.ynd_info.dock,
                    master: info.ynd_info.master
                }
            })

            Toast.show({
                type: 'success',
                position: 'top',
                text1: datas.title,
                text2: datas.description,
                visibilityTime: 4000,
                autoHide: true,
                elevation: 10,
                topOffset: 15,
                bottomOffset: 15,
                onShow: () => { },
                onHide: () => { }
            })
        }.bind(this));
    }

    borderBoldBottom = () => {
        return (
            <View style={{ borderBottomColor: '#f0f0f0', borderBottomWidth: 10, marginTop: 10 }} />
        )
    }

    sendFcmDriver = async (data, type) => {
        let freightContractID = this.props.rowData.item.ticket_info && this.props.rowData.item.ticket_info.freight_contract_id ? this.props.rowData.item.ticket_info.freight_contract_id : ""
        let count = await Api.create().getCountHumanTaskListByFcID(freightContractID + "/DRIVER_ASSIGNMENT")
        let payloadFc = { limit: count.data.data, offset: 0, params: { freightContractID, humanTaskType: "DRIVER_ASSIGNMENT" } }
        let results = await Api.create().getHumanTaskListByFcID(payloadFc)
        if (results.data && results.data.status === "S") {
            results.data.data && results.data.data.map(async item => {
                let dataPayload = JSON.parse(item.payload)
                let driverID = dataPayload.driver_info.id
                let daID = item.humanTaskID
                let typeDelivery = this.props.rowData.item.doc_info.source === "INBOUND DELIVERY" ? "INBOUND_DELIVERY" : "OUTBOUND_DELIVERY"
                let leg_org_ATD = dataPayload.ticket_info.leg_org_ATD
                let leg_dest_ATA = dataPayload.ticket_info.leg_dest_ATA
                let leg_org_check_in = dataPayload.ticket_info.leg_org_check_in
                let leg_org_check_out = dataPayload.ticket_info.leg_org_check_out
                let leg_dest_check_in = dataPayload.ticket_info.leg_dest_check_in
                let leg_dest_check_out = dataPayload.ticket_info.leg_dest_check_out
                if (dataPayload.ticket_info.leg_org_check_in === false) {
                    leg_org_ATD = `${M().format("DD-MM-YYYY")} ${data}`
                    leg_org_check_in = true
                }
                if (dataPayload.ticket_info.leg_org_check_in === true && dataPayload.ticket_info.leg_org_check_out === false) leg_org_check_out = true

                if (dataPayload.ticket_info.leg_org_check_in === true && dataPayload.ticket_info.leg_org_check_out === true && dataPayload.ticket_info.leg_dest_check_in === false) {
                    leg_dest_ATA = `${M().format("DD-MM-YYYY")} ${data}`
                    leg_dest_check_in = true
                }
                if (dataPayload.ticket_info.leg_dest_check_in === true && dataPayload.ticket_info.leg_dest_check_out === false) leg_dest_check_out = true

                let deliveryEtd = { ...dataPayload.doc_info.delivery, leg_dest_ETA: "NONE", "security_id_out": "NONE", "security_name_out": "NONE", "security_plant_out": "NONE", leg_org_ETD: `${M().format("DD-MM-YYYY")} ${data}`, "security_id_in": this.props.user.id, "security_name_in": this.props.user.name, "security_plant_in": this.props.auth.user.data.esCommonDTO.plant.plantName }
                let deliveryEta = { ...dataPayload.doc_info.delivery, leg_dest_ETA: `${M().format("DD-MM-YYYY")} ${data}`, "security_id_out": this.props.user.id, "security_name_out": this.props.user.name, "security_plant_out": this.props.auth.user.data.esCommonDTO.plant.plantName }
                dataPayload = { ...dataPayload, ticket_info: { ...dataPayload.ticket_info, leg_org_ATD, leg_dest_ATA, leg_org_check_in, leg_org_check_out, leg_dest_check_in, leg_dest_check_out }, doc_info: { ...dataPayload.doc_info, delivery: type == "Check In" ? { ...deliveryEtd } : { ...deliveryEta } } }
                let updateTask = {
                    ...item,
                    type: item.type && item.type.key,
                    es: {
                        client: item.es && item.es.client && item.es.client.clientID,
                        company: item.es && item.es.company && item.es.company.compID,
                        plant: item.es && item.es.plant && item.es.plant.plantID,
                    },
                    taskStatus: type == "Check In" ? "STARTED" : leg_dest_check_out === true ? "DONE" : item.taskStatus,
                    sourceID: item.sourceID ? item.sourceID : "",
                    orderBy: item.orderBy ? item.orderBy.userID : "",
                    executeBy: item.executeBy ? item.executeBy.userID : "",
                    payload: JSON.stringify(dataPayload),
                    baseCreational: {
                        ...item.baseCreational,
                        "modifiedBy": this.props.user.id,
                        "modifiedDate": M().format("DD-MM-YYYY HH:mm:ss")
                    }
                }
                let resultsUpdate = await Api.create().updateHumanTaskList(updateTask)
                if (resultsUpdate.data && resultsUpdate.data.status === "S") console.log("update task sukses")
                let tokens = await Api.create().getTokenDeviceByUserID(item.assignment)
                console.log("humantaskID", item.humanTaskID)
                let bodyEtd = { "start_time": `${M().format("DD-MM-YYYY")} ${data}`, "security_id": this.props.user.id, "security_name": this.props.user.name, "security_plant": this.props.auth.user.data.esCommonDTO.plant.plantName, "ticket_no": item.humanTaskID }
                let bodyEta = { "stop_time": `${M().format("DD-MM-YYYY")} ${data}`, "security_id": this.props.user.id, "security_name": this.props.user.name, "security_plant": this.props.auth.user.data.esCommonDTO.plant.plantName, "ticket_no": item.humanTaskID }
                let bodyFcm = {
                    "to": tokens.data.data.tokenDevice,
                    "data": {
                        "body": type == "Check In" ? JSON.stringify(bodyEtd) : JSON.stringify(bodyEta),
                        "title": `Gate Security ${type}`
                    },
                    "android": { "priority": "high" }
                }
                let res = await Api.create().postFcm(bodyFcm)
                console.log("send fcm ==>", res)
                if (type === "Check Out") {
                    let truck = await Api.create().getTruckMonitoringByDrvIDDaIDType(driverID + "/" + daID + "/" + typeDelivery)
                    if (truck.data && truck.data.status === "S") {
                        let payloadTruckUpdate = truck.data.data
                        payloadTruckUpdate = {
                            ...payloadTruckUpdate,
                            es: {
                                clientID: payloadTruckUpdate.es && payloadTruckUpdate.es.client && payloadTruckUpdate.es.client.clientID ? payloadTruckUpdate.es.client.clientID : "",
                                companyID: payloadTruckUpdate.es && payloadTruckUpdate.es.company && payloadTruckUpdate.es.company.compID ? payloadTruckUpdate.es.company.compID : "",
                                plantID: payloadTruckUpdate.es && payloadTruckUpdate.es.plant && payloadTruckUpdate.es.plant.plantID ? payloadTruckUpdate.es.plant.plantID : "",
                                slocID: payloadTruckUpdate.es && payloadTruckUpdate.es.sloc && payloadTruckUpdate.es.sloc.slocID ? payloadTruckUpdate.es.sloc.slocID : "",
                                whID: payloadTruckUpdate.es && payloadTruckUpdate.es.warehouse && payloadTruckUpdate.es.warehouse.whID ? payloadTruckUpdate.es.warehouse.whID : "",
                            },
                            taskID: this.props.rowData.item.humanTaskID,
                            location: "GATE_OUT",
                            driverID: payloadTruckUpdate.driverID.drvID,
                            fleetID: payloadTruckUpdate.fleetID.flID,
                            locationName: this.props.auth.user.data.esCommonDTO.plant.plantName,
                            arriveTime: `${M().format("DD-MM-YYYY")} ${data}`,
                            gateOut: {
                                name: this.props.auth.user.data.esCommonDTO.plant.plantName,
                                time: `${M().format("DD-MM-YYYY")} ${data}`
                            },
                            tmCreational: { ...payloadTruckUpdate.tmCreational, modifiedBy: "SYSTEM", modifiedDate: M().format("DD-MM-YYYY HH:mm:ss") }
                        }
                        let updateTruck = await Api.create().updateTruckMonitoring(payloadTruckUpdate)
                        if (updateTruck.data && updateTruck.data.status === "S") console.log("update truck")
                    }
                }
            })
        }
    }

    updateTaskStatus = async (data, status, startTimes, duration) => {
        this.setState({ visibleLoader: true })

        let workFlow = this.state.rowData.item.workflow_info
        let durationInfo = duration ? { ...duration } : { ...payloadTimer }
        let datas = this.props.allData[this.props.rowData.index]
        let dataPayload = JSON.parse(datas.payload)
        let dataPayloadStart = { ...dataPayload, doc_info: { ...dataPayload.doc_info, delivery: { ...dataPayload.doc_info.delivery, leg_org_ETD: `${M().format("DD-MM-YYYY")} ${data}` } } }
        let dataPayloadStop = { ...dataPayload, duration_info: durationInfo, doc_info: { ...dataPayload.doc_info, delivery: { ...dataPayload.doc_info.delivery, leg_org_ETD: `${M().format("DD-MM-YYYY")} ${startTimes}`, leg_dest_ETA: `${M().format("DD-MM-YYYY")} ${data}` } } }
        dataPayload = status === "DONE" ? dataPayloadStop : dataPayloadStart
        dataPayload = {
            ...dataPayload,
            workflow_info: {
                ...workFlow
            }
        }
        let updateTask = {
            ...datas,
            type: datas.type && datas.type.key,
            es: {
                client: datas.es && datas.es.client && datas.es.client.clientID,
                company: datas.es && datas.es.company && datas.es.company.compID,
                plant: datas.es && datas.es.plant && datas.es.plant.plantID,
            },
            taskStatus: status,
            sourceID: datas.sourceID ? datas.sourceID : "",
            orderBy: datas.orderBy ? datas.orderBy.userID : "",
            executeBy: datas.executeBy ? datas.executeBy.userID : "",
            payload: JSON.stringify(dataPayload),
            baseCreational: {
                ...datas.baseCreational,
                "modifiedBy": this.props.auth.user.data.userID,
                "modifiedDate": M().format("DD-MM-YYYY HH:mm:ss")
            }
        }
        let resultsUpdate = await Api.create().updateHumanTaskList(updateTask)
        console.log("payload ypdate", updateTask)
        let docStart = { ...this.state.rowData.item.doc_info, delivery: { ...this.state.rowData.item.doc_info.delivery, leg_org_ETD: `${M().format("DD-MM-YYYY")} ${data}` } }
        let docStop = { ...this.state.rowData.item.doc_info, delivery: { ...this.state.rowData.item.doc_info.delivery, leg_org_ETD: `${M().format("DD-MM-YYYY")} ${startTimes}`, leg_dest_ETA: `${M().format("DD-MM-YYYY")} ${data}` } }
        let doc_info = status === "DONE" ? docStop : docStart
        if (resultsUpdate.data && resultsUpdate.data.status === "S") this.setState({
            rowData: { ...this.state.rowData, item: { ...this.state.rowData.item, doc_info } }, visibleLoader: false
        }, console.log("update berhasil"))
        else this.setState({ visibleLoader: false })
    }

    updateTaskScanner = async (type = '', status = false) => {
        let prevData = this.state.rowData
        let workflow = {
            ...prevData.item.workflow_info
        }

        switch (type) {
            case 'driver':
                workflow = {
                    ...workflow,
                    driver_status: status ? 'CONFIRMED' : 'UNCONFIRMED'
                }
                break;
            case 'license':
                workflow = {
                    ...workflow,
                    license_status: status ? 'CONFIRMED' : 'UNCONFIRMED'
                }
                break;
            case 'sim':
                workflow = {
                    ...workflow,
                    sim_status: status ? 'CONFIRMED' : 'UNCONFIRMED'
                }
                break;
            case 'fleet':
                workflow = {
                    ...workflow,
                    fleet_status: status ? 'CONFIRMED' : 'UNCONFIRMED'
                }
                break;
            case 'kir':
                workflow = {
                    ...workflow,
                    kir_status: status ? 'CONFIRMED' : 'UNCONFIRMED'
                }
                break;
            case 'document':
                workflow = {
                    ...workflow,
                    document_status: status ? 'CONFIRMED' : 'UNCONFIRMED'
                }
                break;
            case 'seal':
                workflow = {
                    ...workflow,
                    seal_status: status ? 'CONFIRMED' : 'UNCONFIRMED'
                }
                break;
            default:
                workflow = {
                    ...workflow
                }
                break;
        }

        let newData = {
            ...prevData,
            item: {
                ...prevData.item,
                workflow_info: {
                    ...workflow
                }
            }
        }

        this.setState({rowData: newData})
        console.log('updateTaskScanner', workflow)
    }

    render() {
        const { activeIndex, startMsecs, stopMsecs, startTime, stopTime, visibleButtonLoader, ynd, isDone, visibleLoader } = this.state
        const { onVerifiedPress, onBack, onQR, user, signver, securitySignver, driverSignver } = this.props
        const data = this.state.rowData.item
        const { driver_info, ticket_info, doc_info, fleet_info, ynd_info } = data
        const { isDriverCorrect, isLicenseCorrect, isTruckCorrect, isKIRCorrect, isDOCorrect, isSealCorrect } = this.state
        const disableStartButton = isDriverCorrect && isLicenseCorrect && isTruckCorrect && isKIRCorrect && isDOCorrect && isSealCorrect
        console.log('disableStartButton', disableStartButton)
        const dataTab = [
            { id: '1', title: '1', active: false },
            { id: '2', title: '2', active: false },
            { id: '3', title: '3', active: false },
        ]
        const driverCheck = {
            id: user && user.id,
            image: '',
            name: user && user.name,
            cargo: user && user.company
        }
        const driver = {
            id: driver_info.id,
            name: driver_info.name,
            image_path: driver_info.driver_img_path,
            height_weight: driver_info.height_weight,
            license: driver_info.driver_drv_lic,
            license_no: driver_info.drv_license_no,
            license_expire: driver_info.drv_license_expire,
            issuing_police: driver_info.drv_license_issue,
            company: ticket_info.driver_company,
            address: driver_info.drv_address,
            drv_citizenship: driver_info.drv_citizenship_id
        }
        const fleet = {
            id: fleet_info.id,
            name: fleet_info.name,
            image_path: fleet_info.fleet_img_path,
            year: fleet_info.fleet_year,
            type: fleet_info.type,
            nopol: fleet_info.fleet_nopol,
            height_length_weight: fleet_info.height_length_weight,
            kir_no: fleet_info.kir_no,
            kir_expired: fleet_info.kir_expired,
            issuing_dishub: fleet_info.kir_issue,
            transporter_carrier: fleet_info.fleet_transporter
        }
        const document = {
            type: doc_info.type.replace(/[_]/g, ' '),
            km_hours: '8.56 km / 8 hours',
            plan: '#653-POP',
            fleet_type: fleet_info.type,
            reference: ticket_info.source_id,
            delivery_order: doc_info.delivery.do_no,
            service: doc_info.delivery.service,
            pdt: doc_info.delivery.pdt,
            seal_no: doc_info.delivery.seal_no,
            // origin
            origin: ticket_info.leg_origin,
            org_dsp: doc_info.delivery.leg_origin,
            org_etd: doc_info.delivery.loading_date,
            org_location: doc_info.delivery.leg_origin_lat ? {
                latitude: doc_info.delivery.leg_origin_lat,
                longitude: doc_info.delivery.leg_origin_long
            } : null,
            // dest
            dest: ticket_info.leg_dest,
            dest_dsp: doc_info.delivery.leg_dest,
            dest_eta: doc_info.delivery.delivery_date,
            dest_location: doc_info.delivery.leg_dest_lat ? {
                latitude: doc_info.delivery.leg_dest_lat,
                longitude: doc_info.delivery.leg_dest_long
            } : null,
            // material
            material: doc_info.delivery.material,
            periority: ticket_info.ticket_priority,
            note: ticket_info.ticket_note
        }
        // const ynd = {
        //     yard: ynd_info.yard,
        //     dock: ynd_info.dock,
        //     master: ynd_info.master,
        //     master_image_path: ynd_info.ynd_img_path,
        //     origin: doc_info.delivery.leg_origin,
        //     org_etd: '',
        //     org_time: doc_info.delivery.leg_org_ETD,
        //     dest: doc_info.delivery.leg_dest,
        //     dest_eta: '',
        //     dest_time: doc_info.delivery.leg_dest_ETA
        // }
        const security = [
            {
                id: user && user.id,
                title: 'Check In',
                warehouse: user && user.warehouse,
                time: startTime,
                worker: user && user.name,
                image: ynd_info.ynd_img_path
            },
            {
                id: user && user.id,
                title: 'Check Out',
                warehouse: user && user.warehouse,
                time: stopTime,
                worker: user && user.name,
                image: ynd_info.ynd_img_path
            }
        ]
        // console.log('ticket_info', ticket_info)
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <View style={{ backgroundColor: '#fff', height: signver ? 40 : 95, zIndex: 1000 }}>
                    <NavbarMenu
                        onBack={() => {
                            ticket_info.status != "DONE" ?
                                Alert.alert(
                                    'Information',
                                    'Anda yakin?',
                                    [
                                        {
                                            text: 'Cancel',
                                            onPress: () => console.log('Cancel Pressed'),
                                            style: 'cancel'
                                        },
                                        { text: 'OK', onPress: () => onBack() }
                                    ],
                                    { cancelable: false }
                                ) : onBack()
                        }}
                        title={'Ticket#' + (ticket_info && ticket_info.ticket_no)} />
                    <Multistep
                        disable={signver}
                        data={dataTab}
                        // isSmallContainer={true}
                        disableClick={isDone}
                        disableColor={true}
                        activeIndex={activeIndex}
                        onChange={(index) => this.setState({ activeIndex: index })} />
                </View>
                <ScrollView>
                    <View style={{ marginTop: -10 }}>
                        {(activeIndex === 0) && (
                            <View>
                                <DriverInfo
                                    data={driver}
                                    isGate={true}
                                    isFirstDone={isDriverCorrect}
                                    isSecondDone={isLicenseCorrect}
                                    onScanner={(type, validateID) => onQR(type, validateID)}
                                    onPressFirst={(data) => {
                                        this.updateTaskScanner('driver', data)
                                        this.setState({ isDriverCorrect: data && data })
                                    }}
                                    onPressSecond={(data) => {
                                        this.updateTaskScanner('sim', data)
                                        this.setState({ isLicenseCorrect: data && data })
                                    }}
                                    onVerifiedPress={onVerifiedPress} />
                                { this.borderBoldBottom()}
                                <TruckInfo
                                    data={fleet}
                                    isGate={true}
                                    isFirstDone={isTruckCorrect}
                                    isSecondDone={isKIRCorrect}
                                    onScanner={(type, validateID) => onQR(type, validateID)}
                                    onPressFirst={(data) => {
                                        this.updateTaskScanner('fleet', data)
                                        this.setState({ isTruckCorrect: data && data })
                                    }}
                                    onPressSecond={(data) => {
                                        this.updateTaskScanner('kir', data)
                                        this.setState({ isKIRCorrect: data && data })
                                    }}
                                    onVerifiedPress={onVerifiedPress} />
                                { this.borderBoldBottom()}
                                <DocInfo
                                    data={document}
                                    isGate={true}
                                    isDOCorrect={isDOCorrect}
                                    disableReferenceScanner={true}
                                    onScanner={(type, validateID) => onQR(type, validateID)}
                                    onChange={(data) => {
                                        this.updateTaskScanner('document', data)
                                        this.setState({ isDOCorrect: data && data })
                                    }}
                                    onVerifiedPress={onVerifiedPress} />
                                { this.borderBoldBottom()}
                                <SealNumber
                                    code={document.seal_no}
                                    isScannerCorrect={isSealCorrect}
                                    isScanned={true}
                                    onScanner={() => onQR('SL', document.seal_no)}
                                    onPress={(data) => {
                                        this.updateTaskScanner('seal', data)
                                        this.setState({ isSealCorrect: data && data })
                                    }}
                                    onVerifiedPress={onVerifiedPress} />
                                { this.borderBoldBottom()}
                                <YardDock
                                    data={ynd}
                                    onVerifiedPress={onVerifiedPress} />
                                { this.borderBoldBottom()}
                                <CheckIn
                                    gate={true}
                                    disableStartButton={!disableStartButton}
                                    lastMsecs={startMsecs}
                                    driver={driverCheck}
                                    security={security}
                                    onChangeTimer={(data) => {
                                        if (ticket_info.status === 'STARTED') {
                                            this.setState({ stopMsecs: data })
                                        } else {
                                            this.setState({ startMsecs: data, stopMsecs: data })
                                        }
                                    }}
                                    onStart={(data) => {
                                        if (ticket_info.status === 'STARTED') {
                                            this.setState({ stopTime: '-' })
                                        } else {
                                            this.setState({ startTime: data, stopTime: '-' })
                                        }
                                    }}
                                    sendFcm={(data) => this.sendFcmDriver(data, "Check In")}
                                    onStop={(data) => this.setState({ activeIndex: (activeIndex + 1) })}
                                    updateStatus={(data, status) => {
                                        if (ticket_info.status === 'STARTED') {
                                            this.resumeTimer()
                                            this.setState({visibleLoader: true})
                                            time = setTimeout(() => {
                                                this.setState({ stopTime: '-', visibleLoader: false, activeIndex: (activeIndex + 1) })
                                                clearTimeout(time)
                                            }, 1000)
                                        } else {
                                            this.updateTaskStatus(data, status)
                                            updateTrucks(ticket_info.freight_contract_id, this.props, 'GATE', this.props.auth)
                                        }
                                    }}
                                    btnTitle={'PROCEED'}
                                    onVerifiedPress={onVerifiedPress} />
                            </View>
                        )}
                        {(activeIndex === 1) && (
                            <SealNumber
                                code={document.seal_no}
                                isScannerCorrect={isSealCorrect}
                                isScanned={true}
                                onScanner={() => onQR()}
                                onPress={() => console.log('pressed')}
                                onVerifiedPress={onVerifiedPress} />
                        )}
                        {(activeIndex === 2 || activeIndex === 1) && (
                            <CheckOut
                                isDone={isDone}
                                disableButton={signver}
                                securitySignver={securitySignver}
                                driverSignver={driverSignver}
                                gate={true}
                                code={ticket_info.ticket_no}
                                lastMsecs={stopMsecs}
                                driver={driverCheck}
                                security={security}
                                onChangeTimer={(data) => this.setState({ stopMsecs: data })}
                                startTime={startTime}
                                sendFcm={(data) => this.sendFcmDriver(data, "Check Out")}
                                onStop={(data) => this.setState({ stopTime: data, activeIndex: (activeIndex + 1) })}
                                btnTitle={visibleButtonLoader ? 'Please wait..' : 'CONFIRM & DONE'}
                                btnPress={() => onBack()}
                                updateStatus={(data, status, startTimes, count, msecs) => {
                                    const duration = {
                                        ...payloadTimer,
                                        finalDuration: count,
                                        lastDuration: msecs,
                                        onPause: false
                                    }
                                    this.updateTaskStatus(data, status, startTimes, duration)}
                                } 
                                onVerifiedPress={onVerifiedPress} />
                        )}
                    </View>
                </ScrollView>

                {visibleLoader && (
                    <DialogQrValidator title={'Please Wait..'} />
                )}
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, null)(CardGate)