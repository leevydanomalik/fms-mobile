import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import { Colors } from '../../Themes'

class Bottombar extends Component {
    constructor(props) {
        super(props)
        const { menu } = props
        this.state = {
            activeIndex: props.activeIndex ? props.activeIndex : 0,
            menu: menu
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.menu !== prevProps.menu) {
            this.setState({menu: this.props.menu, activeIndex: this.props.activeIndex})
        }
    }

    onChangeMenu = (index) => {
        const { menu } = this.state
        const { onChange } = this.props
        this.setState({activeIndex: index})
        onChange ? onChange(menu[index], index) : null
    }

    render() {
        const {menu, activeIndex} = this.state
        return (
            <View style={{
                backgroundColor: "#fff",
                flexDirection: "row",
                justifyContent: "center",
                width: '100%',
                height: 60,
                elevation: 10
            }}>
                {menu && menu.map((data, index) => {
                    const isActive = index === activeIndex ? true : false
                    return (
                        <TouchableOpacity 
                            activeOpacity={1}
                            onPress={() => this.onChangeMenu(index)} 
                            key={index}
                            style={{
                                paddingTop: 8,
                                paddingBottom: 5,
                                flex: 1,
                                justifyContent: "space-between",
                                alignItems: "center"
                            }}>
                            <View>
                                <Icon 
                                    name={data.icon} 
                                    size={data.size}
                                    color={isActive ? Colors.main : Colors.mainPlaceholder}/>
                                {data.notif > 0 && (
                                    <View style={{
                                        backgroundColor: "red",
                                        position: "absolute",
                                        right: 0,
                                        top: 0,
                                        alignItems: "center",
                                        justifyContent: "center",
                                        width: 12,
                                        height: 12,
                                        borderRadius: 20
                                    }}>
                                        {/* {data.notif > 1 && ( */}
                                        <Text style={{fontSize: 10, color: "#fff"}}>{data.notif}</Text>
                                        {/* )} */}
                                    </View>
                                )}
                            </View>
                            <Text style={{
                                color: isActive ? "#000" : "#ccc",
                                fontWeight: isActive ? "bold" : "normal",
                                fontSize: 12
                            }}>{data.label}</Text>
                        </TouchableOpacity>
                    )
                })}
            </View>
        )
    }
}

export default Bottombar