import React, { Component } from 'react'
import { View, Text } from 'react-native'
import FaIcon from 'react-native-vector-icons/FontAwesome'
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons'

class CardWarehouseRoute extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    static defaultProps = {
        onVerifiedPress: () => null
    }

    render() {
        const {centerTitle, centerSubtitle, start, stop, calculate} = this.props
        return (
            <View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                    <View style={{ width: 50 }}></View>
                    <Text style={{ flex: 1, alignSelf: 'center', textAlign: 'center', color: "#000", fontWeight: "bold", fontSize: 11 }}>
                        {centerTitle}
                    </Text>
                    <View style={{ width: 50 }}></View>
                </View>

                <View style={{ marginTop: -15, flexDirection: "row" }}>
                    <View style={styles.btnIcon}>
                        <MatIcon color="#ccc" size={28} name={start.icon ? start.icon : "warehouse"} style={{top: -2}} />
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <Text style={{ alignSelf: 'center', position: 'absolute', bottom: 0, color: '#999', fontSize: 10 }}>
                            {centerSubtitle}
                        </Text>
                        <FaIcon size={20} color="#999" name="caret-right" style={{ position: "absolute", alignSelf: 'center' }} />
                        <View style={{ width: '100%', height: 1, backgroundColor: "#999" }} />
                    </View>
                    <View style={styles.btnIcon}>
                        <MatIcon color="#ccc" size={28} name={stop.icon ? stop.icon : "warehouse"} style={{top: -2}} />
                    </View>
                </View>

                <View style={{ marginTop: 10, flexDirection: "row", justifyContent: 'space-between' }}>
                    <View style={{ flex: 1 }}>
                        <Text style={{ color: "#000", fontWeight: "bold", fontSize: 11 }}>{start.title}</Text>
                        {start.subtitle !== '' && (<Text style={{ fontSize: 10, color: '#999' }}>{start.subtitle}</Text>)}
                        {start.date !== '' && (<Text style={{ fontSize: 10, color: '#999' }}>{start.date}</Text>)}
                    </View>
                    <View style={{width: 50}}></View>
                    <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: "flex-end" }}>
                        <Text style={{ color: "#000", fontWeight: "bold", fontSize: 11, textAlign: 'right' }}>{stop.title}</Text>
                        {stop.subtitle !== '' && (<Text style={{ fontSize: 10, color: '#999', textAlign: 'right' }}>{stop.subtitle}</Text>)}
                        {stop.date !== '' && (<Text style={{ fontSize: 10, color: '#999', textAlign: 'right' }}>{stop.date}</Text>)}
                    </View>
                </View>

                {calculate && (
                    <View style={{
                        position: 'absolute',
                        top: 12,
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'center'
                    }}>
                        <View style={{ 
                            width: 130,
                            borderRadius: 40, 
                            paddingLeft: 10, 
                            paddingRight: 10, 
                            paddingTop: 3, 
                            paddingBottom: 2, 
                            backgroundColor: 'red',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <Text style={{ fontSize: 11, fontWeight: "bold", color: "#fff" }}>
                                {calculate}
                            </Text>
                            <FaIcon size={20} color="#fff" name="caret-right" />
                        </View>
                    </View>
                )}
            </View>
        )
    }
}

const styles = {
    btnIcon: {
        justifyContent: 'center', 
        alignItems: 'center', 
        width: 50, 
        height: 50, 
        borderWidth: 1, 
        borderColor: "#999", 
        borderRadius: 50
    }
}

export default CardWarehouseRoute