import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image, Dimensions, ScrollView } from 'react-native'
import { Stopwatch } from 'react-native-stopwatch-timer'
import M from 'moment'
import Icon from 'react-native-vector-icons/AntDesign'
import FeIcon from 'react-native-vector-icons/Feather'
import BottomPopup from '../../Components/BottomPopup'
import ButtonNext from '../../Components/ButtonNext'
import { Colors } from '../../../Themes'

const img = require('../../../assets/product.png')
let msecs = 0

class MaterialDetail extends Component {
    render() {
        return (
            <View style={{ padding: 15 }}>
                <View style={{ 
                    flex: 1,
                    paddingTop: 30,
                    paddingBottom: 30,
                    alignItems: 'center',
                    borderBottomColor: '#ccc',
                    borderBottomWidth: 1,
                    marginBottom: 15
                 }}>
                    <View style={{ height: 240, width: 200, borderRadius: 0 }} >
                        <Image source={img} resizeMode="cover" style={{ width: "100%", height: "100%", borderRadius: 0 }} />
                    </View>
                </View>
                <View style={{ marginBottom: 15 }}>
                    <Text style={{ fontSize: 12, color: "#999" }}>Material KIMAP</Text>
                    <Text style={{ color: "#000", fontSize: 16, fontWeight: "bold" }}>A94949488809</Text>
                </View>
                <View style={{ marginBottom: 15 }}>
                    <Text style={{ fontSize: 12, color: "#999" }}>TYPE</Text>
                    <Text style={{ color: "#000", fontSize: 16, fontWeight: "bold" }}>Inbound Delivery</Text>
                </View>
                <View style={{ marginBottom: 15 }}>
                    <Text style={{ fontSize: 12, color: "#999" }}>REFERENCE</Text>
                    <Text style={{ color: "#000", fontSize: 16, fontWeight: "bold" }}>PO#86868686</Text>
                </View>
                <View style={{ marginBottom: 15 }}>
                    <Text style={{ fontSize: 12, color: "#999" }}>DELIVERY ORDER</Text>
                    <Text style={{ color: "#000", fontSize: 16, fontWeight: "bold" }}>DO#86868686</Text>
                </View>
                <View style={{ marginBottom: 15 }}>
                    <Text style={{ fontSize: 12, color: "#999" }}>TYPE</Text>
                    <Text style={{ color: "#000", fontSize: 16, fontWeight: "bold" }}>Inbound Delivery</Text>
                </View>
                <View style={{ marginBottom: 15 }}>
                    <Text style={{ fontSize: 12, color: "#999" }}>REFERENCE</Text>
                    <Text style={{ color: "#000", fontSize: 16, fontWeight: "bold" }}>PO#86868686</Text>
                </View>
                <View style={{ marginBottom: 0 }}>
                    <Text style={{ fontSize: 12, color: "#999" }}>DELIVERY ORDER</Text>
                    <Text style={{ color: "#000", fontSize: 16, fontWeight: "bold" }}>DO#86868686</Text>
                </View>
            </View>
        )
    }
}

