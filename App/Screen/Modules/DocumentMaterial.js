import React from 'react'
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import { Styles, Colors } from '../../Themes'
import {
    CardBasePrice,
    CardInventory,
    CardMovement,
    CardQuality,
    CardReplenishment,
    CardStockOpname,
    CardValuation
} from './material'
import NavbarMenu from '../Components/NavbarMenu'
import CardReplenishmentPick from './material/CardReplenishmentPick'
import CardReplenishmentPack from './material/CardReplenishmentPack'
import CardReplenishmentStr from './material/CardReplenishmentStr'

const bg_red = "#b91500"
const blue = Colors.main
const { width, height } = Dimensions.get('window')
const snapPoint = (height - (height - 30))

class DocumentMaterial extends React.Component {
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
            case "BASEPRICE":
                primaryColor = "#2B9133"
                singleMode = true
                mainDesc = "This vehicle must stop the engine while parking and please securing surrounding and confirm to loading master"
                break
            case "INVENTORY":
                primaryColor = "#2B9133"
                singleMode = true
                mainDesc = "This vehicle must stop the engine while parking and please securing surrounding and confirm to loading master"
                break
            case "MOVEMENT":
                primaryColor = "#2B9133"
                singleMode = true
                mainDesc = "This vehicle must stop the engine while parking and please securing surrounding and confirm to loading master"
                break
            case "QUALITY":
                primaryColor = "#2B9133"
                singleMode = true
                mainDesc = "This vehicle must stop the engine while parking and please securing surrounding and confirm to loading master"
                break
            case "REPLENISHMENT":
            case "REPLENISHMENTPICK":
            case "REPLENISHMENTPACK":
            case "REPLENISHMENTSTR":
                primaryColor = "#2B9133"
                singleMode = true
                mainDesc = "This vehicle must stop the engine while parking and please securing surrounding and confirm to loading master"
                break
            case "STOCKOPNAME":
                primaryColor = "#2B9133"
                singleMode = true
                mainDesc = "This vehicle must stop the engine while parking and please securing surrounding and confirm to loading master"
                break
            case "VALUATION":
                primaryColor = "#2B9133"
                singleMode = true
                mainDesc = "This vehicle must stop the engine while parking and please securing surrounding and confirm to loading master"
                break
        }

        return (
            <View style={{ flex: 1 }}>
                <NavbarMenu
                    onBack={() => this.props.navigation.goBack()}
                    title={title ? `${name} ID#${title[title.length - 1]}` : 'Ticket#86868868'}
                />
                <ScrollView>
                    {role == "BASEPRICE" ? <CardBasePrice mainDesc={mainDesc} rawData={data} /> : null}

                    {role == "INVENTORY" ? <CardInventory mainDesc={mainDesc} rawData={data} /> : null}

                    {role == "MOVEMENT" ? <CardMovement mainDesc={mainDesc} rawData={data} /> : null}

                    {role == "QUALITY" ? <CardQuality mainDesc={mainDesc} rawData={data} /> : null}

                    {role == "REPLENISHMENT" ? <CardReplenishment mainDesc={mainDesc} rawData={data} /> : null}
                    {role == "REPLENISHMENTPICK" ? <CardReplenishmentPick mainDesc={mainDesc} rawData={data} /> : null}
                    {role == "REPLENISHMENTPACK" ? <CardReplenishmentPack mainDesc={mainDesc} rawData={data} /> : null}
                    {role == "REPLENISHMENTSTR" ? <CardReplenishmentStr mainDesc={mainDesc} rawData={data} /> : null}

                    {role == "STOCKOPNAME" ? <CardStockOpname mainDesc={mainDesc} rawData={data} /> : null}

                    {role == "VALUATION" ? <CardValuation mainDesc={mainDesc} rawData={data} /> : null}
                </ScrollView>
            </View>
        )
    }
}

export default DocumentMaterial