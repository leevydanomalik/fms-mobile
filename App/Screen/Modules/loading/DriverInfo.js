import React, { Component } from 'react'
import { View } from 'react-native'
import { DriverInfo, TruckInfo, YardDock, DocInfo, SealNumber } from '../gatesecurity'

class LoadingDriverInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    static defaultProps = {
        onVerifiedPress: () => null
    }

    borderBoldBottom = () => {
        return (
            <View style={{ borderBottomColor: '#f0f0f0', borderBottomWidth: 10, marginTop: 10 }} />
        )
    }

    render() {
        const { onVerifiedPress } = this.props
        return (
            <View>
                <DriverInfo onVerifiedPress={onVerifiedPress} />
                { this.borderBoldBottom() }
                <TruckInfo onVerifiedPress={onVerifiedPress} />
                { this.borderBoldBottom() }
                <DocInfo onVerifiedPress={onVerifiedPress} />
                { this.borderBoldBottom() }
                <YardDock onVerifiedPress={onVerifiedPress} />
                { this.borderBoldBottom() }
                <SealNumber 
                    isScanned={true}
                    onVerifiedPress={onVerifiedPress} /> 
                { this.borderBoldBottom() }
            </View>
        )
    }
}

export default LoadingDriverInfo