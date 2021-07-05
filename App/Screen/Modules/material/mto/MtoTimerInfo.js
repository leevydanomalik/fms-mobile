import React, { Component } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Stopwatch } from 'react-native-stopwatch-timer'
import M from 'moment'
import Icon from 'react-native-vector-icons/Feather'

let msecs = 0

class MtoTimerInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visibleBottomPopup: false,
            stopwatchStart: false,
            stopwatchReset: false,
            isPlay: false,
            countDone: 0,
            lastMsecs: props.lastMsecs ? props.lastMsecs : 0,
        }
    }

    static defaultProps = {
        onVerifiedPress: () => null
    }

    componentDidMount() {
        const {timerStatus} = this.props
        if (timerStatus) {
            this.onStartStopwatch()
        }
    }

    componentDidUpdate(prevProps) {
        const {timerStatus} = this.props
        if (timerStatus !== prevProps.timerStatus) {
            console.log('timerstatus', timerStatus)
            if (!timerStatus) {
                this.onStopStopwatch()
            }
        }
    }

    onStartStopwatch() {
        var start = !this.state.stopwatchStart ? M().format("LTS") : this.state.startTime
        this.setState({
            isPlay: true,
            stopwatchStart: true,
            stopwatchReset: false,
            startTime: start,
        })
        console.log('stopwatch started')
        this.props.onStart && this.props.onStart(true, msecs, start)
    }

    onStopStopwatch() {
        var stop = this.state.stopwatchStart ? M().format("LTS") : "-"
        var { isPlay } = this.state
        this.setState({
            isPlay: false,
            stopwatchStart: false,
            stopwatchReset: false,
            stopTime: stop,
            lastMsecs: msecs
        })
        this.props.onChangeTimer && this.props.onChangeTimer(msecs)
        this.props.onStop && this.props.onStop(isPlay, msecs, stop)
        console.log('stopwatch stoped', msecs)
    }

    render() {
        const { color } = this.props
        const { stopwatchStart, stopwatchReset, lastMsecs, isPlay } = this.state
        return (
            <View style={{
                padding: 10,
                flexDirection: 'row',
                justifyContent: 'flex-start'
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
                    options={{...options, text: {...options.text, color: color}}}
                />
                <TouchableOpacity 
                    style={{
                        marginTop: -4,
                        marginLeft: 8
                    }}
                    onPress={() => {
                        this.setState({isPlay: !this.state.isPlay})
                        isPlay ? this.onStopStopwatch() : this.onStartStopwatch()
                    }}>
                    <Icon name={isPlay ? 'pause-circle' : 'play-circle' } size={24} color={isPlay ? '#fff' : '#f0f0f0'} />
                </TouchableOpacity>
            </View>
        )
    }
}

const options = {
    container: {
        // backgroundColor: '',
        padding: 0,
        borderRadius: 5
    },
    text: {
        fontSize: 12,
        fontWeight: 'normal',
        color: '#fff',
    }
}

export default MtoTimerInfo