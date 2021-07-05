import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import Svg, { Line } from 'react-native-svg'
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Colors } from '../../Themes'
import { generateUrlPhoto } from '../../Utils'
import ProgressiveImage from '../Modules/ProgressiveImage'

class CardSecurity extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        const { data } = this.props
        return (
            <View style={{ backgroundColor: "#fff", padding: 0 }}>
                {data && data.map((dt, index) => {
                    return (
                        <View key={index}>
                            <View style={{ flex: 1, flexDirection: "row", alignItems: "flex-start" }}>
                                <View style={{ width: 32 }}>
                                    <View style={{ width: 30, height: 30, borderColor: "#CCC", backgroundColor: "#fff", borderWidth: 1, justifyContent: 'center', alignItems: "center", borderRadius: 30 }}>
                                        <MatIcon name="garage" style={{ color: "#BDBDBD", fontSize: 30, textAlign: "center", marginBottom: 5 }} />
                                    </View>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ fontSize: 14, marginRight: 5, marginBottom: 5, paddingLeft: 10, color: Colors.black, fontWeight: 'bold' }}>{dt.title}</Text>
                                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                                        <View>
                                            <Text style={{ fontSize: 12, marginRight: 5, paddingLeft: 10, color: Colors.lightGrey }}>{dt.warehouse}</Text>
                                            <Text style={{ fontSize: 12, marginRight: 5, paddingLeft: 10, color: Colors.lightGrey }}>{dt.time}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ maxWidth: 80, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                                    <View style={{ width: 35, height: 35, borderColor: "#CCC", backgroundColor: "#f0f0f0", borderWidth: 1, justifyContent: 'center', alignItems: "center", borderRadius: 100 }}>
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
                                                uri: generateUrlPhoto(dt && dt.id),
                                                headers: {
                                                    'Content-Type': 'application/json',
                                                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiJ9.5BG9SEVOGo_xRhtT8IkyoSy60kPg8HM9Vpvb0TdNew4'
                                                }
                                            }} />
                                    </View>
                                    <Text style={{ fontSize: 12, paddingLeft: 5, color: Colors.lightGrey, textTransform: "uppercase" }}>{dt.worker}</Text>
                                </View>
                            </View>
                            {(index < (data.length - 1)) && (
                                <View style={{ backgroundColor: '#fff', height: 30, top: 0, marginLeft: 15, zIndex: -2 }}>
                                    <Svg height={70} width={1} style={{ position: 'absolute', top: -38, marginLeft: 0 }}>
                                        <Line
                                            stroke="black"
                                            strokeDasharray="5, 5"
                                            x1="0"
                                            y1="0"
                                            x2="0"
                                            y2={"100%"}
                                        />
                                    </Svg>
                                </View>
                            )}
                        </View>
                    )
                })}
            </View>
        )
    }
}

export default CardSecurity