import React from 'react'
import { View, ScrollView } from 'react-native'
import Multistep from '../Components/Multistep'
import { DriverInfo, TruckInfo, DocInfo, SealNumber, YardDock, CheckIn, CheckOut } from './gatesecurity'
import NavbarMenu from '../Components/NavbarMenu'
import CardMaterialCheckSimple from '../Components/CardMaterialCheck'
import { ReviewInfo, MtoTimerInfo } from './material/mto'
import messaging from '@react-native-firebase/messaging'
import M from 'moment'
import Api from '../../Services/Api'
import { connect } from 'react-redux'
import DialogQrValidator from './DialogQrValidator'
import { updateTrucks } from '../../Utils/'

var time
var payloadTimer = {
    "finalDuration": "NONE",
    "lastDuration": 0,
    "onPause": true
}

class CardGoodIssue extends React.Component {
    constructor(props) {
        super(props)
        let data = props.rowData.item
        const { rowData } = props
        const { doc_info } = rowData.item
        this.state = {
            isDone: false,
            activeIndex: 0,
            startMsecs: 0,
            stopMsecs: 0,
            startTime: '-',
            stopTime: '-',
            isInboundDev: true,
            timerStatus: false,
            visibletimer: false,
            visibleButtonLoader: false,
            visibleLoader: false,
            isDriverCorrect: true,
            isLicenseCorrect: true,
            isTruckCorrect: true,
            isKIRCorrect: true,
            isDOCorrect: true,
            isSealCorrect: false,
            isTimerOn: false,
            rowData: props.rowData,
            materials: doc_info.delivery.material,
            ynd: {
                id: data.ynd_info.id,
                yard: data.ynd_info.yard,
                dock: data.ynd_info.dock,
                master: data.ynd_info.master,
                master_image_path: data.ynd_info.ynd_img_path,
                origin: data.ynd_info.es,
                org_etd: '',
                org_time: data.doc_info.delivery.leg_org_ETD,
                dest: data.ynd_info.es,
                dest_eta: '',
                dest_time: data.doc_info.delivery.leg_dest_ETA
            }
        }
    }

    static defaultProps = {
        onVerifiedPress: () => null
    }

