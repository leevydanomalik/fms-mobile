import React from 'react'
import { ScrollView, View, TouchableOpacity, Text, Image, FlatList, ListView } from 'react-native'
import { Colors } from '../../Themes'

class CardSliderCategory extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            activeTopic:  "ALL"
        }
    }
    render() {
        const { items, ...props } = this.props
        const { activeTopic } = this.state
        return (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ marginTop: 20, paddingLeft: 20, paddingRight: 20, marginBottom: 20 }}>
                {items.map((item, index) => {
                    return (
                        <TouchableOpacity key={index} onPress={() => this.setState({activeTopic : item.label})}>
                            <View style={{ backgroundColor: item.label == activeTopic ? Colors.main : "#fff", borderWidth: 1, borderColor: item.label == activeTopic ? Colors.main : "#ccc", paddingLeft: 15, paddingRight: 15, paddingBottom: 10, paddingTop: 10, borderRadius: 100, marginRight: index + 1 == topics.length ? 0 : 10 }}>
                                <Text style={{color: item.label == activeTopic ? "#fff" : "#555", fontSize: 12}}>{item.label}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
        )
    }
}

export default CardSliderCategory