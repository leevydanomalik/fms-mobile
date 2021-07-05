import React, { Component } from 'react';
import { View } from 'react-native'
import Api from '../Services/Api'
import CardTicket from "./Components/CardTicket"
import axios from 'axios'
import ParalaxLayout from './Components/ParalaxLayout'
import BottombarMenu from './Components/BottombarMenu'
import payload from '../Lib/Ticket'
import { connect } from 'react-redux'

const ticket = payload.card
const imgFleet = "https://pngimage.net/wp-content/uploads/2018/05/caminhão-em-png-2.png"
const imgDriver = "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg"
const imgSecurity = "https://img.freepik.com/free-photo/friendly-smiling-woman-looking-pleased-front_176420-20779.jpg"

class ReplenishmentScreen extends Component {
    constructor(props) {
        super(props)

        const { params } = props.navigation.state

        this.state = {
            fetching: false,
            startScrolling: false,
            collapse: true,
            data: params,
            rawData: [],
            limit: 5,
            offset: 0,
            totalData: 0
        }
    }

    componentDidMount() {
        this.getData()
        // this.getDataTaskList(this.state.limit, this.state.offset)
    }

    getDataTaskList = async (limit, offset) => {
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
                humanTaskType: "INBOUND_DELIVERY_GR",
                assignment: user.data.userID,
                status: ""
            }
        }
        let response = await Api.create().getCountHumanTaskListByType("INBOUND_DELIVERY_GR")
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
            // rawData.push(...res.data.data)
            this.setState({ rawData, fetching: false, firstFetching: false, limit, offset })
        } else {
            this.setState({ fetching: false, firstFetching: false, limit, offset })
        }

        console.log('RAW DATA', rawData)
    }

    getData = async () => {
        const payload = [
            {
                ...ticket,
                "ticket_info": {
                    ...ticket.ticket_info,
                    "ticket_priority": 4,
                    "progress": "0/7",
                    "driver_img_path": imgDriver,
                    "status": "STARTED",
                    "time": "1s Ago",
                },
                "driver_info": {
                    ...ticket.driver_info,
                    "driver_img_path": imgDriver,
                },
                "fleet_info": {
                    ...ticket.fleet_info,
                    "fleet_img_path": imgFleet
                },
                "ynd_info": {
                    ...ticket.ynd_info,
                    "ynd_img_path": imgSecurity
                }
            },
            {
                ...ticket,
                "ticket_info": {
                    ...ticket.ticket_info,
                    "ticket_priority": 5,
                    "progress": "7/7",
                    "driver_img_path": imgDriver,
                    "status": "DONE",
                    "time": "1s Ago",
                },
                "driver_info": {
                    ...ticket.driver_info,
                    "driver_img_path": imgDriver,
                },
                "fleet_info": {
                    ...ticket.fleet_info,
                    "fleet_img_path": imgFleet
                },
                "ynd_info": {
                    ...ticket.ynd_info,
                    "ynd_img_path": imgSecurity
                }
            },
            {
                ...ticket,
                "ticket_info": {
                    ...ticket.ticket_info,
                    "ticket_priority": 3,
                    "progress": "4/7",
                    "driver_img_path": imgDriver,
                    "status": "WIP",
                    "time": "1s Ago",
                },
                "driver_info": {
                    ...ticket.driver_info,
                    "driver_img_path": imgDriver,
                },
                "fleet_info": {
                    ...ticket.fleet_info,
                    "fleet_img_path": imgFleet
                },
                "ynd_info": {
                    ...ticket.ynd_info,
                    "ynd_img_path": imgSecurity
                }
            }
        ]

        this.setState({ fetching: true })

        let { rawData, dataSource } = this.state
        try {
            const res = await axios.post('https://postman-echo.com/post', payload)
            // console.log('res :', res)
            if(res.status == 200) {
                rawData = res.data.data
            }
        } catch (error) {
            console.log(error.message)
        }
        this.setState({ rawData, dataSource, fetching: false })

        // let rawData = payload

        // this.setState({ rawData: rawData, fetching: false })
    }

    render() {
        const { fetching, data, rawData, limit, offset, totalData } = this.state
        const { role } = data
        const { user } = this.props.auth

        return (
            <View style={{ flex: 1 }}>
                <ParalaxLayout 
                    data={{
                        ...data,
                        uID: user.data.userID,
                        name: user.data.userName,
                        // roleName: '0',
                        // roleID: '0'
                    }}
                    rawData={rawData}
                    loader={fetching}
                    totalData={totalData}
                    card={(rowData, data, rowID, collapse, index) => (
                        <CardTicket 
                            key={index}
                            data={rowData} 
                            disableGate={true}
                            // dataValidate={{
                            //     title: 'Start checking driver & fleet data',
                            //     subtitle: 'Steps to follow',
                            //     description: 'To accomplish the process of material inbound by transporter must follow theses following instruction sequentially',
                            //     multistep: [0, 1, 2, 3, 4, 5],
                            //     multiDescription: 'Driver License Checking, Fleet Commossioning Certificate Checking, Document Checking, Seal Number Checking. We also record time elapsed through out the process',
                            //     buttonTitle: 'Start Scanning Driver QR'
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
                    onRefresh={() => this.getData(5, 0)}
                    onMore={() => this.getData(limit, offset + 1)}
                    onBack={() => this.props.navigation.navigate('MainScreen')}
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

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, null)(ReplenishmentScreen)