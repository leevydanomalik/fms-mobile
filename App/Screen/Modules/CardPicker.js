import React from 'react'
import { View, ScrollView } from 'react-native'
import NavbarMenu from '../Components/NavbarMenu'
import Multistep from '../Components/Multistep'
import CardMaterialCheck from '../Components/CardMaterialCheck'
import { CheckIn, CheckOut } from './gatesecurity'
import { MtoTimerInfo, ReviewInfo } from './material/mto'
import M from 'moment'
import Api from '../../Services/Api'
import { connect } from 'react-redux'
import DialogQrValidator from './DialogQrValidator'

var time
var payloadTimer = {
    "finalDuration": "NONE",
    "lastDuration": 0,
    "onPause": true
}

class CardInfoB extends React.Component {
    constructor(props) {
        super(props)
        const { rowData } = props
        const { doc_info } = rowData.item
        this.state = {
            isDone: false,
            activeIndex: 0,
            startMsecs: 0,
            stopMsecs: 0,
            startTime: '-',
            stopTime: '-',
            timerStatus: false,
            visibletimer: false,
            visibleButtonLoader: false,
            visibleLoader: false,
            isTimerOn: false,
            rowData: props.rowData,
            materials: doc_info.delivery.material
        }
    }

    static defaultProps = {
        onVerifiedPress: () => null
    }

    componentDidMount() {
        const {duration_info, ticket_info, doc_info} = this.props.rowData.item
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
        console.log('ticket_info', ticket_info.status)
        console.log('duration_info', duration_info)
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

        let durationInfo = duration ? { ...duration } : { ...payloadTimer }
        let materials = this.state.materials
        let datas = this.props.allData[this.props.rowData.index]
        let dataPayload = JSON.parse(datas.payload)
        let dataPayloadStart = { ...dataPayload, doc_info: { ...dataPayload.doc_info, delivery: { ...dataPayload.doc_info.delivery, material: materials, leg_org_ETD: `${M().format("DD-MM-YYYY")} ${data}` } }, duration_info: durationInfo }
        let dataPayloadStop = { ...dataPayload, doc_info: { ...dataPayload.doc_info, delivery: { ...dataPayload.doc_info.delivery, material: materials, leg_org_ETD: `${M().format("DD-MM-YYYY")} ${startTimes}`, leg_dest_ETA: `${M().format("DD-MM-YYYY")} ${data}` } }, duration_info: durationInfo }
        dataPayload = status === "DONE" ? dataPayloadStop : dataPayloadStart
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
        let docStart = { ...this.state.rowData.item.doc_info, delivery: { ...this.state.rowData.item.doc_info.delivery, material: materials, leg_org_ETD: `${M().format("DD-MM-YYYY")} ${data}` } }
        let docStop = { ...this.state.rowData.item.doc_info, delivery: { ...this.state.rowData.item.doc_info.delivery, material: materials, leg_org_ETD: `${M().format("DD-MM-YYYY")} ${startTimes}`, leg_dest_ETA: `${M().format("DD-MM-YYYY")} ${data}` } }
        let doc_info = status === "DONE" ? docStop : docStart
        if (resultsUpdate.data && resultsUpdate.data.status === "S") this.setState({
            rowData: { ...this.state.rowData, item: { ...this.state.rowData.item, doc_info } },
            visibleLoader: false
        }, console.log("update berhasil"))
        else this.setState({visibleLoader: false})
    }