class MaterialStatus extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isDone: false
        }
    }
    render() {
        const {isDone} = this.state
        const {onEnlarge, onSave} = this.props
        return (
            <View style={{ padding: 15 }}>
                <View style={{ 
                    flex: 1,
                    paddingTop: 30,
                    paddingBottom: 30,
                    alignItems: 'center',
                    marginBottom: 15,
                    backgroundColor: isDone ? Colors.main : Colors.error
                 }}>
                    <View style={{ width: '100%', height: 140, alignItems: "center", justifyContent: "center" }}>
                        <FeIcon name={isDone ? 'check-circle' : 'x-circle'} size={120} color={'#fff'} />
                    </View>
                </View>
                <View style={{ padding: 0, paddingBottom: 20, paddingTop: 5, flex: 0, flexDirection: "row", justifyContent: 'space-between', alignItems: 'flex-start', borderBottomColor: '#ccc', borderBottomWidth: 1, }}>
                    <View style={{ flex: 1, marginBottom: 0 }}>
                        <Text style={{ fontSize: 12, color: "#999" }}>Material KIMAP</Text>
                        <Text style={{ color: "#000", fontSize: 16, fontWeight: "bold" }}>A94949488809</Text>
                        <Text style={{ fontSize: 10, color: "#999", marginTop: 5, marginRight: 20 }}>This vehicle must stop the engine while parking and please securing surrounding and confirm to loading master</Text>
                    </View>
                    <View style={{ width: 60, marginBottom: 0, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ height: 60, width: 50, borderRadius: 0, marginBottom: 5 }} >
                            <Image source={img} resizeMode="cover" style={{ width: "100%", height: "100%", borderRadius: 0 }} />
                        </View>
                        <TouchableOpacity onPress={() => onEnlarge()}>
                            <Text style={{ fontSize: 12, color: "#999" }}>+ Enlarge</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{marginTop: 20}}>
                    <ButtonNext title={isDone ? 'Z2000' : 'Z1000'} enableCaretDown={true} onPress={() => this.setState({isDone: !this.state.isDone})} />
                </View>
                <View style={{marginTop: 30, justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{width: 100}}>
                        <ButtonNext title={'SAVE'} type={'primary'} enableBorderRadius={true} onPress={() => onSave(isDone)} />
                    </View>
                </View>
            </View>
        )
    }
}

class CardMaterial extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isDone: 'unset',
            visibleBottomPopup: false
        }
    }
    render () {
        const {isDone, visibleBottomPopup} = this.state
        const {onEnlarge, onChange} = this.props
        let iconName = 'circle'
        let iconColor = Colors.lightGrey
        switch (isDone) {
            case 'good':
                iconName = 'check-circle'
                iconColor = Colors.main
                break;
            case 'bad':
                iconName = 'x-circle'
                iconColor = Colors.error
                break;
            default:
                iconName = 'circle'
                iconColor = Colors.lightGrey
                break;
        }
        return (
            <View style={{ marginTop: 1, marginBottom: 1, backgroundColor: "#fff" }}>
                <TouchableOpacity 
                    onPress={() => {
                        // onEnlarge()
                        this.setState({visibleBottomPopup: true})
                    }}>
                    <View style={{ padding: 20, flex: 0, flexDirection: "row", justifyContent: 'space-between', alignItems: 'flex-start', borderBottomWidth: 0.5, borderBottomColor: '#ccc' }}>
                        <View style={{ width: 30, borderRadius: 0, justifyContent: 'flex-start', alignItems: 'flex-start', marginRight: 5 }} >
                            <FeIcon name={iconName} size={22} color={iconColor} />
                        </View>
                        <View style={{ flex: 1 }}>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
                                <Text style={{ color: "#000", fontSize: 16, fontWeight: "bold" }}>MESRAN 20X20L ENDURO</Text>
                                <Icon name={'right'} size={16} color={Colors.lightGrey} />
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 0 }}>
                                <Text style={{ fontSize: 12, color: "#999" }}>HU0048 | 20 BOX</Text>
                                <Text style={{ fontSize: 12, color: "#999" }}>G18 | NG2</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
                <BottomPopup 
                    visible={visibleBottomPopup} 
                    title={'MESRAN 20X20L ENDURO'} 
                    onDismiss={() => this.setState({visibleBottomPopup: false})}>
                    <View style={{ paddingTop: 25, height: 520 }}>
                        <View style={{ flex: 1, flexDirection: 'column' }}>
                            <ScrollView>
                                <MaterialStatus 
                                    onEnlarge={() => onEnlarge()} 
                                    onSave={(status) => {
                                        onChange(1)
                                        this.setState({isDone: status ? 'good' : 'bad', visibleBottomPopup: false})
                                    }} />
                            </ScrollView>
                        </View>
                    </View>
                </BottomPopup>
            </View>
        )
    }
}

class MaterialInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            stopwatchStart: false,
            stopwatchReset: false,
            visibleBottomPopup: false,
            countDone: 0,
            lastMsecs: props.lastMsecs ? props.lastMsecs : msecs,
        }
    }

    static defaultProps = {
        onVerifiedPress: () => null
    }

    componentDidMount() {
        this.onStartStopwatch()
    }

    onStartStopwatch() {
        var start = !this.state.stopwatchStart ? M().format("LTS") : this.state.startTime
        this.setState({
            stopwatchStart: true,
            stopwatchReset: false,
            startTime: start,
        })
        console.log('start:', msecs)
    }

    onStopStopwatch() {
        var stop = this.state.stopwatchStart ? M().format("LTS") : "-"
        this.setState({
            visibleQR: true,
            stopwatchStart: false,
            stopwatchReset: false,
            stopTime: stop,
            lastMsecs: msecs
        })
        this.props.onChangeTimer(msecs)
        this.props.onStop(stop)
    }

    render() {
        const { onVerifiedPress, onPress, data } = this.props
        const { visibleBottomPopup, countDone, stopwatchStart, stopwatchReset, lastMsecs } = this.state
        return (
            <View>
                <View style={{ marginTop: 0, backgroundColor: "#fff", padding: 20, borderTopWidth: 10, borderTopColor: '#f0f0f0', borderBottomWidth: 0.5, borderBottomColor: '#ccc' }}>
                    <View style={{ flex: 0, flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 5 }}>
                        <Text style={{ fontSize: 16, fontWeight: "bold", color: "#000" }}>Material List (#PO090299292)</Text>
                        {/* <Text style={{ fontSize: 12, fontWeight: "normal", color: "#999" }}>{countDone} | {data.length}</Text> */}
                        <Stopwatch 
                            getMsecs={(time) => {
                                if (time !== lastMsecs) {
                                    msecs = time
                                }
                            }}
                            startTime={lastMsecs}
                            start={stopwatchStart} 
                            reset={stopwatchReset} 
                            options={{...options, text: {...options.text, color: stopwatchStart ? "#999" : "#000"}}}
                        />
                    </View>
                    <View style={{ flex: 0, flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 0 }}>
                        <Text style={{ fontSize: 12, fontWeight: "normal", color: "#999" }}>#DO983773737</Text>
                        <Text style={{ fontSize: 12, fontWeight: "normal", color: "#999" }}>L301 - Gudang Nusantara</Text>
                    </View>
                </View>

                {data && data.map((dt, index) => {
                    return (
                        <CardMaterial 
                            key={index} 
                            onChange={(data) => this.setState({countDone: (this.state.countDone + data)})} 
                            onEnlarge={() => this.setState({visibleBottomPopup: true, isMaterialDetail: false})} />
                    )
                })}

                {(countDone >= data.length) && (
                    <View style={{ marginTop: 0, backgroundColor: "#fff", padding: 20}}>
                        <ButtonNext 
                            title={'Done and Next'} 
                            onPress={() => {
                                onPress()
                                this.onStopStopwatch()
                            }} />
                    </View>
                )}

                <BottomPopup 
                    visible={visibleBottomPopup} 
                    title={'Material KIMAP'} 
                    onDismiss={() => this.setState({visibleBottomPopup: false})}>
                    <View style={{ paddingTop: 25, height: (Dimensions.get('screen').height - 200)}}>
                        <View style={{ flex: 1, flexDirection: 'column' }}>
                            <ScrollView>
                                <MaterialDetail />
                            </ScrollView>
                        </View>
                    </View>
                </BottomPopup>
            </View>
        )
    }
}

const options = {
    container: {
        backgroundColor: '#fff',
        padding: 0,
        borderRadius: 5
    },
    text: {
        fontSize: 12,
        fontWeight: 'normal',
        color: '#999',
    }
}

export default MaterialInfo