import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Colors } from '../../Themes'
import {connect} from 'react-redux'
import SealAction from '../../Redux/SealRedux'
import FeIcon from 'react-native-vector-icons/Feather'

class CardMaterial extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visibleBottomPopup: false,
            materialStatus: false, 
        }
    }

    render () {
        const {data} = this.props
        const {name, kimap, hu_cap, uom, is_confirmed} = data
        let iconName = 'circle'
        let iconColor = Colors.lightGrey
        switch (is_confirmed) {
            case true:
                iconName = 'check-circle'
                iconColor = Colors.main
                break;
            case false:
                iconName = 'x-circle'
                iconColor = Colors.error
                break;
            default:
                iconName = 'circle'
                iconColor = Colors.lightGrey
                break;
        }
        return (
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                <View style={{flex: 1}}>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginTop: 5}}>
                        <View style={{ width: 25, borderRadius: 0, justifyContent: 'flex-start', alignItems: 'flex-start', marginRight: 5, marginTop: 2 }} >
                            <FeIcon name={iconName} size={18} color={iconColor} />
                        </View>
                        <View style={{flex: 1}}>
                            <Text style={{ fontSize: 12, color: Colors.black, fontWeight: 'bold' }}>{name}</Text>
                            <Text style={{ fontSize: 12, color: Colors.black, fontWeight: 'normal' }}>({kimap})</Text>
                        </View>
                        <View style={{marginLeft: 5}}>
                            <Text style={{ fontSize: 12, color: Colors.black, textAlign: 'right' }}>{hu_cap} {uom}</Text>
                        </View>
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