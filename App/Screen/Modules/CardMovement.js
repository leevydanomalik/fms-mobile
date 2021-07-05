import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import { connect } from "react-redux"
import FaIcon from 'react-native-vector-icons/FontAwesome'
import { Styles, Colors } from '../../Themes'
import QRCode from 'react-native-qrcode-svg'
import ButtonNext from '../Components/ButtonNext'
import NavbarMenu from '../Components/NavbarMenu'
import Multistep from '../Components/Multistep'
import { MovementInfo, ReviewInfo } from './movement'
import CardContractDelivery from '../Components/CardContractDelivery'
import { CheckIn, CheckOut } from './gatesecurity'
import { MtoTimerInfo, ZoneTarget, ZoneOrigin } from './material/mto'
import HUInfo from './putaway/HUInfo'

var time

class CardMovement extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activeIndex: 0,
            startMsecs: 0,
            stopMsecs: 0,
            startTime: '-',
            stopTime: '-',
            timerStatus: false,
            visibletimer: false,
            visibleButtonLoader: false
        }
    }
    
    static defaultProps = {
        onVerifiedPress: () => null
    }

    render() {
        const { onVerifiedPress, onBack } = this.props
        const { activeIndex, startMsecs, stopMsecs, startTime, stopTime, timerStatus, visibletimer, visibleButtonLoader } = this.state
        const dataTab = [
            {id: '1', title: '1', active: false},
            {id: '2', title: '2', active: false},
            {id: '3', title: '3', active: false},
            {id: '4', title: '4', active: false},
            {id: '5', title: '5', active: false},
        ]
        const buttonTitle = [
            'Scan Material HU',
            'Scan Zone Target',
            'Done Preview',
            'Scan a Zone to start Movement',
            'Confirm & Done',
        ]
        const mtoTitle = [
            'Material Movement Information',
            'Picking Information',
            'Picking Information',
            'Movement Information',
            'Movement Information',
        ]
        const security = [
            {id: 1, title: 'Check In', warehouse: 'Warehouse L301 SLOC 304', time: startTime, worker: 'Ms. Security', image: img},
            {id: 2, title: 'Check Out', warehouse: 'Warehouse L301 SLOC 304', time: stopTime, worker: 'Ms. Security',  image: img}
        ]
        const driver = {
            image: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg",
            name: 'Mr. Driver',
            cargo: 'Sentral Cargo GmBh'
        }
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <View style={{ backgroundColor: '#fff', height: 95, zIndex: 1000 }}>
                    <NavbarMenu 
                        onBack={() => onBack()}
                        title={'Ticket#86868868'} />
                    <Multistep 
                        data={dataTab} 
                        activeIndex={activeIndex} 
                        onChange={(index) => {
                            this.setState({activeIndex: index})
                            if (index === 0) {
                                this.setState({timerStatus: false, visibletimer: false})
                            }
                        }} />
                    {visibletimer && (
                        <View style={{
                            position: 'absolute',
                            top: 3,
                            right: 0
                        }}>
                            <MtoTimerInfo 
                                color={'#fff'}
                                timerStatus={timerStatus}
                                lastMsecs={startMsecs}
                                onChangeTimer={(data) => this.setState({stopMsecs: data})}
                                onStop={(data) => console.log('on stop', data)}
                            />
                        </View>
                    )}
                </View>
                <ScrollView>
                    <View style={{ marginTop: -15 }}>
                        {(activeIndex === 0 || activeIndex === 1 || activeIndex === 2 || activeIndex === 3) && (
                            <MovementInfo 
                                title={mtoTitle[activeIndex]} 
                                onVerifiedPress={onVerifiedPress}
                            />
                        )}
                        {(activeIndex === 0 || activeIndex === 1 || activeIndex === 2) && (
                            <View style={{padding: 20, borderBottomColor: '#ccc', borderBottomWidth: 0.5}}>
                                <CardContractDelivery />
                            </View>
                        )}
                        {(activeIndex === 1 || activeIndex === 2) && (
                            <View>
                                <ZoneOrigin onVerifiedPress={onVerifiedPress} />
                                <HUInfo onVerifiedPress={onVerifiedPress} />
                            </View>
                        )}
                        {(activeIndex === 2) && (
                            <ZoneTarget onVerifiedPress={onVerifiedPress} />
                        )}
                        {(activeIndex === 3) && (
                            <ReviewInfo 
                                title={'Review Movement'} 
                                onVerifiedPress={onVerifiedPress} />
                        )}
                        {/* {(activeIndex === 4) && (
                            <View style={{
                                paddingTop: 50,
                                paddingBottom: 20,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Text>{mtoTitle[activeIndex]}</Text>
                            </View>
                        )}
                        {(activeIndex === 5) && (
                            <View style={{
                                paddingTop: 50,
                                paddingBottom: 20,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Text>{mtoTitle[activeIndex]}</Text>
                            </View>
                        )} */}
                        {(activeIndex === 0) && (
                            <CheckIn 
                                lastMsecs={startMsecs} 
                                driver={driver}
                                security={security}
                                onChangeTimer={(data) => this.setState({startMsecs: data})} 
                                onStart={(data) => this.setState({startTime: data, stopTime: '-'})}
                                onStop={(data) => this.setState({activeIndex: (activeIndex + 1), visibletimer: true, timerStatus: true})}
                                btnTitle={buttonTitle[activeIndex]}
                                onVerifiedPress={onVerifiedPress}
                            />
                        )}
                        {(activeIndex === 4) && (
                            <CheckOut 
                                lastMsecs={stopMsecs} 
                                driver={driver}
                                security={security}
                                startTime={startTime}
                                onChangeTimer={(data) => this.setState({stopMsecs: data})} 
                                onStop={(data) => this.setState({stopTime: data})}
                                btnTitle={buttonTitle[activeIndex]}
                                btnPress={() => this.setState({activeIndex: dataTab.length})}
                                onVerifiedPress={onVerifiedPress} />
                        )}
                    </View>
                    {(activeIndex === dataTab.length) ? (
                        <View style={{flex: 1, justifyContent: 'center'}}>
                            <View style={{ marginTop: 20, marginBottom: 20, backgroundColor: "#fff", padding: 20, alignContent: 'center' }}>
                                <Text style={{
                                    marginBottom: 30,
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                    color: '#000',
                                    textAlign: 'center'
                                }}>
                                    Congratulations, all step has been done!!!
                                </Text>
                                <ButtonNext 
                                    title={'Oke, Go Back'} 
                                    onPress={() => onBack()} />
                            </View>
                        </View>
                    ) : (activeIndex !== 0) && (activeIndex !== 4) && (
                        <View style={{ marginTop: 0, marginBottom: 10, backgroundColor: "#fff", padding: 20 }}>
                            <ButtonNext 
                                title={visibleButtonLoader ? 'Please wait..' : buttonTitle[activeIndex]} 
                                onPress={(visibleButtonLoader) 
                                    ? null 
                                    : () => {
                                        if (activeIndex === (dataTab.length - 2)) {
                                            this.setState({
                                                visibleButtonLoader: true,
                                                timerStatus: false
                                            })
                                            time = setTimeout(() => {
                                                this.setState({
                                                    activeIndex: (activeIndex + 1), 
                                                    visibleButtonLoader: false,
                                                    visibletimer: false
                                                })
                                                clearTimeout(time)
                                            }, 2000);
                                        } else {
                                            if ((activeIndex + 1) === dataTab.length) {
                                                this.setState({activeIndex: dataTab.length})
                                            } else {
                                                this.setState({activeIndex: (activeIndex + 1)})
                                            }
                                        }
                                    }} />
                        </View>
                    )}
                </ScrollView>
            </View>
        )
    }
}

const img = "https://techwithsadprog.com/assets/images/testimonial/1595348801user-3.jpeg"

const mapStateToProps = state => {
    return {
        auth: state.auth
    };
};

export default connect(mapStateToProps, null)(CardMovement)