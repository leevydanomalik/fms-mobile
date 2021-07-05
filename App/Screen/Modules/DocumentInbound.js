import React from 'react'
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import { Styles, Colors } from '../../Themes'
import {
    CardGoodReceipt,
    CardInbound,
    CardLabeling,
    CardPutaway,
    CardStoring
} from './inbound'
import NavbarMenu from '../Components/NavbarMenu'

const bg_red = "#b91500"
const blue = Colors.main
const { width, height } = Dimensions.get('window')
const snapPoint = (height - (height - 30))

class DocumentInbound extends React.Component {
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
            case "ID":
                primaryColor = "#2B9133"
                singleMode = true
                mainDesc = "This vehicle must stop the engine while parking and please securing surrounding and confirm to loading master"
                break
            case "GOODRECEIPT":
                primaryColor = "#2B9133"
                singleMode = true
                mainDesc = "This vehicle must stop the engine while parking and please securing surrounding and confirm to loading master"
                break
            case "PUTAWAY":
                primaryColor = "#2B9133"
                singleMode = true
                mainDesc = "This vehicle must stop the engine while parking and please securing surrounding and confirm to loading master"
                break
            case "LABELING":
                primaryColor = "#2B9133"
                singleMode = true
                mainDesc = "This vehicle must stop the engine while parking and please securing surrounding and confirm to loading master"
                break
            case "STORING":
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
                    {role == "ID" ? <CardInbound mainDesc={mainDesc} rawData={data} /> : null}

                    {role == "GOODRECEIPT" ? <CardGoodReceipt mainDesc={mainDesc} rawData={data} /> : null}

                    {role == "PUTAWAY" ? <CardPutaway mainDesc={mainDesc} rawData={data} /> : null}

                    {role == "LABELING" ? <CardLabeling mainDesc={mainDesc} rawData={data} /> : null}

                    {role == "STORING" ? <CardStoring mainDesc={mainDesc} rawData={data} /> : null}
                </ScrollView>
            </View>
        )
    }
}

export default DocumentInbound