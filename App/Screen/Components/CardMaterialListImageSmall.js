import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Colors } from '../../Themes'
import {connect} from 'react-redux'
import SealAction from '../../Redux/SealRedux'
import Config from 'react-native-config'
import { generateUrlPhotoMaterial } from '../../Utils'
import ProgressiveImage from '../Modules/ProgressiveImage'

class CardMaterial extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visibleBottomPopup: false,
            materialStatus: false, 
        }
    }

    render () {
        const {data, enableBorder} = this.props
        const {id, name, kimap, hu_cap, uom, isLeaks, description} = data
        return (
            <View style={{ flex: 1, marginBottom: 15, borderBottomWidth: enableBorder ? 0.5 : 0, borderBottomColor: '#ccc' }}>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity 
                        onPress={() => {
                            // this.setState({visibleBottomPopup: true})
                            console.log('test')
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
                                uri: generateUrlPhotoMaterial(id ? id : ''),
                                headers: {
                                    'Content-Type': 'application/json',
                                    'DGI-API-KEY': Config.APP_WMS_AUTH_HEADER_VALUE
                                    // 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiJ9.5BG9SEVOGo_xRhtT8IkyoSy60kPg8HM9Vpvb0TdNew4'
                                }
                            }} />
                    </TouchableOpacity>
                    <View style={{flex: 1}}>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginTop: 5}}>
                            <View style={{flex: 1}}>
                                <Text style={{ fontSize: 12, color: Colors.black, fontWeight: 'normal' }}>{name}</Text>
                                <Text style={{ fontSize: 12, color: Colors.black, fontWeight: 'bold' }}>{kimap}</Text>
                            </View>
                            <View style={{marginLeft: 5}}>
                                <Text style={{ fontSize: 12, color: Colors.black, fontWeight: 'bold', textAlign: 'right' }}>{hu_cap} {uom}</Text>
                            </View>
                        </View>
                        
                        {isLeaks && (
                            <View style={{ marginTop: 8, marginBottom: 8, width: 60, borderRadius: 40, paddingLeft: 10, paddingRight: 10, paddingTop: 3, paddingBottom: 3, backgroundColor: 'red' }}>
                                <Text style={{ textAlign: 'center', fontSize: 10, color: Colors.white }}>LEAKS</Text>
                            </View>
                        )}

                        {description && (
                            <View style={{ marginBottom: 15 }}>
                                <Text style={{ fontSize: 12, color: Colors.black, fontWeight: 'normal' }}>{description}</Text>
                            </View>
                        )}
                    </View>
                </View>
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