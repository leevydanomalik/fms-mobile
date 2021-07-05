import React from 'react'
import { View, ScrollView, Alert } from 'react-native'
import Multistep from '../Components/Multistep'
import { DriverInfo, TruckInfo, DocInfo, SealNumber, YardDock, CheckIn, CheckOut } from './gatesecurity'
import { GoodIssueInfo } from './loading'
import NavbarMenu from '../Components/NavbarMenu'
import Pusher from 'pusher-js/react-native'
import Toast from 'react-native-toast-message'
import messaging from '@react-native-firebase/messaging'
import Api from '../../Services/Api'
import M from 'moment'
import { connect } from 'react-redux'
import DialogQrValidator from './DialogQrValidator'
import { generateDiferenceMilisecond, updateTrucks } from '../../Utils/'

var payloadTimer = {
    "finalDuration": "NONE",
    "lastDuration": 0,
    "onPause": true
}

class CardYND extends React.Component {
    constructor(props) {
        super(props)
        const { allData, rowData } = props
        const { ynd_info, doc_info, ticket_info, final_check, taskStatus } = rowData.item
        this.state = {
            isDone: false,
            activeIndex: 0,
            startMsecs: 0,
            stopMsecs: 0,
            startMili: 0,
            startTime: allData && allData[rowData.index] && allData[rowData.index].taskStatus === "TODO" ? "-" : ticket_info.leg_org_ATD,
            stopTime: '-',
            visibletimer: true,
            isInboundDev: true,
            visibleLoader: false,
            isDriverCorrect: true,
            isLicenseCorrect: true,
            isTruckCorrect: true,
            isKIRCorrect: true,
            isDOCorrect: true,
            isSealCorrect: false,
            statusTask: allData && allData[rowData.index] && allData[rowData.index].taskStatus,
            rowData: props.rowData,
            ynd: {
                id: ynd_info.id,
                yard: ynd_info.yard,
                dock: ynd_info.dock,
                master: ynd_info.master,
                master_image_path: ynd_info.ynd_img_path,
                origin: doc_info.delivery.leg_origin,
                org_time: ynd_info.yardInTime,
                dest: doc_info.delivery.leg_dest,
                dest_time: ynd_info.dockInTime
            },
            checkList: [
                { id: '1', title: 'CHECK SEAL NUMBER', active: final_check.chkSealNumber },
                { id: '2', title: 'CHECK DRIVER', active: final_check.chkDriver },
                { id: '3', title: 'CHECK FLEET', active: final_check.chkFleet },
                { id: '4', title: 'CHECK DOCUMENT', active: final_check.chkDoc }
            ]
        }
    }

    static defaultProps = {
        onVerifiedPress: () => null
    }

    componentDidMount() {
        const { duration_info, ticket_info } = this.props.rowData.item
        const { leg_dest_ATA, leg_org_ATD } = ticket_info

        if (ticket_info.status === "STARTED") {
            this.resumeTimer()

            if (duration_info) {
                const { lastDuration, onPause } = duration_info
                if (onPause) {
                    console.log('resume')
                    this.setState({ activeIndex: 1, timerStatus: true, startMsecs: lastDuration, visibletimer: true, startTime: leg_org_ATD })
                } else {
                    console.log('not started')
                    this.setState({ timerStatus: true, startMsecs: 0, visibletimer: false, startTime: '-' })
                }
            } else {
                console.log('started')
                this.setState({ activeIndex: 1, timerStatus: true, startMsecs: 0, visibletimer: true, startTime: leg_org_ATD })
            }
        }
        
        if (ticket_info.status === "DONE") {
            if (duration_info) {
                const { lastDuration } = duration_info
                this.setState({
                    activeIndex: 2,
                    isDone: true,
                    stopMsecs: lastDuration,
                    startTime: leg_org_ATD,
                    stopTime: leg_dest_ATA
                })
                console.log('lastDuration', lastDuration)
                console.log('leg_org_ATD', leg_org_ATD)
                console.log('leg_dest_ATA', leg_dest_ATA)
            }
        }

        console.log('ticket_no', ticket_info.ticket_no)

        this.startPusher()
        messaging().onMessage(async remoteMessage => {
            let info = JSON.parse(remoteMessage.data.body)
            this.setState({
                ynd: {
                    ...this.state.ynd,
                    yard: info.ynd_info.yard,
                    dock: info.ynd_info.dock,
                    master: info.ynd_info.master,
                    org_time: info.ynd_info.yardInTime,
                    dest_time: info.ynd_info.dockInTime
                }
            })
            console.log('Cek Ombak Brayyy', JSON.stringify(remoteMessage));
        })
    }

