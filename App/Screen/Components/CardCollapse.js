import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import {Colors} from '../../Themes'

class CardCollapse extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isCollapse: true
        }
    }

    render() {
        const { children, top, right } = this.props
        const { isCollapse } = this.state
        return (
            <View>
                <TouchableOpacity 
                    onPress={() => this.setState({isCollapse: !this.state.isCollapse})}
                    style={[
                        styles.collapse, 
                        {
                            top: top ? top : 0, 
                            right: right ? right : 0
                        }
                    ]}>
                    <Text style={styles.collapseText}>
                        { isCollapse ? "+ Collapse" : "+ Expanded" }
                    </Text>
                </TouchableOpacity>
                { isCollapse && children }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    collapse: {
        position: "absolute",
        zIndex: 1000
    },
    collapseText: {
        color: Colors.lightGrey,
        fontSize: 12
    }
})

export default CardCollapse