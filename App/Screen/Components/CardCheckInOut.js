import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { Colors } from '../../Themes'
import { Stopwatch } from 'react-native-stopwatch-timer'
import M from 'moment'
import CardSecurity from './CardSecurity'

let msecs = 0

class CardCheckInOut extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stopwatchStart: false,
            stopwatchReset: false,
            lastMsecs: props.startMsecs ? props.startMsecs : msecs,
            startTime: props.startTime ? props.startTime :  "-",
            stopTime: props.stopTime ? props.stopTime : "-"
        }
    }

    componentDidMount() {
        msecs = 0
    }

    toggleStopwatch() {
        var start = !this.state.stopwatchStart ? M().format("LTS") : this.state.startTime
        var stop = this.state.stopwatchStart ? M().format("LTS") : "-"
        this.setState({
            stopwatchStart: !this.state.stopwatchStart,
            stopwatchReset: !this.state.stopwatchStart ? false : true,
            startTime: start,
            stopTime: stop,
            lastMsecs: msecs
        })
        this.props.onChangeMseces(msecs)
        this.props.onStart(start)
        this.props.onStop(stop)
    }

    render() {
        const { startTime, stopTime, stopwatchStart, stopwatchReset, lastMsecs } = this.state
        const { driver, isStart, isStop } = this.props
        return (
            <View>
                <View style={{ flexDirection: "row", marginBottom: 10, padding: 15, borderWidth: 1, borderColor: "#ccc", borderRadius: 5, backgroundColor: Colors.mainPlaceholder }}>
                    <View style={{ height: 50, width: 50, borderRadius: 100 }} >
                        <Image 
                            source={{ uri: driver.image }} 
                            resizeMode="cover" 
                            style={{ width: "100%", height: "100%", borderRadius: 100 }} />
                    </View>
                    <View style={{ flex: 1, marginLeft: 10, justifyContent: 'center', }}>
                        <Text style={{ color: "#000", fontSize: 16, fontWeight: "bold" }}>{ driver.name }</Text>
                        <Text style={{ fontSize: 16, fontWeight: "normal", color: "#555" }}>{ driver.cargo }</Text>
                    </View>
                    <TouchableOpacity onPress={() => this.toggleStopwatch()}>
                        <View style={{ backgroundColor: stopwatchStart ? Colors.error : Colors.main, width: 50, height: 50, borderRadius: 50, alignItems: "center", justifyContent: "center" }}>
                            <Text style={{ fontSize: 14, color: "#fff", fontWeight: "bold" }}>{stopwatchStart ? isStop ? "DONE" : "STOP" : "START"}</Text>
                        </View>
                    </TouchableOpacity>
                </View>


                <View style={{
                    marginTop: 20,
                }}>
                    <CardSecurity
                        data={[
                            {id: 1, title: 'Check In', warehouse: 'Warehouse L301 SLOC 304', time: startTime, worker: 'Ms. Security', image: img},
                            {id: 2, title: 'Check Out', warehouse: 'Warehouse L301 SLOC 304', time: stopTime, worker: 'Ms. Security',  image: img}
                        ]} />
                </View>

                <View style={{
                    marginTop: 20,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Stopwatch 
                        getMsecs={(time) => {
                            msecs = time
                        }}
                        startTime={lastMsecs}
                        // totalDuration={9000}
                        start={stopwatchStart} 
                        reset={stopwatchReset} 
                        options={{...options, text: {...options.text, color: isStop ? "#999" : "#000"}}}
                    />
                </View>
            </View>
        )
    }
}

const img = "https://techwithsadprog.com/assets/images/testimonial/1595348801user-3.jpeg"

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

export default CardCheckInOut