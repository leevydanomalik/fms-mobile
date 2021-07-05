import React, { Component } from 'react'
import { View, ScrollView, Text } from 'react-native'
import Multistep from '../Components/Multistep'
import { DriverInfo, TruckInfo, DocInfo, SealNumber, CheckOut } from './gatesecurity'
import ButtonNext from '../Components/ButtonNext'
import NavbarMenu from '../Components/NavbarMenu'
import CardMaterialCheckSimple from '../Components/CardMaterialCheckSimple'
import { MtoTimerInfo } from './material/mto'
import Api from '../../Services/Api'
import M from 'moment'
import { connect } from 'react-redux'

const img = "https://techwithsadprog.com/assets/images/testimonial/1595348801user-3.jpeg"
var time

class CardGoodReceiptCheck extends Component {
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
            visibleButtonLoader: false
        }
    }

    static defaultProps = {
        onVerifiedPress: () => null
    }

    componentDidMount() {
        const {date, msecs} = this.props
        this.setState({
            startTime: date,
            startMsecs: msecs,
            visibletimer: true,
            timerStatus: true
        })
    }

    updateTaskStatus = async (data, status, startTimes) => {
        let datas = this.props.allData[this.props.rowData.index]
        let dataPayload = JSON.parse(datas.payload)
        let dataPayloadStart = { ...dataPayload, doc_info: { ...dataPayload.doc_info, delivery: { ...dataPayload.doc_info.delivery, leg_org_ETD: `${M().format("DD-MM-YYYY")} ${data}` } } }
        let dataPayloadStop = { ...dataPayload, doc_info: { ...dataPayload.doc_info, delivery: { ...dataPayload.doc_info.delivery, leg_org_ETD: `${M().format("DD-MM-YYYY")} ${startTimes}`, leg_dest_ETA: `${M().format("DD-MM-YYYY")} ${data}` } } }
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
        let docStart = { ...this.state.rowData.item.doc_info, delivery: { ...this.state.rowData.item.doc_info.delivery, leg_org_ETD: `${M().format("DD-MM-YYYY")} ${data}` } }
        let docStop = { ...this.state.rowData.item.doc_info, delivery: { ...this.state.rowData.item.doc_info.delivery, leg_org_ETD: `${M().format("DD-MM-YYYY")} ${startTimes}`, leg_dest_ETA: `${M().format("DD-MM-YYYY")} ${data}` } }
        let doc_info = status === "DONE" ? docStop : docStart
        if (resultsUpdate.data && resultsUpdate.data.status === "S") this.setState({
            rowData: { ...this.state.rowData, item: { ...this.state.rowData.item, doc_info } }
        }, console.log("update berhasil"))
    }

    render() {
        const { activeIndex, startMsecs, stopMsecs, startTime, stopTime, visibleButtonLoader, visibletimer, timerStatus } = this.state
        const { onVerifiedPress, onBack, driver } = this.props
        const dataTab = [
            {id: '1', title: '1', active: false},
            {id: '2', title: '2', active: false},
            {id: '3', title: '3', active: false},
            {id: '4', title: '4', active: false},
            {id: '5', title: '5', active: false},
            {id: '6', title: '6', active: false},
        ]
        const security = [
            {id: 1, title: 'Check In', warehouse: 'Warehouse L301 SLOC 304', time: startTime, worker: 'Ms. Security', image: img},
            {id: 2, title: 'Check Out', warehouse: 'Warehouse L301 SLOC 304', time: stopTime, worker: 'Ms. Security',  image: img}
        ]
        const btnTitle = 'Confirmed & '+ (((activeIndex + 1) === dataTab.length) ? 'Done' : 'Next') //+' ('+ (activeIndex + 1) +'/'+ dataTab.length +')'
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <View style={{ backgroundColor: '#fff', height: 95, zIndex: 1000 }}>
                    <NavbarMenu 
                        onBack={() => onBack()}
                        title={'Ticket#86868868'} />
                    <Multistep 
                        data={dataTab} 
                        activeIndex={activeIndex} 
                        onChange={(index) => this.setState({activeIndex: index})} />
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
                        {(activeIndex === 0) && (
                            <DriverInfo onVerifiedPress={onVerifiedPress} />
                        )}
                        {(activeIndex === 1) && (
                            <TruckInfo onVerifiedPress={onVerifiedPress} />
                        )}
                        {(activeIndex === 2) && (
                            <DocInfo onVerifiedPress={onVerifiedPress} />
                        )}
                        {(activeIndex === 3) && (
                            <SealNumber onVerifiedPress={onVerifiedPress} />
                        )}
                        {(activeIndex === 4 || activeIndex === 5) && (
                            <CardMaterialCheckSimple 
                                isRouteEnable={(activeIndex === 4) ? true : false}
                                disableButton={(activeIndex === 4) ? false : true}
                                data={[0, 1, 2, 3]}
                                btnTitle={visibleButtonLoader ? 'Please wait..' : btnTitle}
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
                        {(activeIndex === 5 || activeIndex === 6) && (
                            <CheckOut 
                                lastMsecs={stopMsecs} 
                                driver={driver}
                                security={security}
                                startTime={startTime}
                                onChangeTimer={(data) => this.setState({stopMsecs: data})} 
                                onStop={(data) => this.setState({stopTime: data, activeIndex: dataTab.length})}
                                btnTitle={'Confirm & Done'}
                                btnPress={() => onBack()}
                                updateStatus={(data, status, startTimes) => this.updateTaskStatus(data, status, startTimes)}
                                onVerifiedPress={onVerifiedPress} />
                        )}
                    </View>
                    {(activeIndex === dataTab.length) ? (
                        <View style={{flex: 0, justifyContent: 'center'}}>
                            {/* <View style={{ marginTop: 20, marginBottom: 20, backgroundColor: "#fff", padding: 20, alignContent: 'center' }}>
                                <Text style={{
                                    marginBottom: 30,
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                    color: '#000',
                                    textAlign: 'center'
                                }}>
                                    Congratulations, all step has been done!!!
                                </Text>
                                <ButtonNext 
                                    title={'Oke, Go Back'} 
                                    onPress={() => onBack()} />
                            </View> */}
                        </View>
                    ) : (activeIndex !== 5) && (activeIndex !== 4) && (
                        <View style={{ marginTop: 0, marginBottom: 10, backgroundColor: "#fff", padding: 20 }}>
                            <ButtonNext 
                                title={btnTitle} 
                                onPress={() => {
                                    ((activeIndex + 1) === dataTab.length) 
                                    ? this.setState({activeIndex: dataTab.length})
                                    : this.setState({activeIndex: (activeIndex + 1)})
                                }} />
                        </View>
                    )}
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, null)(CardGoodReceiptCheck)