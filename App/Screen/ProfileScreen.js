import React, { Component } from 'react'
import { View } from 'react-native'
import CardProfile from './Modules/CardProfile'
import { connect } from 'react-redux'
import AuthAction from '../Redux/AuthRedux'

class ProfileScreen extends Component {
    onLogout() {
        this.props.authLogout();
        this.props.navigation.dispatch({
            type: 'Navigation/RESET',
            index: 0,
            actions: [{type: 'Navigate', routeName: 'LoginScreen'}]
        })
    }

    render () {
        return (
            <View style={{ flex: 1 }}>
                <CardProfile 
                    back={() => this.props.navigation.goBack()}
                    logout={() => this.onLogout()}/>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        authLogout: () => dispatch(AuthAction.authLogout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)