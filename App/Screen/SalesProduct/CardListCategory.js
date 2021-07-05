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
        const { onPress, dataCategory } = this.props
        return (
            <FlatList
                contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between" }}
                style={{ paddingLeft: 10, paddingRight: 10 }}
                keyExtractor={(item, index) => index.toString()}
                numColumns={3}
                data={dataCategory}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity key={index} style={{ flex: 1, marginBottom: 15, alignItems: "center", justifyContent: "center" }} onPress={onPress ? onPress : () => {}}>
                            <View style={{ width: 115, height: 115, borderRadius: 10, borderWidth: 1, borderColor: "#ccc", alignItems: "center" }}>
                                <ProgressiveImage resizeMode="cover" style={{ position: "absolute", top: 5, borderRadius: 10, width: 80, height: 80 }} source={{ uri: item.image }} />
                                <Text style={{ position: "absolute", bottom: 10, color: "#000", marginTop: 5, textAlign: "center", fontSize: 11 }}>{item.title}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                }}
            />
        )
    }
}

export default CardListCategory