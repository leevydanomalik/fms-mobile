import React from 'react'
import { View, ScrollView, Text } from 'react-native'
import Multistep from '../Components/Multistep'
import { CheckIn, CheckOut } from './gatesecurity'
import { DriverInfo, GoodIssueInfo } from './loading'
import ButtonNext from '../Components/ButtonNext'
import NavbarMenu from '../Components/NavbarMenu'
import CardSuccess from '../Components/CardSucccess'

const blue = "#0e74ff"

class CardLoadingUnLoad extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            activeIndex: 0,
            startMsecs: 0,
            stopMsecs: 0,
            startTime: '-',
            stopTime: '-'
        }
    }

    static defaultProps = {
        onVerifiedPress: () => null
    }

    borderBoldBottom = () => {
        return (
            <View style={{ borderBottomColor: '#f0f0f0', borderBottomWidth: 10, marginTop: 10 }} />
        )
    }

    render() {
        const { activeIndex, startMsecs, stopMsecs, startTime, stopTime } = this.state
        const { onVerifiedPress, onBack } = this.props
        const dataTab = [
            {id: '1', title: '1', active: false},
            {id: '2', title: '2', active: false},
            {id: '3', title: '3', active: false}
        ]
        const security = [
            {id: 1, title: 'Check In', warehouse: 'Warehouse L301 SLOC 304', time: startTime, worker: 'Ms. Security', image: img},
            {id: 2, title: 'Check Out', warehouse: 'Warehouse L301 SLOC 304', time: stopTime, worker: 'Ms. Security',  image: img}
        ]
        const driver = {
            image: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg",
            name: 'Mr. Loading Unload',
            cargo: 'Sentral Cargo GmBh'
        }
        const btnTitle = 'Confirm & '+ (((activeIndex + 1) === dataTab.length) ? 'Done' : 'Next') +' ('+ (activeIndex + 1) +'/'+ dataTab.length +')'
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <View style={{ backgroundColor: '#fff', height: 95, zIndex: 1000 }}>
                    <NavbarMenu 
                        onBack={() => onBack()}
                        title={'DO#86868868'} />
                    <Multistep 
                        data={dataTab} 
                        activeIndex={activeIndex} 
                        onChange={(index) => this.setState({activeIndex: index})} />
                </View>
                <ScrollView>
                    <View style={{ marginTop: -15 }}>
                        {(activeIndex === 0) && (
                            <View>
                                <DriverInfo onVerifiedPress={onVerifiedPress} />
                                <CheckIn 
                                    lastMsecs={startMsecs} 
                                    driver={driver}
                                    security={security}
                                    onChangeTimer={(data) => this.setState({startMsecs: data, stopMsecs: data})} 
                                    onStart={(data) => this.setState({startTime: data, stopTime: '-'})}
                                    onStop={(data) => this.setState({activeIndex: (activeIndex + 1)})}
                                    btnTitle={"PROCEED"}
                                    onVerifiedPress={onVerifiedPress} />
                            </View>
                        )}
                        {(activeIndex === 1) && (
                            <GoodIssueInfo onVerifiedPress={onVerifiedPress} />
                        )}
                        {(activeIndex === 2 || activeIndex === 1) && (
                            <CheckOut 
                                lastMsecs={stopMsecs} 
                                driver={driver}
                                security={security}
                                onChangeTimer={(data) => this.setState({stopMsecs: data})} 
                                startTime={startTime}
                                onStop={(data) => this.setState({stopTime: data, activeIndex: (activeIndex + 1)})}
                                btnTitle={'CONFIRM & DONE'}
                                btnPress={() => this.setState({activeIndex: dataTab.length})}
                                onVerifiedPress={onVerifiedPress} />
                        )}
                    </View>
                    {(activeIndex === dataTab.length) && (
                        <View style={{flex: 1, justifyContent: 'center'}}>
                            <View style={{ marginTop: 20, marginBottom: 20, backgroundColor: "#fff", padding: 20, alignContent: 'center' }}>
                                <CardSuccess />
                                <ButtonNext 
                                    title={'Start Another Task'} 
                                    onPress={() => onBack()} />
                            </View>
                        </View>
                    )}
                </ScrollView>
            </View>
        )
    }
}

const img = "https://img.freepik.com/free-photo/friendly-smiling-woman-looking-pleased-front_176420-20779.jpg"

export default CardLoadingUnLoad