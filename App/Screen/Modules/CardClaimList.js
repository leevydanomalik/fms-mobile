import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import FaIcon from 'react-native-vector-icons/FontAwesome'

const blue = "#0e74ff"

class CardClaimList extends React.Component {
    state = {
        visible: false
    }

    static defaultProps = {
        onPress: () => null,
    }

    render() {
        const { data, onPress, id } = this.props
        const { ticketNumber, transportVendor, fleetType, fleetMfg, fleetMfgType, driverName, driverLicense, licensePlate, opsType, poNumber, descNote, dlvDate, status } = data.item
        let ticketColor
        let imageProgress
        let labelProgress
        const { visible } = this.state

        switch(status) {
            case "NOT_STARTED":
                ticketColor = "#0e74ff"
                imageProgress = require('../../assets/not_started.png')
                labelProgress = 'Not Started'
                break
            case "IN_PROGRESS":
                ticketColor = "#f8cd46"
                imageProgress = require('../../assets/in_progress.png')
                labelProgress = 'Progress'
                break
            case "DONE":
                ticketColor = "#b91500"
                imageProgress = require('../../assets/done.png')
                labelProgress = 'Done'
                break
            default:
                ticketColor = "#000"
                imageProgress = require('../../assets/logo-patlog.png')
                labelProgress = ''
                break
        }
        return (
            <View style={{ paddingTop: id == 0 ? 5 : 15, padding: 15, paddingBottom: 0 }}>
                <TouchableOpacity 
                    onPress={onPress} 
                    style={{ elevation: 3, backgroundColor: status === "DONE" ? "#DCEDC8" : status === "FAILED" ? "#F8BBD0" : "#FFFFFF", borderRadius: 5, padding: 15 }}>

                    <View style={{ flexDirection: "row" }}>
                        <View style={{ height: 40, width: 40, borderRadius: 100 }} >
                            <Image source={{ uri: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg" }} resizeMode="cover" style={{ width: "100%", height: "100%", borderRadius: 100 }} />
                        </View>
                        <View style={{ marginLeft: 10, justifyContent: 'center', width: "70%" }}>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={{ color: "#000", fontSize: 16, fontWeight: "bold" }}>{transportVendor}</Text>
                            </View>
                            <Text style={{ fontSize: 10, marginTop: 5 }}>{fleetType + ' - ' + licensePlate + ' - ' + fleetMfg + ' - ' + opsType}</Text>
                        </View>
                        <View style={{ position: 'absolute', right: 0, flexDirection: "row", alignItems: "center"}}>
                            <TouchableOpacity onPress={() => this.setState({ visible: !visible })} style={{ padding: 5 }}>
                                <FaIcon name={"angle-right"} size={30} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

export default CardClaimList