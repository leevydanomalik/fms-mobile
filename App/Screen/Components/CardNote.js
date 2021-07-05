import React from 'react'
import { View, Text, TouchableOpacity, Image, ScrollView, Alert } from 'react-native'

class CardNote extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        const {title, desc} = this.props
        return (
            <View style={{ backgroundColor: "#fff", padding: 15 }}>
                {title && <Text style={{ color: "#000", fontWeight: "bold", fontSize: 16, marginBottom: 5 }}>{title ? title : "Notes"}</Text>}
                <Text style={{ flex: 1, fontSize: 12, color: "#999" }}>{desc}</Text>
            </View>
        )
    }
}

export default CardNote