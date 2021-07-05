import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Stopwatch } from 'react-native-stopwatch-timer'
import M from 'moment'
import CardSecurity from '../../Components/CardSecurity'
import { Colors } from '../../../Themes'
import CardDriver from './CardDriver'
import CardCollapse from '../../Components/CardCollapse'

let msecs = 0
var time

class CheckIn extends Component {
    constructor(props) {
        super(props)
        this.state = {
            stopwatchStart: false,
            stopwatchReset: false,
            visibleButton: false,
            lastMsecs: 0,
            startTime: props.startTime ? props.startTime :  "-",
            stopTime: props.stopTime ? props.stopTime : "-"
        }
    }

    componentDidMount() {
        this.props.onChangeTimer(0)
        this.props.onStart('-')
    }

    onStartStopwatch() {
        var start = !this.state.stopwatchStart ? M().format("LTS") : this.state.startTime
        var startWithDate = `${M().format("DD-MM-YYYY")} ${start}`
        msecs = 0
        this.setState({
            visibleButton: true,
            stopwatchStart: true,
            stopwatchReset: false,
            startTime: start,
            lastMsecs: 0
        })
        this.props.onStart(startWithDate, msecs)
        this.props.updateStatus(start, "STARTED")
        {this.props.gate && this.props.sendFcm(start, msecs)}

        time = setTimeout(() => {
            this.onStopStopwatch()
            clearTimeout(time)
        }, 1000)
    }

    onStopStopwatch() {
        var stop = this.state.stopwatchStart ? M().format("LTS") : "-"
        this.setState({
            visibleButton: false,
            // stopwatchStart: false,
            // stopwatchReset: true,
            stopTime: stop,
            lastMsecs: msecs
        })
        this.props.onChangeTimer(msecs)
        this.props.onStop(stop, msecs)
    }

    render() {
        const { security, driver, disableStartButton } = this.props
        const { stopwatchStart, stopwatchReset, lastMsecs, visibleButton } = this.state
        return (
            <View>
                <View style={{ marginTop: 10, backgroundColor: "#fff", padding: 20 }}>
                    <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 0 }}>
                        <Text style={{ fontSize: 16, fontWeight: "bold", color: Colors.lightGrey }}>Check In</Text>
                    </View>
                </View>
                <CardCollapse
                    top={-40}
                    right={20}>
                    <View style={{ backgroundColor: "#fff", padding: 20, paddingTop: 0 }}>
                        <CardDriver 
                            driver={driver}
                            onPress={() => stopwatchStart ? null : disableStartButton ? null : this.onStartStopwatch()}
                            btnTitle={visibleButton ? "WAIT.." : "START"}
                            btnColor={disableStartButton ? '#f0f0f0' : stopwatchStart ? '#f0f0f0' : Colors.main}
                            btnTextColor={disableStartButton ? Colors.lightGrey : stopwatchStart ? Colors.lightGrey : "#fff"}
                        />

                        <View style={{
                            marginTop: 20,
                        }}>
                            <CardSecurity
                                data={security} />
                        </View>
                    </View>

                    <View style={{
                        backgroundColor: "#fff",
                        marginTop: 20,
                        paddingTop: 20,
                        paddingBottom: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderTopWidth: 0.5,
                        borderBottomWidth: 0.5,
                        borderColor: '#ccc'
                    }}>
                        <Stopwatch 
                            getMsecs={(time) => {
                                msecs = time
                            }}
                            startTime={lastMsecs}
                            start={stopwatchStart} 
                            reset={stopwatchReset} 
                            options={{...options, text: {...options.text, color: stopwatchStart ? "#000" : Colors.lightGrey}}}
                        />
                    </View>
                </CardCollapse>
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
        fontSize: 48,
        fontWeight: 'bold',
        color: '#000',
    }
}

export default CheckIn