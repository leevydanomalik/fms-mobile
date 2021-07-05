import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import QRCode from 'react-native-qrcode-svg'
// import CardCheckInOut from '../../Components/CardCheckInOut'
import { Stopwatch } from 'react-native-stopwatch-timer'
import M from 'moment'
import CardSecurity from '../../Components/CardSecurity'
import ButtonNext from '../../Components/ButtonNext'
import { Colors } from '../../../Themes'
import CardDriver from './CardDriver'
// import { generateDiferenceTime } from '../../../Utils'

let msecs = 0
var time

class CheckOut extends Component {
    constructor(props) {
        super(props)
        let newdate = M().format("LTS")
        let startTime = props.startTime ? props.startTime : "-"
        var startMili = startTime ? M(startTime, "DD-MM-YYYY h:mm:ss A").format("LTS") : "-"
        if (startMili === "Invalid date") startMili = 0
        else {
            var ms = M(newdate, "LTS").diff(M(startMili, "LTS"));
            var d = M.duration(ms);
            startMili = d
        }
        this.state = {
            isDone: false,
            visibleButton: false,
            stopwatchStart: false,
            stopwatchReset: false,
            visibleQR: false,
            startMili: props.startMili ? props.startMili : 0,
            lastMsecs: props.lastMsecs ? props.lastMsecs : msecs,
            startTime,
            stopTime: props.stopTime ? props.stopTime : "-",
            countTime: '',
            checkList: props.checkList,
            pauseResume: true
        }
        console.log("millll", d, this.props.startTime, this.props.startMili, newdate)
    }

    componentDidMount() {
        const {lastMsecs, isDone, btnPause} = this.props
        if (isDone) {
            var count = this.convertToText(lastMsecs)
            this.setState({isDone: true, visibleQR: true, countTime: count, stopwatchStart: false, stopwatchReset: false, pauseResume: false})
        } else {
            { !btnPause ? this.onStartStopwatch() : null }
        }
        console.log('btnPause', btnPause)
    }

    componentDidUpdate(prevProsp) {
        if (this.props.checkList != prevProsp.checkList) this.setState({ checkList: this.props.checkList }, console.log("updates"))
    }

    convertToText(millis) {
        let sec = Math.floor(millis / 1000)
        let hrs = Math.floor(sec / 3600)
        sec -= hrs * 3600
        let min = Math.floor(sec / 60)
        sec -= min * 60
        sec = '' + sec
        if (hrs > 0) {
            min = '' + min
            return hrs + " Hour " + min + " Minute " + sec + " Second"
        }
        if (min > 0) {
            return min + " Minute " + sec + " Second"
        }
        else {
            return sec + " Second"
        }
    }

    onStartStopwatch() {
        this.setState({
            stopwatchStart: true,
            stopwatchReset: false
        })
    }

    onStopStopwatch() {
        var stop = M().format("LTS")
        var stopWithDate = `${M().format("DD-MM-YYYY")} ${stop}`
        var count = this.convertToText(msecs)
        var startTime = this.state.startTime ? M(this.state.startTime, "DD-MM-YYYY h:mm:ss A").format("LTS") : "-"
        if (startTime === "Invalid date") startTime = this.state.startTime
        this.setState({
            visibleQR: true,
            stopwatchStart: false,
            stopwatchReset: false,
            stopTime: stop,
            lastMsecs: msecs,
            countTime: count,
            pauseResume: false
        })
        this.props.onChangeTimer(count)
        this.props.onStop(stopWithDate, count)
        this.props.updateStatus(stop, "DONE", startTime, count, msecs)
        { this.props.gate && this.props.sendFcm(stop, count) }
    }

    onResetStopwatch() {
        this.setState({ visibleButton: true })
        time = setTimeout(() => {
            this.onStopStopwatch()
            clearTimeout(time)
        }, 1000)
    }

    onPauseStopwatch() {
        var count = this.convertToText(msecs)
        var startTime = this.state.startTime ? M(this.state.startTime, "DD-MM-YYYY h:mm:ss A").format("LTS") : "-"
        if (startTime === "Invalid date") startTime = this.state.startTime

        this.setState({ stopwatchStart: !this.state.stopwatchStart })
        this.props.updatePauseStatus(msecs, startTime, count)
    }

