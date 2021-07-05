import React, { Component } from 'react'
import {View, Text, ScrollView, TouchableOpacity, Image, StyleSheet} from 'react-native'
import {Colors} from '../../Themes'
import QRCode from 'react-native-qrcode-svg'
import Barcode from "react-native-barcode-builder"

const img = require('../../assets/fireflame.png')

class CardScanner extends Component {
    render () {
        const {barcode, qrcode, label} = this.props
        const size = 60
        return (
            <View style={{height: (size + 20)}}>
                <View style={{flex: 1, height: size, flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={{flex: 1, height: size, alignItems: 'flex-start', marginLeft: -10}}>
                        <Barcode value={barcode ? barcode : '-'} format={"CODE128"} width={2} style={{backgroundColor: Colors.whiteGrey}} height={(size - 20)} />
                    </View>
                    <View style={{width: size, height: size, backgroundColor: Colors.whiteGrey, marginLeft: 15}}>
                        <QRCode size={size} value={qrcode ? qrcode : '-'} />
                    </View>
                </View>
                <Text style={{fontSize: 10, fontWeight: 'normal', color: Colors.grey, marginTop: 5}}>{label}</Text>
            </View>
        )
    }
}

class CardValue extends Component {
    render() {
        const {value, label, align} = this.props
        let position = 'flex-start'
        switch (align) {
            case 'left':
                position = 'flex-start'
                break
            case 'right':
                position = 'flex-end'
                break
            case 'center':
                position = 'center'
                break
            default:
                position = 'flex-start'
                break
        }
        return (
            <View style={{
                flex: 1,
                alignItems: position,
                justifyContent: 'center'
            }}>
                <Text style={{fontSize: 8, color: Colors.grey}}>{label}</Text>
                <Text style={{fontSize: 18, color: Colors.grey, fontWeight: 'bold'}}>{value}</Text>
            </View>
        )
    }
}

class CardQR extends Component {
    render() {
        const {code, label} = this.props
        const size = 80
        return (
            <View style={{
                width: size,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Text style={{fontSize: 8, color: Colors.grey, marginBottom: 5}}>{label}</Text>
                <View style={{
                    width: size,
                    height: size,
                    backgroundColor: Colors.whiteGrey
                }}>
                    <QRCode size={size} value={code ? code : "-"} />
                </View>
            </View>
        )
    }
}

class CardPrintLabelling extends Component {
    render () {
        const {isRotate, label, isOutbound} = this.props
        const sizeLogo = 90
        const scanner = [
            {id: 1, label: 'MAT - ' + (label.id ? label.id : ''), code: label.id},
            {id: 2, label: 'BQ - ' + (label.bq ? label.bq : ''), code: label.bq},
            {id: 3, label: 'HU - ' + (label.hu ? label.hu : ''), code: label.hu}
        ]

        let type = ''
        if (label.type) {
            let typeText = label.type.split(' ')
            for (let index = 0; index < typeText.length; index++) {
                const element = typeText[index]
                type += element[0]
            }
        }

        return (
            <View style={[styles.mainContainer, isRotate ? styles.rotateContainer : styles.normalContainer]}>
                <View style={[styles.container, isRotate ? styles.rotate : null]}>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 15, paddingRight: 15}}>
                        <View style={{width: 350, marginRight: 30}}>
                            <View style={{height: 30}}>
                                <Text style={{fontSize: 14, fontWeight: 'bold', color: Colors.text}}>
                                    {label.name ? label.name : ''}
                                </Text>
                            </View>
                            {scanner && scanner.map((dt, index) => {
                                return (
                                    <View key={index} style={{marginBottom: (scanner.length === (index + 1)) ? 0 : 15}}>
                                        <CardScanner 
                                            label={dt.label}
                                            qrcode={dt.code}
                                            barcode={dt.code}
                                        />
                                    </View>
                                )
                            })}
                            <Text style={[styles.smallFont, {position: 'absolute', bottom: 0, right: 0}]}>
                                Stored {label.stored ? label.stored : '-'}
                            </Text>
                        </View>
                        <View style={{width: 220}}>
                            <View style={{height: 25, flexDirection: 'row', justifyContent: 'space-between'}}>
                                <Text style={styles.smallFont}>{label.kimap ? label.kimap : '-'}</Text>
                                <Text style={styles.smallFont}>Printed {label.date ? label.date : '-'} : {label.user ? label.user : '-'}</Text>
                            </View>
                            <View style={{flex: 1, justifyContent: 'space-between'}}>
                                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <CardValue 
                                        label={'UOM'}
                                        value={label.uom ? label.uom : '-'}
                                    />
                                    <CardValue 
                                        label={'QTY'}
                                        value={label.qty ? label.qty : '-'}
                                        align={'center'}
                                    />
                                    <CardValue 
                                        label={'TYPE'}
                                        value={type ? type : '-'}
                                        align={'right'}
                                    />
                                </View>
                                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <View style={{justifyContent: 'space-between', marginRight: 20}}>
                                        <CardValue 
                                            label={'BATCH'}
                                            value={label.batch ? label.batch : '-'}
                                        />
                                        <CardValue 
                                            label={'WEIGHT(KG)'}
                                            value={label.weight ? label.weight : '-'}
                                        />
                                    </View>
                                    <View style={{flex: 1, alignItems: 'flex-end', height: sizeLogo}}>
                                        <View style={{
                                            width: '100%',
                                            height: (sizeLogo - 10),
                                            alignItems: 'flex-end'
                                        }}>
                                            <View style={{ height: (sizeLogo - 10), width: (sizeLogo - 10), borderRadius: 0 }} >
                                                <Image source={img} resizeMode="cover" style={{ width: "100%", height: "100%", borderRadius: 0 }} />
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <CardQR 
                                        label={isOutbound ? 'Picking' : 'Putaway'} 
                                        code={label.putaway} />
                                    <CardQR 
                                        label={isOutbound ? 'Outbound Delivery' : 'Inbound Delivery'} 
                                        code={label.inbound} />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        borderRadius: 10,
    },
    rotateContainer: {
        width: 340, 
        paddingTop: 10,
    },
    normalContainer: {
        borderRadius: 10,
    },
    rotate: {
        transform: [{
            rotate: '90deg'
        }]
    },
    container: {
        padding: 15,
        margin: 0,
        height: 330
    },
    smallFont: {
        fontSize: 8, 
        color: Colors.lightGrey
    }
})

export default CardPrintLabelling