import React, { Component } from 'react'
import {View, ScrollView} from 'react-native'
import {connect} from "react-redux"
import Multistep from '../Components/Multistep'
import { CheckIn, CheckOut } from './gatesecurity'
import { ReviewInfo, MtoTimerInfo } from './material/mto'
import { CycleInfo } from './cyclecount'
import NavbarMenu from '../Components/NavbarMenu'
import CardMaterialCheckCount from '../Components/CardMaterialCheckCount'
import M from 'moment'
import Api from '../../Services/Api'
import DialogQrValidator from './DialogQrValidator'

var time
var payloadTimer = {
    "finalDuration": "NONE",
    "lastDuration": 0,
    "onPause": true
}

var payloadMaterial = {
    "msoID": "",
    "msoStockOpnameID": "",
    "msoQtyPhysic": 0,
    "msoQtySAP": 0,
    "msoQtyWMS": 0,
    "msoUoM": "",
    "msoLocation": {
        "cesClientID": "",
        "cesClientName": null,
        "cesCompanyID": "",
        "cesCompanyName": null,
        "cesPlantID": "",
        "cesPlantName": null,
        "cesStorageBinID": "",
        "cesStorageBinName": null,
        "cesStorageBinQuantID": "",
        "cesStorageLocationID": "",
        "cesStorageLocationName": null,
        "cesStorageSectionID": "",
        "cesStorageSectionName": null,
        "cesStorageTypeID": "",
        "cesStorageTypeName": null,
        "cesWarehouseID": "",
        "cesWarehouseName": null,
        "cesStorageRowID": "",
        "cesStorageRowName": null
    },
    "msoMaterial": {
        "material": "",
        "materialCategory": "",
        "materialSegment": "",
        "materialSeries": "",
        "materialGroup": "",
        "materialType": ""
    },
    "msoNote": "",
    "msoTag": ""
}

