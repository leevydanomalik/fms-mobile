import React, {Component} from 'react'
import { View, Text, Dimensions } from 'react-native'
import { Colors } from '../../Themes'

class MultistepTemplate extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        const {data, caption} = this.props
        return (
            <View>
                <View style={styles.menuLine} />
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                    {data && data.map((dt, index) => {
                        return (
                            <View key={index} style={styles.menuMulti}>
                                <Text style={{ fontSize: 11, color: '#fff' }}>{index + 1}</Text>
                            </View>
                        )
                    })}
                </View>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginTop: caption ? 10 : 0 }}>
                    {caption && caption.map((dt, index) => {
                        return (
                            <Text key={index} style={{ fontSize: 11, color: '#999' }}>{dt}</Text>
                        )
                    })}
                </View>
            </View>
        )
    }
}

const styles = {
    menuLine: {
        position: 'absolute',
        top: 18,
        left: 0,
        width: Dimensions.get('window').width - 60,
        flex: 1,
        height: 3,
        backgroundColor: Colors.main
    },
    menuMulti: {
        width: 35,
        height: 35,
        borderRadius: 100,
        backgroundColor: Colors.main,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3
    }
}

export default MultistepTemplate