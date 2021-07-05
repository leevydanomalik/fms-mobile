import React, { Component } from 'react'
import { View, Text } from 'react-native'
import MultistepTemplate from './MultistepTemplate'
import ButtonNext from './ButtonNext'

class ValidationGate extends Component {
    render () {
        const { 
            onPress, 
            onBack, 
            multistep, 
            multiCaption,
            multiDescription,
            title,
            subtitle,
            description,
            buttonTitle
        } = this.props
        return (
            <View style={{ elevation: 3, backgroundColor: '#fff', borderRadius: 7.5, padding: 15 }}>
                {title && (
                    <Text style={{ fontSize: 18, marginBottom: 15, color: "#000", textAlign: 'center', fontWeight: 'bold' }}>
                        {title}
                    </Text>
                )}
                {subtitle && (
                    <Text style={{ fontSize: 14, marginBottom: 10, color: "#999", textAlign: 'center', fontWeight: 'bold' }}>
                        {subtitle}
                    </Text>
                )}
                {description && (
                    <Text style={{ fontSize: 12, marginBottom: 20, color: "#999", textAlign: 'center' }}>
                        {description}
                    </Text>
                )}
                {multistep && (
                    <View style={{marginBottom: 20}}>
                        <MultistepTemplate data={multistep} caption={multiCaption} />
                    </View>
                )}
                {multiDescription && (
                    <Text style={{ fontSize: 12, marginBottom: 20, color: "#999", textAlign: 'center' }}>
                        {multiDescription}
                    </Text>
                )}
                <View style={{ marginBottom: 15 }}>
                    <ButtonNext 
                        title={buttonTitle ? buttonTitle : 'Start Scanning QR'} 
                        isUpperCase={true}
                        type={'main'}
                        onPress={() => onPress()} />
                </View>
                <View style={{ marginBottom: 0 }}>
                    <ButtonNext 
                        title={'Cancel'} 
                        type={'sekunder'}
                        isUpperCase={true}
                        onPress={() => onBack()} />
                </View>
            </View>
        )
    }
}

export default ValidationGate