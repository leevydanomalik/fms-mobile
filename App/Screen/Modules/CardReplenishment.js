import React, { Component } from 'react'
import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native'
import {connect} from "react-redux"
import Multistep from '../Components/Multistep'
import { CheckIn, CheckOut } from './gatesecurity'
import { MtoInfo, ReviewInfo, MtoTimerInfo } from './material/mto'
import NavbarMenu from '../Components/NavbarMenu'
import CardMaterialCheck from '../Components/CardMaterialCheck'

var time

class CardReplenishment extends Component {
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
        this.setState({timerStatus: false, visibletimer: false})
        console.log('CARD REPLENISHMENT', this.props.rowData.item)
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
        this.setState({materials})
    }

    render() {
        const { activeIndex, startMsecs, stopMsecs, startTime, stopTime, timerStatus, visibletimer, visibleButtonLoader } = this.state
        const { onVerifiedPress, onBack, onScanner } = this.props
        const data = this.props.rowData.item
        const { driver_info, ticket_info, doc_info, fleet_info, ynd_info } = data
        const document = {
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
        const buttonTitle = [
            'Proceed',
            'Done & Review',
            'Start Another Task',
            'Start Another Task'
        ]
        const mtoTitle = [
            'Transfer Order Information',
            'Transfer Order Information',
            'Transfer Order Information',
            'Movement Information',
            'Movement Information',
        ]
        const security = [
            {
                id: 1, 
                title: 'Check In', 
                warehouse: document.origin, 
                time: startTime, 
                worker: ynd_info.master, 
                image: ynd_info.ynd_img_path
            },
            {
                id: 2, 
                title: 'Check Out', 
                warehouse: document.dest, 
                time: stopTime, 
                worker: ynd_info.master, 
                image: ynd_info.ynd_img_path
            }
        ]
        const driver = {
            image: driver_info.driver_img_path,
            name: driver_info.name,
            cargo: ticket_info.driver_company
        }
        const dummyMaterials = []
        const warehouse = [
            {
                id: 1, 
                title: 'Origin Zone', 
                subtitle: document.origin, 
                description: 'Z1000'
            },
            {
                id: 2, 
                title: 'Transporter/Carrier', 
                subtitle: document.dest, 
                description: 'DOCK500'
            }
        ]

        document.material && document.material.map((dt) => {
            dummyMaterials.push({
                kimap: dt.kimap,
                hu_no: dt.hu_no,
                name: dt.name, 
                description: dt.hu_no + ' | ' + dt.hu_cap + ' ' + dt.uom, 
                from: 'Z2000', 
                to: 'Z1000',
                detail: {...dt},
                document: {...document},
                driver: {...driver}
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
                            <MtoInfo 
                                title={mtoTitle[activeIndex]} 
                                onVerifiedPress={onVerifiedPress} />
                        )}
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
                        {(activeIndex === 1) && (
                            <CardMaterialCheck 
                                ml_number={ticket_info.ticket_ref_no}
                                do_number={document.delivery_order}
                                wh_name={document.dest}
                                warehouse={warehouse}
                                isRouteEnable={true} 
                                data={dummyMaterials} 
                                btnTitle={visibleButtonLoader ? 'Please wait..' : buttonTitle[activeIndex]}
                                onScanner={(type, material) => onScanner(type, warehouse, material)}
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
                                    }, 2000)
                                }}
                                onVerifiedPress={onVerifiedPress} />
                        )}
                        {(activeIndex === 2) && (
                            <ReviewInfo 
                                title={'Document Information'} 
                                type={document.type}
                                reference={ticket_info.ticket_ref_no}
                                delivery_order={document.delivery_order}
                                material={dummyMaterials}
                                onVerifiedPress={onVerifiedPress} />
                        )}
                        {(activeIndex === 0) && (
                            <CheckIn 
                                lastMsecs={startMsecs} 
                                driver={driver}
                                security={security}
                                onChangeTimer={(data) => this.setState({startMsecs: data})} 
                                onStart={(data) => this.setState({startTime: data, stopTime: '-'})}
                                onStop={(data) => this.setState({activeIndex: (activeIndex + 1), visibletimer: true, timerStatus: true})}
                                btnTitle={buttonTitle[activeIndex]}
                                onVerifiedPress={onVerifiedPress}
                            />
                        )}
                        {(activeIndex === 2 || activeIndex === 3) && (
                            <CheckOut 
                                lastMsecs={stopMsecs} 
                                driver={driver}
                                security={security}
                                startTime={startTime}
                                onChangeTimer={(data) => this.setState({stopMsecs: data})} 
                                onStop={(data) => this.setState({stopTime: data, activeIndex: dataTab.length})}
                                btnTitle={buttonTitle[activeIndex]}
                                btnPress={() => onBack()}
                                onVerifiedPress={onVerifiedPress} />
                        )}
                    </View>
                </ScrollView>
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

export default connect(mapStateToProps, null)(CardReplenishment)
