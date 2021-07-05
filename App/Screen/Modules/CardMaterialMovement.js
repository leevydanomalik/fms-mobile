import React, { Component } from 'react'
import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native'
import {connect} from "react-redux"
import Multistep from '../Components/Multistep'
import { CheckIn, CheckOut } from './gatesecurity'
import { MtoInfo, ReviewInfo, MtoTimerInfo } from './material/mto'
import NavbarMenu from '../Components/NavbarMenu'
import CardMaterialCheck from '../Components/CardMaterialCheck'

var time

class CardMaterialMovement extends Component {
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

    componentDidMount() {
        this.setState({timerStatus: false, visibletimer: false})
    }

    setData = () => {
        const {data} = this.props
        let materials = []
        let datas = data.item.payload ? JSON.parse(data.item.payload) : null
        let mtoMaterials = datas && datas.mtoMaterials ? datas.mtoMaterials : []
        mtoMaterials && mtoMaterials.map((value) => {
            return materials.push({
                ...value,
                quantityPick: value.qty
            })
        })
        this.setState({materials})
    }

    render() {
        const { activeIndex, startMsecs, stopMsecs, startTime, stopTime, timerStatus, visibletimer, visibleButtonLoader } = this.state
        const { onVerifiedPress, onBack, onScanner } = this.props
        const dataTab = [
            {id: '1', title: '1', active: false},
            {id: '2', title: '2', active: false},
            {id: '3', title: '3', active: false},
        ]
        const buttonTitle = [
            'Proceed',
            'Done & Review',
            'Start Another Task',
            'Start Another Task'
        ]
        const mtoTitle = [
            'Transfer Order Information',
            'Transfer Order Information',
            'Transfer Order Information',
            'Movement Information',
            'Movement Information',
        ]
        const security = [
            {id: 1, title: 'Check In', warehouse: 'Warehouse L301 SLOC 304', time: startTime, worker: 'Ms. Security', image: img},
            {id: 2, title: 'Check Out', warehouse: 'Warehouse L301 SLOC 304', time: stopTime, worker: 'Ms. Security',  image: img}
        ]
        const driver = {
            image: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg",
            name: 'Mr. Movement',
            cargo: 'Sentral Cargo GmBh'
        }
        const dummyMaterials = [0, 1, 2, 3]
        const warehouse = [
            {id: 1, title: 'Origin Zone', subtitle: 'Warehouse L301 SLOC 304', description: 'Z1000'},
            {id: 2, title: 'Transporter/Carrier', subtitle: 'PT. Sentral Cargo GmBh', description: 'DOCK500'}
        ]
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
                        {(activeIndex === 0 || activeIndex === 1 || activeIndex === 2) && (
                            <MtoInfo 
                                title={mtoTitle[activeIndex]} 
                                onVerifiedPress={onVerifiedPress} />
                        )}
                        {(activeIndex === 0) && (
                            <CardMaterialCheck 
                                isRouteEnable={false} 
                                data={dummyMaterials} 
                                onPress={() => this.setState({activeIndex: (activeIndex + 1)})}
                                onVerifiedPress={onVerifiedPress} />
                        )}
                        {(activeIndex === 1) && (
                            <CardMaterialCheck 
                                warehouse={warehouse}
                                isRouteEnable={true} 
                                data={dummyMaterials} 
                                btnTitle={visibleButtonLoader ? 'Please wait..' : buttonTitle[activeIndex]}
                                onScanner={(type) => onScanner(type, warehouse)}
                                onPress={() => {
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
                                    }, 2000)
                                }}
                                onVerifiedPress={onVerifiedPress} />
                        )}
                        {(activeIndex === 2) && (
                            <ReviewInfo 
                                title={'Document Information'} 
                                onVerifiedPress={onVerifiedPress} />
                        )}
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
                        {(activeIndex === 2 || activeIndex === 3) && (
                            <CheckOut 
                                lastMsecs={stopMsecs} 
                                driver={driver}
                                security={security}
                                startTime={startTime}
                                onChangeTimer={(data) => this.setState({stopMsecs: data})} 
                                onStop={(data) => this.setState({stopTime: data, activeIndex: dataTab.length})}
                                btnTitle={buttonTitle[activeIndex]}
                                btnPress={() => onBack()}
                                onVerifiedPress={onVerifiedPress} />
                        )}
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const img = "https://img.freepik.com/free-photo/friendly-smiling-woman-looking-pleased-front_176420-20779.jpg"

const mapStateToProps = state => {
    return {
        auth: state.auth
    };
};

export default connect(mapStateToProps, null)(CardMaterialMovement)
