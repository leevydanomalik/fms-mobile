import React, { Component } from 'react'
import { View, TouchableOpacity, Text, Image, ScrollView, StyleSheet } from 'react-native'
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import FaIcon from 'react-native-vector-icons/FontAwesome'
import { connect } from 'react-redux'
import Config from 'react-native-config'
import ProgressiveImage from './ProgressiveImage'
import { generateUrlPhoto } from '../../Utils'
import { Colors } from '../../Themes'
import ButtonNext from '../Components/ButtonNext'
import NavbarMenu from '../Components/NavbarMenu'

class CardVerify extends Component {
    render() {
        return (
            <View style={{ 
                flexDirection: "row", 
                backgroundColor: Colors.main, 
                borderRadius: 40, 
                padding: 5
            }}>
                <View style={{ 
                    flex: 1,
                    paddingLeft: 15,
                    paddingRight: 15,
                    justifyContent: 'center'
                }}>
                    <Text style={{ 
                        color: "#fff",
                        fontSize: 14,
                        fontWeight: 'normal'
                    }}>
                        Please verify your email address
                    </Text>
                </View>
                <View style={{ 
                    width: 70, 
                    height: 30,
                    backgroundColor: "#fff", 
                    borderRadius: 40, 
                    justifyContent: "center", 
                    alignItems: "center" 
                }}>
                    <Text style={{ 
                        color: Colors.black, 
                        textAlign: "center", 
                        fontWeight: "bold",
                        fontSize: 14
                    }}>
                        Verify
                    </Text>
                </View>
            </View>
        )
    }
}

class CardSpace extends Component {
    render() {
        const {title} = this.props
        return (
            <View style={{ padding: 15, paddingBottom: 5, backgroundColor: "#fff", flexDirection: "row", alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ paddingRight: 20, flexDirection: "row", alignItems: "center" }}>
                    <Text style={styles.title}>
                        {title}
                    </Text>
                </View>
            </View>
        )
    }
}

class CardMenu extends Component {
    render() {
        const {title, value, notif} = this.props
        return (
            <TouchableOpacity style={{ flex: 1, flexDirection: 'row', alignItems: 'center', padding: 15, paddingTop: 10, paddingBottom: 10, borderBottomWidth: 0.5, borderColor: "#ccc" }}>
                <View style={{ height: 45, width: 40, alignItems: 'flex-start', justifyContent: 'center' }} >
                    <MatIcon name={"shield-check-outline"} color={Colors.black} size={26} />
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <Text style={{ color: Colors.black, fontSize: 14, fontWeight: "bold" }}>{title}</Text>
                    {notif > 0 ? (
                        <View style={{ width: 17, height: 17, borderRadius: 100, backgroundColor: 'red', alignItems: 'center', justifyContent: 'center', top: -5, left: 5 }}>
                            <Text style={{ fontSize: 10, color: '#fff' }}>{notif}</Text>
                        </View>
                    ) : null}
                </View>
                <Text style={{ color: Colors.black, fontSize: 13 }}>{value ? value : ''}</Text>
                <View style={{ height: 45, width: 25, alignItems: 'center', justifyContent: 'center' }} >
                    <FaIcon name={"angle-right"} color={Colors.lightGrey} size={26} />
                </View>
            </TouchableOpacity>
        )
    }
}

class CardProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            collapse: true,
            user: this.props.auth.user
        }
    }

    render() {
        const { data } = this.state.user
        const { back, logout } = this.props
        const accountList = [
            { title: "Job History", notif: 4, value: '+555' },
            { title: "Work In Progress", notif: 4, value: '+12' },
            { title: "Pinalty", notif: 0, value: '+2' },
            { title: "Reward", notif: 0, value: '+2' },
            { title: "Biodata", notif: 0, value: '' }
        ]
        const generalList = [
            { title: "Privacy Policy", notif: 0, value: '' },
            { title: "Term of Service", notif: 0, value: '' },
            { title: "Language", notif: 0, value: '' },
            { title: "Help", notif: 0, value: '' },
            { title: "Version", notif: 0, value: 'v 1.23.0' }
        ]
        console.log('profile', data.employeeID)
        return (
            <View style={{ flex: 1, backgroundColor: "#fff" }}>
                <NavbarMenu 
                    onBack={back ? () => back() : null}
                    title={'My Profile'}
                    titlePosition={'left'}
                    type={'primary'}
                />
                <ScrollView>
                    <View style={{ 
                        flexDirection: "row", 
                        padding: 15, 
                        backgroundColor: "#fff" 
                    }}>
                        <View style={{ 
                            backgroundColor: Colors.main, 
                            width: 38, 
                            height: 38, 
                            borderRadius: 100, 
                            alignItems: "center",
                            marginRight: 15, 
                        }}>
                            <Text style={{ 
                                color: "#fff", 
                                fontSize: 24, 
                                fontWeight: "bold",
                                top: 1
                            }}>
                                {data ? data.userName.charAt(0).toUpperCase() : "-"}
                            </Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={[styles.title, {marginBottom: 5, textTransform: 'uppercase'}]}>
                                {data ? data.userName : "-"}
                            </Text>
                            <Text style={styles.subtitle}>{data.employeeID.empName}</Text>
                            {/* email */}
                            <Text style={styles.subtitle}>{data.employeeID.empEmail ? data.employeeID.empEmail : "NONE"}</Text> 
                            {/* phone number */}
                            <Text style={styles.subtitle}>{data.employeeID.empPhone ? data.employeeID.empPhone : "NONE"}</Text>
                        </View>
                        <View style={{ height: 90, width: 90, borderRadius: 100 }} >
                            <ProgressiveImage
                                resizeMode="cover" 
                                style={{ 
                                    borderRadius: 100, 
                                    width: "100%", 
                                    height: "100%",
                                    backgroundColor: Colors.whiteGrey
                                }}
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
                        </View>
                    </View>

                    <View style={{ backgroundColor: "#fff", padding: 15 }}>
                        <CardVerify />
                    </View>

                    <View style={{ backgroundColor: "#fff", marginBottom: 15 }}>
                        <CardSpace title={'Account'} />
                        {accountList.map((val, index) => {
                            const { title, value, notif } = val
                            return (
                                <CardMenu 
                                    key={index} 
                                    title={title} 
                                    value={value}
                                    notif={notif}
                                />
                            )
                        })}
                    </View>

                    <View style={{ backgroundColor: "#fff" }}>
                        <CardSpace title={'General'} />
                        {generalList.map((val, index) => {
                            const { title, value, notif } = val
                            return (
                                <CardMenu 
                                    key={index} 
                                    title={title} 
                                    value={value}
                                    notif={notif}
                                />
                            )
                        })}
                    </View>

                    <View style={{ backgroundColor: "#fff", padding: 15, paddingTop: 30, paddingBottom: 30 }}>
                        <ButtonNext 
                            onPress={() => logout()}
                            enableBorderRadius={true}
                            type={'error-reverse'}
                            title={'LOGOUT'}
                        />
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        color: Colors.black,
        fontWeight: 'bold'
    },
    subtitle: {
        fontSize: 14, 
        color: Colors.black,
        fontWeight: 'normal'
    }
})

const mapStateToProps = state => {
    return {
        auth: state.auth,
        state: state
    }
}

export default connect(mapStateToProps, null)(CardProfile)