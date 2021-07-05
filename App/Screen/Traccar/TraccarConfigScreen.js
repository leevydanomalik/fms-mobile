import React, { Component } from 'react'
import { View, Text, Dimensions, TextInput, Button, FlatList, Switch, UIManager, findNodeHandle, StyleSheet } from 'react-native'
import { normalize, hasLocationPermission } from '../../Utils'
import AnIcon from 'react-native-vector-icons/AntDesign'
import FIcon from 'react-native-vector-icons/Feather'
import Ripple from 'react-native-material-ripple'
import { connect } from 'react-redux'
import ConfigAction from '../../Redux/ConfigRedux'
import AuthAction from '../../Redux/AuthRedux'
import { Dialog } from 'react-native-simple-dialogs'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import Api from '../../Services/Api'
import Geolocation from 'react-native-geolocation-service'
import M from 'moment'
import apisauce from 'apisauce';
// import firebase from '@react-native-firebase/app'
// import notifications from '@react-native-firebase/notifications'
import BackgroundJob from "react-native-background-job";
import DeviceInfo from 'react-native-device-info'
import {Colors} from '../../Themes'

const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
} = Dimensions.get('window');

class Header extends Component {
    _onMenuPressed() {
        let menu = ['Map View']
        // let menu = ['Map View','About', 'Logout']

        UIManager.showPopupMenu(
			findNodeHandle(this.btnOption),
			menu,
			() => {},
			(result, value) => {
                if(result == "itemSelected") {
                    if (value == 0) {
                        this.props.nav.navigate('TraccarMapScreen')
                    // } else if (value == 1) {
                    //     this.props.nav.navigate('AboutScreen')
                    // } else if (value == 2) {
                    //     this.props.logout()
                    //     this.props.nav.navigate('LoginScreen')
                    }
                }
			}
		);
    }

    render() {
      return (
        <View style={{ backgroundColor: Colors.main, height: 0.06 * SCREEN_HEIGHT, shadowColor: "#000", shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.27, shadowRadius: 4.65, elevation: 5 }}>
            <View style={{ flex: 1, flexDirection: "row", alignItems: "center", paddingLeft: 0, paddingRight: 0 }}>
                <Ripple 
                    onPress={() => this.props.nav.goBack()}
                    style={{ flex: 0.1, padding: 20, paddingLeft: 15, paddingRight: 15 }}>
                    <AnIcon size={30} color="#fff" name="arrowleft" />
                </Ripple>
                <View style={{ flex: 1 }}>
                    <Text style={{ color: "#fff", fontSize: normalize(14), fontWeight: "400"  }}>Bitozen Client</Text>
                </View>
                <View style={{ justifyContent: "flex-end", flex: 0.3, flexDirection: "row", alignItems: "center" }}>
                    <Ripple style={{ padding: 10, paddingTop: 20, paddingBottom: 20 }} onPress={() => this.props.nav.navigate('TraccarStatusScreen')}>
                        <Text style={{ color: "#fff", fontSize: normalize(12) }}>STATUS</Text>
                    </Ripple>
                    <Ripple style={{ padding: 20, paddingRight: 15, paddingLeft: 10 }} onPress={() => this._onMenuPressed()} ref={input => { this.btnOption = input }}>
                        <FIcon name="more-vertical" style={{ color: "#fff", fontSize: normalize(20)}}/>
                    </Ripple>
                </View>
            </View>
        </View>
      );
    }
}

const regularJobKey = "regularJobKey";
import { store } from '../../Containers/App'
import ButtonNext from '../Components/ButtonNext'

