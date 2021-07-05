import React, { Component } from 'react'
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

class DriverScreen extends Component {
    constructor(props) {
        super(props)

        const { params } = props.navigation.state

        this.state = {
            fetching: false,
            startScrolling: false,
            collapse: true,
            data: params,
            rawData: [],
            allData: [],
            limit: 5,
            offset: 0,
            totalData: 0,
            tabs: 2
        }
    }

    componentDidMount() {
        this.willFocusSubscription = this.props.navigation.addListener(
            'willFocus',
            () => {
                this.getDataTaskList(this.state.limit, this.state.offset, this.state.tabs)
                console.log("oyyy")
            }
        )
    }

    getDataTaskList = async (limit, offset, tabs) => {
        this.setState({ fetching: true })
        const { user } = this.props.auth
        let rawData = []
        this.setState({ rawData })
        if (offset > 0) {
            rawData = Object.assign([], this.state.rawData)
            this.setState({ fetching: true })
        } else {
            rawData = []
            this.setState({ firstFetching: true })
        }
        let payload = {
            limit: limit,
            offset: offset,
            params: {
                humanTaskType: "YARD_AND_DOCK",
                assignment: user.data.userID,
                status: tabs === 1 ? "DONE" : "" 
            }
        }
        let payloadAll = {
            limit: limit,
            offset: offset,
            params: {
                humanTaskType: "YARD_AND_DOCK",
                assignment: user.data.userID
            }
        }
        let res = ""
        let response = await Api.create().getCountHumanTaskListByType("YARD_AND_DOCK")
        if (response.data && response.data.status === "S") this.setState({ totalData: response.data.data })
        switch (tabs) {
            case 0:
                res = await Api.create().getHumanTaskListByAssignementIDBacklog(payloadAll)
                break
            case 1:
                res = await Api.create().getHumanTaskListByAssignementIDFinish(payload)
                break
            case 2:
                res = await Api.create().getHumanTaskListByAssignementID(payload)
                break
            default: break
        }
        if (res.data && res.data.status === "S") {
            const data = res.data.data
            data && data.map((dt) => {
                const pyl = JSON.parse(dt.payload)
                let isInbound = false
                switch (pyl.doc_info.source) {
                    case 'OUTBOUND DELIVERY':
                        isInbound = false
                        break
                    case 'OD':
                        isInbound = false
                        break
                    case 'INBOUND DELIVERY':
                        isInbound = true
                        break
                    default:
                        isInbound = true
                        break
                }
                rawData.push({
                    ...pyl,
                    objectID: dt.objectID,
                    humanTaskID: dt.humanTaskID,
                    card_style: {
                        card_type: 'YARD AND DOCK',
                        button_type: isInbound ? 'info' : 'main'
                    },
                    user_info: {
                        ...data,
                        uID: user.data.userID,
                        name: user.data.userName
                    },
                    ticket_info: {
                        ...pyl.ticket_info,
                        "driver_img_path": imgDriver,
                        "progress": "0/7",
                        "status": dt.taskStatus,
                        "time": "1s Ago",
                        "source_id": dt.sourceID
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
            this.setState({ rawData, allData: res.data.data, fetching: false, firstFetching: false, limit, offset })
        } else {
            this.setState({ fetching: false, firstFetching: false, limit, offset })
        }
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
            if (res.status == 200) {
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
        const { fetching, data, rawData, limit, offset, totalData, tabs } = this.state
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
                        name: user.data.userName
                    }}
                    rawData={rawData}
                    loader={fetching}
                    totalData={totalData}
                    card={(rowData, data, rowID, collapse, index) => (
                        <CardTicket
                            key={index}
                            data={rowData}
                            dataValidate={{
                                title: 'Start checking driver & fleet data',
                                subtitle: 'Steps to follow',
                                description: 'To accomplish the process of material inbound by transporter must follow theses following instruction sequentially',
                                multistep: [0, 1, 2, 3],
                                multiDescription: 'Driver License Checking, Fleet Commossioning Certificate Checking, Document Checking, Seal Number Checking. We also record time elapsed through out the process',
                                buttonTitle: 'Start Scanning Driver QR'
                            }}
                            objectID={data.data}
                            id={rowID}
                            role={role}
                            collapse={collapse}
                            onScanner={() => this.props.navigation.navigate('GateScannerScreen', {
                                value: "https://connexpro.daya-dms.id/wmx/trxquery/query/get.inbound.delivery.by.id/1597664988576",
                                title: "Scan Driver License",
                                // description: "GATE SECURITY SCAN DRIVER QR CODE TO VERIFY AND VALIDATE CORRECT DRIVER DATA",
                                role: role,
                                data,
                                rowData,
                                allData: this.state.allData
                            })}
                            onPress={() => this.props.navigation.navigate('TicketDetailScreen', {
                                data,
                                rowData,
                                allData: this.state.allData
                            })} />
                    )}
                    onChangeTabs={(tabs) => {
                        this.getDataTaskList(5, 0, tabs)
                        this.setState({ tabs })
                    }}
                    onRefresh={() => this.getDataTaskList(5, 0, tabs)}
                    onMore={() => this.getDataTaskList(limit, offset + 1, tabs)}
                    onBack={() => this.props.navigation.navigate('MainScreen')}
                />
                <View>
                    <BottombarMenu
                        menu={navButton}
                        onChange={(data, index) => {
                            this.props.navigation.navigate('MainScreen', { data: data.label, index })
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

export default connect(mapStateToProps, null)(DriverScreen)