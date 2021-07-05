import React, { Component } from 'react'
import { View, Text } from 'react-native'
import CardStars from './CardStars'
import { Colors } from '../../Themes'

class CardPeriority extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    static defaultProps = {
        onVerifiedPress: () => null
    }

    render() {
        const {data} = this.props
        return (
            <View>
                <View style={{ marginTop: 0, backgroundColor: "#fff", padding: 0 }}>
                    <View style={{ flex: 0, flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 15 }}>
                        <Text style={{ fontSize: 16, fontWeight: "bold", color: Colors.lightGrey }}>Periority</Text>
                    </View>
                    <Text style={{ fontSize: 12, marginBottom: 15, color: Colors.black }}>
                        Delivery priority must follow the grade level That defined in respective documents
                    </Text>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', marginBottom: 10 }}>
                        <CardStars periority={data} size={34} />
                    </View>
                </View>
            </View>
        )
    }
}

const styles = {
    voteStyles: {
        marginLeft: 5, marginRight: 5
    },
    voteColor: '#fdb813'
}

export default CardPeriority