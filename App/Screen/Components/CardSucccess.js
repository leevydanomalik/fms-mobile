import React from 'react'
import { View, Text, TouchableOpacity, Image, ScrollView, Alert } from 'react-native'
import { Colors } from '../../Themes'
import FeIcon from 'react-native-vector-icons/Feather'

class CardNote extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        const {title} = this.props
        return (
            <View style={{ backgroundColor: "#fff", padding: 20, alignItems: "center" }}>
                <FeIcon name={"check-circle"} size={100} color={Colors.main} />
                <Text style={{
                    marginTop: 30,
                    marginBottom: 30,
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: '#000',
                    textAlign: 'center'
                }}>
                    {title ? title : "Congratulations, all step has been done!!!"}
                </Text>
            </View>
        )
    }
}

export default CardNote