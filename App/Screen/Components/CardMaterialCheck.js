import React, { Component } from 'react'
import { View, Text, Image, Dimensions, ScrollView } from 'react-native'
import BottomPopup from './BottomPopup'
import ButtonNext from './ButtonNext'
import CardMaterial from './CardMaterialList'
import { Colors } from '../../Themes'

const img = require('../../assets/product.png')
let msecs = 0

class MaterialDetail extends Component {
    render() {
        return (
            <View style={{ padding: 15 }}>
                <View style={{ 
                    flex: 1,
                    paddingTop: 30,
                    paddingBottom: 30,
                    alignItems: 'center',
                    borderBottomColor: '#ccc',
                    borderBottomWidth: 1,
                    marginBottom: 15
                 }}>
                    <View style={{ height: 240, width: 200, borderRadius: 0 }} >
                        <Image source={img} resizeMode="cover" style={{ width: "100%", height: "100%", borderRadius: 0 }} />
                    </View>
                </View>
                <View style={{ marginBottom: 15 }}>
                    <Text style={{ fontSize: 12, color: Colors.lightGrey }}>Material KIMAP</Text>
                    <Text style={{ color: Colors.black, fontSize: 16, fontWeight: "bold" }}>A94949488809</Text>
                </View>
                <View style={{ marginBottom: 15 }}>
                    <Text style={{ fontSize: 12, color: Colors.lightGrey }}>TYPE</Text>
                    <Text style={{ color: Colors.black, fontSize: 16, fontWeight: "bold" }}>Inbound Delivery</Text>
                </View>
                <View style={{ marginBottom: 15 }}>
                    <Text style={{ fontSize: 12, color: Colors.lightGrey }}>REFERENCE</Text>
                    <Text style={{ color: Colors.black, fontSize: 16, fontWeight: "bold" }}>PO#86868686</Text>
                </View>
                <View style={{ marginBottom: 15 }}>
                    <Text style={{ fontSize: 12, color: Colors.lightGrey }}>DELIVERY ORDER</Text>
                    <Text style={{ color: Colors.black, fontSize: 16, fontWeight: "bold" }}>DO#86868686</Text>
                </View>
                <View style={{ marginBottom: 15 }}>
                    <Text style={{ fontSize: 12, color: Colors.lightGrey }}>TYPE</Text>
                    <Text style={{ color: Colors.black, fontSize: 16, fontWeight: "bold" }}>Inbound Delivery</Text>
                </View>
                <View style={{ marginBottom: 15 }}>
                    <Text style={{ fontSize: 12, color: Colors.lightGrey }}>REFERENCE</Text>
                    <Text style={{ color: Colors.black, fontSize: 16, fontWeight: "bold" }}>PO#86868686</Text>
                </View>
                <View style={{ marginBottom: 0 }}>
                    <Text style={{ fontSize: 12, color: Colors.lightGrey }}>DELIVERY ORDER</Text>
                    <Text style={{ color: Colors.black, fontSize: 16, fontWeight: "bold" }}>DO#86868686</Text>
                </View>
            </View>
        )
    }
}

class CardMaterialCheck extends Component {
    constructor(props) {
        super(props)
        this.state = {
            stopwatchStart: false,
            stopwatchReset: false,
            visibleBottomPopup: false,
            countDone: 0,
            lastMsecs: props.lastMsecs ? props.lastMsecs : msecs,
            limitIndex: 3,
            totalMaterial: 0
        }
    }

    static defaultProps = {
        onVerifiedPress: () => null
    }

    componentDidMount() {
        const {data} = this.props
        let count = 0
        data && data.map((dt) => {
            count += (dt.isConfirmed) ? 1 : 0
            return null
        })
        this.setState({countDone: count, totalMaterial: data.length})
    }

    render() {
        const { onPress, onScanner, btnTitle, data, isRouteEnable, disableButton, enablePrinting } = this.props
        const { visibleBottomPopup, countDone, limitIndex, totalMaterial } = this.state
        const { ml_number, do_number, wh_name, disableZone, onChange } = this.props
        return (
            <View>
                <View style={{ marginTop: 0, backgroundColor: "#fff", padding: 20, borderTopWidth: 0.5, borderTopColor: '#ccc', borderBottomWidth: 0.5, borderBottomColor: '#ccc' }}>
                    <View style={{ flex: 0, flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 5 }}>
                        <Text style={{ fontSize: 16, fontWeight: "bold", color: Colors.black }}>Material List (#{ml_number ? ml_number : '-'})</Text>
                    </View>
                    <View style={{ flex: 0, flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 0 }}>
                        <Text style={{ fontSize: 12, fontWeight: "normal", color: Colors.grey, marginRight: 20}}>#{do_number ? do_number : '-'}</Text>
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: 12, fontWeight: "normal", color: Colors.grey, textAlign: 'right' }}>{wh_name ? wh_name : '-'}</Text>
                        </View>
                    </View>
                </View>

                {data && data.slice(0, limitIndex).map((dt, index) => {
                    return (
                        <CardMaterial 
                            key={index} 
                            data={dt}
                            disablePallet={dt.disable_pallet}
                            disableZone={disableZone}
                            onScanner={onScanner ? (type) => onScanner(type, dt) : () => console.log('scanner')}
                            enablePrinting={enablePrinting}
                            isRouteEnable={isRouteEnable}
                            onChange={(count, material, status, zone, reason, qty) => {
                                { onChange && onChange(material, status, zone, reason, qty)}
                                this.setState({countDone: (this.state.countDone + count)})
                            }} 
                            onEnlarge={() => this.setState({visibleBottomPopup: true, isMaterialDetail: false})} />
                    )
                })}

                {(limitIndex < totalMaterial) && (
                    <View style={{ marginTop: 0, padding: 20, paddingTop: 18, justifyContent: 'center', alignItems: 'center', borderBottomColor: '#ccc', borderBottomWidth: 0.5}}>
                        <View style={{ width: 90 }}>
                            <ButtonNext 
                                title={'More'} 
                                type={'primary'}
                                enableBorderRadius={true}
                                onPress={() => this.setState({limitIndex: (this.state.limitIndex + 3)})} />
                        </View>
                    </View>
                )}

                {data && (data.length > 0) && (
                    <View style={{ marginTop: 0, backgroundColor: "#fff"}}>
                        {(!disableButton) && (countDone >= data.length) && (
                            <View style={{padding: 20}}>
                                <ButtonNext 
                                    title={btnTitle ? btnTitle : 'Done and Next'} 
                                    onPress={() => onPress()} />
                            </View>
                        )}
                    </View>
                )}

                <BottomPopup 
                    visible={visibleBottomPopup} 
                    title={'Material KIMAP'} 
                    onDismiss={() => this.setState({visibleBottomPopup: false})}>
                    <View style={{ paddingTop: 25, height: (Dimensions.get('screen').height - 200)}}>
                        <ScrollView>
                            <MaterialDetail />
                        </ScrollView>
                    </View>
                </BottomPopup>
            </View>
        )
    }
}

const options = {
    container: {
        backgroundColor: '#fff',
        padding: 0,
        borderRadius: 5
    },
    text: {
        fontSize: 12,
        fontWeight: 'normal',
        color: '#999',
    }
}

export default CardMaterialCheck