class CardCycleCount extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activeIndex: 0,
            startMsecs: 0,
            stopMsecs: 0,
            startTime: '-',
            stopTime: '-',
            timerStatus: false,
            visibletimer: false,
            visibleButtonLoader: false,
            visibleMaterialLoader: false,
            visibleLoader: false,
            countMaterial: 0,
            materials: [],
            mtoMaterials: [],
            search: '',
            limit: 10,
            offset: 0
        }
    }

    static defaultProps = {
        onVerifiedPress: () => null
    }

    componentDidMount() {
        const data = this.props.rowData.item
        const { ticket_info } = data
        const soID = ticket_info.ticket_ref_no
        this.getTotalMaterial(soID)
        this.setState({timerStatus: false, visibletimer: false})
    }

    getTotalMaterial = async (soID) => {
        this.setState({visibleMaterialLoader: true})

        const {limit, search} = this.state
        const payload = {
            "params": {
                "soID": soID,
                "search": search
            }
        }
        const rest = await Api.create().getMaterialCountSOItemComplete(payload)

        if (rest.data.status === 'S') {
            const count = rest.data.data
            this.setState({countMaterial: count, offset: 0}, () => this.getMaterial(soID, limit, 0, search))
        } else {
            this.setState({visibleMaterialLoader: false})
        }
    }

    getMaterial = async (soID, limit, offset, search = '') => {
        this.setState({visibleMaterialLoader: true})

        const payload = {
            "limit": limit,
            "offset": offset,
            "params": {
                "soID": soID,
                "search": search
            }
        }
        const res = await Api.create().getMaterialSOItemComplete(payload)

        console.log('getMaterial', res)

        if (res.data.status === 'S') {
            const data = res.data.data

            let newMaterials = data && data.map((dt) => {
                const {msoID, msoMaterial, msoLocation, msoUoM, msoQtySAP, msoQtyWMS, msoQtyPhysic} = dt
                const {material} = msoMaterial
                return {
                    id: msoID,
                    kimap: material.materialKimap,
                    name: material.materialName,
                    material_desc: material.materialDescription,
                    hu_cap: material.materialLOBSConst,
                    hu_no: material.materialTypeID,
                    uom: msoUoM.value,
                    sap: msoQtySAP.toString(),
                    wms: msoQtyWMS.toString(),
                    physic: msoQtyPhysic.toString(),
                    binloc: msoLocation.cesStorageBinQuantID.binQuantLocCode,
                    detail: dt
                }
            })

            this.setState({materials: newMaterials, visibleMaterialLoader: false, limit, offset})
        } else {
            this.setState({visibleMaterialLoader: false})
        }
    }

    setData = () => {
        const {data} = this.props
        let materials = []
        let datas = data.item.payload ? JSON.parse(data.item.payload) : null
        let mtoMaterials = datas && datas.mtoMaterials ? datas.mtoMaterials : []
        mtoMaterials && mtoMaterials.map((value) => {
            return materials.push({
                ...value,
                quantityPick: value.qty
            })
        })
        this.setState({materials, mtoMaterials})
    }

    updateMaterialPhysic = async (status, physic, material) => {
        this.setState({visibleLoader: true})

        let payload = {}
        let md = material.detail
        payload = {
            ...payloadMaterial,
            msoID: md.msoID,
            msoStockOpnameID: md.msoStockOpnameID,
            msoQtyPhysic: physic,
            msoQtySAP: md.msoQtySAP,
            msoQtyWMS: md.msoQtyWMS,
            msoUoM: md.msoUoM.key,
            msoLocation: {
                ...payloadMaterial.msoLocation,
                cesClientID: md.msoLocation.cesClientID,
                cesCompanyID: md.msoLocation.cesCompanyID,
                cesPlantID: md.msoLocation.cesPlantID,
                cesStorageBinID: md.msoLocation.cesStorageBinID,
                cesStorageBinQuantID: md.msoLocation.cesStorageBinQuantID.binQuantID,
                cesStorageLocationID: md.msoLocation.cesStorageLocationID,
                cesStorageSectionID: md.msoLocation.cesStorageSectionID,
                cesStorageTypeID: md.msoLocation.cesStorageTypeID,
                cesWarehouseID: md.msoLocation.cesWarehouseID,
                cesStorageRowID: md.msoLocation.cesStorageRowID,
            },
            msoMaterial: {
                ...payloadMaterial.msoMaterial,
                material: md.msoMaterial.material.materialID,
                materialCategory: md.msoMaterial.materialCategory.mcID,
                materialSegment: md.msoMaterial.materialSegment.msID,
                materialSeries: md.msoMaterial.materialSeries.msrID,
                materialGroup: md.msoMaterial.materialGroup.mgID,
                materialType: md.msoMaterial.materialType.mtID
            },
            msoNote: md.msoNote,
            msoTag: md.msoTag
        }

        let rest = await Api.create().updateCycleCountMaterial(payload)
        if (rest.data && rest.data.status === 'S') {
            const {materials} = this.state
            const newMaterials = materials && materials.map((dt) => {
                let newPhysic = (dt.id === material.id) ? physic : dt.physic
                let isConfirmed = (dt.isConfirmed) ? true : (dt.id === material.id) ? (status === 'good') ? true : false : false
                return {
                    ...dt,
                    physic: newPhysic,
                    isConfirmed: isConfirmed
                }
            })

            this.setState({materials: newMaterials, visibleLoader: false})
        } else {
            this.setState({visibleLoader: true})
        }
    }

    updateTaskStatus = async (data, status, startTimes, duration) => {
        console.log('data', data)

        // this.setState({visibleLoader: true})
        // let durationInfo = duration ? { ...duration } : { ...payloadTimer }
        // let materials = this.state.materials
        // let datas = this.props.allData[this.props.rowData.index]
        // let dataPayload = JSON.parse(datas.payload)
        // let dataPayloadStart = { ...dataPayload, doc_info: { ...dataPayload.doc_info, delivery: { ...dataPayload.doc_info.delivery, material: materials, leg_org_ETD: `${M().format("DD-MM-YYYY")} ${data}` } }, duration_info: durationInfo }
        // let dataPayloadStop = { ...dataPayload, doc_info: { ...dataPayload.doc_info, delivery: { ...dataPayload.doc_info.delivery, material: materials, leg_org_ETD: `${M().format("DD-MM-YYYY")} ${startTimes}`, leg_dest_ETA: `${M().format("DD-MM-YYYY")} ${data}` } }, duration_info: durationInfo }
        // dataPayload = status === "DONE" ? dataPayloadStop : dataPayloadStart
        // let updateTask = {
        //     ...datas,
        //     type: datas.type && datas.type.key,
        //     es: {
        //         client: datas.es && datas.es.client && datas.es.client.clientID,
        //         company: datas.es && datas.es.company && datas.es.company.compID,
        //         plant: datas.es && datas.es.plant && datas.es.plant.plantID,
        //     },
        //     taskStatus: status,
        //     sourceID: datas.sourceID ? datas.sourceID : "",
        //     orderBy: datas.orderBy ? datas.orderBy.userID : "",
        //     executeBy: datas.executeBy ? datas.executeBy.userID : "",
        //     payload: JSON.stringify(dataPayload),
        //     baseCreational: {
        //         ...datas.baseCreational,
        //         "modifiedBy": this.props.auth.user.data.userID,
        //         "modifiedDate": M().format("DD-MM-YYYY HH:mm:ss")
        //     }
        // }
        // let resultsUpdate = await Api.create().updateHumanTaskList(updateTask)
        // console.log("payload ypdate", updateTask)
        // let docStart = { ...this.state.rowData.item.doc_info, delivery: { ...this.state.rowData.item.doc_info.delivery, material: materials, leg_org_ETD: `${M().format("DD-MM-YYYY")} ${data}` } }
        // let docStop = { ...this.state.rowData.item.doc_info, delivery: { ...this.state.rowData.item.doc_info.delivery, material: materials, leg_org_ETD: `${M().format("DD-MM-YYYY")} ${startTimes}`, leg_dest_ETA: `${M().format("DD-MM-YYYY")} ${data}` } }
        // let doc_info = status === "DONE" ? docStop : docStart
        // if (resultsUpdate.data && resultsUpdate.data.status === "S") this.setState({
        //     rowData: { ...this.state.rowData, item: { ...this.state.rowData.item, doc_info } },
        //     visibleLoader: false
        // }, console.log("update berhasil"))
        // else this.setState({visibleLoader: false})
    }

    render() {
        const { onVerifiedPress, onBack, onScanner, onQR, user } = this.props
        const { activeIndex, startMsecs, stopMsecs, startTime, stopTime, timerStatus, visibletimer, visibleButtonLoader, visibleLoader, visibleMaterialLoader, countMaterial, materials, search, limit, offset } = this.state
        const data = this.props.rowData.item
        const { driver_info, ticket_info, doc_info, ynd_info } = data
        const driverCheck = {
            id: user && user.id,
            image: '',
            name: user && user.name,
            cargo: user && user.company
        }
        // console.log('doc_info', doc_info.delivery)
        const document = {
            wh: doc_info.delivery.doc_wh,
            period_from: doc_info.delivery.doc_period_from,
            period_to: doc_info.delivery.doc_period_to,
            type: doc_info.type.replace(/[_]/g, ' '),
            reference: ticket_info.leg_cargo_ref,
            delivery_order: doc_info.delivery.no,
            pdt: doc_info.delivery.pdt,
            seal_no: doc_info.delivery.seal_no,
            material: doc_info.delivery.material,
            origin: doc_info.delivery.leg_origin,
            org_etd: doc_info.delivery.leg_org_ETD,
            dest: doc_info.delivery.leg_dest,
            dest_eta: doc_info.delivery.leg_dest_ETA,
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
                warehouse: document.origin, 
                time: startTime, 
                worker: user && user.name, 
                image: ynd_info.ynd_img_path
            },
            {
                id: user && user.id, 
                title: 'Check Out', 
                warehouse: document.dest, 
                time: stopTime, 
                worker: user && user.name, 
                image: ynd_info.ynd_img_path
            }
        ]
        const driver = {
            id: driver_info.id,
            image: driver_info.driver_img_path,
            name: driver_info.name,
            cargo: ticket_info.driver_company
        }
        const dummyMaterials = []
        const warehouse = [
            {
                id: 1, 
                title: 'Packing List', 
                subtitle: document.origin, 
                description: '-'
            },
            {
                id: 2, 
                title: 'Bin Quant Location', 
                subtitle: document.origin, 
                description: '-'
            }
        ]

        materials && materials.map((dt) => {
            dummyMaterials.push({
                id: dt.id,
                isConfirmed: dt.isConfirmed ? dt.isConfirmed : false,
                kimap: dt.kimap,
                hu_no: dt.hu_no,
                hu_cap: dt.hu_cap,
                uom: dt.uom,
                sap: dt.sap,
                wms: dt.wms,
                physic: dt.physic,
                name: dt.name, 
                description: dt.kimap + ' | ' + dt.hu_cap + ' ' + dt.uom + ' | ' + dt.binloc, 
                note: dt.material_desc,
                wh_name: document.origin,
                from: dt.binloc ? dt.binloc : '-', 
                to: dt.from_tote ? dt.from_tote : '-',
                warehouse: [
                    {
                        ...warehouse[0],
                        subtitle: dt.name,
                        description: dt.hu_no + ' | ' + dt.hu_cap + ' ' + dt.uom
                    },
                    {
                        ...warehouse[1],
                        description: dt.binloc ? dt.binloc : '-'
                    }
                ],
                detail: {...dt.detail},
                document: {...document},
                driver: {...driver},
                title: 'Cycle Count'
            })
            return null
        })
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <View style={{ backgroundColor: '#fff', height: 95, zIndex: 1000 }}>
                    <NavbarMenu 
                        onBack={() => onBack()}
                        title={'Ticket#' + (ticket_info && ticket_info.ticket_no)} />
                    <Multistep 
                        data={dataTab} 
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
                                onStop={(data) => console.log('on stop', data)}
                            />
                        </View>
                    )}
                </View>
                <ScrollView>
                    <View style={{ marginTop: -15 }}>
                        {(activeIndex === 0 || activeIndex === 1 || activeIndex === 2) && (
                            <CycleInfo 
                                title={'Cycle Count Information'} 
                                warehouse={document.wh}
                                period={`+ ${document.period_from} - ${document.period_to}`}
                                note={ticket_info.ticket_note}
                                onVerifiedPress={onVerifiedPress}
                                countMaterial={countMaterial} />
                        )}
                        {(activeIndex === 0) && (
                            <CardMaterialCheckCount 
                                limit={limit}
                                offset={offset}
                                loader={visibleMaterialLoader}
                                countMaterial={countMaterial}
                                ml_number={ticket_info.ticket_ref_no}
                                do_number={document.delivery_order}
                                wh_name={document.origin}
                                isRouteEnable={false} 
                                data={dummyMaterials} 
                                onSearchChange={(data) => this.setState({search: data, materials: []}, () => this.getTotalMaterial(ticket_info.ticket_ref_no))}
                                onLoadMore={(page) => this.getMaterial(ticket_info.ticket_ref_no, limit, (page - 1), search)}
                                onPrevMore={() => this.getMaterial(ticket_info.ticket_ref_no, limit, (offset - 1), search)}
                                onNextMore={() => this.getMaterial(ticket_info.ticket_ref_no, limit, (offset + 1), search)}
                                onPress={() => this.setState({activeIndex: (activeIndex + 1)})}
                                onVerifiedPress={onVerifiedPress} />
                        )}
                        {(activeIndex === 1) && (
                            <CardMaterialCheckCount
                                limit={limit}
                                offset={offset}
                                loader={visibleMaterialLoader}
                                countMaterial={countMaterial}
                                ml_number={ticket_info.ticket_ref_no}
                                do_number={document.delivery_order}
                                wh_name={document.origin}
                                warehouse={warehouse}
                                isRouteEnable={true} 
                                data={dummyMaterials} 
                                btnTitle={visibleButtonLoader ? 'Please wait..' : btnTitle[activeIndex]}
                                onSearchChange={(data) => this.setState({search: data, materials: []}, () => this.getTotalMaterial(ticket_info.ticket_ref_no))}
                                onLoadMore={(page) => this.getMaterial(ticket_info.ticket_ref_no, limit, (page - 1), search)}
                                onPrevMore={() => this.getMaterial(ticket_info.ticket_ref_no, limit, (offset - 1), search)}
                                onNextMore={() => this.getMaterial(ticket_info.ticket_ref_no, limit, (offset + 1), search)}
                                onChangePhysic={(physic, material, status) => this.updateMaterialPhysic(status, physic, material)}
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
                                title={'Review Cycle Count'} 
                                type={document.type}
                                reference={ticket_info.ticket_ref_no}
                                delivery_order={document.delivery_order}
                                isScanner={true}
                                onScanner={(type, validateID) => onQR(type, validateID)}
                                disableReview={activeIndex === 3 ? true : false}
                                material={dummyMaterials}
                                onVerifiedPress={onVerifiedPress} />
                        )}
                        {(activeIndex === 0) && (
                            <CheckIn 
                                lastMsecs={startMsecs} 
                                driver={driverCheck}
                                security={security}
                                onChangeTimer={(data) => this.setState({startMsecs: data})} 
                                onStart={(data) => this.setState({startTime: data, stopTime: '-'})}
                                onStop={(data) => this.setState({activeIndex: (activeIndex + 1), visibletimer: true, timerStatus: true})}
                                updateStatus={(data, status) => this.updateTaskStatus(data, status)}
                                onVerifiedPress={onVerifiedPress}
                            />
                        )}
                        {(activeIndex === 2 || activeIndex === 3) && (
                            <CheckOut 
                                code={ticket_info.ticket_no}
                                lastMsecs={stopMsecs} 
                                driver={driverCheck}
                                security={security}
                                startTime={startTime}
                                onChangeTimer={(data) => this.setState({stopMsecs: data})} 
                                onStop={(data) => this.setState({stopTime: data, activeIndex: dataTab.length})}
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

const img = "https://img.freepik.com/free-photo/friendly-smiling-woman-looking-pleased-front_176420-20779.jpg"

const mapStateToProps = state => {
    return {
        auth: state.auth
    };
};

export default connect(mapStateToProps, null)(CardCycleCount)
