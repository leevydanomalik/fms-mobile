import React, { Component } from 'react'
import { View } from 'react-native'
import { CardTicket, CardTicketB } from './Modules'
import axios from 'axios'
import ParalaxLayout from './Components/ParalaxLayout'
import BottombarMenu from './Components/BottombarMenu'

class DashboardScreen extends Component {
    constructor(props) {
        super(props)

        const { params } = props.navigation.state

        this.state =  {
            fetching: false,
            streamMessage: "Feed me from Socket.io based events ...",
            activeMenu: "Home",
            startScrolling: false,
            collapse: false,
            data: params,
            // data: { role : "FLD", name: "Kelvin Clain", roleName: "FORKLIFT DRIVER - M4756-2020", imageUrl: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg" },
            // data: { role : "GSO", name: "Lynn Sravady", roleName: "Gate Security Officer - M4756-2020", imageUrl: "https://previews.123rf.com/images/puhhha/puhhha1608/puhhha160800271/61732822-beautiful-woman-smiling-portrait-of-attractive-happy-healthy-girl-with-perfect-smile-white-teeth-blo.jpg" },
            rawData: [],
            collapse: true,
            dataSource: []
        };
        this.webSocket = ""
    }

    componentDidMount() {
        const { params } = this.props.navigation.state
        console.log('params:', params)
        this.getData()
        this.startWebSocket()
    }
    componentWillUnmount() {
        if (typeof this.webSocket == "object") this.webSocket.close(1000);
    }

    sendMessage = () => {
        console.log(this.webSocket)
    }

    startWebSocket = async () => {
        let socket = new WebSocket('wss://echo.websocket.org');

        socket.onopen = function(e) {
            // alert("[open] Connection established");
            socket.send('Testing message from websocket.')
            // alert("Sending to server");
            // this.webSocket.send("My name is Rizaldi");
        };

        socket.onmessage = (e) => {
            const { data } = e
            console.log('message: ', data)
            this.setState({ streamMessage: data })
        }

        socket.onerror = (e) => {
            // an error occurred
            console.log("websocket error : " ,e.message);
        };

        socket.onclose = (e) => {
            // connection closed
            console.log("websocket close : ", e)
        };

        this.webSocket = socket
    }

    getData = async () => {
        const payload = [
            {
                "ticketNumber": "095959559888",
                "transportVendor": "PT. Sentral Cargo GmBh",
                "fleetType": "Flatwing",
                "fleetMfg": "Mercedes-Benz",
                "fleetMfgType": "Protos 9890MZ",
                "driverName": "Partono",
                "driverLicense": "B2",
                "licensePlate": "B8686YYY",
                "opsType": "Outbound Delivery",
                "poNumber": "879858588",
                "descNote": "This vehicle must stop the engine while parking and please securing surrounding and confirm to loading master",
                "dlvDate": "22-03-2020",
                "status": "NOT_STARTED",
                "progress": "0/7"
            },
            {
                "ticketNumber": "095959559888",
                "transportVendor": "ALCARGO Logistica",
                "fleetType": "Flatwing",
                "fleetMfg": "Mercedes-Benz",
                "fleetMfgType": "Protos 9890MZ",
                "driverName": "Partono",
                "driverLicense": "B2",
                "licensePlate": "B8686YYY",
                "opsType": "Outbound Delivery",
                "poNumber": "879858588",
                "descNote": "This vehicle must stop the engine while parking and please securing surrounding and confirm to loading master",
                "dlvDate": "22-03-2020",
                "status": "DONE",
                "progress": "7/7"
            },
            {
                "ticketNumber": "095959559888",
                "transportVendor": "ALCARGO Logistica",
                "fleetType": "Flatwing",
                "fleetMfg": "Mercedes-Benz",
                "fleetMfgType": "Protos 9890MZ",
                "driverName": "Partono",
                "driverLicense": "B2",
                "licensePlate": "B8686YYY",
                "opsType": "Outbound Delivery",
                "poNumber": "879858588",
                "descNote": "This vehicle must stop the engine while parking and please securing surrounding and confirm to loading master",
                "dlvDate": "22-03-2020",
                "status": "IN_PROGRESS",
                "progress": "4/7"
            }
        ]

        this.setState({ fetching: true })

        let { rawData, dataSource } = this.state
        try {
            const res = await axios.post('https://postman-echo.com/post', payload)
            console.log('res :', res)
            if(res.status == 200) {
                
                rawData = res.data.data
                // dataSource = new ListView.DataSource({
                //     rowHasChanged: (r1, r2) => r1 !== r2
                // }).cloneWithRows(res.data.data)
            }
        } catch (error) {
            console.log(error.message)
        }
        this.setState({ rawData, dataSource, fetching: false })

        // let rawData = payload

        // this.setState({ rawData: rawData, fetching: false })
    }

    render() {
        const { fetching, data, rawData } = this.state
        const { role } = data
        return (
            <View style={{ flex: 1, backgroundColor: "#fff" }}>
                <ParalaxLayout 
                    data={data}
                    rawData={rawData}
                    loader={fetching}
                    totalData={0}
                    card={(rowData, data, rowID, collapse) => {
                        if(role == "FLD" || role == "PICKER" || role == "GI" || role == "GR" || role == "MATERIALMOVEMENT" || role == "CYCLECOUNT") {
                            return <CardTicketB 
                                        data={rowData} 
                                        id={rowID} 
                                        role={role} 
                                        collapse={collapse} 
                                        onScanner={() => this.props.navigation.navigate('QrScanner', {
                                            value: "https://connexpro.daya-dms.id/wmx/trxquery/query/get.inbound.delivery.by.id/1597664988576",
                                            role: role
                                        })}
                                        onPress={() => this.props.navigation.navigate('TicketDetailScreen', { data })} />
                        } else {
                            return <CardTicket 
                                        data={rowData} 
                                        id={rowID} 
                                        role={role} 
                                        collapse={collapse} 
                                        onScanner={() => this.props.navigation.navigate('QrScanner', {
                                            value: "https://connexpro.daya-dms.id/wmx/trxquery/query/get.inbound.delivery.by.id/1597664988576",
                                            role: role
                                        })}
                                        onPress={() => this.props.navigation.navigate('TicketDetailScreen', { data })} />
                        }
                    }}
                    onRefresh={() => this.getData()}
                    onMore={() => console.log('on more')}
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

export default DashboardScreen