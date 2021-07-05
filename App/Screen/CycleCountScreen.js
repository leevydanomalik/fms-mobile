import React, { Component } from 'react';
import { View } from 'react-native'
import Api from '../Services/Api'
import CardTicket from "./Components/CardTicketB"
import axios from 'axios'
import ParalaxLayout from './Components/ParalaxLayout'
import BottombarMenu from './Components/BottombarMenu'
import payload from '../Lib/Ticket'
import { connect } from 'react-redux'

const ticket = payload.card
const imgFleet = "https://pngimage.net/wp-content/uploads/2018/05/caminhão-em-png-2.png"
const imgDriver = "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg"
const imgSecurity = "https://img.freepik.com/free-photo/friendly-smiling-woman-looking-pleased-front_176420-20779.jpg"

class GoodReceiptScreen extends Component {
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
        // this.getData()
        this.getDataTaskList(this.state.limit, this.state.offset)
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
                humanTaskType: "CYCLE_COUNT",
                assignment: user.data.userID
            }
        }
        let response = await Api.create().getCountHumanTaskListByType("CYCLE_COUNT")
        if (response.data && response.data.status === "S") this.setState({ totalData: response.data.data })
        let res = await Api.create().getHumanTaskListByType(payload)
        if (res.data && res.data.status === "S") {
            const data = res.data.data
            data && data.map((dt) => {
                const pyl = JSON.parse(dt.payload)
                rawData.push({
                    ...pyl,
                    objectID: dt.objectID,
                    humanTaskID: dt.humanTaskID,
                    card_style: {
                        card_type: "CYCLE COUNT ORDER",
                        disable_route: true
                    },
                    user_info: {
                        ...data,
                        uID: user.data.userID,
                        name: user.data.userName
                    },
                    ticket_info: {
                        ...pyl.ticket_info,
                        "ticket_company": user.data.employeeID.es.company.compName,
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
            this.setState({ rawData, fetching: false, firstFetching: false, limit, offset })
        } else {
            this.setState({ fetching: false, firstFetching: false, limit, offset })
        }

        console.log('RAW DATA', rawData)
    }

    getData = async () => {
        const { user } = this.props.auth
        const payload = [
            {
                ...ticket,
                "user_info": {
                    "uID": user.data.userID,
                    "name": user.data.userName
                },
                "ticket_info": {
                    ...ticket.ticket_info,
                    "ticket_priority": 4,
                    "progress": "0/7",
                    "driver_img_path": imgDriver,
                    "status": "STARTED",
                    "time": "1s Ago",
                },
                "ynd_info": {
                    ...ticket.ynd_info,
                    "ynd_img_path": imgSecurity
                }
            },
            {
                ...ticket,
                "user_info": {
                    "uID": user.data.userID,
                    "name": user.data.userName
                },
                "ticket_info": {
                    ...ticket.ticket_info,
                    "ticket_priority": 4,
                    "progress": "0/7",
                    "driver_img_path": imgDriver,
                    "status": "STARTED",
                    "time": "1s Ago",
                },
                "ynd_info": {
                    ...ticket.ynd_info,
                    "ynd_img_path": imgSecurity
                }
            },
            {
                ...ticket,
                "user_info": {
                    "uID": user.data.userID,
                    "name": user.data.userName
                },
                "ticket_info": {
                    ...ticket.ticket_info,
                    "ticket_priority": 4,
                    "progress": "0/7",
                    "driver_img_path": imgDriver,
                    "status": "STARTED",
                    "time": "1s Ago",
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
            if(res.status == 200) {
                rawData = res.data.data
            }
        } catch (error) {
            console.log(error.message)
        }
        this.setState({ rawData, dataSource, fetching: false })
    }

    
    checkRole(role) {
        return role == "R_MOBILE_SAP";
    }

    render() {
        const { fetching, data, rawData, limit, offset, totalData } = this.state
        const { role } = data
        const { user } = this.props.auth
        let roleSap = false
        let navButton = []
        if (user && user.data.userID) roleSap = user.data.roles.some(this.checkRole)
        roleSap ? navButton.push(navButtons[0],
            {
                label: "SAP",
                icon: "tool",
                notif: 0,
                size: 28
            }, navButtons[1], navButtons[2]) : navButton = navButtons

        return (
            <View style={{ flex: 1 }}>
                <ParalaxLayout 
                    data={{
                        ...data,
                        uID: user.data.userID,
                        name: user.data.userName,
                    }}
                    rawData={rawData}
                    loader={fetching}
                    totalData={totalData}
                    card={(rowData, data, rowID, collapse, index) => (
                        <CardTicket 
                            key={index}
                            data={rowData} 
                            type={"Cycle Count Order"}
                            disableGate={true}
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

const navButtons = [
    {
        label: "Home",
        icon: "home",
        notif: 4,
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

export default connect(mapStateToProps, null)(GoodReceiptScreen)