    componentDidMount() {
        const {duration_info, ticket_info, doc_info, workflow_info} = this.props.rowData.item
        const {leg_dest_ETA, leg_org_ETD} = doc_info.delivery
        const etdTime = leg_org_ETD.split(' ')
        const newStartTime = etdTime[1] + ' ' + etdTime[2]
        if (ticket_info.status === "STARTED") {
            if (duration_info) {
                const {lastDuration, onPause} = duration_info
                if (onPause) {
                    console.log('resume')
                    this.setState({ 
                        activeIndex: 1, 
                        timerStatus: true, 
                        startMsecs: lastDuration, 
                        visibletimer: true,
                        startTime: newStartTime,
                        isTimerOn: true
                    })
                } else {
                    console.log('not started')
                    this.setState({ 
                        timerStatus: true, 
                        startMsecs: lastDuration, 
                        visibletimer: false 
                    })
                }
            } else {
                console.log('started')
                this.setState({ 
                    activeIndex: 1, 
                    timerStatus: true, 
                    startMsecs: 0, 
                    visibletimer: true,
                    startTime: newStartTime,
                    isTimerOn: true
                })
            }
        }
        if (ticket_info.status === "DONE") {
            if (duration_info) {
                const {lastDuration} = duration_info
                this.setState({ 
                    activeIndex: 3, 
                    isDone: true, 
                    stopMsecs: lastDuration, 
                    stopTime: leg_dest_ETA,
                    startTime: leg_org_ETD
                })
            }
        }
        console.log('ticket_info', ticket_info.ticket_no)

        messaging().onMessage(async remoteMessage => {
            if (remoteMessage.data.title == "YND Information GI") {
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
        })
    }

    borderBoldBottom = () => {
        return (
            <View style={{ borderBottomColor: '#f0f0f0', borderBottomWidth: 10, marginTop: 10 }} />
        )
    }

    updateMaterial = async (material, status) => {
        this.setState({visibleLoader: true})

        let newMaterials = []
        let datas = this.props.allData[this.props.rowData.index]
        let dataPayload = JSON.parse(datas.payload)
        let materials = this.state.materials

        materials && materials.map((dt) => {
            let isConfirmed = (dt.isConfirmed) ? true : (dt.objectID === material.objectID) ? (status === 'good') ? true : false : false
            newMaterials.push({
                ...dt,
                isConfirmed: isConfirmed
            })
            return null
        })

        let dataPayloadMaterial = {
            ...dataPayload,
            doc_info: {
                ...dataPayload.doc_info,
                delivery: {
                    ...dataPayload.doc_info.delivery,
                    material: newMaterials
                }
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
            taskStatus: 'STARTED',
            sourceID: datas.sourceID ? datas.sourceID : "",
            orderBy: datas.orderBy ? datas.orderBy.userID : "",
            executeBy: datas.executeBy ? datas.executeBy.userID : "",
            payload: JSON.stringify(dataPayloadMaterial),
            baseCreational: {
                ...datas.baseCreational,
                "modifiedBy": this.props.auth.user.data.userID,
                "modifiedDate": M().format("DD-MM-YYYY HH:mm:ss")
            }
        }
        let resultsUpdate = await Api.create().updateHumanTaskList(updateTask)

        if (resultsUpdate.data && resultsUpdate.data.status === "S") this.setState({
            materials: newMaterials,
            visibleLoader: false
        }, console.log("update berhasil"))
        else this.setState({visibleLoader: false})
    }

    updateTaskStatus = async (data, status, startTimes, duration) => {
        this.setState({visibleLoader: true})

        let workFlow = this.state.rowData.item.workflow_info
        let durationInfo = duration ? { ...duration } : { ...payloadTimer }
        let materials = this.state.materials
        let datas = this.props.allData[this.props.rowData.index]
        let dataPayload = JSON.parse(datas.payload)
        let dataPayloadStart = { ...dataPayload, doc_info: { ...dataPayload.doc_info, delivery: { ...dataPayload.doc_info.delivery, material: materials, leg_org_ETD: `${M().format("DD-MM-YYYY")} ${data}` } }, duration_info: durationInfo }
        let dataPayloadStop = { ...dataPayload, doc_info: { ...dataPayload.doc_info, delivery: { ...dataPayload.doc_info.delivery, material: materials, leg_org_ETD: this.state.rowData.item.doc_info.delivery.leg_org_ETD, leg_dest_ETA: `${M().format("DD-MM-YYYY")} ${data}` } }, duration_info: durationInfo }
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
        console.log("payload update", dataPayload)
        let resultsUpdate = await Api.create().updateHumanTaskList(updateTask)
        let docStart = { ...this.state.rowData.item.doc_info, delivery: { ...this.state.rowData.item.doc_info.delivery, material: materials, leg_org_ETD: `${M().format("DD-MM-YYYY")} ${data}` } }
        let docStop = { ...this.state.rowData.item.doc_info, delivery: { ...this.state.rowData.item.doc_info.delivery, material: materials, leg_org_ETD: this.state.rowData.item.doc_info.delivery.leg_org_ETD, leg_dest_ETA: `${M().format("DD-MM-YYYY")} ${data}` } }
        let doc_info = status === "DONE" ? docStop : docStart
        if (resultsUpdate.data && resultsUpdate.data.status === "S") this.setState({
            rowData: { ...this.state.rowData, 
            item: { ...this.state.rowData.item, doc_info } },
            visibleLoader: false
        }, console.log("update berhasil"))
        else this.setState({visibleLoader: false})
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
        const { activeIndex, startMsecs, stopMsecs, startTime, stopTime, timerStatus, visibletimer, visibleButtonLoader, ynd, isDone, materials, visibleLoader, isTimerOn } = this.state
        const { onVerifiedPress, onBack, onScanner, onQR, user, signver, securitySignver, driverSignver } = this.props
        const data = this.state.rowData.item
        const { driver_info, ticket_info, doc_info, fleet_info, ynd_info } = data
        const { isDriverCorrect, isLicenseCorrect, isTruckCorrect, isKIRCorrect, isDOCorrect, isSealCorrect } = this.state
        const disableStartButton = isDriverCorrect && isLicenseCorrect && isTruckCorrect && isKIRCorrect && isDOCorrect && isSealCorrect
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
            outbound_delivery: doc_info.delivery.od_no,
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
            material: materials,
            periority: ticket_info.ticket_priority,
            note: ticket_info.ticket_note
        }
        const dataTab = [
            { id: '1', title: '1', active: false },
            { id: '2', title: '2', active: false },
            { id: '3', title: '3', active: false }
        ]
        const btnTitle = [
            'Proceed',
            'Done & Review',
            'Done',
            'Start Another Task'
        ]
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
        const driverCheck = {
            id: user && user.id,
            image: '',
            name: user && user.name,
            cargo: user && user.company
        }
        const dummyMaterials = []
        const warehouse = [
            {
                id: 1,
                title: 'Dock',
                subtitle: document.origin,
                description: '-'
            },
            {
                id: 2,
                title: 'Transporter/Carrier',
                subtitle: document.dest,
                description: '-'
            }
        ]

        document.material && document.material.map((dt) => {
            // console.log('dt', dt)
            dummyMaterials.push({
                objectID: dt.objectID,
                isConfirmed: dt.isConfirmed ? dt.isConfirmed : false,
                id: dt.materialID,
                reason: 'GOOD',
                kimap: dt.kimap,
                hu_no: dt.hu_no,
                hu_cap: dt.hu_cap,
                name: dt.name,
                description: dt.hu_no + ' | ' + dt.hu_cap + ' ' + dt.uom,
                note: dt.material_desc,
                from: dt.from_z_lc ? dt.from_z_lc : '-',
                to: dt.to_d ? dt.to_d : '-',
                warehouse: [
                    {
                        ...warehouse[0],
                        id: dt.from_z ? dt.from_z : '-',
                        subtitle: dt.from_z_lc ? dt.from_z_lc : '-',
                        description: dt.from_z ? dt.from_z : '-'
                    },
                    {
                        ...warehouse[1],
                        id: dt.to_d ? dt.to_d : '-',
                        description: dt.to_d ? dt.to_d : '-'
                    }
                ],
                detail: { ...dt },
                document: { ...document },
                driver: { ...driver },
                disableReason: true,
                title: 'Good Issue'
            })
            return null
        })
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <View style={{ backgroundColor: '#fff', height: signver ? 40 : 95, zIndex: 1000 }}>
                    <NavbarMenu
                        onBack={() => onBack()}
                        title={'Ticket#' + (ticket_info && ticket_info.ticket_no)} />
                    <Multistep
                        disable={signver}
                        data={dataTab}
                        disableColor={false}
                        disableClick={isDone}
                        activeIndex={activeIndex}
                        onChange={(index) => {
                            this.setState({ activeIndex: index })
                            if (index === 0) {
                                this.setState({ timerStatus: false, visibletimer: false })
                            }
                        }} />
                    {visibletimer && (
                        <View style={{
                            position: 'absolute',
                            top: 3,
                            right: 0,
                        }}>
                            <MtoTimerInfo
                                color={'#fff'}
                                disableClick={isDone}
                                timerStatus={timerStatus}
                                lastMsecs={startMsecs}
                                onChangeTimer={(data) => this.setState({ stopMsecs: data })}
                                onStart={() => this.setState({isTimerOn: true})}
                                onStop={(isPlay, msecs, timer) => {
                                    const duration = {
                                        ...payloadTimer,
                                        finalDuration: timer,
                                        lastDuration: msecs,
                                        onPause: isPlay
                                    }
                                    this.setState({isTimerOn: false})
                                    this.updateTaskStatus(startTime, "STARTED", timer, duration)
                                }}
                            />
                        </View>
                    )}
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
                                    goodIssue={true}
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
                                    onChangeTimer={(data) => this.setState({ startMsecs: data, stopMsecs: data })}
                                    onStart={(data) => this.setState({ startTime: data, stopTime: '-' })}
                                    onStop={(data) => {
                                        this.setState({
                                            activeIndex: (activeIndex + 1),
                                            visibletimer: true,
                                            timerStatus: true
                                        })
                                    }}
                                    updateStatus={(data, status) => {
                                        this.updateTaskStatus(data, status)
                                        updateTrucks(ticket_info.freight_contract_id, this.props, 'GI', this.props.auth)
                                    }}
                                    btnTitle={btnTitle[activeIndex]}
                                    onVerifiedPress={onVerifiedPress} />
                            </View>
                        )}
                        {(activeIndex === 1) && (
                            <CardMaterialCheckSimple
                                ml_number={ticket_info.ticket_ref_no}
                                do_number={document.delivery_order}
                                wh_name={document.dest}
                                warehouse={warehouse}
                                isRouteEnable={isTimerOn} 
                                data={dummyMaterials}
                                btnTitle={visibleButtonLoader ? 'Please wait..' : btnTitle[activeIndex]}
                                onChange={(material, status) => {
                                    this.updateMaterial(material, status)
                                }}
                                onScanner={(type, material) => onScanner(type, material)}
                                onPress={() => {
                                    this.setState({
                                        visibleButtonLoader: true,
                                        timerStatus: false
                                    })
                                    time = setTimeout(() => {
                                        this.setState({
                                            activeIndex: (activeIndex + 1),
                                            visibleButtonLoader: false,
                                            visibletimer: false
                                        })
                                        clearTimeout(time)
                                    }, 1000)
                                }}
                                onVerifiedPress={onVerifiedPress} />
                        )}
                        {(activeIndex === 2) && (
                            <CardMaterialCheckSimple
                                ml_number={ticket_info.ticket_ref_no}
                                do_number={document.delivery_order}
                                wh_name={document.dest}
                                disableButton={true}
                                isRouteEnable={false}
                                data={dummyMaterials}
                                onPress={() => this.setState({ activeIndex: (activeIndex + 1) })}
                                onVerifiedPress={onVerifiedPress} />
                        )}
                        {(activeIndex === 3) && (
                            <ReviewInfo 
                                title={''} 
                                type={''}
                                reference={''}
                                delivery_order={''}
                                disableReview={true}
                                material={dummyMaterials}
                                onVerifiedPress={onVerifiedPress} />
                        )}
                        {(activeIndex === 3 || activeIndex === 2) && (
                            <CheckOut
                                isDone={isDone}
                                disableButton={signver}
                                securitySignver={securitySignver}
                                driverSignver={driverSignver}
                                code={ticket_info.ticket_no}
                                lastMsecs={stopMsecs}
                                driver={driverCheck}
                                security={security}
                                onChangeTimer={(data) => this.setState({ stopMsecs: data })}
                                startTime={startTime}
                                onStop={(data) => this.setState({ stopTime: data, activeIndex: (activeIndex + 1) })}
                                btnTitle={'CONFIRM & DONE'}
                                btnPress={() => onBack()}
                                updateStatus={(data, status, startTimes, count, msecs) => {
                                    const duration = {
                                        ...payloadTimer,
                                        finalDuration: count,
                                        lastDuration: msecs,
                                        onPause: false
                                    }
                                    this.updateTaskStatus(data, status, startTime, duration)
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

export default connect(mapStateToProps, null)(CardGoodIssue)