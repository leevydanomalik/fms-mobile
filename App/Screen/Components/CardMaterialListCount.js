import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import FeIcon from 'react-native-vector-icons/Feather'
import { Colors } from '../../Themes'
import {connect} from 'react-redux'
import SealAction from '../../Redux/SealRedux'

class CardMaterial extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isDone: 'unset',
            physic: '',
            visibleBottomPopup: false,
            BQStatus: false, 
            HUStatus: false,
            btnStatus: props.btnStatus ? props.btnStatus : false
        }
    }

    onSelect = data => {
        this.setState({isDone: data.status, physic: data.physic})
        this.props.onChange(1, data.physic, data.zone, data.status)
    }

    render () {
        const {onScanner, isRouteEnable, data} = this.props
        const {name, description, sap, wms, physic, isConfirmed} = data
        let isDone = isConfirmed ? 'good' : 'unset'
        let iconName = 'circle'
        let iconColor = Colors.lightGrey
        switch (isDone) {
            case 'good':
                iconName = 'check-circle'
                iconColor = Colors.main
                break
            case 'bad':
                iconName = 'x-circle'
                iconColor = Colors.error
                break
            default:
                iconName = 'check-circle'
                iconColor = Colors.lightGrey
                break
        }
        return (
            <View style={{ marginTop: 1, marginBottom: 1, backgroundColor: "#fff" }}>
                <TouchableOpacity 
                    onPress={() => {
                        isRouteEnable ? onScanner((data) => this.onSelect(data)) : console.log('click material')
                    }}>
                    <View style={{ padding: 20, paddingLeft: 10, paddingRight: 10, flex: 0, flexDirection: "row", justifyContent: 'space-between', alignItems: 'flex-start', borderBottomWidth: 0.5, borderBottomColor: '#ccc' }}>
                        <View style={{ width: 30, borderRadius: 0, justifyContent: 'flex-start', alignItems: 'flex-start', paddingTop: 3, marginRight: 5 }} >
                            <FeIcon name={iconName} size={22} color={iconColor} />
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <View style={{ flex: 1 }}>
                                <Text style={{ color: Colors.black, fontSize: 14, fontWeight: "bold" }}>
                                    {name ? name : '-'}
                                </Text>
                                <Text style={{ fontSize: 12, color: Colors.lightGrey }}>
                                    {description ? description : '-'}
                                </Text>
                            </View>
                            <View style={{ width: 120, marginLeft: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ flex: 0, alignItems: 'flex-start' }}>
                                    <Text style={{ fontSize: 12, color: Colors.lightGrey, fontWeight: 'bold' }}>SAP</Text>
                                    <Text style={{ color: sap === '0' ? Colors.lightGrey : Colors.black, fontSize: 28 }}>
                                        {sap ? sap : '-'}
                                    </Text>
                                </View>
                                <View style={{ flex: 0, alignItems: 'flex-start' }}>
                                    <Text style={{ fontSize: 12, color: Colors.lightGrey, fontWeight: 'bold' }}>WMS</Text>
                                    <Text style={{ color: wms === '0' ? Colors.lightGrey : Colors.black, fontSize: 28 }}>
                                        {wms ? wms : '-'}
                                    </Text>
                                </View>
                                <View style={{ flex: 0, alignItems: 'flex-start' }}>
                                    <Text style={{ fontSize: 12, color: Colors.lightGrey, fontWeight: 'bold' }}>PHYSIC</Text>
                                    <Text style={{ color: physic === '0' ? Colors.lightGrey : Colors.black, fontSize: 28 }}>
                                        {physic ? physic : '0'}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        {isRouteEnable && (
                            <View style={{ width: 20, height: 35, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                <Icon name={'right'} size={20} color={Colors.lightGrey} />
                            </View>
                        )}
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
        seal: state.seal
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changeStatus: (data) => dispatch(SealAction.changeStatus(data)),
        changeStatusMaterial: (data) => dispatch(SealAction.changeStatusMaterial(data)),
        changeStatusBQ: (data) => dispatch(SealAction.changeStatusBQ(data)),
        changeStatusHU: (data) => dispatch(SealAction.changeStatusHU(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardMaterial)