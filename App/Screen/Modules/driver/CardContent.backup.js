import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native'
import { Styles, Colors } from '../../../Themes'
import DriverInfo from '../gatesecurity/DriverInfo'
import TruckInfo from '../gatesecurity/TruckInfo'
import DocInfo from '../gatesecurity/DocInfo'
import YardDock from '../gatesecurity/YardDock'
import SealNumber from './SealNumber'
import ValidateQR from './ValidateQR'
import ButtonNext from '../../Components/ButtonNext'
import CardSecurity from '../../Components/CardSecurity'

const { width, height } = Dimensions.get('window')
const snapPoint = (height - (height - 90))

const img = "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg"
const imgSecurity = "https://img.freepik.com/free-photo/friendly-smiling-woman-looking-pleased-front_176420-20779.jpg"

class CardContent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            popUpVisible: false
        }
    }

    static defaultProps = {
        onVerifiedPress: () => null
    }

    borderBottom = () => {
        return (
            <View style={{ borderBottomColor: '#999', borderBottomWidth: 0.2, marginTop: 10, marginBottom: -5 }} />
        )
    }

    borderBoldBottom = () => {
        return (
            <View style={{ borderBottomColor: '#f0f0f0', borderBottomWidth: 10, marginTop: 10 }} />
        )
    }

    render() {
        const { onVerifiedPress, onBack } = this.props
        const { popUpVisible, data } = this.state
        const security = [
            {id: 1, title: 'Check In', warehouse: 'Warehouse L301 SLOC 304', time: '12:30:45 PM', worker: 'Ms. Security', image: imgSecurity},
            {id: 2, title: 'Check Out', warehouse: 'Warehouse L301 SLOC 304', time: '16:30:45 PM', worker: 'Ms. Security',  image: imgSecurity}
        ]
        return (
            <View style={{marginTop: 0}}>
                <View style={{
                    marginTop: 10,
                    padding: 20
                }}>
                    <CardSecurity
                        data={security} />
                    <Text style={{ fontSize: 42, fontWeight: 'bold', marginTop: 25, fontWeight: 'bold', color: '#000', textAlign: 'center' }}>
                        00 : 40 : 20
                    </Text>
                </View>

                { this.borderBoldBottom() }
                <ValidateQR />
                { this.borderBoldBottom() }
                <DriverInfo />
                { this.borderBoldBottom() }
                <TruckInfo />
                { this.borderBoldBottom() }
                <DocInfo />
                { this.borderBoldBottom() }
                <YardDock />
                { this.borderBoldBottom() }
                <SealNumber />

                <View style={{padding: 20}}>
                    <ButtonNext title={'CONFIRMED'} onPress={() => onBack()} />
                </View>
            </View>
        )
    }
}

export default CardContent