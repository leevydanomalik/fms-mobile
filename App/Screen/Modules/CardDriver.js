import React, { Component } from 'react'
import { View, Text, ScrollView } from 'react-native'
import NavbarMenu from '../Components/NavbarMenu'
import DriverInfo from './gatesecurity/DriverInfo'
import TruckInfo from './gatesecurity/TruckInfo'
import DocInfo from './gatesecurity/DocInfo'
import YardDock from './gatesecurity/YardDock'
import SealNumber from './driver/SealNumber'
import ValidateQR from './driver/ValidateQR'
import CardQR from './driver/CardQR'
import ButtonNext from '../Components/ButtonNext'
import CardSecurity from '../Components/CardSecurity'
import Pusher from 'pusher-js/react-native';
import Toast from 'react-native-toast-message'
import messaging from '@react-native-firebase/messaging'
import { generateDiferenceTime } from '../../Utils'
import { Colors } from '../../Themes'
import R from 'ramda'

class CardDriver extends Component {
    constructor(props) {
        super(props)
        const { ynd_info, doc_info, fleet_info, ticket_info } = props.rowData.item
        this.state = {
            popUpVisible: false,
            activeIndex: 4,
            lastTime: '00 : 00 : 00',
            ynd: {
                id: ynd_info.id,
                yard: ynd_info.yard,
                dock: ynd_info.dock,
                master: ynd_info.master,
                master_image_path: ynd_info.ynd_img_path,
                origin: ynd_info.es,
                org_time: ynd_info.yardInTime,
                dest: ynd_info.es,
                dest_time: ynd_info.dockInTime
            },
            security: [
                {
                    id: doc_info.delivery.security_id_in,
                    title: 'Check In',
                    warehouse: doc_info.delivery.security_plant_in,
                    time: doc_info.delivery.leg_org_ETD,
                    worker: doc_info.delivery.security_name_in,
                    image: "NONE"
                },
                {
                    id: doc_info.delivery.security_id_out,
                    title: 'Check Out',
                    warehouse: doc_info.delivery.security_plant_out,
                    time: doc_info.delivery.leg_dest_ETA,
                    worker: doc_info.delivery.security_name_out,
                    image: "NONE"
                }
            ],
            document: {
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
        }
    }

    static defaultProps = {
        onVerifiedPress: () => null
    }

    componentDidMount() {
        this.startPusher()
        messaging().onMessage(async remoteMessage => {
            if (remoteMessage.data.title == "YND Information") {
                let info = JSON.parse(remoteMessage.data.body)
                this.setState({
                    ynd: {
                        ...this.state.ynd,
                        origin: info.ynd_info.es,
                        dest: info.ynd_info.es,
                        yard: info.ynd_info.yard,
                        dock: info.ynd_info.dock,
                        master: info.ynd_info.master,
                        org_time: info.ynd_info.yardInTime,
                        dest_time: info.ynd_info.dockInTime
                    }
                })
            }
            if (remoteMessage.data.title == "Seal Number Information") {
                let infoSeal = JSON.parse(remoteMessage.data.body)
                this.setState({ 
                    document: {
                        ...this.state.document,
                        delivery_order: infoSeal.delivery_order,
                        seal_no: infoSeal.seal_no
                    }
                })
            }
            if (remoteMessage.data.title == "Gate Security Check In") {
                let infoGate = JSON.parse(remoteMessage.data.body)
                let security = Object.assign([], this.state.security)
                security[0] = { ...security[0], time: infoGate.start_time, worker: infoGate.security_name, id: infoGate.security_id, warehouse: infoGate.security_plant }
                security[1] = { id: "NONE", title: 'Check Out', warehouse: "-", time: "-", worker: "NONE", image: "NONE" }
                this.setState({ security, lastTime: '00 : 00 : 00' })
            }
            if (remoteMessage.data.title == "Gate Security Check Out") {
                let infoGate = JSON.parse(remoteMessage.data.body)
                let security = Object.assign([], this.state.security)
                security[1] = { ...security[1], time: infoGate.stop_time, worker: infoGate.security_name, id: infoGate.security_id, warehouse: infoGate.security_plant }
                this.setState({ security, lastTime: generateDiferenceTime(this.state.security[0].time, infoGate.stop_time) })
            }
        })

        let fd = this.state.security[0].time
        let sd = this.state.security[1].time

        this.setState({ lastTime: generateDiferenceTime(fd, sd) })
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

    borderBottom = () => {
        return (
            <View style={{ borderBottomColor: '#999', borderBottomWidth: 0.2, marginTop: 10, marginBottom: -5 }} />
        )
    }

    borderBoldBottom = () => {
        return (
            <View style={{ borderBottomColor: '#f0f0f0', borderBottomWidth: 10, marginTop: 10 }} />
        )
    }

    render() {
        const { lastTime, ynd, security, document } = this.state
        const { onBack, signver } = this.props
        const data = this.props.rowData.item
        const { driver_info, ticket_info, doc_info, fleet_info, ynd_info } = data

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

        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <View style={{ backgroundColor: '#fff', height: 35, zIndex: 1000 }}>
                    <NavbarMenu
                        onBack={() => onBack()}
                        title={'Ticket#' + (ticket_info && ticket_info.ticket_no)} />
                    <Toast ref={(ref) => Toast.setRef(ref)} />
                </View>
                <ScrollView>
                    <View style={{ marginTop: 10, padding: 20 }}>
                        <CardSecurity data={security} />
                        <Text style={{ fontSize: 42, fontWeight: 'bold', marginTop: 25, fontWeight: 'bold', color: Colors.lightGrey, textAlign: 'center' }}>
                            {lastTime}
                        </Text>
                    </View>

                    {this.borderBoldBottom()}
                    <ValidateQR
                        code={ticket_info.freight_contract_id}
                        label={ticket_info.freight_contract_id}
                        sublabel={ticket_info.freight_contract_id}
                    />
                    {this.borderBoldBottom()}
                    <DriverInfo data={driver} isDriver={true} />
                    {this.borderBoldBottom()}
                    <TruckInfo data={fleet} isDriver={true} />
                    {this.borderBoldBottom()}
                    <DocInfo labelReference={'DRIVER ASSIGNMENT'} data={document} isDriver={true} />
                    {this.borderBoldBottom()}
                    <YardDock data={ynd} />
                    {this.borderBoldBottom()}
                    <SealNumber code={document.seal_no} />

                    {(ticket_info.status === "DONE" && !signver && (
                        <View>
                            {this.borderBoldBottom()}
                            <CardQR code={ticket_info.ticket_no} />
                        </View>
                    ))}

                    <View style={{ padding: 20 }}>
                        <ButtonNext title={'CONFIRMED'} onPress={() => onBack()} />
                    </View>
                </ScrollView>
                
            </View>
        )
    }
}

export default CardDriver