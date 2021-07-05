import React from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet,
    TextInput,
    Alert,
    Dimensions,
    TouchableOpacity,
    Keyboard,
    Clipboard,
    ToastAndroid,
    ScrollView
} from 'react-native';
import AuthAction from '../Redux/AuthRedux';
import { connect } from 'react-redux';
import { ProgressDialog } from 'react-native-simple-dialogs';
import FaIcon from 'react-native-vector-icons/FontAwesome5'
import R from 'ramda';
import firebase from '@react-native-firebase/app'
import Spinkit from 'react-native-spinkit'
const { height, width } = Dimensions.get('window')
import { Colors } from '../Themes'
import { registerAppListener } from '../Navigation/FcmListener';

class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username : '',
            password : '',
            fetching: false,
            error: false,
            focusUsername: false,
            focusPassword: false
        }
    }

    async UNSAFE_componentWillMount() {
        const fcmToken = await firebase.messaging().getToken()
        this.setState({ fcmToken })
    }

    UNSAFE_componentWillReceiveProps(newProps) {
        if (this.props.navigation.isFocused()) {
            this.setState({ fetching: newProps.auth.fetching });
            if (!newProps.auth.fetching && newProps.auth.user) {
                this.props.navigation.navigate('MainScreen');
                registerAppListener(null, "splash", this.props.navigation)
            }
            if(!newProps.auth.fetching && newProps.auth.error) this.setState({ error: true })
        }
    }

    login = () => {
        Keyboard.dismiss()
        const { username, password } = this.state
        let payload = {
            username,
            password,
        }
        this.setState({ error: false }, () => this.props.authRequest(payload))
    }

    render() {
        const { fcmToken, username, password, fetching, error, focusUsername, focusPassword } = this.state
        return (
            <ScrollView contentContainerStyle={{ backgroundColor: Colors.main }} style={{ flex: 1 }}>
                <View style={{ width: 'auto', height: height, flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ flex: 1, flexDirection: 'column' }}>

                    <View style={{ width: 'auto', marginLeft: 30, marginRight: 30 }}>

                        <View style={{ flex: 1, alignItems: 'center', marginBottom: 150 }}>
                            <Image source={require('../assets/bitlogin-logo.png')} resizeMode="contain" style={{ width: 250, height: 150 }} />
                        </View>

                        {error && (
                            <View style={{ backgroundColor: Colors.mainWhite, padding: 20, borderRadius: 10, alignItems: 'center', marginTop: 30 }}>
                                <Image source={require('../assets/error_login.png')} resizeMode="contain" style={{ width: 70, height: 70 }} />
                                <Text style={{ textAlign: 'center', marginTop: 10 }}>Sorry we could not find an account with that username and password. Please try again...</Text>
                            </View>
                        )}

                        {fetching && (
                            <View style={{ backgroundColor: Colors.mainWhite, padding: 20, borderRadius: 10, alignItems: 'center', marginTop: 30 }}>
                                {/* <Image source={require('../assets/error_login.png')} resizeMode="contain" style={{ width: 70, height: 70 }} /> */}
                                <Spinkit isVisible={true} size={50} type="Circle" color={Colors.main} />
                                <Text style={{ textAlign: 'center', marginTop: 10 }}>{'Please wait...\nTry to contact the authentication server'}</Text>
                            </View>
                        )}

                        <View style={{ marginTop: error || fetching ? 30 : 30 }}>
                            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 14 }}>Username</Text>
                            <View style={{ marginTop: 5, borderBottomWidth: 1, borderColor: "#f9f9f9", justifyContent: 'center' }}>
                                <FaIcon  style={{ position: "absolute", right: 0, color: '#f9f9f9' }} size={18} name="user" />
                                <TextInput 
                                    onFocus={() => this.setState({ focusUsername: true })}
                                    onBlur={() => this.setState({ focusUsername: false })}
                                    onChangeText = {(username) => this.setState({ username })}
                                    value={username}
                                    onSubmitEditing={() => {
                                        this.passwordRef.focus()
                                    }}
                                    blurOnSubmit={false}
                                    returnKeyType={"next"}
                                    style={{ padding: 0, fontSize: 18, color: '#fff' }}
                                    placeholder={focusUsername ? "" :""}
                                    placeholderTextColor="#f9f9f9"
                                    underlineColorAndroid={'transparent'} />
                            </View>
                        </View>

                        <View style={{ marginTop: 30 }}>
                            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 14 }}>Password</Text>
                            <View style={{ marginTop: 5, borderBottomWidth: 1, borderColor: "#f9f9f9", justifyContent: 'center' }}>
                                <FaIcon  style={{ position: "absolute", right: 0, color: '#f9f9f9' }} size={18} name="key" />
                                <TextInput
                                    onFocus={() => this.setState({ focusPassword: true })}
                                    onBlur={() => this.setState({ focusPassword: false })}
                                    onSubmitEditing={this.login}
                                    value={password}
                                    onChangeText = {(password) => this.setState({ password })}
                                    secureTextEntry
                                    ref={(input) => this.passwordRef = input}
                                    returnKeyType={"done"}
                                    style={{ padding: 0, fontSize: 18, color: '#fff' }}
                                    placeholder={focusPassword ? "" : ""}
                                    placeholderTextColor="#f9f9f9"
                                    underlineColorAndroid={'transparent'} />
                            </View>
                        </View>

                        <TouchableOpacity 
                            onPress={() => this.login()}
                            // onPress={() => this.props.navigation.navigate('MainScreen')}
                            onLongPress={() => {
                                Clipboard.setString(fcmToken)
                                ToastAndroid.show('Token copied to clipboard !', ToastAndroid.SHORT);
                            }}
                            style={{ marginTop: 30, alignItems: "center", padding: 10, backgroundColor: Colors.mainWhite, borderRadius: 10 }}>
                            <Text style={{ color: "#000", fontSize: 16 }}>LOGIN</Text>
                        </TouchableOpacity>
                    </View>

                </View>
                </View>
                
                {/* <ProgressDialog
                    visible={fetching}
                    // title="Sedang Memuat Data..."
                    activityIndicatorSize="large"
                    message="Sedang Menyambung Ke Server..."
                /> */}

            </ScrollView>
        )
        return(
            <View style = {styles.container}>
                <View style={{backgroundColor: '#fff', marginBottom: 30, width: 140, height: 140, borderRadius: 100, alignSelf: "center"}}>
                <Image 
                    style = {{alignSelf:"center", marginTop: 10, width: 120, height: 120, resizeMode: 'contain', borderRadius: 100}}
                    source = {require('../assets/logo-patlog.png')}
                    />
                </View>
                <View style={{backgroundColor: '#fff', borderRadius: 10, padding: 20}}>
                    <View style={{flexDirection: 'row', marginBottom: 20}}>
                        <FaIcon name="user-alt" size={25} color="rgba(0, 0, 0, 0.84)" />
                        <TextInput
                            placeholder = "Username"
                            underlineColorAndroid = {'transparent'} 
                            style = {{fontSize: 20, width: '100%', marginTop: -10, marginLeft: 10}}
                            onChangeText = {(username) => this.setState({username})}
                            />
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <FaIcon name="key" size={25} color="rgba(0, 0, 0, 0.84)" />
                        <TextInput
                            placeholder = "Password"
                            secureTextEntry = {true}
                            style = {{fontSize: 20, width: '100%', marginTop: -10, marginLeft: 5}}
                            underlineColorAndroid = {'transparent'}
                            onChangeText = {(password) => this.setState({password})}
                            />
                    </View>
                </View>
                  <TouchableOpacity
                    style = {{
                        backgroundColor: '#fff',
                        borderRadius: 20,
                        padding: 10,
                        marginTop: 10
                    }}
                    // onPress={() => this.props.navigation.navigate('HomeScreen')}
                    onPress={() => this.login()}
                    onLongPress={() => {
                        Clipboard.setString(fcmToken)
                        ToastAndroid.show('Token copied to clipboard !', ToastAndroid.SHORT);
                    }}
                >
                <Text style={{padding: 5, color: '#ed1b2f', textAlign: "center", fontWeight: "bold"}}>
                    LOGIN
                </Text>
                </TouchableOpacity>
                <Text style={{marginTop: 50, color: '#fff', textAlign: "center"}}>
                    Powered by Bitozen
                </Text>
                <ProgressDialog
                    visible={this.state.fetching}
                    // title="Sedang Memuat Data..."
                    activityIndicatorSize="large"
                    message="Sedang Menyambung Ke Server..."
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ed1b2f',
        width: Dimensions.get("window").width,
		height: Dimensions.get("window").height,
        paddingTop: 80,
        paddingLeft: 20,
        paddingRight: 20
    },
});

const mapStateToProps = state => {
	return {
		auth: state.auth
	};
};

const mapDispatchToProps = dispatch => {
	return {
		authRequest: obj => dispatch(AuthAction.authRequest(obj))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);