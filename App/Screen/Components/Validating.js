import React from 'react'
import { View, Text } from 'react-native'
import Spinkit from 'react-native-spinkit'
import AntIcon from 'react-native-vector-icons/AntDesign'
import { Colors } from '../../Themes'

class ValidatorScreen extends React.Component {
    state = {}
    render() {
        const {title, icon, color} = this.props
        return (
            <View style={{ flex: 1, backgroundColor: "#fff", justifyContent: 'center', alignItems: 'center' }}>
                {!icon ? (
                    <Spinkit style={{ marginBottom: 30 }} isVisible={true} size={80} type="Circle" color={color ? color : Colors.main} />
                ) : (
                    <AntIcon name={icon} style={{ marginTop: 30, marginBottom: 30 }} size={80} color={color ? color : Colors.main} />
                )}
                <Text style={{ fontSize: 16, color: Colors.grey, fontWeight: 'bold' }}>{title}</Text>
            </View>
        )
    }
}

export default ValidatorScreen