import React from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet,
    Dimensions
} from 'react-native';

import { connect } from 'react-redux';
import { Colors } from '../Themes'
import { registerAppListener } from '../Navigation/FcmListener';

var firebaseConfig = {
    apiKey: "AIzaSyCJIRgy_TxeyYMxvwQWxp94U8gd97TNc7k",
    authDomain: "patlog-af70d.firebaseapp.com",
    databaseURL: "https://patlog-af70d.firebaseio.com",
    projectId: "patlog-af70d",
    storageBucket: "patlog-af70d.appspot.com",
    messagingSenderId: "1016088882099",
    appId: "1:1016088882099:web:2a1937752c1b7c29e0f9c6"
};

class SplashScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.auth.user
        }
    }

    componentDidMount() {
        let checkType = ""
        if (!this.state.user) {
            setTimeout(() => this.props.navigation.navigate('LoginScreen'), 5000)
        } else {
            registerAppListener(null, "splash", this.props.navigation)
            setTimeout(() => {
                checkType = registerAppListener(null, "splash", this.props.navigation);
                if (checkType === "") return this.props.navigation.navigate('MainScreen')
            }, 3000)
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Image source={require('../assets/lev-log-logo.png')} resizeMode="contain" style={{ marginBottom: -20, width: 200, height: 100 }} />
                <Text style={{ color: "#fff", fontSize: 14 }}>A Platform for orchestrating logistic service</Text>
                <Text style={{ color: "#fff", fontSize: 14, position: "absolute", bottom: 20 }}>Powered by Bitozen Enterprise Platform</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: 'center',
        flex: 1,
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
        backgroundColor: Colors.main
    },
    image: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

const mapStateToProps = state => {
    return {
        auth: state.auth
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);