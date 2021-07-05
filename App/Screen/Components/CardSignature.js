import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import R from 'ramda'
import { Colors } from '../../Themes'
import Config from 'react-native-config'
import { generateUrlPhoto } from '../../Utils'
import ProgressiveImage from '../Modules/ProgressiveImage'

class CardSignature extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        const { title, data } = this.props
        return (
            <View style={{ backgroundColor: "#fff", padding: 15 }}>
                <Text style={{ fontSize: 16, fontWeight: "bold", color: "#999", marginBottom: 10 }}>{title ? title : "Signatures"}</Text>

                <View>
                {data && data.map((item, index) => {
                    return (
                        <View key={index} style={{ flex: 1, flexDirection: "row", paddingBottom: (index == (data.length - 1)) ? 0 : 10 }}>
                            <View style={{ height: 50, width: 50, borderRadius: 100 }} >
                                <ProgressiveImage
                                    resizeMode="cover"
                                    sizeSpinner={28}
                                    style={{
                                        borderRadius: 100,
                                        width: "100%",
                                        height: "100%",
                                        backgroundColor: Colors.whiteGrey
                                    }}
                                    source={{
                                        uri: generateUrlPhoto(item.signerID.userID),
                                        headers: {
                                            'Content-Type': 'application/json',
                                            'DGI-API-KEY': Config.APP_WMS_AUTH_HEADER_VALUE
                                            // 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiJ9.5BG9SEVOGo_xRhtT8IkyoSy60kPg8HM9Vpvb0TdNew4'
                                        }
                                    }} />
                            </View>
                            <View style={{ flex: 0.6, marginLeft: 10, justifyContent: 'center', }}>
                                {/* <Text style={{ color: "#000", fontSize: 16, fontWeight: "bold" }}>{item.signerID.userName.charAt(0).toUpperCase() + item.signerID.userName.slice(1)}</Text> */}
                                <Text style={{ color: "#000", fontSize: 16, fontWeight: "bold", textTransform: "uppercase" }}>{item.signerID && item.signerID.employeeID && item.signerID.employeeID.empName}</Text>
                                <Text style={{ fontSize: 10, color: "#000" }}>Signature</Text>
                                <Text numberOfLines={1} style={{ fontSize: 10 }}>{item.signHash ? item.signHash : "-"}</Text>
                            </View>
                            <View style={{ flex: 0.2, marginRight: 10 }}>
                                <Text style={{ textAlign: "center", color: "#000", padding: 5, fontSize: 10 }}>{!R.isEmpty(item.signHash) ? "SIGNED" : "UN-SIGN"}</Text>
                            </View>
                            {!R.isEmpty(item.signHash) ?
                                <TouchableOpacity style={{ flex: 0.2, float: "right" }} onPress={() => this.props.onClickVerify(item.signerID.userID)}>
                                    <View>
                                        <Text style={{ textAlign: "center", backgroundColor: Colors.main, borderRadius: 25, color: "#fff", padding: 5, fontSize: 10 }}>{"VERIFY"}</Text>
                                    </View>
                                </TouchableOpacity> : null}
                        </View>
                    )
                })}
                </View>
            </View>
        )
    }
}

export default CardSignature