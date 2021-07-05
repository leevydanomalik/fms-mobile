import React from 'react'
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import { Styles, Colors } from '../../Themes'
import NavbarMenu from '../Components/NavbarMenu'
import {
    CardIPBill, 
    CardIPClaim, 
    CardIPFreightContract, 
    CardIPInquiry, 
    CardIPPO,
    CardIPPT,
    CardIPQuotation,
    CardIPSO,
    CardIPTransferOrder,
    CardIPInvoice,
    CardIPPIR,
    CardIPSI,
    CardIPPOC,
    CardIPPR,
    CardIPASN,
    CardIPResolve
} from './internalprocess'

const bg_red = "#b91500"
const blue = Colors.main
const { width, height } = Dimensions.get('window')
const snapPoint = (height - (height - 30))

class DocumentInternalProcess extends React.Component {
    constructor(props) {
        super(props)
        const { params } = props.navigation.state
        this.state = {
            data: params.data,
            rowData: params.rowData,
            rawData: params.rawData ? params.rawData : ""
        }
    }

    render () {
        const { role, name, roleName, imageUrl } = this.state.data
        let data = this.state.rawData
        let dualMode, singleMode, subDesc
        let title = this.state.rawData ? this.state.rawData.split("/") : ''
        let primaryColor = Colors.main
        let mainDesc = "This vehicle must stop the engine while parking and please securing surrounding and confirm to loading master"

        switch (role) {
            case "TRANSFERORDER":
                primaryColor = "#2B9133"
                singleMode = true
                mainDesc = "This vehicle must stop the engine while parking and please securing surrounding and confirm to loading master"
                break
            case "QUOTATION":
                primaryColor = "#2B9133"
                singleMode = true
                mainDesc = "This vehicle must stop the engine while parking and please securing surrounding and confirm to loading master"
                break
            case "BILL":
                primaryColor = "#2B9133"
                singleMode = true
                mainDesc = "This vehicle must stop the engine while parking and please securing surrounding and confirm to loading master"
                break
            case "IPCLAIM":
                primaryColor = "#2B9133"
                singleMode = true
                mainDesc = "This vehicle must stop the engine while parking and please securing surrounding and confirm to loading master"
                break
            case "FREIGHTCONTRACT":
                primaryColor = "#2B9133"
                singleMode = true
                mainDesc = "This vehicle must stop the engine while parking and please securing surrounding and confirm to loading master"
                break
            case "PO":
                primaryColor = "#2B9133"
                singleMode = true
                mainDesc = "This vehicle must stop the engine while parking and please securing surrounding and confirm to loading master"
                break
            case "PT":
                primaryColor = "#2B9133"
                singleMode = true
                mainDesc = "This vehicle must stop the engine while parking and please securing surrounding and confirm to loading master"
                break
            case "SO":
                primaryColor = "#2B9133"
                singleMode = true
                mainDesc = "This vehicle must stop the engine while parking and please securing surrounding and confirm to loading master"
                break
            case "INQUIRY":
                primaryColor = "#2B9133"
                singleMode = true
                mainDesc = "This vehicle must stop the engine while parking and please securing surrounding and confirm to loading master"
                break
            case "INVOICE":
                primaryColor = "#2B9133"
                singleMode = true
                mainDesc = "This vehicle must stop the engine while parking and please securing surrounding and confirm to loading master"
                break
            case "PURCHASEINFORECORD":
                primaryColor = "#2B9133"
                singleMode = true
                mainDesc = "This vehicle must stop the engine while parking and please securing surrounding and confirm to loading master"
                break
            case "SI":
                primaryColor = "#2B9133"
                singleMode = true
                mainDesc = "This vehicle must stop the engine while parking and please securing surrounding and confirm to loading master"
                break
            case "PR":
                primaryColor = "#2B9133"
                singleMode = true
                mainDesc = "This vehicle must stop the engine while parking and please securing surrounding and confirm to loading master"
                break
            case "POC":
                primaryColor = "#2B9133"
                singleMode = true
                mainDesc = "This vehicle must stop the engine while parking and please securing surrounding and confirm to loading master"
                break
            case "ASN":
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
                    {role == "TRANSFERORDER" ? <CardIPTransferOrder mainDesc={mainDesc} rawData={data} /> : null}

                    {role == "QUOTATION" ? <CardIPQuotation mainDesc={mainDesc} rawData={data} /> : null}

                    {role == "BILL" ? <CardIPBill mainDesc={mainDesc} rawData={data} /> : null}

                    {role == "IPCLAIM" ? <CardIPClaim mainDesc={mainDesc} rawData={data} /> : null}

                    {role == "FREIGHTCONTRACT" ? <CardIPFreightContract mainDesc={mainDesc} rawData={data} /> : null}

                    {role == "PO" ? <CardIPPO mainDesc={mainDesc} rawData={data} /> : null}

                    {role == "PT" ? <CardIPPT mainDesc={mainDesc} rawData={data} /> : null}

                    {role == "INQUIRY" ? <CardIPInquiry mainDesc={mainDesc} rawData={data} /> : null}

                    {role == "SO" ? <CardIPSO mainDesc={mainDesc} rawData={data} /> : null}

                    {role == "INVOICE" ? <CardIPInvoice mainDesc={mainDesc} rawData={data} /> : null}
                    
                    {role == "PURCHASEINFORECORD" ? <CardIPPIR mainDesc={mainDesc} rawData={data} /> : null}

                    {role == "SI" ? <CardIPSI mainDesc={mainDesc} rawData={data} /> : null}

                    {role == "PR" ? <CardIPPR mainDesc={mainDesc} rawData={data} /> : null}

                    {role == "POC" ? <CardIPPOC mainDesc={mainDesc} rawData={data} /> : null}

                    {role == "ASN" ? <CardIPASN mainDesc={mainDesc} rawData={data} /> : null}

                    {role == "RESOLVE" ? <CardIPResolve mainDesc={mainDesc} rawData={data} /> : null}
                </ScrollView>
            </View>
        )
    }

}

export default DocumentInternalProcess