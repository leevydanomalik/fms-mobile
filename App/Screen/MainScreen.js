import React, { useRef } from 'react'
import {
    Platform,
    StyleSheet,
    ScrollView,
    View,
    TouchableOpacity,
    Text,
    Image,
    TextInput,
    Dimensions,
    FlatList,
    Alert,
    Button
} from 'react-native'
import { connect } from 'react-redux'
import FaIcon from 'react-native-vector-icons/FontAwesome5'
import Icon from 'react-native-vector-icons/AntDesign'
import { ProgressiveImage } from './Modules'
import { Colors, Styles } from '../Themes'
import CardNotif from './Modules/CardNotif'
import CardProfile from './Modules/CardProfile'
import Toast from 'react-native-toast-message'
import Api from '../Services/Api'
import M from 'moment'
import AuthAction from '../Redux/AuthRedux'
import Config from 'react-native-config'
import { generateUrlPhoto } from '../Utils'
import messaging from '@react-native-firebase/messaging'
import PushNotification from 'react-native-push-notification'
import DeviceInfo from 'react-native-device-info'
import BottombarMenu from './Components/BottombarMenu'
import CardSap from './Modules/CardSap'
import Enums from '../Lib/Enums'
import R from 'ramda'
import CardHome from './Modules/CardHome'
import BottomSheet from 'reanimated-bottom-sheet'
import Pusher from 'pusher-js/react-native';

const { width, height } = Dimensions.get('window')
const endPoint = (height - 170)
const snapPoint = (height - (height / 2))

class CardMenu extends React.Component {
    render() {
        const { label, sublabel, description, version, icon, notif, isLarge, onPress, not_binding, isEmpty } = this.props
        return isEmpty ? (
            <View style={styles.buttonCircleContainer} />
        ) : (
                <TouchableOpacity
                    style={isLarge ? styles.buttonCircleContainer : styles.buttonListContainer}
                    onPress={() => onPress()}>
                    <View style={[
                        styles.buttonCircle,
                        !isLarge ? {
                            width: 45,
                            height: 45
                        } : {}
                    ]}>
                        {not_binding && (
                            <View style={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                padding: 5,
                                paddingTop: 2,
                                paddingBottom: 2,
                                borderRadius: 10,
                                backgroundColor: Colors.info
                            }}>
                                <Text style={{ color: '#fff', fontSize: 7 }}>NB</Text>
                            </View>
                        )}
                        {notif > 0 && (
                            <View style={[
                                styles.notifLabel, !isLarge ? {
                                    top: -5,
                                    right: -5,
                                } : {}
                            ]}>
                                <Text style={{
                                    color: "#fff",
                                    fontWeight: "bold",
                                    fontSize: 10,
                                    marginTop: -2,
                                }}>{notif}</Text>
                            </View>
                        )}
                        <Icon name={icon} size={20} color={"#fff"} />
                    </View>
                    {isLarge ? (
                        <Text style={{
                            color: "#000",
                            marginTop: 5,
                            textAlign: "center",
                            fontSize: 12
                        }}>{label}</Text>
                    ) : (
                            <View style={{
                                flex: 1,
                                paddingTop: 5,
                                paddingBottom: 15,
                                marginLeft: 20,
                                borderBottomColor: '#ccc',
                                borderBottomWidth: 0.5
                            }}>
                                <Text style={{
                                    color: "#000",
                                    fontSize: 16,
                                    fontWeight: "bold"
                                }}>
                                    {label} {sublabel ? sublabel : ""}
                                </Text>

                                <View style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "flex-start"
                                }}>
                                    {description && (
                                        <Text style={{
                                            color: Colors.grey,
                                            fontSize: 12
                                        }}>
                                            { description}
                                        </Text>
                                    )}
                                    {version && (
                                        <Text style={{
                                            color: Colors.grey,
                                            fontSize: 10
                                        }}>
                                            { version}
                                        </Text>
                                    )}
                                </View>
                            </View>
                        )}
                </TouchableOpacity>
            )
    }
}

