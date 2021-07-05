import React from 'react'
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
    ListView,
    Button
} from 'react-native'
import {connect} from 'react-redux'
import Icon from 'react-native-vector-icons/AntDesign'
import {ProgressiveImage} from './Modules'
import BottomSheet from "react-native-bottomsheet-reanimated"
import {Colors, Styles} from '../Themes'
import CardNotif from './Modules/CardNotif'
import CardProfile from './Modules/CardProfile'
import Toast from 'react-native-toast-message'
import Api from '../Services/Api'
import M from 'moment'
import AuthAction from '../Redux/AuthRedux'
import Config from 'react-native-config'
import {generateUrlPhoto} from '../Utils'
import messaging from '@react-native-firebase/messaging'
// import iid from '@react-native-firebase/iid'
import PushNotification from 'react-native-push-notification'
import DeviceInfo from 'react-native-device-info'
import BottombarMenu from './Components/BottombarMenu'
import CardSap from './Modules/CardSap'
import Enums from '../Lib/Enums'
import R from 'ramda'

const {width, height} = Dimensions.get('window')
const snapPoint = (height - (height - 90))

class CardToast extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            roleType
        }
    }

    render() {
        const {id, title, subtitle, description, date, onClose} = this.props
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
                                style={{borderRadius: 100, width: "100%", height: "100%"}}
                                sizeSpinner={25}
                                source={{
                                    uri: generateUrlPhoto(id),
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'DGI-API-KEY': Config.APP_WMS_AUTH_HEADER_VALUE
                                        // 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiJ9.5BG9SEVOGo_xRhtT8IkyoSy60kPg8HM9Vpvb0TdNew4'
                                    }
                                }}/>
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
                        <Icon name={"close"} size={16} color={"#999"}/>
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
            message: [],
            messageDummy: "{\"photo\": \"\",\"date\": \"0 Minutes Ago\",\"position\": \"Loan Manager\",\"userID\": \"U-002\",\"username\": \"Rio Partogi\",\"description\": \"Pengajuan loan dengan nomor 1584674890128 a/n Edwin Apriyanta telah diterima. Mohon menunggu proses persetujuan\"}",
            messageSelected: {},
            dataThumbnail: [],
            dataList: [],
            visibleMenu: true,
            isBottomScrolled: false,
            activeTopic: "ALL"
        }
        webSocket = ""
    }

    componentDidMount() {
        this.startWebSocket()
        this.getDataDocGw()
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
            this.setState({activeMenu: params.data, activeIndex: params.index})
        }
    }

    sendDataToken = async () => {
        await messaging().registerDeviceForRemoteMessages();
        const fcmToken = await messaging().getToken();
        // const fcmToken = await iid().getToken()
        console.log('YOUR FCM TOKEN :' ,fcmToken)

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
        let payload = {limit: 5, offset: 0, params: {}}
        let res = await Api.create().getDocgw(payload)
        console.log("Get Data Docgw", res)
        if (res.data && res.data.status === "S") {
            res.data.data.map((val) => {
                const {contents, dcDesc} = val
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
                    this.setState({dataThumbnail, dataList})
                }
            })
        }
    }

    setMessage = async (data) => {
        data = JSON.parse(data.message)
        let message = Object.assign([], this.state.message)
        message.push(data)
        this.setState({message})

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
            actions: [{type: 'Navigate', routeName: 'LoginScreen'}]
        })
    }

    renderInner() {
        const { auth } = this.props
        let menu = []
        if(auth.user && auth.user.data.userID) {
			const menus = n => {
				if (n.role == "all") return true
				return auth.user.data.roles.some(val => n.role == val)
			}
			menu = R.filter(menus, Enums.listMenu);
        }

        const secondMenu = [
            {
                label: "Material",
                icon: "home",
                submenu: [
                    {
                        label: "Good Receipt",
                        icon: "home",
                        onPress: (() => this.props.navigation.navigate('AnalyticScreen')),
                        notif: 0
                    },
                    {
                        label: "YND",
                        icon: "home",
                        onPress: (() => this.props.navigation.navigate('AnalyticScreen')),
                        notif: 4
                    },
                    {
                        label: "Picking",
                        icon: "home",
                        onPress: (() => this.props.navigation.navigate('AnalyticScreen')),
                        notif: 0
                    },
                    {
                        label: "Shipping",
                        icon: "home",
                        onPress: (() => this.props.navigation.navigate('AnalyticScreen')),
                        notif: 0
                    },
                    {
                        label: "Good Issue",
                        icon: "home",
                        onPress: (() => this.props.navigation.navigate('AnalyticScreen')),
                        notif: 0
                    },
                    {
                        label: "Transfer Order",
                        icon: "home",
                        onPress: (() => this.props.navigation.navigate('AnalyticScreen')),
                        notif: 0
                    },
                    {
                        label: "Replenishment",
                        icon: "home",
                        onPress: (() => this.props.navigation.navigate('AnalyticScreen')),
                        notif: 0
                    },
                    {
                        label: "More",
                        icon: "home",
                        onPress: (() => this.props.navigation.navigate('AnalyticScreen')),
                        notif: 0
                    }
                ]
            },
            {
                label: "Internal Process",
                icon: "home",
                submenu: [
                    {
                        label: "Good Receipt",
                        icon: "home",
                        onPress: (() => this.props.navigation.navigate('AnalyticScreen')),
                        notif: 0
                    },
                    {
                        label: "YND",
                        icon: "home",
                        onPress: (() => this.props.navigation.navigate('AnalyticScreen')),
                        notif: 4
                    },
                    {
                        label: "Picking",
                        icon: "home",
                        onPress: (() => this.props.navigation.navigate('AnalyticScreen')),
                        notif: 0
                    },
                    {
                        label: "Shipping",
                        icon: "home",
                        onPress: (() => this.props.navigation.navigate('AnalyticScreen')),
                        notif: 0
                    },
                    {
                        label: "Good Issue",
                        icon: "home",
                        onPress: (() => this.props.navigation.navigate('AnalyticScreen')),
                        notif: 0
                    },
                    {
                        label: "Transfer Order",
                        icon: "home",
                        onPress: (() => this.props.navigation.navigate('AnalyticScreen')),
                        notif: 0
                    },
                    {
                        label: "Replenishment",
                        icon: "home",
                        onPress: (() => this.props.navigation.navigate('AnalyticScreen')),
                        notif: 0
                    },
                    {
                        label: "More",
                        icon: "home",
                        onPress: (() => this.props.navigation.navigate('AnalyticScreen')),
                        notif: 0
                    }
                ]
            },
            {
                label: "External Party",
                icon: "home",
                submenu: [
                    {
                        label: "Good Receipt",
                        icon: "home",
                        onPress: (() => this.props.navigation.navigate('AnalyticScreen')),
                        notif: 0
                    },
                    {
                        label: "YND",
                        icon: "home",
                        onPress: (() => this.props.navigation.navigate('AnalyticScreen')),
                        notif: 4
                    },
                    {
                        label: "Picking",
                        icon: "home",
                        onPress: (() => this.props.navigation.navigate('AnalyticScreen')),
                        notif: 0
                    },
                    {
                        label: "Shipping",
                        icon: "home",
                        onPress: (() => this.props.navigation.navigate('AnalyticScreen')),
                        notif: 0
                    },
                    {
                        label: "Good Issue",
                        icon: "home",
                        onPress: (() => this.props.navigation.navigate('AnalyticScreen')),
                        notif: 0
                    },
                    {
                        label: "Transfer Order",
                        icon: "home",
                        onPress: (() => this.props.navigation.navigate('AnalyticScreen')),
                        notif: 0
                    },
                    {
                        label: "Replenishment",
                        icon: "home",
                        onPress: (() => this.props.navigation.navigate('AnalyticScreen')),
                        notif: 0
                    },
                    {
                        label: "More",
                        icon: "home",
                        onPress: (() => this.props.navigation.navigate('AnalyticScreen')),
                        notif: 0
                    }
                ]
            }
        ]

        let menuKedua = []

        return (
            <ScrollView scrollEnabled={true} style={{backgroundColor: '#fff', height: (height - 90)}}>
                {(
                    <View>
                        <FlatList
                            contentContainerStyle={{borderRadius: 10}}
                            keyExtractor={(item, index) => index.toString()}
                            numColumns={4}
                            data={menu}
                            renderItem={({item}) => {
                                return (
                                    <TouchableOpacity style={{
                                        height: 100,
                                        flex: 1,
                                        alignItems: "center",
                                        justifyContent: "center",
                                        padding: 10
                                    }} onPress={() => this.props.navigation.navigate(item.route, item.info)}>
                                        <View style={styles.buttonCircle}>
                                            {item.notif > 0 && (
                                                <View style={styles.notifLabel}>
                                                    <Text style={{
                                                        color: "#fff",
                                                        fontWeight: "bold",
                                                        fontSize: 12
                                                    }}>{item.notif}</Text>
                                                </View>
                                            )}
                                            <Icon name={item.icon} size={20} color={"#fff"}/>
                                        </View>
                                        <Text style={{
                                            color: "#000",
                                            marginTop: 5,
                                            textAlign: "center",
                                            fontSize: 11
                                        }}>{item.label}</Text>
                                    </TouchableOpacity>
                                )
                            }}
                        />
                    </View>
                )}
                {(
                    <View>
                        {menuKedua.map((data, index) => {
                            return (
                                <View key={index}
                                      style={{marginBottom: ((index + 1) == menuKedua.length) ? 0 : 5}}>
                                    <View style={{marginLeft: 20, marginTop: 10, marginBottom: 10}}>
                                        <Text style={styles.textHeadStyle}>
                                            {data.label}
                                        </Text>
                                    </View>
                                    <View style={{paddingTop: 0, paddingBottom: 0}}>
                                        <FlatList
                                            contentContainerStyle={{borderRadius: 10}}
                                            keyExtractor={(item, index) => index.toString()}
                                            numColumns={4}
                                            data={data.submenu}
                                            renderItem={({item}) => {
                                                return (
                                                    <TouchableOpacity style={{
                                                        height: 100,
                                                        flex: 1,
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        padding: 10
                                                    }} onPress={item.onPress}>
                                                        <View style={styles.buttonCircle}>
                                                            {item.notif > 0 && (
                                                                <View style={styles.notifLabel}>
                                                                    <Text style={{
                                                                        color: "#fff",
                                                                        fontWeight: "bold",
                                                                        fontSize: 12
                                                                    }}>{item.notif}</Text>
                                                                </View>
                                                            )}
                                                            <Icon name={item.icon} size={20} color={"#fff"}/>
                                                        </View>
                                                        <Text style={{
                                                            color: "#000",
                                                            marginTop: 5,
                                                            textAlign: "center",
                                                            fontSize: 11
                                                        }}>{item.label}</Text>
                                                    </TouchableOpacity>
                                                )
                                            }}
                                        />
                                    </View>
                                </View>
                            )
                        })}
                    </View>
                )}
                <View style={{paddingBottom: 30}}/>
            </ScrollView>
        )
    }

    renderHeader() {
        return (
            <View style={Styles.bottomSheetHeaderContainer}><View style={Styles.bottomSheetTip}/></View>
        )
    }

    renderHome = () => {
        const {activeTopic, dataThumbnail, dataList} = this.state
        const topics = [
            {
                label: "ALL",
                status: "active",
                onPress: (() => this.props.navigation.navigate('AnalyticScreen'))
            },
            {
                label: "COVID-19",
                status: "inactive",
                onPress: (() => this.props.navigation.navigate('AnalyticScreen'))
            },
            {
                label: "WMS",
                status: "inactive",
                onPress: (() => this.props.navigation.navigate('AnalyticScreen'))
            },
            {
                label: "DATA CENTER",
                status: "inactive",
                onPress: (() => this.props.navigation.navigate('AnalyticScreen'))
            },
            {
                label: "INBOUND",
                status: "inactive",
                onPress: (() => this.props.navigation.navigate('AnalyticScreen'))
            },
            {
                label: "OUTBOUND",
                status: "inactive",
                onPress: (() => this.props.navigation.navigate('AnalyticScreen'))
            }
        ]
        return (
            <View style={{flex: 1}}>
                <View style={{
                    flexDirection: "row",
                    paddingTop: 10,
                    paddingBottom: 10,
                    paddingLeft: 20,
                    paddingRight: 20,
                    alignItems: 'center',
                    width: "100%",
                    backgroundColor: "#fff",
                    top: 0,
                    zIndex: 0
                }}>
                    <TouchableOpacity style={{height: 40, width: 40}}>
                        <Icon name="home" size={40} color={Colors.main}/>
                    </TouchableOpacity>
                    <View style={{marginLeft: 10}}>
                        <Text style={{fontWeight: "bold", fontSize: 18, color: "#000"}}>56.67%</Text>
                        <Text style={{fontSize: 10}}>Unit Performance</Text>
                    </View>
                    <View style={{position: "absolute", right: 20, flexDirection: "row", top: 15}}>
                        <TouchableOpacity
                            onPress={() => {
                                let { message } = this.state
                                let data = this.state.messageDummy
                                message.push(data)
                                this.setState({message})
                            }}
                            style={{height: 30, width: 30, marginRight: 10}}>
                            <Icon name="home" size={30} color={Colors.main}/>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={() => this.props.navigation.navigate('ValidatorScreen', {role: 'CYCLECOUNT'})}
                            style={{height: 30, width: 30, marginRight: 10}}>
                            <Icon name="home" size={30} color={Colors.main}/>
                            {/* <View style={{ position: "absolute", right: 0, top: 0, backgroundColor: "red", height: 18, width: 18, alignItems: 'center', justifyContent: 'center', borderRadius: 100 }}>
                                <Text style={{ fontSize: 10, color: "#fff" }}>{notifTotal}</Text>
                            </View> */}
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={() => this.props.navigation.navigate('ValidatorScreen', {role: 'GATE'})}
                            style={{height: 30, width: 30}}>
                            <Icon name="home" size={30} color={Colors.main}/>
                        </TouchableOpacity>
                    </View>
                </View>

                <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>

                    <View
                        style={{flexDirection: "row", marginTop: 20, paddingTop: 0, paddingLeft: 20, paddingRight: 20}}>
                        <View style={{
                            borderRadius: 10,
                            flexDirection: "row",
                            flex: 0.85,
                            borderWidth: 1,
                            borderColor: "#ccc",
                            alignItems: "center",
                            paddingLeft: 10,
                            paddingRight: 10,
                            paddingTop: 7.5,
                            paddingBottom: 7.5
                        }}>
                            <Icon name="search1"
                                  style={{fontSize: 22, marginRight: 10, marginLeft: 5, color: Colors.main}}/>
                            <TextInput placeholderTextColor="#999" style={{padding: 0, width: "100%", fontSize: 14}}
                                       underlineColorAndroid="transparent" placeholder="Find something useful"/>
                        </View>
                        <View style={{flex: 0.15, marginLeft: 5}}>
                            <View style={{
                                position: "absolute",
                                right: 5,
                                top: 5,
                                backgroundColor: Colors.main,
                                height: 40,
                                width: 40,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 100
                            }}>
                                <Text style={{fontSize: 10, color: "#fff"}}></Text>
                            </View>
                        </View>
                    </View>

                    <View style={{marginLeft: 20, marginTop: 20, marginBottom: 20}}>
                        <Text style={styles.textHeadStyle}>Topics for you</Text>
                    </View>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{
                        paddingTop: 0,
                        paddingLeft: 20,
                        paddingRight: 20,
                        paddingBottom: 5
                    }}>
                        {topics.map((data, index) => {
                            return (
                                <TouchableOpacity key={index} onPress={() => this.setState({activeTopic: data.label})}>
                                    <View key={index} style={{
                                        backgroundColor: data.label == activeTopic ? Colors.main : "#fff",
                                        borderWidth: 1,
                                        borderColor: data.label == activeTopic ? Colors.main : "#ccc",
                                        paddingLeft: 15,
                                        paddingRight: 15,
                                        paddingBottom: 10,
                                        paddingTop: 10,
                                        borderRadius: 100,
                                        marginRight: index + 1 == topics.length ? 0 : 10
                                    }}>
                                        <Text style={{
                                            color: data.label == activeTopic ? "#fff" : "#555",
                                            fontSize: 12
                                        }}>{data.label}</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        })}
                    </ScrollView>

                    <View style={{marginLeft: 20, marginTop: 20, marginBottom: 20}}>
                        <Text style={styles.textHeadStyle}>Pertamina</Text>
                    </View>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{
                        paddingTop: 0,
                        paddingLeft: 20,
                        paddingRight: 20,
                        paddingBottom: 10
                    }}>
                        {dataThumbnail.map((data, index) => {
                            return (
                                <View key={index} style={{
                                    elevation: 5,
                                    backgroundColor: Colors.main,
                                    padding: 10,
                                    borderRadius: 10,
                                    width: 300,
                                    height: 280,
                                    marginRight: index + 1 == dataThumbnail.length ? 0 : 15
                                }}>
                                    <View style={{flex: 1}}>
                                        <ProgressiveImage resizeMode="cover"
                                                          style={{borderRadius: 7.5, width: "100%", height: "100%"}}
                                                          source={{uri: data.image}}/>
                                    </View>
                                    <Text style={{
                                        marginTop: 10,
                                        marginBottom: 5,
                                        color: "#fff",
                                        fontWeight: "bold",
                                        fontSize: 16
                                    }}>{data.title}</Text>
                                    <Text style={{
                                        fontSize: 10,
                                        color: "#fff"
                                    }}>{M(data.date, "DD-MM-YYYY").format("DD MMMM YYYY")}</Text>
                                    <Text style={{fontSize: 12, marginTop: 10, color: "#fff"}}>{data.desc}</Text>
                                </View>
                            )
                        })}
                    </ScrollView>

                    <View style={{paddingTop: 5, paddingLeft: 0, paddingRight: 0, paddingBottom: 30}}>
                        {dataList.map((data, index) => {
                            return (
                                <View key={index} style={{
                                    backgroundColor: "#fff",
                                    paddingBottom: 20,
                                    paddingTop: 10,
                                    paddingLeft: 20,
                                    paddingRight: 20,
                                    flex: 1,
                                    flexDirection: "row",
                                    borderBottomWidth: 1,
                                    borderBottomColor: "#ccc"
                                }}>
                                    <View style={{
                                        borderRadius: 10,
                                        width: 80,
                                        height: 80,
                                        borderWidth: 1,
                                        borderColor: "#ccc",
                                        marginRight: 15,
                                        marginTop: 10
                                    }}>
                                        <ProgressiveImage resizeMode="cover"
                                                          sizeSpinner={35}
                                                          style={{borderRadius: 10, width: "100%", height: "100%"}}
                                                          source={{uri: data.image}}/>
                                    </View>
                                    <View style={{flex: 1}}>
                                        <Text style={{
                                            marginBottom: 5,
                                            color: "#000",
                                            fontWeight: "bold",
                                            fontSize: 16
                                        }}>{data.title}</Text>
                                        <Text style={{
                                            fontSize: 12,
                                            marginTop: 5,
                                            marginBottom: 5,
                                            color: "#000"
                                        }}>{data.desc}</Text>
                                        <Text style={{
                                            fontSize: 10,
                                            color: "#999"
                                        }}>{M(data.date, "DD-MM-YYYY").format("DD MMMM YYYY")}</Text>
                                    </View>
                                </View>
                            )
                        })}
                    </View>
                </ScrollView>

                <BottomSheet
                    style={{zIndex: 15}}
                    bottomSheerColor="#FFFFFF"
                    initialPosition={snapPoint}
                    snapPoints={[height, snapPoint]}
                    isBackDrop={false}
                    isBackDropDismisByPress={false}
                    isRoundBorderWithTipHeader={false}
                    headerStyle={Styles.bottomSheetHeader}
                    header={this.renderHeader()}
                    body={this.renderInner()}
                />
            </View>
        )
    }

    render() {
        const {activeMenu, activeIndex, message} = this.state
        let notifTotal = message.length
        let roleType = ""
        let dataScreen = ""
        switch (this.props.auth.user && this.props.auth.user.data.userID) {
            case '1603392066498':
                roleType = 'OUTBOUND_DELIVERY_PICKING'
                page = (data) => this.props.navigation.navigate('PickingScreen', {
                    role: "PICKER",
                    card: "PICKER",
                    name: "Mr. Picker",
                    roleName: "PICKER",
                    roleID: "M4756-2020",
                    imageUrl: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg",
                    data
                })
                break;
            case '1603390810745':
                roleType = 'INBOUND_DELIVERY_PUTAWAY'
                page = (data) => this.props.navigation.navigate('PutawayScreen', {
                    role: "PUTAWAY",
                    card: "PUTAWAY",
                    name: "Mr. Putaway",
                    roleName: "PUTAWAY",
                    roleID: "M4756-2020",
                    imageUrl: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg",
                    data
                })
                break;
            case '1603391937360':
                roleType = 'PACKING_LABELING'
                page = (data) => this.props.navigation.navigate('LabelingScreen', {
                    card: "LABELING",
                    role: "LABELING",
                    name: "Mr. Labeling",
                    roleName: "LABELING",
                    roleID: "M4756-2020",
                    imageUrl: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg",
                    data
                })
                break;
            case '1603392016899':
                roleType = 'INBOUND_DELIVERY_STORING'
                page = (data) => this.props.navigation.navigate('StoringScreen', {
                    role: "STORING",
                    card: "STORING",
                    name: "Mr. Storing",
                    roleName: "STORING",
                    roleID: "M4756-2020",
                    imageUrl: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg",
                    data
                })
                break;
            // case '1603392117034':
            //     roleType = 'OUTBOUND_DELIVERY_PACKING'
            //     page = (data) => this.props.navigation.navigate('PackingScreen', {
            //         role: "PACKING",
            //         card: "PACKING",
            //         name: "Mr. Packing",
            //         roleName: "PACKING",
            //         roleID: "M4756-2020",
            //         imageUrl: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg",
            //         data
            //     })
            //     break;
            case '1603392162318':
                roleType = 'MATERIAL_TRANSFER_ORDER'
                page = (data) => this.props.navigation.navigate('TransferOrderScreen', {
                    role: "MTO",
                    card: "MTO",
                    name: "Mr. Transfer Order",
                    roleName: "MTO",
                    roleID: "M4756-2020",
                    imageUrl: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg",
                    data
                })
                break;
            default:
                roleType = ''
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
                        } :
                        // type == "OUTBOUND_DELIVERY_PACKING" ? dataScreen = {
                        //         screen: "PackingScreen",
                        //         info: {
                        //             role: "PACKING",
                        //             card: "PACKING",
                        //             name: "Mr. Packing",
                        //             roleName: "PACKING",
                        //             roleID: "M4756-2020",
                        //             imageUrl: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg",
                        //             data
                        //         }
                        //     } :
                            type == "INBOUND_DELIVERY_STORING" ? dataScreen = {
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
                                } :
                                type == "PACKING_LABELING" ? dataScreen = {
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
                                    } :
                                    type == "INBOUND_DELIVERY_PUTAWAY" ? dataScreen = {
                                            screen: "PutawayScreen",
                                            info: {
                                                role: "PUTAWAY",
                                                card: "PUTAWAY",
                                                name: "Mr. Putaway",
                                                roleName: "PUTAWAY",
                                                roleID: "M4756-2020",
                                                imageUrl: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg",
                                                data
                                            }
                                        } :
                                        type == "OUTBOUND_DELIVERY_PICKING" ? dataScreen = {
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
                break;
        }

        const navButton = [
            {
                label: "Home",
                icon: "home",
                notif: 4,
                size: 28
            },
            {
                label: "SAP",
                icon: "tool",
                notif: 0,
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
        return (
            <View style={{flex: 1}}>
                {activeMenu === "Home" ? this.renderHome() : null}
                {activeMenu === "SAP" ? <CardSap /> : null }
                {activeMenu === "Notification" ? <CardNotif roleType={roleType} page={page}/> : null}
                {activeMenu === "Profile" ? <CardProfile logout={() => this.onLogout()}/> : null}

                <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)}/>

                <View>
                    <BottombarMenu 
                        menu={navButton} 
                        activeIndex={activeIndex}
                        onChange={(data, index) => this.setState({activeMenu: data.label, activeIndex: index})} />
                </View>
            </View>
        )
    }
}

const toastConfig = {
    'toast_custom': (internalState) => {
        const {title, id, subtitle, description, date} = internalState.text1
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
                })}/>
        )
    }
}

const styles = StyleSheet.create({
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