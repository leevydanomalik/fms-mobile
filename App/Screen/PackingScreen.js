import React, { Component } from 'react'
import { View } from 'react-native'
import Api from '../Services/Api'
import CardTicket from "./Components/CardTicketB"
// import CardTicketPacking from "./Modules/outbound/CardTicketPacking"
import ParalaxLayout from './Components/ParalaxLayout'
import BottombarMenu from './Components/BottombarMenu'
import payload from '../Lib/Ticket'

const ticket = payload.card
const imgFleet = "https://pngimage.net/wp-content/uploads/2018/05/caminhão-em-png-2.png"
const imgDriver = "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg"
const imgSecurity = "https://img.freepik.com/free-photo/friendly-smiling-woman-looking-pleased-front_176420-20779.jpg"

class PackingScreen extends Component {
    constructor(props) {
        super(props)

        const { params } = props.navigation.state

        this.state = {
            fetching: false,
            firstFetching: true,
            startScrolling: false,
            data: params,
            rawData: [],
            collapse: true,
            limit: 5,
            offset: 0,
            totalData: 0
        }
    }

    componentDidMount() {
        this.getDataTaskList(this.state.limit, this.state.offset)
    }

    getDataTaskList = async (limit, offset, isReload = false) => {
        console.log("hayyyy", limit, offset)
        this.setState({ fetching: true })
        const { user } = this.props.auth
        let rawData = []
        if (offset > 0) {
            rawData = Object.assign([], this.state.rawData)
            this.setState({ fetching: true })
        }  else {
            rawData = []
            this.setState({firstFetching: true})
        }
        let payload = {
            limit: limit,
            offset: offset,
            params: {
                humanTaskType: "OUTBOUND_DELIVERY_PACKING",
                assignment: user.data.userID,
                status: ""
            }
        }
        let response = await Api.create().getCountHumanTaskListByType("OUTBOUND_DELIVERY_PACKING")
        if (response.data && response.data.status === "S") this.setState({ totalData: response.data.data })
        let res = await Api.create().getHumanTaskListByAssignementID(payload)
        if (res.data && res.data.status === "S") {
            const data = res.data.data
            data && data.map((dt) => {
                const pyl = JSON.parse(dt.payload)
                rawData.push({
                    ...pyl,
                    objectID: dt.objectID,
                    humanTaskID: dt.humanTaskID,
                    ticket_info: {
                        ...pyl.ticket_info,
                        "driver_img_path": imgDriver,
                        "progress": "0/7",
                        "status": dt.taskStatus,
                        "time": "1s Ago",
                    },
                    driver_info: {
                        ...pyl.driver_info,
                        "driver_img_path": imgDriver,
                    },
                    fleet_info: {
                        ...pyl.fleet_info,
                        "fleet_img_path": imgFleet
                    },
                    ynd_info: {
                        ...pyl.ynd_info,
                        "ynd_img_path": imgSecurity
                    }
                })
                return null
            })
            this.setState({rawData, fetching: false, firstFetching: false, limit, offset})
        } else {
            this.setState({ fetching: false, firstFetching: false, limit, offset })
        }
    }

    render() {
        const { fetching, data, rawData, limit, offset, totalData } = this.state
        const { role } = data

        return (
            <View style={{ flex: 1 }}>
                <ParalaxLayout 
                    data={data}
                    rawData={rawData}
                    loader={fetching}
                    totalData={totalData}
                    card={(rowData, data, rowID, collapse, index) => (
                        <CardTicket 
                            key={index}
                            disableScanner={true}
                            data={rowData} 
                            disableGate={true}
                            // dataValidate={{
                            //     title: 'Start Picking',
                            //     subtitle: 'Steps to follow',
                            //     description: 'To accomplish the process of material inbound by transporter must follow theses following instruction sequentially',
                            //     multistep: [0, 1, 2, 3, 4, 5],
                            //     multiDescription: 'Driver License Checking, Fleet Commossioning Certificate Checking, Document Checking, Seal Number Checking. We also record time elapsed through out the process',
                            //     buttonTitle: 'Start Picking'
                            // }}
                            objectID={data.data} 
                            id={rowID} 
                            role={role} 
                            collapse={collapse}  
                            onScanner={() => this.props.navigation.navigate('GateScannerScreen', {
                                value: "https://connexpro.daya-dms.id/wmx/trxquery/query/get.inbound.delivery.by.id/1597664988576",
                                role: role,
                                data, 
                                rowData 
                            })}
                            onPress={() => this.props.navigation.navigate('TicketDetailScreen', { 
                                data, 
                                rowData 
                            })} />
                    )}
                    onRefresh={() => this.getDataTaskList(5, 0)}
                    onMore={() => this.getDataTaskList(limit, offset + 1)}
                    onBack={() => this.props.navigation.goBack()}
                />
                <View>
                    <BottombarMenu 
                        menu={navButton} 
                        onChange={(data, index) => {
                            this.props.navigation.navigate('MainScreen', {data: data.label, index})
                        }} />
                </View>
            </View>
        )
    }
}

const navButton = [
    {
        label: "Home",
        icon: "home",
        notif: 4,
        size: 28
    },
    {
        label: "SAP",
        icon: "tool",
        notif: 0,
        size: 28
    },
    {
        label: "Notification",
        icon: "bells",
        notif: 0,
        size: 24
    },
    {
        label: "Profile",
        icon: "user",
        notif: 1,
        size: 24
    }
]

export default PackingScreen