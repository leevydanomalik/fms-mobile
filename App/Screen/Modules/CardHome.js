import React, { Component } from 'react'
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
import Icon from 'react-native-vector-icons/AntDesign'
import { connect } from 'react-redux'
import Config from 'react-native-config'
import { Styles, Colors } from '../../Themes'
import ProgressiveImage from './ProgressiveImage'
import { generateUrlPhoto } from '../../Utils'
import forklip from '../../assets/forklip.png'

const {width, height} = Dimensions.get('window')

class Navbar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activeIndex: props.activeIndex ? props.activeIndex : 0
        }
    }

    componentDidUpdate (prevProps) {
        if (this.props.activeIndex !== prevProps.activeIndex) {
            this.setState({activeIndex: this.props.activeIndex})
        }
    }

    render () {
        const {activeIndex} = this.state
        const {data, onChange} = this.props
        return (
            <View style={styles.navbarContainer}>
                {data && data.map((dt, index) => {
                    const stt = (activeIndex === index) ? true : false
                    return (
                        <TouchableOpacity 
                            key={index} 
                            style={[
                                styles.navbarButton,
                                stt ? styles.navbarButtonActive : null
                            ]}
                            onPress={() => {
                                this.setState({activeIndex: index})
                                onChange(index)
                            }}
                        >
                            <Icon name={dt.icon} color={Colors.white} size={16} />
                            <Text style={styles.navbarLabel}>{dt.label}</Text>
                            {dt.notif > 0 && (
                                <View style={[styles.notifLabel]}>
                                    <Text style={{
                                        color: "#fff",
                                        fontWeight: "bold",
                                        fontSize: 10
                                    }}>
                                        {dt.notif}
                                    </Text>
                                </View>
                            )}
                        </TouchableOpacity>
                    )
                })}
            </View>
        )
    }
}

class CardProfile extends Component {
    render () {
        const {data, onPress} = this.props
        console.log('profile', data.esCommonDTO)
        return (
            <View style={{ padding: 15, flexDirection: "row", justifyContent: "space-between" }}>
                <View style={{ flex: 1 }}>
                    <TouchableOpacity 
                        onPress={() => onPress()} 
                        style={{ marginLeft: 0 }}>
                        <Text style={[ Styles.textHeader, { fontSize: 18, color: Colors.textDarkDisabled, marginBottom: 5, textTransform: "uppercase" } ]}>{data ? data.userName : "-"}</Text>
                        <Text style={{ fontSize: 14, color: Colors.textDarkDisabled }}>{data.employeeID.empName}</Text>
                        {/* email */}
                        <Text style={{ fontSize: 14, color: Colors.textDarkDisabled }}>{data.employeeID.empEmail ? data.employeeID.empEmail : "NONE"}</Text> 
                        {/* phone number */}
                        <Text style={{ fontSize: 14, color: Colors.textDarkDisabled }}>{data.employeeID.empPhone ? data.employeeID.empPhone : "NONE"}</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity 
                    onPress={() => onPress()}
                    style={{ height: 90, width: 90, borderRadius: 100, backgroundColor: Colors.white }} >
                    <ProgressiveImage
                        resizeMode="cover" 
                        style={{ borderRadius: 100, width: "100%", height: "100%", backgroundColor: Colors.white }}
                        source={{
                            uri: generateUrlPhoto(data && data.userID),
                            headers: {
                                'Content-Type': 'application/json',
                                'DGI-API-KEY': Config.APP_WMS_AUTH_HEADER_VALUE
                                // 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiJ9.5BG9SEVOGo_xRhtT8IkyoSy60kPg8HM9Vpvb0TdNew4'
                            }
                        }} />
                    <View style={{ 
                        position: 'absolute',
                        bottom: -2,
                        right: 5,
                        backgroundColor: Colors.main, 
                        width: 22, 
                        height: 22, 
                        borderRadius: 100,
                        borderColor: '#fff',
                        borderWidth: 2
                    }}></View>
                </TouchableOpacity>
            </View>
        )
    }
}

class CardHome extends Component {
    render () {
        return (
            <View style={{alignItems: 'center'}}>
                <View style={{
                    top: -30,
                    left: -70,
                }}>
                    <Image 
                        style={{width: (width + 130), height: (width + 130)}}
                        resizeMode={'contain'}
                        source={forklip}
                    />
                </View>
            </View>
        )
    }
}

class CardMainContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: this.props.auth.user,
            activeIndex: props.activeIndex ? props.activeIndex : 0
        }
    }

    componentDidUpdate (prevProps) {
        if (this.props.activeIndex !== prevProps.activeIndex) {
            this.setState({activeIndex: this.props.activeIndex})
        }
    }

    render () {
        const { data } = this.state.user
        const { activeIndex } = this.state
        const { onPressProfile, onChange } = this.props

        return (
            <View style={{backgroundColor: Colors.home}}>
                <View>
                    <Navbar 
                        data={menu}
                        activeIndex={activeIndex}
                        onChange={(index) => {
                            this.setState({activeIndex: index})
                            onChange(index)
                        }}
                    />
                </View>
                <ScrollView style={{ height: (height - 112) }}>
                    {activeIndex === 0 && (
                        <CardHome />
                    )}
                    {activeIndex === 1 && (
                        <View style={{alignItems: 'center'}}>
                            <Text style={[ Styles.textHeader, { fontSize: 20, color: "#fff", marginBottom: 5 } ]}>CHAT</Text>
                        </View>
                    )}
                    {activeIndex === 2 && (
                        <View style={{alignItems: 'center'}}>
                            <Text style={[ Styles.textHeader, { fontSize: 20, color: "#fff", marginBottom: 5 } ]}>PROMO</Text>
                        </View>
                    )}
                    {activeIndex === 3 && (
                        <CardProfile data={data} onPress={() => onPressProfile()} />
                    )}
                    {/* <View style={{height: 2000}}></View> */}
                </ScrollView>
            </View>
        )
    }
}

const menu = [
    {
        label: 'Home',
        icon: 'home',
        notif: 0
    },
    {
        label: 'Chat',
        icon: 'message1',
        notif: 3
    },
    {
        label: 'Promo',
        icon: 'staro',
        notif: 1
    },
    {
        label: 'Profile',
        icon: 'user',
        notif: 0
    }
]

const styles = StyleSheet.create({
    navbarContainer: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    navbarButton: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 32,
        // padding: 10,
        paddingLeft: 12,
        paddingRight: 12,
        borderRadius: 45
    },
    navbarButtonActive: {
        backgroundColor: Colors.homeLight
    },
    navbarLabel: {
        fontSize: 14,
        color: Colors.white,
        marginLeft: 5
    },
    notifLabel: {
        position: "absolute",
        right: 0,
        top: 0,
        backgroundColor: "red",
        height: 15,
        width: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100
    },
})

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, null)(CardMainContainer)