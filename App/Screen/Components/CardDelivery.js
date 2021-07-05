import React from 'react'
import { View, Text, TouchableOpacity, Image, ScrollView, Alert } from 'react-native'
import { Colors } from '../../Themes'

class CardDelivery extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        const {title, desc, data} = this.props
        return (
            <View style={{ backgroundColor: "#fff", marginTop: 0 }}>
                {title && <Text style={{ padding: 15, fontSize: 16, fontWeight: "bold", color: "#999" }}>{title}</Text>}

                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ padding: 15, paddingTop: 0, paddingRight: 20, paddingBottom: 20 }}>
                    {data && data.map((dt, index) => {
                        return (
                            <View key={index} style={{ elevation: 3, borderWidth: 1, borderColor: "#CCC", backgroundColor: Colors.main, padding: 15, borderRadius: 10, width: 300, marginRight: index + 1 == data.length ? 0 : 15 }}>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ fontSize: 15, fontWeight: "bold", marginTop: 5, color: "#fff", marginBottom: 10 }}>{dt.to}</Text>
                                    <View style={{ flexDirection: "row" }}>
                                        <View style={{ width: 120, height: 70, marginBottom: 10 }}>
                                            <Image resizeMode="cover" style={{ width: "90%", height: "100%" }} source={{ uri: "https://images.unsplash.com/photo-1553413077-190dd305871c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=150&q=60" }} />
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 14, marginTop: -5 }}>{dt.title}</Text>
                                            <Text style={{ fontSize: 13, marginTop: 5, color: "#fff" }}>{dt.desc}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        )
                    })}
                </ScrollView>

                {/* <View style={{ padding: 15, paddingTop: 0 }}>
                    <Text style={{ color: "#000", fontWeight: "bold", fontSize: 16, marginBottom: 5 }}>Terms</Text>
                    <Text style={{ flex: 1, fontSize: 12 }}>{desc}</Text>
                </View> */}
            </View>
        )
    }
}

export default CardDelivery