import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image, Dimensions, ScrollView } from 'react-native'
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
            isDone: props.isChecked ? 'good' : 'unset',
            visibleBottomPopup: false,
            materialStatus: false, 
            BQStatus: false, 
            HUStatus: false,
            btnStatus: props.btnStatus ? props.btnStatus : false
        }
    }

    onSelect = data => {
        this.setState({isDone: data.status})
        this.props.onChange(1)
    }

    render () {
        const {isDone, visibleBottomPopup, btnStatus, materialStatus, BQStatus, HUStatus} = this.state
        const {onEnlarge, onChange, onScanner, isRouteEnable, data} = this.props
        const {name, description, from, to, detail} = data
        let iconName = 'circle'
        let iconColor = Colors.lightGrey
        switch (isDone) {
            case 'good':
                iconName = 'check-circle'
                iconColor = Colors.main
                break;
            case 'bad':
                iconName = 'x-circle'
                iconColor = Colors.error
                break;
            default:
                iconName = 'circle'
                iconColor = Colors.lightGrey
                break;
        }
        return (
            <View style={{ marginTop: 1, marginBottom: 1, backgroundColor: "#fff" }}>
                <TouchableOpacity 
                    onPress={() => {
                        isRouteEnable ? onScanner((data) => this.onSelect(data)) : console.log('click material')
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
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flex: 1, marginBottom: 0 }}>
                                <Text style={{ color: "#000", fontSize: 14, fontWeight: "bold" }}>
                                    {name ? name : '-'}
                                </Text>
                                <Text style={{ fontSize: 12, color: "#999", marginTop: 5 }}>
                                    {description ? description : '-'}
                                </Text>
                                <Text style={{ fontSize: 12, color: "#999", marginTop: 5 }}>
                                    {detail.material_desc ? detail.material_desc : '-'}
                                </Text>
                            </View>
                            <View style={{ maxWidth: 120, marginBottom: 0, alignItems: 'flex-end' }}>
                                {isRouteEnable && (
                                    <View style={{ marginBottom: 7 }}>
                                        <Icon name={'right'} size={16} color={Colors.lightGrey} />
                                    </View>
                                )}
                                <Text style={{ fontSize: 12, color: "#999" }}>{from ? from : '-'} | {to ? to : '-'}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
                <BottomPopup 
                    visible={visibleBottomPopup} 
                    title={'Material'} 
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardMaterial)