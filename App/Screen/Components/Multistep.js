import React from 'react'
import { View, Text, TouchableOpacity, Dimensions, StyleSheet } from 'react-native'
import { color } from 'react-native-reanimated'
import { Colors } from '../../Themes'

class Multistep extends React.Component {
    constructor(props) {
        super(props)
        const {data, activeIndex, disableColor, isSmallContainer} = props
        this.state = {
            data: data,
            activeIndex: activeIndex,
            disableColor: disableColor,
            isSmallContainer: isSmallContainer
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.activeIndex !== prevProps.activeIndex) {
            this.onChangeTab(this.props.activeIndex)
        }
    }

    componentDidMount() {
        this.onChangeTab(this.props.activeIndex)
    }

    onChangeTab = (index, disable = false) => {
        const {data, disableColor} = this.state
        let payload = []
        data && data.map((dt, idx) => {
            // payload.push({...dt, active: (idx < index) ? true : false })
            (disableColor) 
                ? payload.push({...dt, active: (idx <= index) ? true : false })
                : payload.push({...dt, active: (idx < index) ? true : false }) 
            return null
        })
        this.setState({data: payload, activeIndex: index})
        this.props.onChange(index)
        console.log('disable color:', disable)
    }

    render() {
        const {data, activeIndex, isSmallContainer} = this.state
        const {disableClick, disable} = this.props
        const widthSmall = 200
        return (!disable) && (
            <View style={[styles.container]}>
                <View style={[{ flex: 1 }, isSmallContainer ? { alignItems: "center" } : null ]}> 
                    <View style={styles.menuLineContainer}>
                        <View style={[styles.menuLine, isSmallContainer ? { width: (widthSmall - 20) } : null]} />
                    </View>
                    {data && (
                        <View style={[styles.navigator, isSmallContainer ? {width: widthSmall, justifyContent: "center"} : null]}>
                            <View style={styles.navigatorContent}>
                                {data && data.map((dt, index) => {
                                    return (
                                        <View key={index}>
                                            <TouchableOpacity 
                                                onPress={() => {
                                                    (!disableClick) ? dt.active ? this.onChangeTab(index, true) : null : null
                                                }} 
                                                activeOpacity={1}>
                                                <View style={[
                                                        styles.menu, (dt.active) ? styles.menuActive : styles.menuNormal, 
                                                        {
                                                            borderWidth: (index === activeIndex) ? 2 : 0,
                                                            borderColor: (index === activeIndex) ? Colors.main : '#fff'
                                                        }
                                                    ]}>
                                                    <Text style={[styles.menuText, {color: (dt.active) ? '#fff' : '#000'}]}>{ dt.title }</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    )
                                })}
                            </View>
                        </View>
                    )}
                </View>
            </View>
        )
    }
}

const tabHeight = 28

const styles = StyleSheet.create({
    flexContent: {
        flex: 1, flexDirection: 'row'
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        zIndex: 1000
    },
    navigator: {
        flex: 1,
        // flexDirection: 'column',
        // justifyContent: 'center',
        height: tabHeight + 20,
        padding: 10,
        // paddingLeft: 20,
        // paddingRight: 20
    },
    navigatorContent: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    content: {
        flex: 2,
        padding: 10,
        backgroundColor: '#ff0'
    },
    menu: {
        width: tabHeight,
        height: tabHeight,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
    },
    menuNormal: {
        backgroundColor: '#fff',
        color: '#000'
    },
    menuActive: {
        backgroundColor: Colors.main,
        color: '#fff'
    },
    menuText: {
        fontSize: 12,
        fontWeight: 'bold'
    },
    menuLineContainer: {
        position: 'absolute',
        top: (tabHeight - 6),
        left: 10,
        width: Dimensions.get('window').width - 20,
        alignItems: "center"
    },
    menuLine: {
        width: "100%",
        flex: 1,
        height: 2,
        backgroundColor: Colors.main
    }
})

export default Multistep