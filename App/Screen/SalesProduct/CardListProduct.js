import React from 'react'
import { ScrollView, View, TouchableOpacity, Text, Image, FlatList, ListView } from 'react-native'
import { Colors } from '../../Themes'
import { ProgressiveImage } from '../Modules'

class CardListCategory extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        const { onPress, dataRecomended } = this.props
        return (
            <View style={{ paddingLeft: 0, paddingRight: 0 }}>
                {dataRecomended.map((data, index) => {
                    return (
                        <TouchableOpacity key={index} onPress={onPress ? onPress: () => {}}>
                            <View style={{ backgroundColor: "#fff", paddingBottom: 20, paddingTop: 0, paddingLeft: 20, paddingRight: 20, flex: 1, flexDirection: "row" }}>
                                <View style={{ borderRadius: 10, width: 80, height: 80, borderWidth: 1, borderColor: "#ccc", marginRight: 15 }}>
                                    <ProgressiveImage resizeMode="cover" style={{ borderRadius: 10, width: "100%", height: "100%" }} source={{ uri: data.image }} />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ marginBottom: 5, color: "#000", fontWeight: "bold", fontSize: 16 }}>{data.title.split("-")[1]}</Text>
                                    <Text style={{ fontSize: 10, color: "#999" }}>{data.title.split("-")[0]}</Text>
                                    <Text style={{ fontSize: 12, marginTop: 5, marginBottom: 5, color: "#000" }}>{data.desc}</Text>
                                    <Text style={{ fontSize: 10, color: "#999" }}>{data.title.split("-")[2]}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )
                })}
            </View>
        )
    }
}

export default CardListCategory;