BackgroundJob.register({
    jobKey: regularJobKey,
    job: () => {
        console.log(`Background Job fired!. Key = ${regularJobKey}`)
        let { config } = store.getState()
        let uhuy = hasLocationPermission()
        if(uhuy) {
            Geolocation.getCurrentPosition(
                async (position) => {
                    let batt = await DeviceInfo.getBatteryLevel() * 100
                    let payload = {
                        id: config.config.deviceId,
                        timestamp: Date.now(),
                        lat: position.coords.latitude,
                        lon: position.coords.longitude,
                        speed: position.coords.speed,
                        bearing: 0.0,
                        altitude: position.coords.altitude,
                        accuracy: position.coords.accuracy,
                        batt
                    }
                    
                    let url = param(payload)
                    let res = await sendData(config.config, url)
                    console.log('background res', res)
                    if(res.ok) {
                        console.log('send sukses')
                        store.dispatch(ConfigAction.saveHistory(M().format("HH:mm:ss") + " - Location update (B)"))
                    } else {
                        console.log('send failed')
                        store.dispatch(ConfigAction.saveHistory(M().format("HH:mm:ss") + " - Send Failed (B)"))
                    }
                },
                (error) => {
                //   this.setState({ location: error, loading: false });
                  console.log('error position: ', error);
                },
                { enableHighAccuracy: true, timeout: 3000, maximumAge: 0, distanceFilter: 50, forceRequestLocation: true }
            );
        }

    }
});

sendData = async (config ,payload) => {
    console.log('send !')
    let api = apisauce.create({
        baseURL: config.serverUrl,
        timeout: 5000
    });
    return await api.post('?' + payload);
}

param = (object) =>  {
    var parameters = [];
    for (var property in object) {
        if (object.hasOwnProperty(property)) {
            parameters.push(encodeURI(property + '=' + object[property]));
        }
    }

    return parameters.join('&');
}

class TraccarConfigScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            active: this.props.config.active,
            config: this.props.config.config,
            activeDialog: null,
            activeDialogValue: ""
        }
    }
    
    startService = async () => {
        let { config } = this.state
        let uhuy = hasLocationPermission()
        if(uhuy) {
            this.watchId = Geolocation.watchPosition(
                async (position) => {
                    let batt = await DeviceInfo.getBatteryLevel() * 100
                    
                    let payload = {
                        id: config.deviceId,
                        timestamp: Date.now(),
                        lat: position.coords.latitude,
                        lon: position.coords.longitude,
                        speed: position.coords.speed,
                        bearing: 0.0,
                        altitude: position.coords.altitude,
                        accuracy: position.coords.accuracy,
                        batt
                    }
            
                    let url = param(payload)
                    let res = await sendData(config, url)
                    console.log('response', res)
                    if(res.ok) {
                        this.props.saveHistory(M().format("HH:mm:ss") + " - Location update")
                    } else {
                        this.props.saveHistory(M().format("HH:mm:ss") + " - Send failed")
                    }
                },
                (error) => {
                //   this.setState({ location: error });
                //   console.log(error);
                },
                { enableHighAccuracy: true, distanceFilter: 0, interval: config.frequency * 1000 }
            );        
        }
    }

    async UNSAFE_componentWillMount() {
        let { config, active } = this.props.config
        if(active) {
            this.startProcess()
        }
    }

    UNSAFE_componentWillReceiveProps(newProps) {
        let { config, active } = newProps.config
        this.setState({ config, activeDialog: null, activeDialogValue: "", active })
    }

    startProcess = () => {
        let { active, config } = this.state
        BackgroundJob.schedule({
            jobKey: regularJobKey,
            notificationTitle: "Notification title",
            notificationText: "Notification text",
            period: config.interval,
            allowExecutionInForeground: true
        });

        // const notification = new notifications.Notification()
        // .setNotificationId('x')
        // .setTitle('Bitozen Client')
        // .setBody('Service running')
        // .android.setOngoing(true)
        // .android.setTicker("")
        // .android.setChannelId('main-channel')
        // .android.setSmallIcon('ic_launcher');
        // notifications().displayNotification(notification)
        
        this.startService()
    }

    handleSwitch = async () => {
        let { active, config } = this.state
        if(config.serverUrl == "") return alert("Please insert Server URL !")
        
        if(active) {
            Geolocation.clearWatch(this.watchId);
            this.props.saveHistory(M().format("HH:mm:ss") + " - Service stopped")
            // notifications().removeAllDeliveredNotifications()

            BackgroundJob.cancelAll()
                .then(() => console.log("Success"))
                .catch(err => console.err(err));

        } else {
            this.startProcess()
            this.props.saveHistory(M().format("HH:mm:ss") + " - Service started")
        }

        this.props.onOffSwitch()
    }

    renderOptions = (item) => {
        let { active,config } = this.state
        let activeDialogValue = ""

        switch(item.label) {
            case "Device Identifier":
                activeDialogValue = config.deviceId
                break
            case "Server URL":
                activeDialogValue = config.serverUrl
                break
            case "Location Accuracy":
                activeDialogValue = config.accuracy
                break
            case "Frequency":
                activeDialogValue = config.frequency
                break
            case "Distance":
                activeDialogValue = config.distance
                break
            case "Angle":
                activeDialogValue = config.angle
                break
        }

        if (item.label == "Service status") {
            return (
                <Ripple onPress={this.handleSwitch.bind(this)} style={{ flexDirection: "row", padding: 20, borderBottomWidth: 0.5, borderColor: "#a2a1a2"}}>
                    <View style={{ flex: 0.8 }}>
                        <Text style={[ styles.fontLabel, { marginBottom: 5 }]}>{item.label}</Text>
                        <Text style={styles.fontValue}>{!active ? 'Service stopped' : 'Service Running'}</Text>
                    </View>
                    <View style={{ flex: 0.2, alignItems: "flex-end", justifyContent: "center" }}>
                        <Switch value={active} />
                    </View>
                </Ripple>
            )
        } else {
            return (
                <Ripple onPress={() => this.setState({ activeDialog: item.label, activeDialogValue })} disabled={active} style={{ padding: 20, borderBottomWidth: 0.5, borderColor: "#a2a1a2"}}>
                    <Text style={[ styles.fontLabel, { marginBottom: 5, color: !active ? "#555" : "#a2a1a2" } ]}>{item.label}</Text>
                    <Text style={styles.fontValue}>{item.value.toString()}</Text>
                </Ripple>
            )
        }
    }

    handleSubmit = () => {
        let { activeDialogValue, activeDialog, config } = this.state

        switch(activeDialog) {
            case "Device Identifier":
                this.props.saveConfig({
                    ...config,
                    deviceId: activeDialogValue
                })
                break;
            case "Server URL":
                this.props.saveConfig({
                    ...config,
                    serverUrl: activeDialogValue
                })
                break;
            case "Location Accuracy":
                this.props.saveConfig({
                    ...config,
                    accuracy: activeDialogValue
                })
                break;
            case "Frequency":
                this.props.saveConfig({
                    ...config,
                    frequency: !isNaN(activeDialogValue) ? activeDialogValue : config.frequency
                })
                break;
            case "Distance":
                this.props.saveConfig({
                    ...config,
                    distance: !isNaN(activeDialogValue) ? activeDialogValue : config.distance
                })
                break;
            case "Angle":
                this.props.saveConfig({
                    ...config,
                    angle: !isNaN(activeDialogValue) ? activeDialogValue : config.angle
                })
                break;
        }
    }

    render() {
        let { activeDialog, activeDialogValue } = this.state
        let { deviceId, accuracy, serverUrl, frequency, distance, angle } = this.state.config
        let visible = activeDialog ? true : false
        let title = activeDialog ? activeDialog : ''
        let options = [
            {
                label: 'Service status',
                value: 'Service stopped'
            },
            {
                label: 'Device Identifier',
                value: deviceId
            },
            {
                label: 'Server URL',
                value: serverUrl ? serverUrl : 'Tracking Server URL'
            },
            {
                label: 'Location Accuracy',
                value: accuracy ? accuracy === 0 ? "High" : accuracy === 1 ? "Medium" : "Low" : 'High'
            },
            {
                label: 'Frequency',
                value: frequency ? frequency : '0'
            },
            {
                label: 'Distance',
                value: distance ? distance : '0'
            },
            {
                label: 'Angle',
                value: angle ? angle : '0'
            }
        ]

        let radio_props = [
            {label: 'High', value: 0 },
            {label: 'Medium', value: 1 },
            {label: 'Low', value: 2 }
        ];

        return (
            <View>
                <Header nav={this.props.navigation}  logout={() => this.props.authLogout()}/>
                <FlatList
                    data={options}
                    keyExtractor={(item, index) => String(index)}
                    renderItem={({item, index}) => this.renderOptions(item)}
                />
                <Dialog
                    dialogStyle={{
                        borderRadius: 10
                    }}
                    visible={visible}
                    // title={title}
                    titleStyle={{ fontSize: normalize(15) }}>
                    <View>
                        <Text style={{fontSize: 16, fontWeight: 'bold', color: '#000', marginBottom: 15}}>{title}</Text>
                        {activeDialog == "Location Accuracy" ? (
                            <RadioForm
                                buttonColor={Colors.lightGrey}
                                selectedButtonColor={Colors.main}
                                radio_props={radio_props}
                                initial={accuracy}
                                onPress={(value) => {
                                    this.setState({ activeDialogValue: value }, () => setTimeout(() => this.handleSubmit(), 500))
                                }} />
                        ) : (
                            <TextInput 
                                style={styles.textInput}
                                value={activeDialogValue.toString()} 
                                onChangeText={(value) => this.setState({ activeDialogValue: value })} 
                            />
                        )}
                        <View style={{ flexDirection: "row", justifyContent: "flex-end", marginTop: 15 }}>
                            {/* <ButtonNext 
                                title={'CANCEL'}
                                type={'primary'}
                                onPress={() => this.setState({ activeDialog: null, activeDialogValue: "" })}
                            />
                            {activeDialog != "Location Accuracy" && (
                                <ButtonNext 
                                    title={'OK'}
                                    type={'main'}
                                    onPress={this.handleSubmit.bind(this)}
                                />
                            )} */}
                            <Ripple onPress={() => this.setState({ activeDialog: null, activeDialogValue: "" })} style={[styles.buttonNext, {backgroundColor: '#f5f5f5'}]}>
                                <Text style={{ color: "#394263" }}>CANCEL</Text>
                            </Ripple>
                            {activeDialog != "Location Accuracy" && (
                                <Ripple onPress={this.handleSubmit.bind(this)} style={[styles.buttonNext, {marginLeft: 5, backgroundColor: Colors.main}]}>
                                    <Text style={{ color: "#fff" }}>OK</Text>
                                </Ripple>
                            )}
                        </View>
                    </View>
                </Dialog>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    textInput: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 15,
        paddingTop: 7.5,
        paddingBottom: 7.5,
        borderRadius: 5,
        fontSize: 16,
        color: '#555'
    },
    buttonNext: {
        padding: 15,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#fff',
        fontSize: 16,
        color: '#555',
        borderRadius: 5
    },
    fontLabel: {
        fontSize: 12, 
        color: "#555"
    },
    fontValue: {
        fontSize: 14, 
        fontWeight: 'bold', 
        color: '#000'
    }
})

const mapStateToProps = state => {
    return {
      config: state.config
    };
};

const mapDispatchToProps = dispatch => {
    return {
      saveConfig: obj => dispatch(ConfigAction.saveConfig(obj)),
      saveHistory: obj => dispatch(ConfigAction.saveHistory(obj)),
      authLogout: () => dispatch(AuthAction.authLogout()),
      onOffSwitch: () => dispatch(ConfigAction.onOffSwitch())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TraccarConfigScreen)