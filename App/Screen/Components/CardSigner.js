import React from 'react'
import { View, Text, TouchableOpacity, Image, ScrollView, Alert } from 'react-native'
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons'

class CardSigner extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        const { title, onClick } = this.props
        return (
            <View style={{ marginTop: 10, backgroundColor: "#fff", padding: 15 }}>
                <TouchableOpacity 
                    onPress={() => onClick()} 
                    style={{ borderColor: "red", borderWidth: 1, borderRadius: 20, padding: 10, marginLeft: 0, marginRight: 0, marginTop: 0 }}>
                    <Text style={{ color: '#000', textAlign: "center", fontWeight: "bold" }}>
                        {(title) ? title : "SIGN THIS DOCUMENT"}
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default CardSigner