    resumeTimer() {
        const { ticket_info } = this.props.rowData.item
        const { leg_org_ATD } = ticket_info

        if (ticket_info.status === 'STARTED') {
            const now_time = M().format("DD-MM-YYYY hh:mm:ss A")
            const calculate = generateDiferenceMilisecond(leg_org_ATD, now_time)

            console.log('leg_org_ATD', leg_org_ATD)
            console.log('now_time', now_time)
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

    updateTaskStatus = async (data, status, startTimes, finalDuration, lastDuration, duration) => {
        this.setState({ visibleLoader: true })

        let workFlow = this.state.rowData.item.workflow_info
        let durationInfo = duration ? { ...duration } : { ...payloadTimer }
        let finalCheckState = this.state.checkList
        let datas = this.props.allData[this.props.rowData.index]
        let dataPayload = JSON.parse(datas.payload)
        let final_check = { chkSealNumber: finalCheckState[0].active, chkDriver: finalCheckState[1].active, chkFleet: finalCheckState[2].active, chkDoc: finalCheckState[3].active }
        let dataPayloadStart = { ...dataPayload, ticket_info: { ...dataPayload.ticket_info, leg_org_ATD: `${M().format("DD-MM-YYYY")} ${data}` }, duration_info: durationInfo }
        let dataPayloadStop = { ...dataPayload, duration_info: { ...dataPayload.duration_info, finalDuration, lastDuration, onPause: false }, final_check, ticket_info: { ...dataPayload.ticket_info, leg_org_ATD: `${startTimes}`, leg_dest_ATA: `${M().format("DD-MM-YYYY")} ${data}` } }
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
        // console.log("payload ypdate", updateTask)
        let docStart = { ...this.state.rowData.item.ticket_info, leg_org_ATD: `${M().format("DD-MM-YYYY")} ${data}` }
        let docStop = { ...this.state.rowData.item.ticket_info, leg_org_ATD: `${M().format("DD-MM-YYYY")} ${startTimes}`, leg_dest_ATA: `${M().format("DD-MM-YYYY")} ${data}` }
        let ticket_info = status === "DONE" ? docStop : docStart
        let duration_info = { ...this.state.rowData.item.duration_info, finalDuration, lastDuration, onPause: false }
        if (resultsUpdate.data && resultsUpdate.data.status === "S") this.setState({
            rowData: {
                ...this.state.rowData,
                item: { ...this.state.rowData.item, ticket_info, duration_info }
            },
            statusTask: status,
            visibleLoader: false
        }, console.log("update berhasil", status))
        else this.setState({ visibleLoader: false })
    }

    updatePauseStatus = async (mili, duration) => {
        this.setState({ visibletimer: !this.state.visibletimer, visibleLoader: true })
        let finalCheckState = this.state.checkList
        let final_check = { chkSealNumber: finalCheckState[0].active, chkDriver: finalCheckState[1].active, chkFleet: finalCheckState[2].active, chkDoc: finalCheckState[3].active }
        let datas = this.props.allData[this.props.rowData.index]
        let dataPayload = JSON.parse(datas.payload)
        dataPayload = { ...dataPayload, final_check, ticket_info: { ...dataPayload.ticket_info, leg_org_ATD: this.state.rowData.item.ticket_info.leg_org_ATD }, duration_info: { ...dataPayload.duration_info, lastDuration: mili, onPause: !dataPayload.duration_info.onPause }, duration_info: duration ? { ...duration } : { ...payloadTimer } }
        let updateTask = {
            ...datas,
            type: datas.type && datas.type.key,
            es: {
                client: datas.es && datas.es.client && datas.es.client.clientID,
                company: datas.es && datas.es.company && datas.es.company.compID,
                plant: datas.es && datas.es.plant && datas.es.plant.plantID,
            },
            taskStatus: "STARTED",
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
        if (resultsUpdate.data && resultsUpdate.data.status === "S") this.setState({
            rowData: { ...this.state.rowData, item: { ...this.state.rowData.item, duration_info: { ...this.state.rowData.item.duration_info, lastDuration: mili, onPause: !this.state.rowData.item.duration_info.onPause } } }, visibleLoader: false
        }, console.log("update berhasil"))
        else this.setState({ visibleLoader: false }, console.log("update gagal"))
    }

    updateChecklist = async (dataChecklist) => {
        this.setState({ visibletimer: !this.state.visibletimer, visibleLoader: true })
        let finalCheckState = dataChecklist
        let final_check = { chkSealNumber: finalCheckState[0].active, chkDriver: finalCheckState[1].active, chkFleet: finalCheckState[2].active, chkDoc: finalCheckState[3].active }
        let datas = this.props.allData[this.props.rowData.index]
        let dataPayload = JSON.parse(datas.payload)
        dataPayload = { ...dataPayload, final_check }
        let updateTask = {
            ...datas,
            type: datas.type && datas.type.key,
            es: {
                client: datas.es && datas.es.client && datas.es.client.clientID,
                company: datas.es && datas.es.company && datas.es.company.compID,
                plant: datas.es && datas.es.plant && datas.es.plant.plantID,
            },
            taskStatus: "STARTED",
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
        if (resultsUpdate.data && resultsUpdate.data.status === "S") this.setState({
            checkList: dataChecklist,
            rowData: { ...this.state.rowData, item: { ...this.state.rowData.item } }, visibleLoader: false
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
        const { activeIndex, startMsecs, visibletimer, stopMsecs, startTime, stopTime, ynd, checkList, isDone, visibleLoader } = this.state
        const { onVerifiedPress, onBack, onQR, user, signver, securitySignver, driverSignver } = this.props
        const data = this.state.rowData.item
        const { driver_info, ticket_info, doc_info, fleet_info, ynd_info, duration_info } = data
        const { isDriverCorrect, isLicenseCorrect, isTruckCorrect, isKIRCorrect, isDOCorrect, isSealCorrect } = this.state
        const disableStartButton = isDriverCorrect && isLicenseCorrect && isTruckCorrect && isKIRCorrect && isDOCorrect && isSealCorrect
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
            delivery_order: doc_info.delivery.no,
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
                                    onVerifiedPress={onVerifiedPress} />
                                { this.borderBoldBottom()}
                                <TruckInfo
                                    data={fleet}
                                    onVerifiedPress={onVerifiedPress} />
                                { this.borderBoldBottom()}
                                <DocInfo
                                    data={document}
                                    onVerifiedPress={onVerifiedPress} />
                                { this.borderBoldBottom()}
                                <YardDock
                                    data={ynd}
                                    onVerifiedPress={onVerifiedPress} />
                                { this.borderBoldBottom()}
                                <SealNumber
                                    code={document.seal_no}
                                    isScanned={true}
                                    onScanner={() => onQR('SL', document.seal_no)}
                                    onPress={(data) => {
                                        this.updateTaskScanner('seal', data)
                                        this.setState({ isSealCorrect: data && data })
                                    }}
                                    onVerifiedPress={onVerifiedPress} />
                                { this.borderBoldBottom()}
                                <CheckIn
                                    disableStartButton={!disableStartButton}
                                    lastMsecs={startMsecs}
                                    driver={driverCheck}
                                    security={security}
                                    startTime={startTime}
                                    onChangeTimer={(data) => this.setState({ startMsecs: data, stopMsecs: data })}
                                    onStart={(data, mili) => this.setState({ startTime: data, stopTime: '-', startMili: mili })}
                                    onStop={(data) => this.setState({ activeIndex: (activeIndex + 1) })}
                                    updateStatus={(data, status) => {
                                        this.updateTaskStatus(data, status)
                                        updateTrucks(ticket_info.freight_contract_id, this.props, 'YND', this.props.auth)
                                    }}
                                    btnTitle={'PROCEED'}
                                    onVerifiedPress={onVerifiedPress} />
                            </View>
                        )}
                        {(activeIndex === 1) && (
                            <GoodIssueInfo
                                title={'Yard and Dock'}
                                number={ticket_info.ticket_no}
                                reference={ticket_info.ticket_ref_no}
                                delivery_order={document.delivery_order}
                                checkList={checkList}
                                onChange={(data) => {
                                    this.updateChecklist(data)
                                }}
                                onVerifiedPress={onVerifiedPress} />
                        )}
                        {(activeIndex === 2 || activeIndex === 1) && (
                            <CheckOut
                                isDone={isDone}
                                disableButton={signver}
                                securitySignver={securitySignver}
                                driverSignver={driverSignver}
                                code={ticket_info.ticket_no}
                                checkList={checkList}
                                lastMsecs={stopMsecs}
                                driver={driverCheck}
                                security={security}
                                startMili={stopMsecs} //duration_info.lastDuration
                                startTime={startTime}
                                onChangeTimer={(data) => this.setState({ stopMsecs: data })}
                                onStop={(data) => this.setState({ stopTime: data, activeIndex: (activeIndex + 1) })}
                                btnTitle={'START ANOTHER TASK'}
                                btnPress={() => onBack()}
                                YND={true}
                                btnPause={!visibletimer}
                                updatePauseStatus={(mili, msecs, timer) => {
                                    const duration = {
                                        ...payloadTimer,
                                        finalDuration: timer,
                                        lastDuration: mili,
                                        onPause: true
                                    }
                                    this.updatePauseStatus(mili, duration)
                                }}
                                updateStatus={(data, status, startTimes, finalDuration, lastDuration) => {
                                    this.updateTaskStatus(data, status, startTime, finalDuration, lastDuration)
                                }}
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

export default connect(mapStateToProps, null)(CardYND)