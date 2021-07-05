import React from 'react'
import { View, ScrollView, TouchableOpacity, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import { connect } from 'react-redux'
import { CardQr, CardPo, CardKir, CardRoute, CardInfo, CardInfoB, CardLo, CardGate, CardPicker, CardMovement, CardMaterialMovement } from './Modules'
import CardClaim from './Modules/CardClaim'
import CardClaimHistory from './Modules/CardClaimHistory'
import { Styles, Colors } from '../Themes'
import CardYND from './Modules/CardYND'
import CardDriver from './Modules/CardDriver'
import CardLoadingUnLoad from './Modules/CardLoadingUnLoad'
import BottomSheet from "react-native-bottomsheet-reanimated"
import CardGoodIssue from './Modules/CardGoodIssue'
import CardGoodReceipt from './Modules/CardGoodReceipt'
import CardPir from './Modules/CardPir'
import CardPutaway from "./Modules/CardPutaway"
import CardCycleCount from "./Modules/CardCycleCount"
import CardTaskPacking from "./Modules/outbound/CardTaskPacking"
import CardTaskLabeling from "./Modules/inbound/CardTaskLabeling"
import CardTaskStoring from "./Modules/inbound/CardTaskStoring"
import CardTaskMto from "./Modules/material/CardTaskMto"
import CardReplenishment from "./Modules/CardReplenishment"
import NavbarMenu from './Components/NavbarMenu'
import BottombarMenu from './Components/BottombarMenu'

const bg_red = "#b91500"
const blue = Colors.main
const { width, height } = Dimensions.get('window')
const snapPoint = (height - (height - 90))

class TicketDetailScreen extends React.Component {
    constructor(props) {
        super(props)
        const { params } = props.navigation.state
        this.state = {
            data: params.data,
            rowData: params.rowData,
            allData: params.allData,
            securitySignver: params.security,
            driverSignver: params.driver,
            rawData: params.rawData ? params.rawData : "",
            signver: params.signver ? params.signver : false
        }
    }

    componentDidMount () {}

    
    checkRole(role) {
        return role == "R_MOBILE_SAP";
    }

    renderInner = () => {
        return (
            <View style={{ flex: 1, backgroundColor: "#fff" }}>
                <CardRoute />
            </View>
        )
    }

    renderHeader = () => (
        <View
            style={{
                height: 35,
                flex: 1,
                backgroundColor: "#fff",
                justifyContent: 'center',
                alignItems: "center",
                elevation: 5,
            }}>
            <View style={{ height: 7, borderTopWidth: 2, borderBottomWidth: 2, borderTopColor: '#ccc', borderBottomColor: '#ccc', width: "10%" }} />
        </View>
    )

    render() {
        const { data, rowData, allData, signver, securitySignver, driverSignver } = this.state
        const { role, name, roleName, imageUrl } = this.state.data
        const { user } = this.props.auth
        let dataUser = user.data
        let userPayload = {
            id: dataUser.userID,
            name: dataUser.userName,
            company: dataUser.esCommonDTO.company.compName,
            warehouse: dataUser.esCommonDTO.warehouse.whName
        }
        let dualMode, singleMode, subDesc
        let title = this.state.rawData ? this.state.rawData.split("/") : ''
        let primaryColor = Colors.main
        let mainDesc = "This vehicle must stop the engine while parking and please securing surrounding and confirm to loading master"
        let navButton = []
        if (user && user.data.userID) roleSap = user.data.roles.some(this.checkRole)
        roleSap ? navButton.push(navButtons[0],
            {
                label: "SAP",
                icon: "tool",
                notif: 0,
                size: 28
            }, navButtons[1], navButtons[2]) : navButton = navButtons

        switch (role) {
            case "GSO":
                primaryColor = "#b91500"
                dualMode = true
                mainDesc = "This QR Code is for the driver to access to all our warehouse area. Please keep it and in case your device malfunction or damage please print it"
                break
            case "LM":
                singleMode = true
                primaryColor = "#472a88"
                mainDesc = "Congratulation you just completed you jobs in that’s great !!!"
                subDesc = "40 Minutes 20 Second"
                break
            case "FLD":
                singleMode = true
                primaryColor = Colors.main
                mainDesc = "Congratulation you just completed your jobs. That’s great !!!"
                subDesc = "40 Minutes 20 Second"
                break
            case "GATE":
                singleMode = true
                primaryColor = Colors.main
                mainDesc = "Congratulation you just completed your jobs. That’s great !!!"
                subDesc = "40 Minutes 20 Second"
                break
            case "DRIVER":
                singleMode = true
                primaryColor = Colors.main
                mainDesc = ""
                subDesc = ""
            case "PICKER":
                singleMode = true
                primaryColor = Colors.main
                mainDesc = "Congratulation you just completed your jobs. That’s great !!!"
                subDesc = "40 Minutes 20 Second"
                break
            case "GI":
                singleMode = true
                primaryColor = Colors.main
                mainDesc = "Congratulation you just completed your jobs. That’s great !!!"
                subDesc = "40 Minutes 20 Second"
                break
            case "GR":
                singleMode = true
                primaryColor = Colors.main
                mainDesc = "Congratulation you just completed your jobs. That’s great !!!"
                subDesc = "40 Minutes 20 Second"
                break
            case "FWD":
                primaryColor = "#2B9133"
                singleMode = true
                mainDesc = "This QR code is your access to all our warehouse area. Please keep it and in case your device malfunction or damage please print it"
                break
            case "CLAIM":
                primaryColor = "#2B9133"
                singleMode = true
                mainDesc = "This vehicle must stop the engine while parking and please securing surrounding and confirm to loading master"
                break
            case "PIR":
                primaryColor = "#2B9133"
                singleMode = true
                mainDesc = "This vehicle must stop the engine while parking and please securing surrounding and confirm to loading master",
                title = this.state.rawData.split("/")
                break
            case "LUM":
                primaryColor = Colors.main
                singleMode = true
                mainDesc = "Congratulation you just completed your jobs. That’s great !!!"
                subDesc = "40 Minutes 20 Second"
                break
        }
        console.log("oll", driverSignver)


        return (
            <View style={{ flex: 1 }}>
                { role == "GATE" ? (
                    <CardGate 
                        data={data}
                        user={userPayload}
                        signver={signver}
                        securitySignver={securitySignver}
                        driverSignver={driverSignver}
                        allData={allData}
                        rowData={rowData}
                        onQR={(type, validateID) => this.props.navigation.navigate('GateScannerScreen', {
                            value: "https://connexpro.daya-dms.id/wmx/trxquery/query/get.inbound.delivery.by.id/1597664988576",
                            role: "SEAL",
                            title: "SCAN " + type + " ID",
                            type: type,
                            validateID: validateID,
                            allData
                        })}
                        onScanner={() => this.props.navigation.navigate('GateScannerScreen', {
                            value: "https://connexpro.daya-dms.id/wmx/trxquery/query/get.inbound.delivery.by.id/1597664988576",
                            role: "SEAL",
                            allData
                        })}
                        onBack={() => this.props.navigation.goBack()}
                        onVerifiedPress={() => this.props.navigation.navigate('GateScannerScreen')} />
                ) 
                : role === "PICKER" ? (
                    <CardPicker 
                        role={roleName} 
                        user={userPayload}
                        signver={signver}
                        securitySignver={securitySignver}
                        driverSignver={driverSignver}
                        data={[]}
                        rowData={rowData}
                        allData={allData}
                        onQR={(type, validateID) => this.props.navigation.navigate('GateScannerScreen', {
                            value: "https://connexpro.daya-dms.id/wmx/trxquery/query/get.inbound.delivery.by.id/1597664988576",
                            role: "SEAL",
                            title: "SCAN " + type + " ID",
                            type: type,
                            validateID: validateID
                        })}
                        onScanner={(type, material) => this.props.navigation.navigate('CardMaterialDetail', {
                            role: "SEAL",
                            roleType: "list",
                            title: "SCAN " + type + " ID",
                            type: type,
                            material: material
                        })}
                        onBack={() => this.props.navigation.goBack()}
                        onVerifiedPress={() => this.props.navigation.navigate('GateScannerScreen')} />
                )
                : role === "LUM" ? (
                    <CardLoadingUnLoad 
                        user={userPayload}
                        signver={signver}
                        securitySignver={securitySignver}
                        driverSignver={driverSignver}
                        role={roleName} 
                        data={this.state.rowData} 
                        onBack={() => this.props.navigation.goBack()}
                        onVerifiedPress={() => this.props.navigation.navigate('GateScannerScreen')} />
                )
                : role === "PUTAWAY" ? (
                    <CardPutaway
                        user={userPayload}
                        signver={signver}
                        securitySignver={securitySignver}
                        driverSignver={driverSignver}
                        onQR={(type, validateID) => this.props.navigation.navigate('GateScannerScreen', {
                            value: "https://connexpro.daya-dms.id/wmx/trxquery/query/get.inbound.delivery.by.id/1597664988576",
                            role: "SEAL",
                            title: "SCAN " + type + " ID",
                            type: type,
                            validateID: validateID
                        })}
                        onScanner={(type, warehouse, material) => this.props.navigation.navigate('CardMaterialDetail', {
                            role: "SEAL",
                            roleType: "list",
                            title: "SCAN " + type + " ID",
                            type: type,
                            warehouse: warehouse,
                            material: material
                        })}
                        role={roleName} 
                        data={[]} 
                        rowData={rowData}
                        onBack={() => this.props.navigation.goBack()}
                        onVerifiedPress={() => this.props.navigation.navigate('GateScannerScreen')} />
                )
                : role === "GR" ? (
                    <CardGoodReceipt 
                        user={userPayload}
                        signver={signver}
                        securitySignver={securitySignver}
                        driverSignver={driverSignver}
                        role={roleName} 
                        data={[]}
                        allData={allData}
                        rowData={rowData}
                        onQR={(type, validateID) => this.props.navigation.navigate('GateScannerScreen', {
                            value: "https://connexpro.daya-dms.id/wmx/trxquery/query/get.inbound.delivery.by.id/1597664988576",
                            role: "SEAL",
                            title: "SCAN " + type + " ID",
                            type: type,
                            validateID: validateID
                        })}
                        onScanner={(type, material) => this.props.navigation.navigate('CardMaterialDetail', {
                            role: "SEAL",
                            title: "SCAN " + type + " ID",
                            type: type,
                            roleType: "simple",
                            material: material
                        })}
                        onProceed={(date, msecs) => this.props.navigation.navigate('GoodReceiptCheck', {date: date, msecs: msecs})}
                        onBack={() => this.props.navigation.goBack()}
                        onVerifiedPress={() => this.props.navigation.navigate('GateScannerScreen')} />
                )
                : role === "GI" ? (
                    <CardGoodIssue 
                        user={userPayload}
                        signver={signver}
                        securitySignver={securitySignver}
                        driverSignver={driverSignver}
                        role={roleName} 
                        data={rowData}
                        rowData={rowData}
                        allData={allData}
                        onQR={(type, validateID) => this.props.navigation.navigate('GateScannerScreen', {
                            value: "https://connexpro.daya-dms.id/wmx/trxquery/query/get.inbound.delivery.by.id/1597664988576",
                            role: "SEAL",
                            title: "SCAN " + type + " ID",
                            type: type,
                            validateID: validateID
                        })}
                        onScanner={(type, material) => this.props.navigation.navigate('CardMaterialDetail', {
                            role: "SEAL",
                            title: "SCAN " + type + " ID",
                            type: type,
                            roleType: "list",
                            material: material
                        })}
                        onProceed={(date, msecs) => this.props.navigation.navigate('GoodReceiptCheck', {date: date, msecs: msecs})}
                        onBack={() => this.props.navigation.goBack()}
                        onVerifiedPress={() => this.props.navigation.navigate('GateScannerScreen')} />
                )
                : role === "MTO" ? (
                    <CardTaskMto
                        user={userPayload}
                        signver={signver}
                        securitySignver={securitySignver}
                        driverSignver={driverSignver}
                        onQR={(type, validateID) => this.props.navigation.navigate('GateScannerScreen', {
                            value: "https://connexpro.daya-dms.id/wmx/trxquery/query/get.inbound.delivery.by.id/1597664988576",
                            role: "SEAL",
                            title: "SCAN " + type + " ID",
                            type: type,
                            validateID: validateID
                        })}
                        onScanner={(type, material) => this.props.navigation.navigate('CardMaterialDetail', {
                            role: "SEAL",
                            roleType: "list",
                            title: "SCAN " + type + " ID",
                            type: type,
                            material: material
                        })}
                        role={roleName} 
                        rowData={rowData}
                        allData={allData}
                        onBack={() => this.props.navigation.goBack()}
                        onVerifiedPress={() => this.props.navigation.navigate('GateScannerScreen')} />
                )
                : role == "FLD" ? (
                    <CardMovement 
                        user={userPayload}
                        signver={signver}
                        securitySignver={securitySignver}
                        driverSignver={driverSignver}
                        role={roleName} 
                        data={this.state.rowData} 
                        onBack={() => this.props.navigation.goBack()}
                        onVerifiedPress={() => this.props.navigation.navigate('GateScannerScreen')} />
                )
                : role == "STORING" ? (
                    <CardTaskStoring
                        user={userPayload}
                        signver={signver}
                        securitySignver={securitySignver}
                        driverSignver={driverSignver}
                        onQR={(type, validateID) => this.props.navigation.navigate('GateScannerScreen', {
                            value: "https://connexpro.daya-dms.id/wmx/trxquery/query/get.inbound.delivery.by.id/1597664988576",
                            role: "SEAL",
                            title: "SCAN " + type + " ID",
                            type: type,
                            validateID: validateID
                        })}
                        onScanner={(type, material) => this.props.navigation.navigate('CardMaterialDetail', {
                            role: "SEAL",
                            roleType: "list",
                            title: "SCAN " + type + " ID",
                            type: type,
                            material: material
                        })}
                        role={roleName} 
                        rowData={rowData}
                        allData={allData}
                        onBack={() => this.props.navigation.goBack()}
                        onVerifiedPress={() => this.props.navigation.navigate('GateScannerScreen')} />
                )
                : role == "MATERIALMOVEMENT" ? (
                    <CardMaterialMovement
                        user={userPayload}
                        signver={signver}
                        securitySignver={securitySignver}
                        driverSignver={driverSignver}
                        onScanner={(type, warehouse) => this.props.navigation.navigate('CardMaterialDetail', {
                            role: "SEAL",
                            title: "SCAN " + type + " ID",
                            type: type,
                            roleType: "list",
                            warehouse: warehouse
                        })}
                        role={roleName} 
                        data={this.state.rowData} 
                        onBack={() => this.props.navigation.goBack()}
                        onVerifiedPress={() => this.props.navigation.navigate('GateScannerScreen')} />
                )
                : role == "LABELING" ? (
                    <CardTaskLabeling 
                        user={userPayload}
                        signver={signver}
                        securitySignver={securitySignver}
                        driverSignver={driverSignver}
                        onQR={(type, validateID) => this.props.navigation.navigate('GateScannerScreen', {
                            value: "https://connexpro.daya-dms.id/wmx/trxquery/query/get.inbound.delivery.by.id/1597664988576",
                            role: "SEAL",
                            title: "SCAN " + type + " ID",
                            type: type,
                            validateID: validateID
                        })}
                        onScanner={(type, material) => this.props.navigation.navigate('CardMaterialDetail', {
                            role: "SEAL",
                            roleType: "list",
                            title: "SCAN " + type + " ID",
                            type: type,
                            enablePrinting: true,
                            disableRouteZone: true,
                            material: material
                        })}
                        role={roleName} 
                        data={rowData} 
                        allData={allData}
                        rowData={rowData} 
                        onBack={() => this.props.navigation.goBack()}
                        onVerifiedPress={() => this.props.navigation.navigate('GateScannerScreen')} />
                )
                : role == "REPLENISHMENT" ? (
                    <CardReplenishment 
                        user={userPayload}
                        signver={signver}
                        securitySignver={securitySignver}
                        driverSignver={driverSignver}
                        onQR={(type, validateID) => this.props.navigation.navigate('GateScannerScreen', {
                            value: "https://connexpro.daya-dms.id/wmx/trxquery/query/get.inbound.delivery.by.id/1597664988576",
                            role: "SEAL",
                            title: "SCAN " + type + " ID",
                            type: type,
                            validateID: validateID
                        })}
                        onScanner={(type, warehouse, material) => this.props.navigation.navigate('CardMaterialDetail', {
                            role: "SEAL",
                            roleType: "list",
                            title: "SCAN " + type + " ID",
                            type: type,
                            warehouse: warehouse,
                            material: material
                        })}
                        role={roleName} 
                        data={rowData} 
                        rowData={rowData} 
                        onBack={() => this.props.navigation.goBack()}
                        onVerifiedPress={() => this.props.navigation.navigate('GateScannerScreen')} />
                )
                : role === "CYCLECOUNT" ? (
                    <CardCycleCount
                        role={roleName} 
                        user={userPayload}
                        signver={signver}
                        securitySignver={securitySignver}
                        driverSignver={driverSignver}
                        data={[]}
                        rowData={rowData}
                        onQR={(type, validateID) => this.props.navigation.navigate('GateScannerScreen', {
                            value: "https://connexpro.daya-dms.id/wmx/trxquery/query/get.inbound.delivery.by.id/1597664988576",
                            role: "SEAL",
                            title: "SCAN " + type + " ID",
                            type: type,
                            validateID: validateID
                        })}
                        onScanner={(type, material) => this.props.navigation.navigate('CardMaterialDetail', {
                            role: "SEAL",
                            roleType: "count",
                            title: "SCAN " + type + " ID",
                            type: type,
                            material: material
                        })}
                        onBack={() => this.props.navigation.goBack()}
                        onVerifiedPress={() => this.props.navigation.navigate('GateScannerScreen')} />
                )
                : role == "DRIVER" ? (
                    <CardDriver
                        allData={allData}
                        user={userPayload}
                        signver={signver}
                        securitySignver={securitySignver}
                        driverSignver={driverSignver}
                        role={roleName} 
                        rowData={rowData}
                        onBack={() => this.props.navigation.goBack()}
                        onVerifiedPress={() => this.props.navigation.navigate('GateScannerScreen')} />
                )
                : role == "YND" ? (
                    <CardYND
                        user={userPayload}
                        signver={signver}
                        securitySignver={securitySignver}
                        driverSignver={driverSignver}
                        role={roleName} 
                        rowData={rowData}
                        allData={allData}
                        onQR={(type, validateID) => this.props.navigation.navigate('GateScannerScreen', {
                            value: "https://connexpro.daya-dms.id/wmx/trxquery/query/get.inbound.delivery.by.id/1597664988576",
                            role: "SEAL",
                            title: "SCAN " + type + " ID",
                            type: type,
                            validateID: validateID
                        })}
                        onScanner={() => this.props.navigation.navigate('GateScannerScreen', {
                            value: "https://connexpro.daya-dms.id/wmx/trxquery/query/get.inbound.delivery.by.id/1597664988576",
                            role: "SEAL"
                        })}
                        onBack={() => this.props.navigation.goBack()}
                        onVerifiedPress={() => this.props.navigation.navigate('GateScannerScreen')} />
                )
                : <View style={{ flex: 1, backgroundColor: '#fff' }}>
                    <View>
                        <NavbarMenu 
                            onBack={() => this.props.navigation.goBack()}
                            title={
                                role == "CLAIMHISTORY"
                                ? ("Operation January 2021") 
                                : role == "CLAIM" 
                                ? ("Claim Request #" + this.state.rowData.item.ticket_info.ticket_no) 
                                : role == "LUM" 
                                ? "DO#86868868" 
                                : role == "ID" 
                                ? `Inbound Delivery ID#${title[title.length-1]}` 
                                : role == "PIR" 
                                ? `Purchase Info Record ID#${title[title.length-1]}` 
                                : role == "PICKER" || role == "PUTAWAY" || role == "PACKING" || role == "LABELING" || role == "STORING" || role == "MTO"
                                ? `Ticket#${this.state.rowData.item.humanTaskID}`
                                : "Ticket#86868868"
                            } 
                        />
                        {role == "FWD" && (
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('QrListScreen')} style={{ position: 'absolute', right: 0, padding: 10 }}>
                                <Icon size={25} color="#fff" name="qrcode" />
                            </TouchableOpacity>
                        )}
                    </View>
                    <ScrollView>

                        {role == "PACKING" ? <CardTaskPacking role={roleName} data={this.state.rowData} onVerifiedPress={() => this.props.navigation.navigate('GateScannerScreen')} /> : null}

                        {role == "LM" ? <CardInfoB onVerifiedPress={() => this.props.navigation.navigate('GateScannerScreen')} /> : null}

                        {role == "FWD" || role == "GSO" ? <CardInfo onVerifiedPress={() => this.props.navigation.navigate('GateScannerScreen')} /> : null}

                        {role == "LM" ? <CardLo /> : null}

                        {role == "FWD" || role == "GSO" ? <CardPo /> : null}

                        {role == "FWD" || role == "GSO" ? <CardKir /> : null}

                        {role == "CLAIM" ? <CardClaim mainDesc={mainDesc} rowData={this.state.rowData} /> : null}

                        {role == "CLAIMHISTORY" ? <CardClaimHistory mainDesc={mainDesc} rowData={this.state.rowData} onPress={() => this.props.navigation.navigate('TicketDetailScreen', { data: { role: "CLAIM" }})} /> : null}

                        {role == "PIR" ? <CardPir mainDesc={mainDesc} rawData={this.state.rawData} /> : null}

                        {/* {
                            role == "CLAIM" || 
                            role == "GATE" || 
                            role == "PICKER" ||
                            role == "DRIVER"
                            ? null 
                            : <CardQr subDesc={subDesc} mainDesc={mainDesc} dualMode={dualMode} singleMode={singleMode} />
                        } */}

                        {role == "FWD" || role == "GSO" || role == "CLAIM" ? <View style={{ paddingBottom: 20 }}></View> : null}

                    </ScrollView>
                </View>}
                {role == "FWD" || role == "GSO" || role == "CLAIM" ?
                    <BottomSheet
                        bottomSheerColor="#FFFFFF"
                        initialPosition={snapPoint}
                        snapPoints={[height, snapPoint]}
                        isBackDrop={false}
                        isBackDropDismisByPress={false}
                        isRoundBorderWithTipHeader={false}
                        headerStyle={Styles.bottomSheetHeader}
                        header={<View style={Styles.bottomSheetHeaderContainer}><View style={Styles.bottomSheetTip} /></View>}
                        body={(
                                <CardRoute 
                                    title={'12.56 km / 8 Hours'}
                                    subtitle={'Single Moda - Inland Truck'}
                                    plan={'#656-POP'}
                                    date={'22 March 2020 15:00 PM'}
                                    data={{
                                        from: {
                                            subtitle: 'LGN Nusantara',
                                            date: '23 Marc 2020 19:00 PM'
                                        },
                                        to: {
                                            subtitle: 'DSP Panjang',
                                            date: '23 Marc 2020 19:00 PM'
                                        }
                                    }}
                                />
                            )}
                    />
                    : null}
                <View>
                    <BottombarMenu 
                        menu={navButton} 
                        onChange={(data, index) => {
                            this.props.navigation.navigate('MainScreen', {data: data.label, index})
                        }} />
                </View>
            </View>
        )
    }
}

const navButtons = [
    {
        label: "Home",
        icon: "home",
        notif: 4,
        size: 28
    },
    {
        label: "Notification",
        icon: "bells",
        notif: 0,
        size: 24
    },
    {
        label: "Profile",
        icon: "user",
        notif: 1,
        size: 24
    }
]

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, null)(TicketDetailScreen)