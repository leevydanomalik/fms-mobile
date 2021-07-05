import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import Svg, { Line } from 'react-native-svg'
import { Colors } from '../../Themes'
import { generateUrlPhoto } from '../../Utils'
import ProgressiveImage from '../Modules/ProgressiveImage'

class CardYardDock extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        const { data } = this.props
        return (
            <View style={{ backgroundColor: "#fff", padding: 15 }}>
                {data && data.map((dt, index) => {
                    return (
                        <View key={index}>
                            <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
                                <View style={{ flex: 0.13 }}>
                                    <View style={{ width: 40, height: 40, borderColor: "#CCC", backgroundColor: "#f0f0f0", borderWidth: 1, justifyContent: 'center', alignItems: "center", borderRadius: 40 }}>
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
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ fontSize: 14, marginRight: 5, marginBottom: 5, paddingLeft: 10, color: Colors.black, fontWeight: 'bold' }}>{dt.title}</Text>
                                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                                        <View style={{flex: 1}}>
                                            <Text style={{ fontSize: 12, marginRight: 5, paddingLeft: 10, color: Colors.lightGrey }}>{dt.warehouse}</Text>
                                            {/* <Text style={{ fontSize: 12, marginRight: 5, paddingLeft: 10, color: Colors.lightGrey }}>{dt.location}</Text> */}
                                            <Text style={{ fontSize: 12, marginRight: 5, paddingLeft: 10, color: Colors.lightGrey, textTransform: "uppercase" }}>{dt.worker}</Text>
                                        </View>
                                        <View style={{alignItems: 'flex-end'}}>
                                            <TouchableOpacity style={{marginBottom: 5}}>
                                                <Text style={{ fontSize: 12, marginRight: 0, color: "#555" }}>{'+ Scheduled'}</Text>
                                            </TouchableOpacity>
                                            <Text style={{ fontSize: 12, marginRight: 0, color: Colors.lightGrey }}>{dt.date}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            {(index < (data.length - 1)) && (
                                <View style={{ height: 35, top: -25, marginLeft: 20 }}>
                                    <Svg height={70} width={1} style={{ top: 0, marginLeft: 0 }}>
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

export default CardYardDock