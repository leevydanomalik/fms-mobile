import React from 'react'
import { StyleSheet, ScrollView, View, TouchableOpacity, Text, Image, TextInput, Dimensions, FlatList, Alert, ListView, TouchableWithoutFeedback } from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/AntDesign'
import IonIcon from 'react-native-vector-icons/Ionicons'
import { ProgressiveImage } from '../Modules'
import { Colors } from '../../Themes'
import CardSliderCategory from './CardSliderCategory'
import CardListProduct from './CardListProduct'
import CardListCategory from './CardListCategory'
import Api from '../../Services/Api'
import BottombarMenu from '../Components/BottombarMenu'

const { width, height } = Dimensions.get('window')

class SalesMainScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: this.props.auth.user ? this.props.auth.user : [],
            modalNewCustomerVisible: false,
            activeMenu: "Home",
            message: [],
            dataThumbnail: [],
            dataPromo: [],
            dataRecomended: [],
            dataCategory: [],
            visibleMenu: true,
            activeTopic: "ALL"
        }
        webSocket = ""
    }

    componentDidMount() {
        // this.startWebSocket()
        this.getDataDocGw()
    }

    startWebSocket() {
        this.webSocket = new WebSocket('ws://157.230.245.250:9999/stream?token=CxUHHNj9r3FOowm')
        this.webSocket.onmessage = (e) => {
            // a message was received
            console.log("sock", JSON.parse(e.data))
            this.setMessage(JSON.parse(e.data))
        }
        this.webSocket.onerror = (e) => {
            // an error occurred
            console.log("websocket error : ", e.message);
        }

        this.webSocket.onclose = (e) => {
            // connection closed
            console.log("websocket close : ", e)
            // console.log(e.code, e.reason);
        }
    }

    setMessage(data) {
        data = data.message
        let message = Object.assign([], this.state.message)
        message.push(data)
        console.log("message", message)
        this.setState({ message })
    }

    getDataDocGw = async () => {
        let dataThumbnail = []
        let dataList = []
        let dataRecomended = []
        let dataPromo = []
        let dataCategory = []
        let payload = { limit: 5, offset: 0, params: {} }
        let res = await Api.create().getDocgw(payload)
        console.log("Get Data Docgw sales", res)
        if (res.data && res.data.status === "S") {
            res.data.data.map((val) => {
                const { contents, dcDesc } = val
                if (dcDesc === "MOBILE_LANDING_PAGE_SALES") {
                    contents.map((item) => {
                        if (item.title === "MOBILE_LANDING_PAGE_SALES_THUMBNAIL") dataThumbnail.push({ title: item.subTitle, image: item.messageImagePath, date: item.timeStamp, desc: item.messageBody })
                        else if (item.title === "MOBILE_LANDING_PAGE_SALES_PROMO_CONTENT") dataPromo.push({ title: item.subTitle, image: item.messageImagePath, promo: "PROMO", desc: item.messageBody })
                        else if (item.title === "MOBILE_LANDING_PAGE_SALES_RECOMENDED") dataRecomended.push({ title: item.subTitle, image: item.messageImagePath, date: item.timeStamp, desc: item.messageBody })
                        else if (item.title === "MOBILE_LANDING_PAGE_SALES_CATEGORY") dataCategory.push({ title: item.subTitle, image: item.messageImagePath })
                        else dataList.push({ title: item.subTitle, image: item.messageImagePath })
                    })
                    this.setState({ dataThumbnail, dataPromo, dataRecomended, dataList, dataCategory })
                }
            })
        }
    }

    render() {
        const { dataThumbnail, dataPromo, dataRecomended, dataCategory, activeMenu, activeTopic, message } = this.state

        let notifTotal = message.length

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

        const topics = [
            {
                label: "ALL",
                status: "active"
            },
            {
                label: "MESRAN",
                status: "inactive"
            },
            {
                label: "ROTRED",
                status: "inactive"
            },
            {
                label: "PREMINAXX",
                status: "inactive"
            },
            {
                label: "ENDURO",
                status: "inactive"
            },
            {
                label: "ENDURO TURBO",
                status: "inactive"
            }
        ]

        return (
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: "row", paddingTop: 10, paddingBottom: 10, paddingLeft: 20, paddingRight: 20, alignContent: "center", alignItems: 'center', width: "100%", backgroundColor: "#fff", top: 0, zIndex: 10 }}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{ height: 40, width: 40 }}>
                        <Icon size={24} style={{ top: 5 }} color="#000" name="arrowleft" />
                    </TouchableOpacity>
                    <View style={{ marginLeft: 0 }}>
                        <Text style={{ fontSize: 12, color: "#999" }}>Your Sales Code</Text>
                        <Text style={{ fontWeight: "bold", fontSize: 16, color: "#000" }}>P849484-JAKMANIA</Text>
                    </View>
                    <View style={{ position: "absolute", right: 20, flexDirection: "row", top: 15 }}></View>
                </View>

                <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>

                    <View style={{ flexDirection: "row", marginTop: 10, paddingLeft: 20, paddingRight: 20 }}>
                        <View style={{ borderRadius: 10, flexDirection: "row", flex: 0.85, borderWidth: 1, borderColor: "#ccc", alignItems: "center", paddingLeft: 10, paddingRight: 10, paddingTop: 7.5, paddingBottom: 7.5 }}>
                            <Icon name="search1" style={{ fontSize: 22, marginRight: 10, marginLeft: 5, color: Colors.main }} />
                            <TextInput placeholderTextColor="#999" style={{ padding: 0, width: "100%", fontSize: 14 }} underlineColorAndroid="transparent" placeholder="Find something useful" />
                        </View>
                        <View style={{ flex: 0.15, marginLeft: 5 }}>
                            <View style={{ position: "absolute", right: 5, top: 5, backgroundColor: Colors.main, height: 40, width: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 100 }}>
                                <Text style={{ fontSize: 10, color: "#fff" }}></Text>
                            </View>
                        </View>
                    </View>

                    <View style={{ marginLeft: 20, marginTop: 20, marginBottom: 20 }}>
                        <Text style={styles.textHeadStyle}>Hot offering for you</Text>
                    </View>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingTop: 0, paddingLeft: 20, paddingRight: 20, marginBottom: 15 }}>
                        {topics.map((data, index) => {
                            return (
                                <TouchableOpacity key={index} onPress={() => this.setState({ activeTopic: data.label })}>
                                    <View style={{ backgroundColor: data.label == activeTopic ? Colors.main : "#fff", borderWidth: 1, borderColor: data.label == activeTopic ? Colors.main : "#ccc", paddingLeft: 15, paddingRight: 15, paddingBottom: 10, paddingTop: 10, borderRadius: 100, marginRight: index + 1 == topics.length ? 0 : 10 }}>
                                        <Text style={{ color: data.label == activeTopic ? "#fff" : "#555", fontSize: 12 }}>{data.label}</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        })}
                    </ScrollView>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingLeft: 20, paddingRight: 20, paddingBottom: 20 }}>
                        {dataThumbnail.map((data, index) => {
                            return (
                                <TouchableWithoutFeedback key={index} onPress={() => this.props.navigation.navigate('SalesProductDetailScreen', { dataRecomended })}>
                                    <View style={{ elevation: 5, backgroundColor: Colors.main, padding: 10, borderRadius: 10, width: 300, height: 280, marginRight: index + 1 == dataThumbnail.length ? 0 : 15 }}>
                                        <View style={{ flex: 1 }}>
                                            <ProgressiveImage resizeMode="cover" style={{ borderRadius: 7.5, width: "100%", height: "100%" }} source={{ uri: data.image }} />
                                        </View>
                                        <Text style={{ marginTop: 10, marginBottom: 5, color: "#fff", fontWeight: "bold", fontSize: 16 }}>{data.title}</Text>
                                        <Text style={{ fontSize: 10, color: "#fff" }}>{data.date}</Text>
                                        <Text style={{ fontSize: 12, marginTop: 10, color: "#fff" }}>{data.desc}</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            )
                        })}
                    </ScrollView>

                    <View style={{ marginLeft: 20, marginTop: 10, marginBottom: 20 }}>
                        <Text style={styles.textHeadStyle}>Up to 50k Off</Text>
                        <Text style={{ fontSize: 12, marginTop: 10, color: "#999" }}>This vehicle must stop the engine while parking and please securing surrounding and confirm to loading master</Text>
                    </View>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingTop: 0, paddingLeft: 20, paddingRight: 20, marginBottom: 15 }}>
                        {dataPromo.map((data, index) => {
                            return (
                                <TouchableWithoutFeedback key={index} onPress={() => this.props.navigation.navigate('SalesProductDetailScreen', { dataRecomended })}>
                                    <View style={{ width: 180, height: 260, borderWidth: 1, borderColor: "#ccc", borderRadius: 10, marginRight: index + 1 == dataPromo.length ? 0 : 15 }}>
                                        <View style={{ width: "100%", height: 200, borderTopRightRadius: 10, borderTopLeftRadius: 10 }}>
                                            <View style={{ position: "absolute", top: 5, left: 5, padding: 5, paddingLeft: 10, paddingRight: 10, borderRadius: 20, alignItems: "center", alignContent: "center", backgroundColor: Colors.main, zIndex: 2 }}>
                                                <Text style={{ color: "#fff", fontSize: 10 }}>{data.promo}</Text>
                                            </View>
                                            <ProgressiveImage resizeMode="cover" style={{ borderTopRightRadius: 10, borderTopLeftRadius: 10, width: "100%", height: "100%" }} source={{ uri: data.image }} />
                                        </View>
                                        <View style={{ borderTopWidth: 1, borderTopColor: "#ccc", padding: 10 }}>
                                            <Text style={{ color: "#555", fontWeight: "bold", fontSize: 14 }}>{data.title}</Text>
                                            <Text style={{ fontSize: 12, color: "#999" }}>{data.desc}</Text>
                                        </View>
                                    </View>
                                </TouchableWithoutFeedback>
                            )
                        })}
                    </ScrollView>

                    <View style={{ marginLeft: 20, marginTop: 20, marginBottom: 20 }}>
                        <Text style={styles.textHeadStyle}>Explore from categories</Text>
                    </View>

                    <CardListCategory dataCategory={dataCategory} onPress={() => this.props.navigation.navigate('SalesProductCategoryScreen', { dataRecomended })} />

                    <View style={{ marginLeft: 20, marginRight: 20, marginTop: 20, marginBottom: 20 }}>
                        <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                            <Text style={styles.textHeadStyle}>Recomended Products</Text>
                            <TouchableOpacity>
                                <Text style={{ fontSize: 12, fontWeight: "bold", color: Colors.main }}>+ See All</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={{ fontSize: 12, marginTop: 10, color: "#999" }}>This vehicle must stop the engine while parking and please securing surrounding and confirm to loading master</Text>
                    </View>

                    <CardListProduct dataRecomended={dataRecomended} onPress={() => this.props.navigation.navigate('SalesProductDetailScreen', { dataRecomended })} />
                </ScrollView>

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

export default connect(mapStateToProps, mapDispatchToProps)(SalesMainScreen);