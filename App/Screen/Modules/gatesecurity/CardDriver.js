import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Colors } from '../../../Themes'
import Config from 'react-native-config'
import { generateUrlPhoto } from '../../../Utils'
import ProgressiveImage from '../../Modules/ProgressiveImage'

class CardDriver extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        const { driver, onPress, btnTitle, btnTextColor, btnColor, btnPause, updatePause, YND } = this.props
        return (
            <View style={{ flexDirection: "row", marginBottom: 10, padding: 15, borderWidth: 1, borderColor: "#ccc", borderRadius: 5, backgroundColor: Colors.mainPlaceholder }}>
                <View style={{ height: 50, width: 50, borderRadius: 100 }} >
                    <ProgressiveImage
                        resizeMode="cover"
                        sizeSpinner={28}
                        style={{
                            borderRadius: 100,
                            width: "100%",
                            height: "100%",
                            backgroundColor: Colors.whiteGrey,
                            marginTop: 5
                        }}
                        source={{
                            uri: generateUrlPhoto(driver && driver.id),
                            headers: {
                                'Content-Type': 'application/json',
                                'DGI-API-KEY': Config.APP_WMS_AUTH_HEADER_VALUE
                                // 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiJ9.5BG9SEVOGo_xRhtT8IkyoSy60kPg8HM9Vpvb0TdNew4'
                            }
                        }} />
                </View>
                <View style={{ flex: 1, marginLeft: 10, justifyContent: 'center', }}>
                    <Text style={{ color: "#000", fontSize: 14, fontWeight: "bold", textTransform: 'uppercase', marginBottom: 5 }}>{driver.name ? driver.name : '-'}</Text>
                    <Text style={{ fontSize: 14, fontWeight: "normal", color: "#555" }}>{driver.cargo ? driver.cargo : '-'}</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                    {YND && btnTitle === "STOP" ?
                        <TouchableOpacity onPress={() => updatePause()}>
                            <View style={{ backgroundColor: Colors.main, width: 55, height: 55, borderRadius: 50, alignItems: "center", justifyContent: "center" }}>
                                <Text style={{ fontSize: 13, color: "#fff", fontWeight: "bold" }}>{btnPause}</Text>
                            </View>
                        </TouchableOpacity> : null}
                    {onPress && (
                        <TouchableOpacity onPress={() => onPress()}>
                            <View style={{ backgroundColor: btnColor, marginLeft: 10,  width: 55, height: 55, borderRadius: 50, alignItems: "center", justifyContent: "center" }}>
                                <Text style={{ fontSize: 14, color: btnTextColor, fontWeight: "bold" }}>{btnTitle}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        )
    }
}

export default CardDriver