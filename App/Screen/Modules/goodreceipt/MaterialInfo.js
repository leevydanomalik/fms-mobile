import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image, Dimensions, ScrollView } from 'react-native'
import { Stopwatch } from 'react-native-stopwatch-timer'
import M from 'moment'
import CardMaterialCheckSimple from '../../Components/CardMaterialCheckSimple'

let msecs = 0

class MaterialInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            stopwatchStart: false,
            stopwatchReset: false,
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
        const { onVerifiedPress, onPress, data, btnTitle } = this.props
        const { stopwatchStart, stopwatchReset, lastMsecs } = this.state
        return (
            <View>
                <CardMaterialCheckSimple 
                    btnTitle={btnTitle}
                    data={data}
                    onPress={() => {
                        onPress()
                        this.onStopStopwatch()
                    }}
                />
                <View style={{
                    position: 'absolute',
                    top: 35,
                    right: 20
                }}>
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