import React from 'react'
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import { Styles, Colors } from '../../Themes'
import FaIcon from 'react-native-vector-icons/FontAwesome'
import axios from 'axios'
import CardTicket from '../Components/CardTicketB'
import { connect } from 'react-redux'
import payload from '../../Lib/Ticket'

const ticket = payload.card
const imgFleet = "https://pngimage.net/wp-content/uploads/2018/05/caminhão-em-png-2.png"
const imgDriver = "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg"
const imgSecurity = "https://img.freepik.com/free-photo/friendly-smiling-woman-looking-pleased-front_176420-20779.jpg"

class CardTabs extends React.Component {
    render() {
        const {attribute, value} = this.props
        return (
            <View style={{flex: 1, marginBottom: 10, alignItems: "center"}}>
                <Text style={{fontSize: 42, fontWeight: "bold", color: Colors.black}}>{value}</Text>
                <Text style={{fontSize: 12, color: Colors.black, marginTop: 0}}>{attribute}</Text>
            </View>
        )
    }
}

class CardClaimHistory extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            fetching: false,
            startScrolling: false,
            collapse: true,
            data: [],
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

    getData = async () => {
        const { user } = this.props.auth
        const payload = [
            {
                "item": {
                    ...ticket,
                    "card_style": {
                        "button_title": `CR#${ticket.ticket_info.ticket_no} - DELAY`,
                        "button_type": "error"
                    },
                    "user_info": {
                        "uID": user.data.userID,
                        "name": user.data.userName
                    },
                    "ticket_info": {
                        ...ticket.ticket_info,
                        "ticket_priority": 4,
                        "progress": "0/7",
                        "driver_img_path": imgDriver,
                        "status": "DONE",
                        "time": "1s Ago",
                    },
                    "ynd_info": {
                        ...ticket.ynd_info,
                        "ynd_img_path": imgSecurity
                    }
                }
            },
            {
                "item": {
                    ...ticket,
                    "card_style": {
                        "button_title": `CR#${ticket.ticket_info.ticket_no} - NOTGOOD`,
                        "button_type": "success"
                    },
                    "user_info": {
                        "uID": user.data.userID,
                        "name": user.data.userName
                    },
                    "ticket_info": {
                        ...ticket.ticket_info,
                        "ticket_priority": 4,
                        "progress": "0/7",
                        "driver_img_path": imgDriver,
                        "status": "DONE",
                        "time": "1s Ago",
                    },
                    "ynd_info": {
                        ...ticket.ynd_info,
                        "ynd_img_path": imgSecurity
                    }
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

    render() {
        const { rawData, collapse } = this.state
        const { onPress } = this.props
        const tabs = [
            {attribute: "Claims", value: "56"},
            {attribute: "Finish", value: "23"},
            {attribute: "Outstanding", value: "33"},
            {attribute: "Throughput", value: "12"},
        ]
        return (
            <View style={{flex: 1}}>
                <View style={{padding: 15, flexDirection: "row", justifyContent: "space-between"}}>
                    {tabs && tabs.map((dt, index) => {
                        return (
                            <CardTabs 
                                key={index}
                                attribute={dt.attribute}
                                value={dt.value}
                            />
                        )
                    })}
                </View>

                <View style={{ flex: 1, padding: 15, paddingTop: 5, paddingBottom: 5, backgroundColor: "#fff", flexDirection: "row", alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ paddingRight: 20, flexDirection: "row", alignItems: "center" }}>
                        <Text style={[Styles.textHeader]}>Available Claims</Text>
                        <View style={{ backgroundColor: "red", borderWidth: 1, borderColor: "#fff", top: 0, left: 10, height: 20, width: 20, borderRadius: 50, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: "#fff" }}>{rawData ? rawData.length : '0'}</Text>
                        </View>
                    </View>
                    <View style={{ alignSelf: 'flex-end' }}>
                        <TouchableOpacity onPress={() => this.setState({ collapse: !this.state.collapse })}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', alignContent: 'center' }}>
                                <FaIcon name={!collapse ? "plus" : "minus"} size={12} color="#adadad" />
                                <Text style={{ fontSize: 12, color: '#999', marginLeft: 10 }}>
                                    {collapse ? "Collapse All" : "Expand All"}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                <View>
                    {rawData && rawData.map((data, index) => {
                        return (
                            <CardTicket 
                                key={index}
                                data={data} 
                                type={"Delivery Order"}
                                disableGate={true}
                                objectID={[]} 
                                id={''} 
                                role={''} 
                                collapse={collapse}  
                                onScanner={() => console.log('onScanner')}
                                onPress={() => onPress(data)} />
                        )
                    })}
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, null)(CardClaimHistory)