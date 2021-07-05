import React, { Component } from 'react'
import { withNavigationFocus, NavigationEvents } from "react-navigation"
import { View, Text, TouchableOpacity, Dimensions, Alert, PermissionsAndroid } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import { RNCamera } from 'react-native-camera'
import BarcodeMask from 'react-native-barcode-mask'
import Spinkit from 'react-native-spinkit'
import axios from 'axios'
import { DialogQrInvalid } from './Modules'
import { Styles, Colors } from '../Themes'
import { QRScannerView } from 'react-native-qrcode-scanner-view'
import D from '../Lib/Dimens'
import { documentType } from '../Utils'
import { connect } from 'react-redux'
import SealAction from '../Redux/SealRedux'
import NavbarMenu from './Components/NavbarMenu'
import Api from '../Services/Api'

const imgFleet = "https://pngimage.net/wp-content/uploads/2018/05/caminhão-em-png-2.png"
const imgDriver = "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg"
const imgSecurity = "https://img.freepik.com/free-photo/friendly-smiling-woman-looking-pleased-front_176420-20779.jpg"

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
            loaded: false,
            isFocused: false
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

    validURL(str) {
        // var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        //     '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        //     '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        //     '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        //     '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        //     '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
        var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
            '(patlog.bitozenia.com)|' + // domain name
            '(157.230.245.250)' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
        console.log("patt", pattern)
        console.log("patt", pattern.test(str))
        return !!pattern.test(str);
    }

    barcodeReceived = async (event) => {
        const { user } = this.props.auth
        let dialogVisible = false
        let data = ""
        let allData = ""
        let rowData = ""
        let security = []
        console.log("event", event.data.length)
        if (event.data.length == "13") {
            console.log("data barcode", event.data)
            let res = await Api.create().getHumanTaskListByID(event.data)
            if (res.data && res.data.status == "S" && res.data.data.taskStatus == "DONE") {
                const payload = JSON.parse(res.data.data.payload)
                allData = res.data.data
                security = [
                    {
                        id: payload && payload.user_assignment ? payload.user_assignment.id : "",
                        title: 'Check In',
                        warehouse: payload && payload.user_assignment ? payload.user_assignment.warehouse : "",
                        time: payload && payload.doc_info && payload.doc_info && payload.doc_info.delivery ? payload.doc_info.delivery.leg_org_ETD : "",
                        worker: payload && payload.user_assignment ? payload.user_assignment.name : "",
                        image: ""
                    },
                    {
                        id: payload && payload.user_assignment ? payload.user_assignment.id : "",
                        title: 'Check Out',
                        warehouse: payload && payload.user_assignment ? payload.user_assignment.warehouse : "",
                        time: payload && payload.doc_info && payload.doc_info && payload.doc_info.delivery ? payload.doc_info.delivery.leg_dest_ETA : "",
                        worker: payload && payload.user_assignment ? payload.user_assignment.name : "",
                        image: ""
                    }
                ]
                driver = {
                    id: payload && payload.user_assignment ? payload.user_assignment.id : "",
                    image: '',
                    name: payload && payload.user_assignment ? payload.user_assignment.name : "",
                    cargo: payload && payload.user_assignment ? payload.user_assignment.company : ""
                }
                rowData = {
                    item: {
                        ...payload,
                        objectID: res.data.data.objectID,
                        humanTaskID: res.data.data.humanTaskID,
                        card_style: {
                            card_type: payload.doc_info.source,
                            button_type: payload.doc_info.source === 'OUTBOUND DELIVERY' ? 'info' : 'main'
                        },
                        user_info: {
                            ...data,
                            uID: user.data.userID,
                            name: user.data.userName
                        },
                        ticket_info: {
                            ...payload.ticket_info,
                            "driver_img_path": imgDriver,
                            "progress": "0/7",
                            "status": res.data.data.taskStatus,
                            "time": "1s Ago",
                            "source_id": res.data.data.sourceID
                        },
                        driver_info: {
                            ...payload.driver_info,
                            "driver_img_path": imgDriver,
                        },
                        fleet_info: {
                            ...payload.fleet_info,
                            "fleet_img_path": imgFleet
                        },
                        ynd_info: {
                            ...payload.ynd_info,
                            "ynd_img_path": imgSecurity
                        }
                    }
                }
                console.log("type", res.data.data.humanTaskType)
                switch (res.data.data.humanTaskType) {
                    case "GATE_SECURITY":
                        data = {
                            role: "GATE",
                            name: "Mr. Gate Security",
                            roleName: "GATE SECURITY",
                            roleID: "M4756-2020",
                            imageUrl: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg"
                        }
                        break
                    case "MATERIAL_TRANSFER_ORDER":
                        let buttonType = 'main'
                        switch (rowData.item.doc_info.source) {
                            case 'MOVEMENT':
                                cardType = 'Movement'
                                buttonType = 'info'
                                break
                            case 'LOADING ORDER':
                                cardType = 'Loading Order'
                                buttonType = 'success'
                                break
                            case 'GOOD RECEIPT':
                                cardType = 'Good Receipt'
                                buttonType = 'error'
                                break
                            case 'GOOD ISSUE':
                                cardType = 'Good Issue'
                                buttonType = 'main-holder'
                                break
                            default:
                                cardType = 'Transfer Order'
                                buttonType = 'main'
                                break
                        }
                        rowData = { ...rowData, item: { ...rowData.item, card_style: { card_type: cardType, button_type: buttonType } } }
                        data = {
                            role: "MTO",
                            name: "Mr. Movement",
                            roleName: "MTO",
                            roleID: "M4756-2020",
                            imageUrl: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg"
                        }
                        break
                    case "INBOUND_DELIVERY_GR":
                        rowData = { ...rowData, item: { ...rowData.item, card_style: { card_type: "Good Receipt" } } }
                        data = {
                            role: "GR",
                            name: "Mr. Good Receipt",
                            roleName: "GOOD RECEIPT",
                            roleID: "M4756-2020",
                            imageUrl: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg"
                        }
                        break
                    case "OUTBOUND_DELIVERY_GI":
                        rowData = { ...rowData, item: { ...rowData.item, card_style: { card_type: "Good Issue" } } }
                        data = {
                            role: "GI",
                            name: "Mr. Good Issue",
                            roleName: "GOOD ISSUE",
                            roleID: "M4756-2020",
                            imageUrl: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg"
                        }
                        break
                    case "INBOUND_DELIVERY_STORING":
                        rowData = { ...rowData, item: { ...rowData.item, card_style: { card_type: "Storing" } } }
                        data = {
                            role: "STORING",
                            name: "Mr. Storing",
                            roleName: "STORING",
                            roleID: "M4756-2020",
                            imageUrl: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg"
                        }
                        break
                    case "OUTBOUND_DELIVERY_PICKING":
                        rowData = { ...rowData, item: { ...rowData.item, card_style: { card_type: "Picking" } } }
                        data = {
                            role: "PICKER",
                            card: "PICKER",
                            name: "Mr. Picking",
                            roleName: "PICKING",
                            roleID: "M4756-2020",
                            imageUrl: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg"
                        }
                        break
                    case "YARD_AND_DOCK":
                        let isInbound = false
                        switch (rowData.item.doc_info.source) {
                            case 'OUTBOUND DELIVERY':
                                isInbound = false
                                break
                            case 'OD':
                                isInbound = false
                                break
                            case 'INBOUND DELIVERY':
                                isInbound = true
                                break
                            default:
                                isInbound = true
                                break
                        }
                        rowData = { ...rowData, item: { ...rowData.item, card_style: { card_type: isInbound ? 'Outbound Delivery' : 'Inbound Delivery', button_type: isInbound ? 'info' : 'main' } } }
                        data = {
                            role: "YND",
                            card: "YND",
                            name: "Mr. YND",
                            roleName: "YND",
                            roleID: "M4756-2020",
                            imageUrl: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg"
                        }
                        break
                    case "DRIVER_ASSIGNMENT":
                        data = {
                            role: "DRIVER",
                            name: "Mr. Driver",
                            roleName: "DRIVER",
                            roleID: "M4756-2020",
                            imageUrl: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg"
                        }
                        break
                    case "PACKING_LABELING":
                        rowData = { ...rowData, item: { ...rowData.item, card_style: { card_type: 'Pack & Label', button_type: rowData.item.doc_info.source === 'INBOUND DELIVERY' ? 'main' : 'info' } } }
                        data = {
                            role: "LABELING",
                            name: "Mr. Pack & Label",
                            roleName: "LABELING",
                            roleID: "M4756-2020",
                            imageUrl: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg"
                        }
                        break
                    case "CYCLE_COUNT":
                        rowData = { ...rowData, item: { ...rowData.item, card_style: { card_type: 'Cycle Count' } } }
                        data = {
                            role: "CYCLECOUNT",
                            name: "Mr. Cycle Count",
                            roleName: "CYCLECOUNT",
                            roleID: "M4756-2020",
                            imageUrl: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg"
                        }
                        break
                    default: break
                }
                this.props.navigation.navigate('TicketDetailScreen', { data, rowData, allData, security, driver, signver: true })
            } else dialogVisible = true
        } else {
            if (this.validURL(event.data)) {
                this.camera.pausePreview()
                this.setState({ fetching: true })
                let type = documentType(event.data)
                let url = event.data.split("&DocType=")[0]
                console.log("typee", type)
                switch (type) {
                    // inbound
                    case "SDT_INBOUND_DELIVERY":
                        this.props.navigation.navigate('DocumentInbound', { rawData: url, data: { role: "ID", name: "Inbound Manager", roleName: "INBOUND", roleID: "M4756-2020", imageUrl: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg" } })
                        break
                    case "SDT_GOOD_RECEIPT":
                        this.props.navigation.navigate('DocumentInbound', { rawData: url, data: { role: "GOODRECEIPT", name: "Good Receipt", roleName: "GOODRECEIPT", roleID: "M4756-2020", imageUrl: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg" } })
                        break
                    case "SDT_PUTAWAY":
                        this.props.navigation.navigate('DocumentInbound', { rawData: url, data: { role: "PUTAWAY", name: "Putaway", roleName: "PUTAWAY", roleID: "M4756-2020", imageUrl: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg" } })
                        break
                    case "SDT_INBOUND_LABELLING":
                        this.props.navigation.navigate('DocumentInbound', { rawData: url, data: { role: "LABELING", name: "Labeling", roleName: "LABELING", roleID: "M4756-2020", imageUrl: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg" } })
                        break
                    case "SDT_STORING":
                        this.props.navigation.navigate('DocumentInbound', { rawData: url, data: { role: "STORING", name: "Storing", roleName: "STORING", roleID: "M4756-2020", imageUrl: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg" } })
                        break

                    // outbound
                    case "SDT_OUTBOUND_DELIVERY":
                        this.props.navigation.navigate('DocumentOutbound', { rawData: url, data: { role: "OUTBOUND", name: "Outbound", roleName: "OUTBOUND", roleID: "M4756-2020", imageUrl: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg" } })
                        break
                    case "SDT_MATERIAL_PICKING":
                        this.props.navigation.navigate('DocumentOutbound', { rawData: url, data: { role: "PICKING", name: "Picking", roleName: "PICKING", roleID: "M4756-2020", imageUrl: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg" } })
                        break
                    case "SDT_MATERIAL_PACKING":
                        this.props.navigation.navigate('DocumentOutbound', { rawData: url, data: { role: "PACKING", name: "Packing", roleName: "PACKING", roleID: "M4756-2020", imageUrl: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg" } })
                        break
                    case "SDT_LOADING_ORDER":
                        this.props.navigation.navigate('DocumentOutbound', { rawData: url, data: { role: "LOADINGORDER", name: "Loading Order", roleName: "LOADINGORDER", roleID: "M4756-2020", imageUrl: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg" } })
                        break
                    case "SDT_GOOD_ISSUE":
                        this.props.navigation.navigate('DocumentOutbound', { rawData: url, data: { role: "GIS", name: "Good Issue", roleName: "GIS", roleID: "M4756-2020", imageUrl: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg" } })
                        break
                    case "SDT_SHIPPING":
                        this.props.navigation.navigate('DocumentOutbound', { rawData: url, data: { role: "SHIPPING", name: "Shipping", roleName: "SHIPPING", roleID: "M4756-2020", imageUrl: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg" } })
                        break

                    // internal process
                    case "SDT_PIR":
                        this.props.navigation.navigate('DocumentInternalProcess', { rawData: url, data: { role: "PURCHASEINFORECORD", name: "Purchase Info Record", roleName: "PURCHASEINFORECORD", roleID: "M4756-2020", imageUrl: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg" } })
                        break
                    case "SDT_PURCHASE_ORDER":
                        this.props.navigation.navigate('DocumentInternalProcess', { rawData: url, data: { role: "PO", name: "Purchase Order", roleName: "PO", roleID: "M4756-2020", imageUrl: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg" } })
                        break
                    case "SDT_PRODUCT_TRANSFER":
                        this.props.navigation.navigate('DocumentInternalProcess', { rawData: url, data: { role: "PT", name: "Product Transfer", roleName: "PT", roleID: "M4756-2020", imageUrl: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg" } })
                        break
                    case "SDT_SALES_ORDER":
                        this.props.navigation.navigate('DocumentInternalProcess', { rawData: url, data: { role: "SO", name: "Sales Order", roleName: "SO", roleID: "M4756-2020", imageUrl: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg" } })
                        break
                    case "SDT_INQUIRY":
                        this.props.navigation.navigate('DocumentInternalProcess', { rawData: url, data: { role: "INQUIRY", name: "Inquiry", roleName: "INQUIRY", roleID: "M4756-2020", imageUrl: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg" } })
                        break
                    case "SDT_QUOTATION":
                        this.props.navigation.navigate('DocumentInternalProcess', { rawData: url, data: { role: "QUOTATION", name: "Quotation", roleName: "QUOTATION", roleID: "M4756-2020", imageUrl: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg" } })
                        break
                    case "SDT_TRANSFER_ORDER":
                        this.props.navigation.navigate('DocumentInternalProcess', { rawData: url, data: { role: "TRANSFERORDER", name: "Transfer Order", roleName: "TRANSFERORDER", roleID: "M4756-2020", imageUrl: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg" } })
                        break
                    case "SDT_CLAIM":
                        this.props.navigation.navigate('DocumentInternalProcess', { rawData: url, data: { role: "IPCLAIM", name: "Claim", roleName: "IPCLAIM", roleID: "M4756-2020", imageUrl: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg" } })
                        break
                    case "SDT_BILLOF_LADING":
                        this.props.navigation.navigate('DocumentInternalProcess', { rawData: url, data: { role: "BILL", name: "Bill of Lading", roleName: "BILL", roleID: "M4756-2020", imageUrl: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg" } })
                        break
                    case "SDT_FREIGHT_CONTRACT":
                        this.props.navigation.navigate('DocumentInternalProcess', { rawData: url, data: { role: "FREIGHTCONTRACT", name: "Freight Contract", roleName: "FREIGHTCONTRACT", roleID: "M4756-2020", imageUrl: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg" } })
                        break
                    case "SDT_INVOICE":
                        this.props.navigation.navigate('DocumentInternalProcess', { rawData: url, data: { role: "INVOICE", name: "Invoice", roleName: "INVOICE", roleID: "M4756-2020", imageUrl: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg" } })
                        break
                    case "SDT_SHIPPING_INSTRUCTION":
                        this.props.navigation.navigate('DocumentInternalProcess', { rawData: url, data: { role: "SI", name: "Shipping Instruction", roleName: "SI", roleID: "M4756-2020", imageUrl: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg" } })
                        break
                    case "SDT_PURCHASE_REQUISITION":
                        this.props.navigation.navigate('DocumentInternalProcess', { rawData: url, data: { role: "PR", name: "Purchase Requisition", roleName: "PR", roleID: "M4756-2020", imageUrl: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg" } })
                        break
                    case "SDT_CLIENT_PO":
                        this.props.navigation.navigate('DocumentInternalProcess', { rawData: url, data: { role: "POC", name: "Purchase Order Customer", roleName: "POC", roleID: "M4756-2020", imageUrl: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg" } })
                        break
                    case "SDT_ASN":
                        this.props.navigation.navigate('DocumentInternalProcess', { rawData: url, data: { role: "ASN", name: "Shipping Notification", roleName: "INQUIRY", roleID: "M4756-2020", imageUrl: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg" } })
                        break
                    case "RESOLVE":
                        this.props.navigation.navigate('DocumentInternalProcess', { rawData: url, data: { role: "RESOLVE", name: "Resolve", roleName: "RESOLVE", roleID: "M4756-2020", imageUrl: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg" } })
                        break

                    // material
                    case "SDT_MATERIAL_BASEPRICE":
                        this.props.navigation.navigate('DocumentMaterial', { rawData: url, data: { role: "BASEPRICE", name: "Base Price", roleName: "BASEPRICE", roleID: "M4756-2020", imageUrl: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg" } })
                        break
                    case "SDT_MATERIAL_INVENTORY":
                        this.props.navigation.navigate('DocumentMaterial', { rawData: url, data: { role: "INVENTORY", name: "Inventory", roleName: "INVENTORY", roleID: "M4756-2020", imageUrl: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg" } })
                        break
                    case "SDT_MATERIAL_MOVEMENT":
                        this.props.navigation.navigate('DocumentMaterial', { rawData: url, data: { role: "MOVEMENT", name: "Movement", roleName: "MOVEMENT", roleID: "M4756-2020", imageUrl: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg" } })
                        break
                    case "SDT_MATERIAL_QUALITY":
                        this.props.navigation.navigate('DocumentMaterial', { rawData: url, data: { role: "QUALITY", name: "Quality", roleName: "QUALITY", roleID: "M4756-2020", imageUrl: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg" } })
                        break
                    case "SDT_MATERIAL_REPLENISHMENT":
                        this.props.navigation.navigate('DocumentMaterial', { rawData: url, data: { role: "REPLENISHMENT", name: "Replenishment", roleName: "REPLENISHMENT", roleID: "M4756-2020", imageUrl: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg" } })
                        break
                    case "SDT_MATERIAL_REPLENISHMENT_PICKING":
                        this.props.navigation.navigate('DocumentMaterial', { rawData: url, data: { role: "REPLENISHMENTPICK", name: "Replenishment Picking", roleName: "REPLENISHMENTPICK", roleID: "M4756-2020", imageUrl: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg" } })
                        break
                    case "SDT_MATERIAL_REPLENISHMENT_PACKING":
                        this.props.navigation.navigate('DocumentMaterial', { rawData: url, data: { role: "REPLENISHMENTPACK", name: "Replenishment Packing", roleName: "REPLENISHMENTPACK", roleID: "M4756-2020", imageUrl: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg" } })
                        break
                    case "SDT_MATERIAL_REPLENISHMENT_STORING":
                        this.props.navigation.navigate('DocumentMaterial', { rawData: url, data: { role: "REPLENISHMENTSTR", name: "Replenishment Storing", roleName: "REPLENISHMENTSTR", roleID: "M4756-2020", imageUrl: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg" } })
                        break
                    case "SDT_MATERIAL_STOCKOPNAME":
                        this.props.navigation.navigate('DocumentMaterial', { rawData: url, data: { role: "STOCKOPNAME", name: "Stock Opname", roleName: "STOCKOPNAME", roleID: "M4756-2020", imageUrl: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg" } })
                        break
                    case "SDT_MATERIAL_VALUATION":
                        this.props.navigation.navigate('DocumentMaterial', { rawData: url, data: { role: "VALUATION", name: "Valuation", roleName: "VALUATION", roleID: "M4756-2020", imageUrl: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg" } })
                        break

                    default: break
                }
            } else dialogVisible = true
        }
        this.setState({ fetching: false, dialogVisible })
    }

    handleDialog = () => {
        this.setState({ dialogVisible: false }, () => this.camera.resumePreview())
    }

    handleMeasure(event) {
        console.log("ev", event)
    }

    render() {
        const { fetching, dialogVisible, loaded, isFocused } = this.state
        const { params } = this.props.navigation.state
        // const isFocused = this.props.navigation.isFocused()
        return (
            <View style={{ flex: 1 }}>
                <View>
                    <NavbarMenu
                        onBack={() => this.props.navigation.goBack()}
                        title={params.title ? params.title : 'LevLog Ayes'} />
                </View>
                <NavigationEvents
                    onWillFocus={() => this.setState({ loaded: true })}
                    onDidBlur={() => this.setState({ loaded: true })} />
                <View style={{ flex: 1, backgroundColor: "#fff" }}>
                    {isFocused && loaded && (
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
                                onScanResult={this.barcodeReceived}
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
                { dialogVisible && <DialogQrInvalid action={this.handleDialog} navigation={this.props.navigation} close={() => this.setState({ dialogVisible: false })} />}
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
        changeStatus: (data) => dispatch(SealAction.changeStatus(data)),
        changeStatusMaterial: (data) => dispatch(SealAction.changeStatusMaterial(data)),
        changeStatusBQ: (data) => dispatch(SealAction.changeStatusBQ(data)),
        changeStatusHU: (data) => dispatch(SealAction.changeStatusHU(data))
    }
}

export default withNavigationFocus(connect(mapStateToProps, mapDispatchToProps)(QrScanner))