class CardMenuContainer extends React.Component {
    constructor() {
        super()
        this.state = {
            newMenu: [],
            menu: []
        }
    }

    componentDidMount() {
        this.countData(this.props.menu, this.props.user)
        messaging().onMessage(async remoteMessage => {
            let newMenu = Object.assign([], this.state.newMenu)
            let menu = Object.assign([], this.state.menu)
            let isExist = R.findIndex(R.propEq("taskType", remoteMessage.data.title))(this.props.menu)
            if (isExist >= 0) {
                let payloads = { params: { humanTaskType: remoteMessage.data.title, status: "", assignment: this.props.user.data.userID } }
                let res = await Api.create().getCountHumanTaskListByAssignmentID(payloads)
                let notif = res.data.data
                newMenu[isExist] = { ...newMenu[isExist], notif }
                menu[isExist] = { ...menu[isExist], notif }
                this.setState({ newMenu, menu })
            }
        })
    }

    countData = async (menu, user) => {
        let newMenu = []
        let notif = 0
        menu && menu.map((dt) => {
            newMenu.push({ ...dt, isEmpty: false })
        })

        newMenu && newMenu.map(async (item, index) => {
            if (item.taskType != undefined) {
                let payloads = { params: { humanTaskType: item.taskType, status: "", assignment: user.data.userID } }
                let res = await Api.create().getCountHumanTaskListByAssignmentID(payloads)
                notif = res.data.data
                console.log("nottt", res)
                newMenu[index] = { ...item, notif }
                menu[index] = { ...menu[index], notif }
            }
            this.setState({ newMenu, menu })
            return null
        })
    }

    render() {
        const { column, isLarge, onPress } = this.props
        let newMenu = Object.assign([], this.state.newMenu)
        let menu = Object.assign([], this.state.menu)
        let countMenu = (menu.length % column)

        if (countMenu > 0) {
            let newLength = column - countMenu
            for (let index = 0; index < newLength; index++) {
                newMenu.push({ isEmpty: true })
            }
        }

        return isLarge ? (
            <FlatList
                contentContainerStyle={{ borderRadius: 0 }}
                keyExtractor={(item, index) => index.toString()}
                numColumns={column}
                data={newMenu}
                renderItem={({ item, index }) => {
                    return (
                        <CardMenu
                            key={index}
                            label={item.label}
                            icon={item.icon}
                            notif={item.notif}
                            isEmpty={item.isEmpty}
                            isLarge={isLarge}
                            not_binding={item.not_binding}
                            onPress={() => onPress(item.route, item.info)}
                        />
                    )
                }}
            />
        ) : (
                <View>
                    {menu && menu.map((item, index) => {
                        return (
                            <CardMenu
                                key={index}
                                label={item.label}
                                sublabel={item.sublabel}
                                description={item.description}
                                icon={item.icon}
                                version={item.version}
                                notif={item.notif}
                                isLarge={isLarge}
                                not_binding={item.not_binding}
                                onPress={() => onPress(item.route, item.info)}
                            />
                        )
                    })}
                </View>
            )
    }
}

