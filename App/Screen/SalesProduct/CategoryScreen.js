import React from 'react'
import { StyleSheet, ScrollView, View, TouchableOpacity, Text, Image, TextInput, Dimensions, FlatList, Alert, ListView } from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/AntDesign'
import IonIcon from 'react-native-vector-icons/Ionicons'
import { ProgressiveImage } from '../Modules'
import { Colors } from '../../Themes'
import CardListProduct from './CardListProduct'

const { width, height } = Dimensions.get('window')

class CategoryScreen extends React.Component {
    constructor(props) {
        super(props)
        const { params } = props.navigation.state
        this.state = {
            user : this.props.auth.user ? this.props.auth.user : [],
            modalNewCustomerVisible: false,
            activeMenu: "Home",
            message: [],
            visibleMenu: true,
            activeTopic:  "ALL",
            dataRecomended: params.dataRecomended
        }
        webSocket = ""
    }

    componentDidMount() {
        this.startWebSocket()
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

    render() {
        const { activeMenu, activeTopic, message, dataRecomended } = this.state

        let notifTotal = message.length
        
        const topics = [
            {
                label: "ALL",
                status: "active"
            },
            {
                label: "PROMO",
                status: "inactive"
            },
            {
                label: "DISCOUNT 25%",
                status: "inactive"
            },
            {
                label: "DOOR TO DOOR",
                status: "inactive"
            },
            {
                label: "MESRAN",
                status: "inactive"
            },
            {
                label: "ENDURO TURBO",
                status: "inactive"
            }
        ]

        return (
            <View style={{ flex: 1 }}>
                {/* <View style={{ flexDirection: "row", paddingTop: 10, paddingBottom: 10, paddingLeft: 20, paddingRight: 20, alignContent: "center", alignItems: 'center', width: "100%", backgroundColor: Colors.main, top: 0, zIndex: 10 }}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{ height: 40, width: 40 }}>
                        <IonIcon size={40} color="#fff" name="ios-arrow-round-back" />
                    </TouchableOpacity>
                    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                        <Text style={{ fontWeight: "bold", fontSize: 16, color: "#fff" }}>Category List</Text>
                    </View>
                    <View style={{ height: 40, width: 40 }}></View>
                </View> */}

                <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>

                    <View style={{ padding: 10, backgroundColor: Colors.main, alignItems: "center" }}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{ position: 'absolute', left: 0, top: 5, padding: 10, paddingTop: 0 }}>
                            <Icon size={30} color="#fff" name="ios-arrow-round-back" />
                        </TouchableOpacity>
                        <Text style={{ color: "#fff", fontSize: 16, fontWeight: 'bold' }}>Category List</Text>
                    </View>

                    <View style={{ flexDirection: "row", marginTop: 20, paddingLeft: 20, paddingRight: 20 }}>
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

                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ marginTop: 20, paddingLeft: 20, paddingRight: 20, marginBottom: 20 }}>
                        {topics.map((data, index) => {
                            return (
                                <TouchableOpacity onPress={() => this.setState({activeTopic : data.label})}>
                                    <View key={index} style={{ backgroundColor: data.label == activeTopic ? Colors.main : "#fff", borderWidth: 1, borderColor: data.label == activeTopic ? Colors.main : "#ccc", paddingLeft: 15, paddingRight: 15, paddingBottom: 10, paddingTop: 10, borderRadius: 100, marginRight: index + 1 == topics.length ? 0 : 10 }}>
                                        <Text style={{color: data.label == activeTopic ? "#fff" : "#555", fontSize: 12}}>{data.label}</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        })}
                    </ScrollView>

                    <CardListProduct dataRecomended={dataRecomended} onPress={() => this.props.navigation.navigate('SalesProductDetailScreen', { dataRecomended })} />
                </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(CategoryScreen);