    render() {
        const { onVerifiedPress, onBack, onScanner, user, signver, securitySignver, driverSignver } = this.props
        const { activeIndex, startMsecs, stopMsecs, startTime, stopTime, timerStatus, visibletimer, visibleButtonLoader, isDone, materials, visibleLoader, isTimerOn } = this.state
        const data = this.state.rowData.item
        const { ticket_info, doc_info, ynd_info } = data
        const document = {
            type: doc_info.type.replace(/[_]/g, ' '),
            reference: ticket_info.source_id,
            delivery_order: doc_info.delivery.no,
            pdt: doc_info.delivery.pdt,
            seal_no: doc_info.delivery.seal_no,
            material: materials,
            origin: doc_info.delivery.leg_origin,
            org_etd: doc_info.delivery.loading_date,
            dest: doc_info.delivery.leg_dest,
            dest_eta: doc_info.delivery.delivery_date,
            note: ticket_info.ticket_note
        }
        const dataTab = [
            {id: '1', title: '1', active: false},
            {id: '2', title: '2', active: false},
            {id: '3', title: '3', active: false},
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
        const driver = {
            id: user && user.id,
            image: '',
            name: user && user.name,
            cargo: user && user.company
        }
        const dummyMaterials = []
        const warehouse = [
            {
                id: 1, 
                title: 'Origin BQ Location', 
                subtitle: document.origin, 
                description: '-'
            },
            {
                id: 2, 
                title: 'Destination Tote/HU', 
                subtitle: document.dest, 
                description: '-'
            },
            {
                id: 3, 
                title: 'Destination Zone VX', 
                subtitle: document.dest, 
                description: '-'
            }
        ]

        document.material && document.material.map((dt) => {
            console.log('-----')
            console.log('isConfirmed', dt.isConfirmed)
            console.log('objectID', dt.objectID)
            dummyMaterials.push({
                objectID: dt.objectID,
                isConfirmed: dt.isConfirmed ? dt.isConfirmed : false,
                kimap: dt.kimap,
                hu_no: dt.hu_no,
                hu_cap: dt.hu_cap,
                name: dt.name, 
                description: dt.hu_no + ' | ' + dt.hu_cap + ' ' + dt.uom, 
                note: dt.material_desc,
                from: dt.binloccode ? dt.binloccode : '-', 
                to: dt.from_tote ? dt.from_tote : '-',
                warehouse: [
                    {
                        ...warehouse[0],
                        id: dt.binloc ? dt.binloc : '-',
                        subtitle: dt.binloccode ? dt.binloccode : '-',
                        description: dt.binloc ? dt.binloc : '-'
                    },
                    {
                        ...warehouse[1],
                        id: dt.from_tote ? dt.from_tote : '-',
                        description: dt.from_tote ? dt.from_tote : '-'
                    },
                    {
                        ...warehouse[2],
                        id: dt.to_zone ? dt.to_zone : '-',
                        subtitle: dt.to_zone_lc ? dt.to_zone_lc : '-',
                        description: dt.to_zone ? dt.to_zone : '-'
                    }
                ],
                detail: {...dt},
                document: {...document},
                driver: {...driver},
                title: 'Picking'
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
                        disableClick={isDone}
                        activeIndex={activeIndex} 
                        onChange={(index) => {
                            this.setState({activeIndex: index})
                            if (index === 0) {
                                this.setState({timerStatus: false, visibletimer: false})
                            }
                        }} />
                    {visibletimer && (
                        <View style={{
                            position: 'absolute',
                            top: 3,
                            right: 0
                        }}>
                            <MtoTimerInfo 
                                color={'#fff'}
                                timerStatus={timerStatus}
                                lastMsecs={startMsecs}
                                onChangeTimer={(data) => this.setState({stopMsecs: data})}
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
                    <View style={{ marginTop: -15 }}>
                        {(activeIndex === 0) && (
                            <CardMaterialCheck 
                                ml_number={ticket_info.ticket_ref_no}
                                do_number={document.delivery_order}
                                wh_name={document.dest}
                                isRouteEnable={false} 
                                data={dummyMaterials} 
                                onPress={() => this.setState({activeIndex: (activeIndex + 1)})}
                                onVerifiedPress={onVerifiedPress} />
                        )}
                        {(activeIndex === 0) && (
                            <CheckIn 
                                lastMsecs={startMsecs} 
                                driver={driver}
                                security={security}
                                onChangeTimer={(data) => this.setState({startMsecs: data})} 
                                onStart={(data) => this.setState({startTime: data, stopTime: '-'})}
                                onStop={(data) => {
                                    this.setState({
                                        activeIndex: (activeIndex + 1), 
                                        visibletimer: true,
                                        timerStatus: true
                                    })
                                }}
                                updateStatus={(data, status) => this.updateTaskStatus(data, status)}
                                btnTitle={btnTitle[activeIndex]}
                                onVerifiedPress={onVerifiedPress}
                            />
                        )}
                        {(activeIndex === 1) && (
                            <CardMaterialCheck 
                                ml_number={ticket_info.ticket_ref_no}
                                do_number={document.delivery_order}
                                wh_name={document.dest}
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
                        {(activeIndex === 2 || activeIndex === 3) && (
                            <ReviewInfo 
                                title={'Review Picking'}
                                type={document.type}
                                reference={ticket_info.ticket_ref_no}
                                delivery_order={document.delivery_order}
                                disableReview={activeIndex === 3 ? true : false}
                                material={dummyMaterials}
                                onVerifiedPress={onVerifiedPress} />
                        )}
                        {(activeIndex === 2 || activeIndex === 3) && (
                            <CheckOut 
                                isDone={isDone}
                                disableButton={signver}
                                securitySignver={securitySignver}
                                driverSignver={driverSignver}
                                code={ticket_info.ticket_no}
                                lastMsecs={stopMsecs} 
                                driver={driver}
                                security={security}
                                startTime={startTime}
                                onChangeTimer={(data) => this.setState({stopMsecs: data})} 
                                onStop={(data) => this.setState({stopTime: data, activeIndex: (activeIndex + 1)})}
                                btnTitle={btnTitle[activeIndex]}
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

export default connect(mapStateToProps, null)(CardInfoB)