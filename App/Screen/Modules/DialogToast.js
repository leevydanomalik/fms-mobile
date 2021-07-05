import React, { useRef } from 'react'
import {
    View,
    TouchableOpacity,
    Text,
} from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import Spinkit from 'react-native-spinkit'
import { Colors } from '../../Themes'

class CardToast extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        const { title, color, onClose } = this.props
        return (
            <View style={{
                width: '90%',
                backgroundColor: "#fff",
                borderColor: '#f5f5f5',
                borderWidth: 0.5,
                borderRadius: 10,
                elevation: 10,
                overflow: "hidden",
                flex: 1,
                flexDirection: "row"
            }}>
                <View style={{ 
                    width: 5, 
                    height: "100%", 
                    backgroundColor: Colors.main 
                }} />

                <View style={{
                    flex: 1,
                    flexDirection: "row",
                    alignContent: "center",
                    alignItems: "center",
                    padding: 10
                }}>
                    <Spinkit style={{ marginRight: 15 }} isVisible={true} size={30} type="Circle" color={color ? color : Colors.main} />
                    <Text style={{ fontSize: 12, color: Colors.grey, fontWeight: 'bold' }}>{title}</Text>
                </View>

                <TouchableOpacity onPress={() => onClose()}>
                    <View style={{
                        width: 30,
                        paddingTop: 10,
                        height: '100%',
                        alignItems: "center",
                        alignContent: "flex-start"
                    }}>
                        <Icon name={"close"} size={16} color={"#999"} />
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

export default CardToast