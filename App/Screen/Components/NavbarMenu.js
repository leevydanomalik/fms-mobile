import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import { Colors } from '../../Themes'

class Navbar extends React.Component {
    // constructor(props) {
    //     super(props)
    //     const { params } = props.navigation.state
    //     this.state = {}
    // }
    render() {
        const {title, type, titlePosition, onBack} = this.props
        let bgColor = ''
        let txtColor = ''
        let ttlPosition = ''
        let pdLeft = (titlePosition === 'left') ? (onBack) ? 50 : 15 : 15

        switch (type) {
            case 'main':
                bgColor = Colors.main,
                txtColor = '#fff'
                break
            case 'primary':
                bgColor = '#fff',
                txtColor = Colors.black
                break
            default:
                bgColor = Colors.main,
                txtColor = '#fff'
                break
        }

        switch (titlePosition) {
            case 'left':
                ttlPosition = 'flex-start'
                break
            default:
                ttlPosition = 'center'
                break
        }
        return (
            <View style={{ padding: 10, paddingLeft: pdLeft, paddingRight: 15, backgroundColor: bgColor, alignItems: ttlPosition }}>
                {onBack && (
                    <TouchableOpacity 
                        onPress={() => onBack()} 
                        style={{ position: 'absolute', left: 0, top: 8, padding: 12, paddingTop: 0 }}>
                        <Icon size={24} color={txtColor} name="arrowleft" />
                    </TouchableOpacity>
                )}
                <Text style={{ color: txtColor, fontSize: 16, fontWeight: 'bold' }}>
                    {title}
                </Text>
            </View>
        )
    }
}

export default Navbar