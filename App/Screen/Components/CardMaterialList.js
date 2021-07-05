import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Dimensions, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import FeIcon from 'react-native-vector-icons/Feather'
import { Colors } from '../../Themes'
import {connect} from 'react-redux'
import SealAction from '../../Redux/SealRedux'
import Config from 'react-native-config'
import { generateUrlPhotoMaterial } from '../../Utils'
import ProgressiveImage from '../Modules/ProgressiveImage'
import CardMaterialInfo from './CardMaterialInfo'
import BottomPopup from './BottomPopup'

class CardMaterial extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visibleBottomPopup: false,
            materialStatus: false, 
            BQStatus: false, 
            HUStatus: false,
            btnStatus: props.btnStatus ? props.btnStatus : false
        }
    }

    onSelect = (data) => {
        this.props.onChange(1, data.physic, data.status, data.zone, data.reason, data.qty)
    }

    render () {
        const {visibleBottomPopup} = this.state
        const {disableZone, onScanner, isRouteEnable, data} = this.props
        const {isConfirmed, name, from, to, detail, hu_no, kimap} = data
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
                        isRouteEnable ? onScanner((data) => this.onSelect(data)) : console.log('clik material')
                    }}>
                    <View style={{ padding: 20, flex: 0, flexDirection: "row", justifyContent: 'space-between', alignItems: 'flex-start', borderBottomWidth: 0.5, borderBottomColor: '#ccc' }}>
                        <View style={{ width: 25, borderRadius: 0, justifyContent: 'flex-start', alignItems: 'flex-start', marginRight: 5, marginTop: 2 }} >
                            <FeIcon name={iconName} size={22} color={iconColor} />
                        </View>
                        <TouchableOpacity 
                            onPress={() => {
                                this.setState({visibleBottomPopup: true})
                            }} 
                            style={{ width: 35, height: 50, borderRadius: 0, marginRight: 8 }} >
                            <ProgressiveImage
                                resizeMode="cover" 
                                sizeSpinner={20}
                                style={{ 
                                    width: "100%", 
                                    height: "100%",
                                    backgroundColor: Colors.whiteGrey
                                }}
                                source={{
                                    uri: generateUrlPhotoMaterial(detail.id ? detail.id : ''),
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'DGI-API-KEY': Config.APP_WMS_AUTH_HEADER_VALUE
                                        // 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiJ9.5BG9SEVOGo_xRhtT8IkyoSy60kPg8HM9Vpvb0TdNew4'
                                    }
                                }} />
                        </TouchableOpacity>
                        <View style={{ flex: 1 }}>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ flex: 1, color: Colors.black, fontSize: 14, fontWeight: "bold" }}>
                                    {name ? name : '-'}
                                </Text>
                                <Text style={{ color: Colors.black, fontSize: 14, fontWeight: "bold" }}>
                                    {detail.hu_cap ? detail.hu_cap : '-'} {detail.uom ? detail.uom : '-'}
                                </Text>
                            </View>
                            {!disableZone && (
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                                    <Text style={{ fontSize: 12, color: Colors.grey, textAlign: 'left' }}>
                                        From
                                    </Text>
                                    <Text style={{ fontSize: 12, color: Colors.grey, textAlign: 'right' }}>
                                        {from ? from : '-'}
                                    </Text>
                                </View>
                            )}
                            {!disableZone && (
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                                    <Text style={{ fontSize: 12, color: Colors.grey, textAlign: 'left' }}>
                                        To
                                    </Text>
                                    <Text style={{ fontSize: 12, color: Colors.grey, textAlign: 'right' }}>
                                        {to ? to : '-'}
                                    </Text>
                                </View>
                            )}
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                                <Text style={{ fontSize: 12, color: Colors.grey, textAlign: 'left' }}>
                                    KIMAP
                                </Text>
                                <Text style={{ fontSize: 12, color: Colors.grey, textAlign: 'right' }}>
                                    {kimap ? kimap : '-'}
                                </Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                                <Text style={{ fontSize: 12, color: Colors.grey, textAlign: 'left' }}>
                                    Pallet
                                </Text>
                                <Text style={{ fontSize: 12, color: Colors.grey, textAlign: 'right' }}>
                                    {hu_no ? hu_no : '-'}
                                </Text>
                            </View>
                            {isRouteEnable && (
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10 }}>
                                    <View style={{ width: 30, height: 30, borderRadius: 100, marginLeft: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.main }}>
                                        <Icon name={'arrowright'} size={20} color={Colors.white} />
                                    </View>
                                </View>
                            )}
                        </View>
                    </View>
                </TouchableOpacity>
                <BottomPopup 
                    visible={visibleBottomPopup} 
                    title={'Material KIMAP'} 
                    onDismiss={() => this.setState({visibleBottomPopup: false})}>
                    <View style={{ paddingTop: 25, height: (Dimensions.get('screen').height - 200)}}>
                        <View style={{ flex: 1, flexDirection: 'column' }}>
                            <ScrollView>
                                <CardMaterialInfo data={{
                                    id: detail.id,
                                    kimap: detail.kimap,
                                    name: detail.name,
                                    year: detail.material_year,
                                    type: detail.material_type,
                                    lobs: detail.material_lobs,
                                    to_liter_constant: detail.material_to_liter,
                                    uom: detail.uom,
                                    weight: detail.material_gross_weight
                                }} />
                            </ScrollView>
                        </View>
                    </View>
                </BottomPopup>
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