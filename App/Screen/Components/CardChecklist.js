import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import FaIcon from 'react-native-vector-icons/FontAwesome'
import {Colors} from '../../Themes'

class CardChecklist extends Component {
    constructor(props) {
        super(props)
        const {data, activeIndex} = props
        this.state = {
            data: data,
            activeIndex: activeIndex,
        }
    }

    static defaultProps = {
        onVerifiedPress: () => null
    }

    onChangeList = (index) => {
        const {onChange} = this.props
        const {data} = this.state
        let payload = []
        data && data.map((dt, idx) => {
            payload.push({
                ...dt, 
                active: (idx === index) 
                    ? dt.active 
                        ? false : true 
                    : dt.active 
                        ? dt.active : false 
            })
            return null
        })
        this.setState({data: payload})
        onChange && onChange(payload)
    }

    render() {
        const {data} = this.state
        return (
            <View style={{ flex: 0, marginTop: 0, marginBottom: 0 }}>
                {data && data.map((dt, index) => {
                    return (
                        <TouchableOpacity key={index} onPress={() => this.onChangeList(index)}>
                            <View style={[styles.list, {backgroundColor: dt.active ? Colors.main : '#fff'}]}>
                                <Text style={[styles.listText, {color:  dt.active ? '#fff' : '#555'}]}>
                                    {dt.title}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )
                })}
            </View>
        )
    }
}

const styles = {
    list: {
        flex: 0,
        padding: 10,
        borderRadius: 100,
        borderWidth: 0.5,
        borderColor: '#ccc',
        marginTop: 10,
        marginBottom: 10,
        alignItems: 'center'
    },
    listText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#555'
    }
}

export default CardChecklist