class CardToast extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        const { id, title, subtitle, description, date, onClose } = this.props
        return (
            <View style={{
                width: '90%',
                backgroundColor: "#fff",
                borderColor: '#f5f5f5',
                borderWidth: 0.5,
                borderRadius: 10,
                elevation: 10,
                overflow: "hidden",
                flex: 1,
                flexDirection: "row"
            }}>
                <View style={{
                    width: 5,
                    height: "100%",
                    backgroundColor: Colors.main
                }}></View>
                <View style={{
                    flex: 1,
                    flexDirection: "row",
                    padding: 10
                }}>
                    <View style={{
                        width: 40,
                        marginRight: 10,
                    }}>
                        <View style={{
                            width: 40,
                            height: 40,
                            borderRadius: 50,
                            backgroundColor: "#f5f5f5"
                        }}>
                            <ProgressiveImage
                                resizeMode="cover"
                                style={{ borderRadius: 100, width: "100%", height: "100%" }}
                                sizeSpinner={25}
                                source={{
                                    uri: generateUrlPhoto(id),
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'DGI-API-KEY': Config.APP_WMS_AUTH_HEADER_VALUE
                                        // 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiJ9.5BG9SEVOGo_xRhtT8IkyoSy60kPg8HM9Vpvb0TdNew4'
                                    }
                                }} />
                        </View>
                    </View>
                    <View style={{
                        flex: 1
                    }}>
                        <View style={{
                            flex: 1,
                            flexDirection: "row",
                            justifyContent: "space-between"
                        }}>
                            <Text style={{
                                fontSize: 12,
                                fontWeight: "bold",
                                color: "#555"
                            }}>{title}</Text>
                            <Text style={{
                                fontSize: 10,
                                fontWeight: "normal",
                                color: "#999"
                            }}>{date}</Text>
                        </View>
                        <Text style={{
                            fontSize: 10,
                            fontWeight: "normal",
                            color: "#999"
                        }}>{subtitle}</Text>
                        <Text style={{
                            fontSize: 12,
                            fontWeight: "normal",
                            color: "#555"
                        }}>{description}</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={() => onClose()}>
                    <View style={{
                        width: 30,
                        paddingTop: 10,
                        height: '100%',
                        alignItems: "center",
                        alignContent: "flex-start"
                    }}>
                        <Icon name={"close"} size={16} color={"#999"} />
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

class MainScreen extends React.Component {
    constructor(props) {
        super(props)
        const { params } = props.navigation.state
        this.state = {
            user: this.props.auth.user ? this.props.auth.user : [],
            modalNewCustomerVisible: false,
            activeMenu: "Home",
            activeIndex: 0,
            tabIndex: 0,
            isLarge: true,
            isFull: false,
            message: [],
            messageDummy: "{\"photo\": \"\",\"date\": \"0 Minutes Ago\",\"position\": \"Loan Manager\",\"userID\": \"U-002\",\"username\": \"Rio Partogi\",\"description\": \"Pengajuan loan dengan nomor 1584674890128 a/n Edwin Apriyanta telah diterima. Mohon menunggu proses persetujuan\"}",
            messageSelected: {},
            dataThumbnail: [],
            dataList: [],
            visibleMenu: true,
            isBottomScrolled: false,
            activeTopic: "ALL",
            startSnap: endPoint
        }
        webSocket = ""
    }

    componentDidMount() {
        // this.startWebSocket()
        // this.getDataDocGw()
        this.startPusher()
        this.setToken()
        messaging().onMessage(async remoteMessage => {
            this.onDisplayNotification(remoteMessage)
            console.log('Cek Ombak Brayyy', JSON.stringify(remoteMessage));
        })
        this.sendDataToken()
    }

    componentDidUpdate(prevProps) {
        if (this.props.navigation.state !== prevProps.navigation.state) {
            const { params } = this.props.navigation.state
            console.log('data:', params.data)
            this.setState({ activeMenu: params.data, activeIndex: params.index })
        }
    }

    sendDataToken = async () => {
        await messaging().registerDeviceForRemoteMessages();
        const fcmToken = await messaging().getToken();
        console.log('YOUR FCM TOKEN :', fcmToken)

        let deviceId = await DeviceInfo.getDeviceId()
        const payload = {
            "tokenDeviceID": "TD-" + M().format('x'),
            "tokenDevice": fcmToken,
            "deviceID": deviceId,
            "userID": this.state.user.data.userID,
            "tokenDeviceStatus": "ACTIVE",
            "tokenDeviceCreationalDTO": {
                "createdBy": "MOBILE",
                "createdDate": M().format('DD-MM-YYYY HH:mm:ss'),
                "modifiedBy": null,
                "modifiedDate": null
            }
        }

        let sendTokenDevice = await Api.create().postToken(payload)
        console.log('Post Token Device: ', sendTokenDevice)

        this.setState({ fcmToken })
    }

