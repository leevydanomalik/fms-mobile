import React from 'react'
import { View, Text, TouchableOpacity, Image, ScrollView, Alert } from 'react-native'
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import Svg, { Line } from 'react-native-svg'
import { Colors } from '../../Themes'

class CardContract extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        const { title, date, data, disableTitle, days, service } = this.props
        return (
            <View style={{ backgroundColor: "#fff", padding: 0 }}>
                {!disableTitle && <Text style={{ color: Colors.black, fontWeight: "bold", fontSize: 16 }}>{title ? title : "Delivery"}</Text>}
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, marginBottom: 15}}>
                    {date && (
                        <Text style={{ fontSize: 12, color: Colors.black }}>Contract Delivery Date ({service}) : <Text style={{ fontWeight: "bold", color: Colors.black }}>{date}</Text></Text>
                    )}
                    {days && (
                        <Text style={{ fontSize: 10, color: Colors.grey }}>{days}</Text>
                    )}
                </View>
                {data && data.map((dt, index) => {
                    return (
                        <View key={index}>
                            <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
                                <View style={{ flex: 0.1 }}>
                                    <View style={{ width: 30, height: 30, borderColor: "#CCC", backgroundColor: '#fff', borderWidth: 1, justifyContent: 'center', alignItems: "center", borderRadius: 30 }}>
                                        <MatIcon name="garage" style={{ color: Colors.lightGrey, fontSize: 30, textAlign: "center", marginBottom: 5 }} />
                                    </View>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ fontSize: 14, marginRight: 5, marginBottom: 5, paddingLeft: 10, color: Colors.black, fontWeight: 'bold' }}>{dt.title ? dt.title : '-'}</Text>
                                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                                        <View style={{ flex: 1 }}>
                                            <Text style={{ fontSize: 12, marginRight: 5, paddingLeft: 10, color: Colors.black }}>{dt.subtitle ? dt.subtitle : '-'}</Text>
                                        </View>
                                        <Text style={{ fontSize: 12, marginRight: 0, paddingLeft: 10, color: Colors.black }}>{dt.date ? dt.date : ' '}</Text>
                                    </View>
                                    {dt.description && (
                                        <Text style={{ fontSize: 12, marginRight: 0, paddingLeft: 10, color: Colors.black, fontWeight: 'bold' }}>{dt.description ? dt.description : '-'}</Text>
                                    )}
                                </View>
                            </View>
                            {(index < (data.length - 1)) && (
                                <View style={{ height: 30, top: dt.description ? -25 : -20, marginLeft: 15, zIndex: -1 }}>
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

export default CardContract