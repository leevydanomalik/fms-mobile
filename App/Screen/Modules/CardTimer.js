import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { Colors } from '../../Themes'
import { Stopwatch } from 'react-native-stopwatch-timer'
import M from 'moment'

class CardTimer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stopwatchStart: false,
            stopwatchReset: false,
            startTime: "-",
            stopTime: "-"
        }
    }

    toggleStopwatch() {
        this.setState({
            stopwatchStart: !this.state.stopwatchStart,
            stopwatchReset: !this.state.stopwatchStart ? false : true,
            startTime: !this.state.stopwatchStart ? M().format("LTS") : this.state.startTime,
            stopTime: this.state.stopwatchStart ? M().format("LTS") : "-"
        })
    }

    render() {
        const { startTime, stopTime, stopwatchStart, stopwatchReset } = this.state
        return (
            <View style={{ marginTop: 10, backgroundColor: "#fff", padding: 20 }}>
                <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 15 }}>
                    <Text style={{ fontSize: 16, fontWeight: "bold", color: "#999" }}>Check In/Out</Text>
                    <Text style={{ fontSize: 16, fontWeight: "bold", color: "#000" }}>{startTime} | {stopTime}</Text>
                </View>

                <View style={{ flexDirection: "row", marginBottom: 10, padding: 15, borderWidth: 1, borderColor: "#ccc", borderRadius: 5, backgroundColor: Colors.mainPlaceholder }}>
                    <View style={{ height: 50, width: 50, borderRadius: 100 }} >
                        <Image source={{ uri: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg" }} resizeMode="cover" style={{ width: "100%", height: "100%", borderRadius: 100 }} />
                    </View>
                    <View style={{ flex: 1, marginLeft: 10, justifyContent: 'center', }}>
                        <Text style={{ color: "#000", fontSize: 16, fontWeight: "bold" }}>ALCARGO Logistica </Text>
                        <Stopwatch start={stopwatchStart} reset={stopwatchReset} options={{ fontSize: 14 }} />
                    </View>
                    <TouchableOpacity onPress={() => this.toggleStopwatch()}>
                        <View style={{ backgroundColor: Colors.error, width: 50, height: 50, borderRadius: 50, alignItems: "center", justifyContent: "center" }}>
                            <Text style={{ fontSize: 14, color: "#fff", fontWeight: "bold" }}>{stopwatchStart ? "STOP" : "START"}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default CardTimer