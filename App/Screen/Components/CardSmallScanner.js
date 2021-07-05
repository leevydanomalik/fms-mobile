import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import QRCode from 'react-native-qrcode-svg'
import FeIcon from 'react-native-vector-icons/Feather'
import { Colors } from '../../Themes'

class CardSmallScanner extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // isScanned: props.isScanned ? props.isScanned : false,
        }
    }
    render () {
        // const {isScanned} = this.state
        const {isCheckDesign, onPress, isScanned, isWrong, code} = this.props
        return isCheckDesign ? (
            <View style={{flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
                {isScanned && (
                    <FeIcon 
                        name={isWrong ? 'x' : 'check'} 
                        size={20} 
                        color={isWrong ? Colors.error : Colors.main} 
                    />
                )}
                <TouchableOpacity onPress={() => {
                    { onPress ? onPress() : null }
                }}>
                    <View style={{
                        width: 20, 
                        height: 20, 
                        alignItems: "center", 
                        justifyContent: "center",
                        marginLeft: 5,
                        marginRight: 5
                    }}>
                        <QRCode size={20} value={code ? code : "B29228PPK"} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    { onPress ? onPress() : null }
                }}>
                    <Text style={{ fontSize: 12, color: "#999" }}>+ Scan it</Text>
                </TouchableOpacity>
            </View>
        ) : (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <TouchableOpacity onPress={() => {
                    { onPress ? onPress() : null }
                }}>
                    <View style={{ 
                        borderColor: isScanned ? Colors.main : Colors.error, 
                        borderWidth: 2.5, 
                        width: 80, 
                        height: 80, 
                        alignItems: "center", 
                        justifyContent: "center" 
                    }}>
                        <QRCode size={70} value={code ? code : "B29228PPK"} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    { onPress ? onPress() : null }
                }} style={{marginTop: 5}}>
                    <Text style={{ fontSize: 12, color: "#999" }}>+ Scan it</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default CardSmallScanner