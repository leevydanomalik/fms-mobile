import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Styles, Colors } from '../../Themes'
import Icon from 'react-native-vector-icons/AntDesign'

const blue = "#0e74ff"

class ButtonNext extends React.Component {
    // constructor(props) {
    //     super(props)
    //     const { params } = props.navigation.state
    //     this.state = {}
    // }
    render() {
        const { onPress, title, type, setBorderRadius, enableBorderRadius, enableCaretDown, isCapitalize } = this.props
        let txtColor = ''
        let btnColor = {}
        switch (type) {
            case 'primary':
                txtColor = Colors.lightGrey
                btnColor = Styles.buttonPrimary
                break
            case 'sekunder':
                txtColor = Colors.lightGrey
                btnColor = Styles.buttonSekunder
                break
            case 'main':
                txtColor = '#fff'
                btnColor = Styles.buttonMain
                break
            case 'error':
                txtColor = '#fff'
                btnColor = Styles.buttonError
                break
            case 'error-reverse':
                txtColor = Colors.black
                btnColor = Styles.buttonErrorReverse
                break
            case 'info':
                txtColor = Colors.white
                btnColor = Styles.buttonInfo
                break
            case 'info-reverse':
                txtColor = Colors.black
                btnColor = Styles.buttonInfoReverse
                break
            case 'success':
                txtColor = Colors.white
                btnColor = Styles.buttonSuccess
                break
            case 'success-reverse':
                txtColor = Colors.black
                btnColor = Styles.buttonSuccessReverse
                break
            case 'warning':
                txtColor = Colors.white
                btnColor = Styles.buttonWarning
                break
            case 'warning-reverse':
                txtColor = Colors.black
                btnColor = Styles.buttonWarningReverse
                break
            case 'main-holder':
                txtColor = Colors.black
                btnColor = Styles.buttonMainholder
                break
            case 'main-holder-reverse':
                txtColor = Colors.black
                btnColor = Styles.buttonMainholderReverse
                break
            default:
                txtColor = '#fff'
                btnColor = Styles.buttonMain
                break
        }
        return (
            <TouchableOpacity 
                onPress={() => onPress()}
                style={[btnColor, {borderRadius: enableBorderRadius ? 100 : setBorderRadius ? setBorderRadius : 7.5}]}>
                    <Text style={{ fontWeight: 'bold', fontSize: 14, color: txtColor, textTransform: isCapitalize ? 'capitalize' : 'uppercase', letterSpacing: 1 }}>{title}</Text>
                    {enableCaretDown && (
                        <Icon 
                            name={'caretdown'} 
                            size={14} 
                            color={txtColor} 
                            style={{
                                position: 'absolute', 
                                right: 10, 
                                top: 10
                            }} />
                    )}
            </TouchableOpacity>
        )
    }
}

export default ButtonNext