    async onDisplayNotification(remoteMessage) {
        PushNotification.createChannel(
            {
                channelId: "wms_channel", // (required)
                channelName: "My channel", // (required)
                channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
                soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
                importance: 4, // (optional) default: 4. Int value of the Android notification importance
                vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
            },
            (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
        );

        PushNotification.localNotification({
            autoCancel: true,
            channelId: "wms_channel",
            bigText: remoteMessage.data.body,
            subText: 'FCM Demo',
            title: remoteMessage.data.title,
            message: remoteMessage.data.body,
            vibrate: true,
            vibration: 300,
            playSound: true,
            soundName: 'default'
        })
    }

    async setToken() {
        await messaging().registerDeviceForRemoteMessages();
        const token = await messaging().getToken();
        console.log("token", token)
    }

    startPusher() {
        var pusher = new Pusher('19ee1bf3817a716b8868', {
            cluster: 'ap1'
        });

        var channel = pusher.subscribe('fms-channel');
        channel.bind('fms-event', function (data) {
            console.log('dataaa', data)
            let datas = (data.message)
            let message = Object.assign([], this.state.message)
            message.push(datas)
            this.setState({ message })

            Toast.show({
                type: 'toast_custom',
                position: 'top',
                text1: {
                    id: datas.userID,
                    title: datas.username,
                    subtitle: datas.position,
                    description: datas.description,
                    date: datas.date,
                },
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

    startWebSocket() {
        this.webSocket = new WebSocket('wss://patlog.bitozenia.com/stream?token=CxUHHNj9r3FOowm')
        this.webSocket.onmessage = (e) => {
            // a message was received
            console.log("sock", JSON.parse(e.data))
            this.setMessage(JSON.parse(e.data))
        }
        this.webSocket.onerror = (e) => {
            // an error occurred
            console.log("websocket error : ", e.message);
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Web Socket Error',
                text2: e.message,
                visibilityTime: 4000,
                autoHide: true,
                elevation: 10,
                topOffset: 10,
                bottomOffset: 40,
                onShow: () => {
                },
                onHide: () => {
                }
            })
        }

        this.webSocket.onclose = (e) => {
            // connection closed
            console.log("websocket close : ", e)
            // console.log(e.code, e.reason);
        }
    }

    getDataDocGw = async () => {
        let dataThumbnail = []
        let dataList = []
        let payload = { limit: 5, offset: 0, params: {} }
        let res = await Api.create().getDocgw(payload)
        console.log("Get Data Docgw", res)
        if (res.data && res.data.status === "S") {
            res.data.data.map((val) => {
                const { contents, dcDesc } = val
                if (dcDesc === "MOBILE_LANDING_PAGE") {
                    contents.map((item) => {
                        if (item.title === "MOBILE_LANDING_PAGE_THUMBNAIL") dataThumbnail.push({
                            title: item.subTitle,
                            image: item.messageImagePath,
                            date: item.timeStamp,
                            desc: item.messageBody
                        })
                        else dataList.push({
                            title: item.subTitle,
                            image: item.messageImagePath,
                            date: item.timeStamp,
                            desc: item.messageBody
                        })
                    })
                    this.setState({ dataThumbnail, dataList })
                }
            })
        }
    }

    setMessage = async (data) => {
        data = JSON.parse(data.message)
        let message = Object.assign([], this.state.message)
        message.push(data)
        this.setState({ message })

        Toast.show({
            type: 'toast_custom',
            position: 'top',
            text1: {
                id: data.userID,
                title: data.username,
                subtitle: data.position,
                description: data.description,
                date: data.date,
            },
            visibilityTime: 4000,
            autoHide: true,
            elevation: 10,
            topOffset: 15,
            bottomOffset: 15,
            onShow: () => {
            },
            onHide: () => {
            }
        })
    }

    onLogout() {
        this.props.authLogout();
        this.props.navigation.dispatch({
            type: 'Navigation/RESET',
            index: 0,
            actions: [{ type: 'Navigate', routeName: 'LoginScreen' }]
        })
    }

    renderContent() {
        const { auth } = this.props
        const { isLarge, isFull } = this.state
        let menu = []
        let addon = []
        if (auth.user && auth.user.data.userID) {
            const menus = n => {
                if (n.role == "all") return true
                return auth.user.data.roles.some(val => n.role == val)
            }
            menu = R.filter(menus, Enums.listMenu)
        }
        if (auth.user && auth.user.data.userID) {
            const addons = n => {
                if (n.role == "all") return true
                return auth.user.data.roles.some(val => n.role == val)
            }
            addon = R.filter(addons, Enums.addonMenu)
        }

        return (
            <ScrollView
                scrollEnabled={true}
                style={{
                    backgroundColor: '#fff',
                    height: (endPoint - 90)
                }}>

                <TouchableOpacity
                    style={[styles.buttonToogle, {position: 'absolute', top: 0, right: 15}]}
                    onPress={() => this.setState({ isLarge: !this.state.isLarge })}
                >
                    <View style={[styles.buttonToogleItem, {
                        backgroundColor: isLarge ? Colors.white : null
                    }]}>
                        <FaIcon name={'th-large'} color={isLarge ? Colors.main : Colors.lightGrey} />
                    </View>
                    <View style={[styles.buttonToogleItem, {
                        backgroundColor: !isLarge ? Colors.white : null
                    }]}>
                        <FaIcon name={'th-list'} color={!isLarge ? Colors.main : Colors.lightGrey} />
                    </View>
                </TouchableOpacity>

                {menu.length > 0 && (
                    <View style={{
                        paddingLeft: 20,
                        paddingRight: 20,
                        paddingTop: 2,
                        paddingBottom: 10,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <Text style={styles.textHeadStyle}>Core Process</Text>
                    </View>
                )}

                {menu.length > 0 && (
                    <CardMenuContainer
                        menu={menu}
                        column={4}
                        user={auth.user}
                        isLarge={isLarge}
                        onPress={(route, info) => {
                            this.props.navigation.navigate(route, info)
                        }}
                    />
                )}

                {addon.length > 0 && (
                    <View style={{
                        paddingLeft: 20,
                        paddingRight: 20,
                        paddingTop: menu.length > 0 ? 20 : 2,
                        paddingBottom: 10,
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}>
                        <Text style={styles.textHeadStyle}>Add On</Text>
                    </View>
                )}

                {addon.length > 0 && (
                    <CardMenuContainer
                        menu={addon}
                        column={4}
                        user={auth.user}
                        isLarge={isLarge}
                        onPress={(route, info) => {
                            this.props.navigation.navigate(route, info)
                        }}
                    />
                )}

                <View style={{ paddingBottom: isLarge ? 10 : 0 }} />

                <View style={{ paddingBottom: isFull ? 0 : 255 }} />

            </ScrollView>
        )
    }

    renderHeader() {
        return (
            <View style={[
                Styles.bottomSheetHeaderContainer,
                styles.bottomSheetRadius
            ]}>
                <View style={Styles.bottomSheetTip} />
            </View>
        )
    }

    sheetRef = React.createRef()

    checkRole(role) {
        return role == "R_MOBILE_SAP";
    }

    render() {
        const { activeMenu, activeIndex, tabIndex, message, startSnap } = this.state
        let notifTotal = message.length
        let roleType = ""
        let dataScreen = ""
        let roleSap = false
        page = (data, type) => {
            type == "MATERIAL_TRANSFER_ORDER" ? dataScreen = {
                screen: "TransferOrderScreen",
                info: {
                    role: "MTO",
                    card: "MTO",
                    name: "Mr. Transfer Order",
                    roleName: "MTO",
                    roleID: "M4756-2020",
                    imageUrl: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg",
                    data
                }
            } : type == "INBOUND_DELIVERY_STORING" ? dataScreen = {
                screen: "StoringScreen",
                info: {
                    role: "STORING",
                    card: "STORING",
                    name: "Mr. Storing",
                    roleName: "STORING",
                    roleID: "M4756-2020",
                    imageUrl: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg",
                    data
                }
            } : type == "PACKING_LABELING" ? dataScreen = {
                screen: "LabelingScreen",
                info: {
                    card: "LABELING",
                    role: "LABELING",
                    name: "Mr. Labeling",
                    roleName: "LABELING",
                    roleID: "M4756-2020",
                    imageUrl: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg",
                    data
                }
            } : type == "OUTBOUND_DELIVERY_PICKING" ? dataScreen = {
                screen: "PickingScreen",
                info: {
                    role: "PICKER",
                    card: "PICKER",
                    name: "Mr. Picker",
                    roleName: "PICKER",
                    roleID: "M4756-2020",
                    imageUrl: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg",
                    data
                }
            } : type == "INBOUND_DELIVERY_GR" ? dataScreen = {
                screen: "GoodReceiptScreen",
                info: {
                    role: "GR",
                    card: "GR",
                    name: "Mr. Good Receipt",
                    roleName: "GOOD RECEIPT",
                    roleID: "M4756-2020",
                    imageUrl: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg",
                    data
                }
            } : type == "GATE_SECURITY" ? dataScreen = {
                screen: "GateScreen",
                info: {
                    role: "GATE",
                    card: "GATE",
                    name: "Mr. Gate Security",
                    roleName: "GATE SECURITY",
                    roleID: "M4756-2020",
                    imageUrl: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg",
                    data
                }
            } : type == "DRIVER_ASSIGNMENT" ? dataScreen = {
                screen: "DriverScreen",
                info: {
                    role: "DRIVER",
                    card: "DRIVER",
                    name: "Mr. Driver",
                    roleName: "DRIVER",
                    roleID: "M4756-2020",
                    imageUrl: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg",
                    data
                }
            } : type == "YARD_AND_DOCK" ? dataScreen = {
                screen: "YNDScreen",
                info: {
                    role: "DRIVER",
                    card: "DRIVER",
                    name: "Mr. Driver",
                    roleName: "DRIVER",
                    roleID: "M4756-2020",
                    imageUrl: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg",
                    data
                }
            } : type == "OUTBOUND_DELIVERY_GI" ? dataScreen = {
                screen: "GoodIssueScreen",
                info: {
                    role: "GI",
                    card: "GI",
                    name: "Mr. Good Issue",
                    roleName: "GOOD ISSUE",
                    roleID: "M4756-2020",
                    imageUrl: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg",
                    data
                }
            } : dataScreen = {
                screen: "PickingScreen",
                info: {
                    role: "PICKER",
                    card: "PICKER",
                    name: "Mr. Picker",
                    roleName: "PICKER",
                    roleID: "M4756-2020",
                    imageUrl: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg",
                    data
                }
            }
            this.props.navigation.navigate(dataScreen.screen, {
                role: dataScreen.info.role,
                card: dataScreen.info.card,
                name: dataScreen.info.name,
                roleName: dataScreen.info.roleName,
                roleID: dataScreen.info.roleID,
                imageUrl: dataScreen.info.imageUrl,
                data: dataScreen.info.data
            })
        }

        if (this.props.auth.user && this.props.auth.user.data.userID) roleSap = this.props.auth.user.data.roles.some(this.checkRole)

        let navButton = []

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
                notif: notifTotal,
                size: 24
            },
            {
                label: "Profile",
                icon: "user",
                notif: 1,
                size: 24
            }
        ]

        roleSap ? navButton.push(navButtons[0],
            {
                label: "SAP",
                icon: "tool",
                notif: 0,
                size: 28
            }, navButtons[1], navButtons[2]) : navButton = navButtons

        return (
            <View style={{ flex: 1 }}>
                {activeMenu === "Home" ? (
                    <CardHome
                        activeIndex={tabIndex}
                        onChange={(data) => {
                            console.log('home', data)
                            data === 3 ? this.sheetRef.current.snapTo(2) : this.sheetRef.current.snapTo(1)
                        }}
                        onPressProfile={() => this.props.navigation.navigate('ProfileScreen')} />
                ) : null}
                {activeMenu === "SAP" ? (
                    <CardSap />
                ) : null}
                {activeMenu === "Notification" ? (
                    <CardNotif
                        roleType={roleType}
                        page={page} />
                ) : null}
                {activeMenu === "Profile" ? (
                    <CardProfile
                        logout={() => this.onLogout()} />
                ) : null}

                {activeMenu === "Home" && (
                    // <BottomSheet
                    //     style={{zIndex: 15}}
                    //     bottomSheerColor="#fff"
                    //     initialPosition={snapPoint}
                    //     snapPoints={[endPoint, snapPoint]}
                    //     isBackDrop={false}
                    //     isBackDropDismisByPress={false}
                    //     isRoundBorderWithTipHeader={true}
                    //     containerStyle={styles.bottomSheetRadius}
                    //     headerStyle={[Styles.bottomSheetHeader, styles.bottomSheetRadius]}
                    //     header={this.renderHeader()}
                    //     body={this.renderContent()}
                    // />
                    <BottomSheet
                        ref={this.sheetRef}
                        // initialSnap={snapPoint}
                        snapPoints={[snapPoint, snapPoint, endPoint]}
                        borderRadius={0}
                        springConfig={{ backgroundColor: '#fff', borderColor: '#fff' }}
                        enabledContentGestureInteraction={false}
                        enabledInnerScrolling={false}
                        renderHeader={() => this.renderHeader()}
                        renderContent={() => this.renderContent()}
                        onOpenEnd={() => {
                            this.setState({
                                tabIndex: 3,
                                isFull: true
                            })
                        }}
                        onOpenStart={() => {
                            this.setState({
                                isFull: true
                            })
                        }}
                        onCloseEnd={() => {
                            this.setState({
                                tabIndex: 0,
                                isFull: false
                            })
                        }}
                    />
                )}

                <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />

                <View style={{ zIndex: 100 }}>
                    <BottombarMenu
                        menu={navButton}
                        activeIndex={activeIndex}
                        onChange={(data, index) => this.setState({ activeMenu: data.label, activeIndex: index })} />
                </View>
            </View>
        )
    }
}


const toastConfig = {
    'toast_custom': (internalState) => {
        const { title, id, subtitle, description, date } = internalState.text1
        return (
            <CardToast
                id={id}
                title={title}
                subtitle={subtitle}
                description={description}
                date={date}
                onClose={() => Toast.hide({
                    onHide: () => {
                    }
                })} />
        )
    }
}

const styles = StyleSheet.create({
    bottomSheetRadius: {
        backgroundColor: '#fff',
        height: 30,
        borderRadius: 0,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        bottom: -1
    },
    buttonListContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: 20,
        paddingTop: 15,
        paddingBottom: 0
    },
    buttonCircleContainer: {
        width: 50,
        minHeight: 90,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10
    },
    buttonCircle: {
        elevation: 3,
        height: 50,
        width: 50,
        backgroundColor: Colors.main,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    notifLabel: {
        position: "absolute",
        right: 0,
        top: 0,
        backgroundColor: "red",
        height: 20,
        width: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100
    },
    textHeadStyle: {
        fontSize: 16,
        color: "#000",
        fontWeight: "bold"
    },
    textStyle: {
        paddingTop: 10,
        color: "#fff",
        fontSize: 16,
        textAlign: "left"
    },
    buttonToogle: {
        padding: 2,
        width: 84,
        borderRadius: 5,
        backgroundColor: Colors.whiteGrey,
        flexDirection: 'row'
    },
    buttonToogleItem: {
        width: 40,
        height: 25,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
    }
})

const mapStateToProps = state => {
    return {
        auth: state.auth
    };
};

const mapDispatchToProps = dispatch => {
    return {
        authLogout: () => dispatch(AuthAction.authLogout())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);