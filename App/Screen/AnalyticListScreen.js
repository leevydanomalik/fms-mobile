import React from 'react'
import { ScrollView, View } from 'react-native'
import NavbarMenu from './Components/NavbarMenu'
import { connect } from 'react-redux'
import CardClaimHistory from './Modules/CardClaimHistory'
import BottombarMenu from './Components/BottombarMenu'

class AnalyticListScreen extends React.Component {
    constructor(props) {
        super(props)
        const { params } = props.navigation.state
        this.state = {
            data: params.data,
            rowData: params.rowData,
            allData: params.allData,
            rawData: params.rawData ? params.rawData : ""
        }
    }

    render() {
        const { rowData } = this.state
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <NavbarMenu 
                    onBack={() => this.props.navigation.goBack()}
                    title={"Operation January 2021"}
                />
                <ScrollView>
                    <CardClaimHistory 
                        rowData={rowData} 
                        onPress={(data) => this.props.navigation.navigate('TicketDetailScreen', { data: { role: "CLAIM" }, rowData: data})}
                    />
                </ScrollView>
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

export default connect(mapStateToProps, null)(AnalyticListScreen)