import React from 'react'
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import { Styles, Colors } from '../../Themes'
import {
    CardOutbound,
    CardPicking,
    CardPacking,
    CardLoadingOrder,
    CardGI,
    CardShipping
} from './outbound'
import NavbarMenu from '../Components/NavbarMenu'

const bg_red = "#b91500"
const blue = Colors.main
const { width, height } = Dimensions.get('window')
const snapPoint = (height - (height - 30))

class DocumentOutbound extends React.Component {
    constructor(props) {
        super(props)
        const { params } = props.navigation.state
        this.state = {
            data: params.data,
            rowData: params.rowData,
            rawData: params.rawData ? params.rawData : ""
        }
    }

    render() {
        const { role, name, roleName, imageUrl } = this.state.data
        let data = this.state.rawData
        let dualMode, singleMode, subDesc
        let title = this.state.rawData ? this.state.rawData.split("/") : ''
        let primaryColor = Colors.main
        let mainDesc = "This vehicle must stop the engine while parking and please securing surrounding and confirm to loading master"

        switch (role) {
            case "OUTBOUND":
                primaryColor = "#2B9133"
                singleMode = true
                mainDesc = "This vehicle must stop the engine while parking and please securing surrounding and confirm to loading master"
                break
            case "PICKING":
                primaryColor = "#2B9133"
                singleMode = true
                mainDesc = "This vehicle must stop the engine while parking and please securing surrounding and confirm to loading master"
                break
            case "PACKING":
                primaryColor = "#2B9133"
                singleMode = true
                mainDesc = "This vehicle must stop the engine while parking and please securing surrounding and confirm to loading master"
                break
            case "LOADINGORDER":
                primaryColor = "#2B9133"
                singleMode = true
                mainDesc = "This vehicle must stop the engine while parking and please securing surrounding and confirm to loading master"
                break
            case "GIS":
                primaryColor = "#2B9133"
                singleMode = true
                mainDesc = "This vehicle must stop the engine while parking and please securing surrounding and confirm to loading master"
                break
            case "SHIPPING":
                primaryColor = "#2B9133"
                singleMode = true
                mainDesc = "This vehicle must stop the engine while parking and please securing surrounding and confirm to loading master"
                break
        }
        return (
            <View style={{ flex: 1 }}>
                <NavbarMenu 
                    onBack={() => this.props.navigation.goBack()}
                    title={title ? `${name} ID#${title[title.length-1]}` : 'Ticket#86868868'}
                />
                <ScrollView>
                    {role == "OUTBOUND" ? <CardOutbound mainDesc={mainDesc} rawData={data} /> : null}

                    {role == "PICKING" ? <CardPicking mainDesc={mainDesc} rawData={data} /> : null}

                    {role == "PACKING" ? <CardPacking mainDesc={mainDesc} rawData={data} /> : null}

                    {role == "LOADINGORDER" ? <CardLoadingOrder mainDesc={mainDesc} rawData={data} /> : null}

                    {role == "GIS" ? <CardGI mainDesc={mainDesc} rawData={data} /> : null}

                    {role == "SHIPPING" ? <CardShipping mainDesc={mainDesc} rawData={data} /> : null}
                </ScrollView>
            </View>
        )
    }
}

export default DocumentOutbound