    render() {
        const { driverSignver, securitySignver, security, driver, btnTitle, btnPress, code, YND, btnPause, disableButton, rawData } = this.props
        const { pauseResume, stopwatchStart, stopwatchReset, visibleQR, lastMsecs, countTime, visibleButton, checkList, startMili } = this.state
        const count = checkList && checkList.filter(item => item.active === true).length;
        console.log("pause", btnPause, pauseResume, YND, count)
        return (
            <View>
                <View style={{ marginTop: 10, backgroundColor: "#fff", padding: 20 }}>
                    <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 0 }}>
                        <Text style={{ fontSize: 16, fontWeight: "bold", color: Colors.lightGrey }}>
                            {visibleQR ? "Check In / Out" : "Check Out"}
                        </Text>
                    </View>
                </View>

                <View style={{ backgroundColor: "#fff", padding: 20, paddingTop: 0 }}>
                    {YND ? (
                        <CardDriver
                            // YND={YND}
                            driver={disableButton ? driverSignver : driver}
                            onPress={() => stopwatchStart && pauseResume || !stopwatchStart && pauseResume ? !YND ? this.onResetStopwatch() : YND && count == 4 ? this.onResetStopwatch() : null : null}
                            updatePause={() => this.onPauseStopwatch()}
                            btnPause={btnPause ? "RESUME" : "PAUSE"}
                            btnTitle={stopwatchStart && pauseResume ? visibleButton ? "WAIT.." : "STOP" : !stopwatchStart && pauseResume ? "STOP" : "DONE"}
                            btnColor={stopwatchStart && pauseResume || !stopwatchStart && pauseResume ? !YND ? Colors.error : YND && count == 4 ? Colors.error : '#f0f0f0' : '#f0f0f0'}
                            btnTextColor={stopwatchStart && pauseResume || !stopwatchStart && pauseResume ? !YND ? "#fff" : YND && count == 4 ? "#fff" : Colors.lightGrey : Colors.lightGrey}
                        /> 
                    ) : (
                        <CardDriver
                            driver={disableButton ? driverSignver : driver}
                            onPress={() => stopwatchStart ? this.onResetStopwatch() : null}
                            btnTitle={stopwatchStart ? visibleButton ? "WAIT.." : "STOP" : "DONE"}
                            btnColor={stopwatchStart ? Colors.error : '#f0f0f0'}
                            btnTextColor={stopwatchStart ? "#fff" : Colors.lightGrey}
                        />
                    )}

                    <View style={{ marginTop: 20 }}>
                        <CardSecurity data={disableButton ? securitySignver : security} />
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
                            if (time !== lastMsecs) {
                                msecs = time
                            }
                        }}
                        startTime={YND ? startMili : lastMsecs}
                        start={stopwatchStart}
                        reset={stopwatchReset}
                        options={{ ...options, text: { ...options.text, color: stopwatchStart ? Colors.lightGrey : Colors.black } }}
                    />

                </View>

                {visibleQR && (
                    <View style={{ marginTop: 1, backgroundColor: "#fff", padding: 20, alignItems: 'center' }}>
                        <Text style={{ width: '75%', fontSize: 16, marginBottom: 20, color: Colors.black, textAlign: 'center' }}>Congratulation you just completed your jobs. That’s great !!!</Text>

                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 26, marginBottom: 25, fontWeight: 'bold', color: Colors.main }}>{countTime}</Text>
                            <View style={{ width: 200, height: 200, alignItems: "center", justifyContent: "center" }}>
                                <QRCode size={200} value={code ? code : "B29228PPK"} />
                            </View>
                            <Text style={{ textAlign: 'center', fontSize: 16, marginTop: 25, color: Colors.black, fontWeight: 'bold' }}>{code ? code : 'GT#9686968886'}</Text>
                        </View>
                    </View>
                )}

                {!disableButton && visibleQR && (
                    <View style={{ marginTop: 0, marginBottom: 10, backgroundColor: "#fff", padding: 20 }}>
                        <ButtonNext
                            title={'START ANOTHER TASK'}
                            onPress={() => btnPress()} />
                    </View>
                )}
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
        color: Colors.black,
    }
}

export default CheckOut