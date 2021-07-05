import React, { Component } from 'react'
import {
    Dimensions,
    Image,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Text,
    View,
    RefreshControl
} from 'react-native'
import ParallaxScrollView from 'react-native-parallax-scroll-view'
import AntIcon from 'react-native-vector-icons/AntDesign'
import FaIcon from 'react-native-vector-icons/FontAwesome'
import { getPrimaryColor } from '../../Lib/Utils'
import Spinkit from 'react-native-spinkit'
import { Styles, Colors } from '../../Themes'
import Config from 'react-native-config'
import ProgressiveImage from '../Modules/ProgressiveImage'
import { generateUrlPhoto } from '../../Utils'
import Validating from './Validating'
import Api from '../../Services/Api'
import { connect } from 'react-redux'

class ParalaxTabs extends Component {
    constructor(props) {
        super(props)

        this.state = {
            activeIndex: props.activeIndex >= 0 ? props.activeIndex : null
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.activeIndex != prevProps.activeIndex) {
            this.setState({
                activeIndex: this.props.activeIndex
            })
        }
    }

    render () {
        const {data, onChange, isSmallTabs} = this.props
        const {activeIndex} = this.state
        return isSmallTabs ? (
            <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                {data && data.map((dt, index) => {
                    return (
                        <TouchableOpacity 
                            key={index} 
                            onPress={() => {
                                this.setState({
                                    activeIndex: index
                                }, onChange ? onChange(index) : null)
                            }}
                            activeOpacity={1}
                            style={{ 
                                flexDirection: "row", 
                                alignItems: "center", 
                                justifyContent: "center", 
                                borderRadius: 100, 
                                height: 40, 
                                width: 40, 
                                backgroundColor: (activeIndex === index) ? Colors.textPlaceholder : "rgba(255,255,255,0.5)" 
                            }}>
                            <Text 
                                style={{ 
                                    color: (activeIndex === index) ? "#fff" : "#000", 
                                    fontSize: 20 
                                }}>
                                {dt.value}
                            </Text>
                        </TouchableOpacity>
                    )
                })}
            </View>
        ) : (
            <View style={{ 
                flexDirection: "row", 
                justifyContent: "space-between", 
                paddingLeft: 0, 
                paddingRight: 0,
            }}>
                {data && data.map((dt, index) => {
                    return (
                        <TouchableOpacity 
                            key={index} 
                            onPress={() => {
                                this.setState({
                                    activeIndex: index
                                }, onChange ? onChange(index) : null)
                            }}
                            activeOpacity={1}
                            style={{ 
                                flex: 1, 
                                alignItems: "center",
                                backgroundColor: (activeIndex === index) ? Colors.textPlaceholder : Colors.main,
                                paddingTop: 15, 
                                paddingBottom: 18,
                                // borderBottomColor: "#fff",
                                // borderBottomWidth: (activeIndex === index) ? 2 : 0
                            }}>
                            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 40 }}>
                                {dt.value}
                            </Text>
                            <Text style={{ color: "#fff", fontSize: 12 }}>
                                {dt.title}
                            </Text>
                        </TouchableOpacity>
                    )
                })}
            </View>
        )
    }
}

class ParalaxLayout extends Component {
    constructor(props) {
        super(props)

        this.state = {
            startScrolling: false,
            collapse: true,
            activeIndex: 2,
            stats: [
                {
                    title: "Backlogs",
                    value: "0"
                },
                {
                    title: "Finish",
                    value: "0"
                },
                {
                    title: "Outstanding",
                    value: "0"
                },
                {
                    title: "Throughput (%)",
                    value: "0"
                }
            ]
        }
    }

    componentDidMount() {
        this.getData()
    }

    componentDidUpdate(prevProps) {
        if (this.props.rawData !== prevProps.rawData) this.getData()
    }

    getData = async () => {
        let stats = Object.assign([], this.state.stats)
        let res = await Api.create().getCountHumanTaskListByUserID(this.props.auth.user.data.userID)
        let resDone = await Api.create().getCountHumanTaskListDone(this.props.auth.user.data.userID)
        let resOutstanding = await Api.create().getCountHumanTaskListOutstanding(this.props.auth.user.data.userID)
        let resThroughput = await Api.create().getCountHumanTaskListThroughput(this.props.auth.user.data.userID)
        if (res.data && res.data.status === "S") stats[0] = {...stats[0], value: res.data.data }
        if (resDone.data && resDone.data.status === "S") stats[1] = {...stats[1], value: resDone.data.data }
        if (resOutstanding.data && resOutstanding.data.status === "S") stats[2] = {...stats[2], value: resOutstanding.data.data }
        if (resThroughput.data && resThroughput.data.status === "S") stats[3] = {...stats[3], value: resThroughput.data.data == "NaN" ? "0" : Number(resThroughput.data.data).toFixed(1).split(".")[1] == "0" ? Number(resThroughput.data.data) : Number(resThroughput.data.data).toFixed(1) }
        this.setState({ stats })
    }

    loaderComponent = () => {
        return (
            <Spinkit style={{ height: 50 }} isVisible={true} size={50} type="Circle" color={Colors.main} />
        )
    }

    render() {
        const { startScrolling, collapse, stats, activeIndex } = this.state
        const { data, loader, rawData, onMore, onRefresh, onBack, onChangeTabs, card, totalData } = this.props
        const { uID, name, roleName, imageUrl, role, roleID } = data
        const primaryColor = getPrimaryColor(role)

        return (
            <View style={{ flex: 1 }}>
                <ParallaxScrollView
                    refreshControl={<RefreshControl refreshing={false} onRefresh={() => onRefresh()}/>}
                    contentContainerStyle={{ paddingBottom: 0, marginBottom: 0, backgroundColor: "#fff" }}
                    showsVerticalScrollIndicator={false}
                    onScroll={(event) => {
                        const {y} = event.nativeEvent.contentOffset
                        if (y > 0 && !startScrolling) this.setState({startScrolling: true})
                        if (y == 0) this.setState({startScrolling: false})
                    }}
                    backgroundColor={primaryColor}
                    stickyHeaderHeight={!startScrolling ? 1 : STICKY_HEADER_HEIGHT}
                    parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
                    backgroundSpeed={10}

                    renderBackground={() => (
                        <View key="background" style={{ width: window.width, height: PARALLAX_HEADER_HEIGHT, backgroundColor: primaryColor }} />
                    )}

                    renderStickyHeader={() => (
                        <View key="sticky-header" style={[styles.stickySection, { backgroundColor: primaryColor }]}>
                            <View style={{ flex: 0.55, flexDirection: "row" }}>
                                <View style={{ justifyContent: 'center', paddingLeft: 10, paddingRight: 10 }}>
                                    <View style={{ padding: 1, borderRadius: 100, height: 40, width: 40, backgroundColor: Colors.white }}>
                                        {/* <Image source={{ uri: imageUrl }} resizeMode="cover" style={{ borderRadius: 100, width: '100%', height: '100%' }} /> */}
                                        <ProgressiveImage
                                            resizeMode="cover" 
                                            sizeSpinner={20}
                                            style={{ 
                                                borderRadius: 100, 
                                                width: "100%", 
                                                height: "100%",
                                                backgroundColor: Colors.white
                                            }}
                                            source={{
                                                uri: generateUrlPhoto(uID && uID),
                                                headers: {
                                                    'Content-Type': 'application/json',
                                                    'DGI-API-KEY': Config.APP_WMS_AUTH_HEADER_VALUE
                                                    // 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiJ9.5BG9SEVOGo_xRhtT8IkyoSy60kPg8HM9Vpvb0TdNew4'
                                                }
                                            }} />
                                    </View>
                                </View>
                                <View style={{ justifyContent: "center", alignItems: "flex-start", flexWrap: 'wrap' }}>
                                    <Text style={{ textAlign: "right", color: "#fff", fontSize: 16, fontWeight: "bold", fontFamily: "sans-serif-medium", textTransform: "uppercase" }}>{name}</Text>
                                    <Text style={{ textAlign: "right", color: "#fff", fontSize: 12, flexShrink: 1 }}>{roleName}</Text>
                                </View>
                            </View>
                            {/* <View style={{ flex: 0.45, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingRight: 10 }}>
                                {stats && stats.map((data, index) => {
                                    return (
                                        <View key={index} style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", borderRadius: 100, height: 40, width: 40, backgroundColor: "rgba(255,255,255,0.5)" }}>
                                            <Text style={{ color: "#000", fontSize: 20 }}>{data.value}</Text>
                                        </View>
                                    )
                                })}
                            </View> */}
                            <View style={{ flex: 0.45, paddingRight: 10 }}>
                                <ParalaxTabs 
                                    data={stats}
                                    activeIndex={activeIndex}
                                    isSmallTabs={true}
                                    onChange={(data) => {
                                        this.setState({
                                            activeIndex: data
                                        })
                                        onChangeTabs ? onChangeTabs(data) : null
                                    }}
                                />
                            </View>
                        </View>
                    )}

                    renderForeground={() => (
                        <View key="parallax-header" style={[styles.parallaxHeader, { backgroundColor: primaryColor }]}>
                            <View style={{ flex: 1 }}>
                                <View style={{ width: "100%", backgroundColor: primaryColor, alignItems: 'center', padding: 20 }}>
                                    <TouchableOpacity 
                                        onPress={() => onBack()}
                                        style={{ position: 'absolute', left: 0, top: 0, padding: 12, paddingTop: 10, zIndex: 10 }}>
                                        <AntIcon size={24} color="#fff" name="arrowleft" />
                                    </TouchableOpacity>

                                    <View style={{ width: 100, height: 100, borderRadius: 100, backgroundColor: Colors.white, marginBottom: 20, marginTop: 10 }} >
                                        {/* <Image source={{ uri: imageUrl }} resizeMode="cover" style={{ width: "100%", height: "100%", borderRadius: 100 }} /> */}
                                        <ProgressiveImage
                                            resizeMode="cover" 
                                            style={{ 
                                                borderRadius: 100, 
                                                width: "100%", 
                                                height: "100%",
                                                backgroundColor: Colors.white
                                            }}
                                            source={{
                                                uri: generateUrlPhoto(uID && uID),
                                                headers: {
                                                    'Content-Type': 'application/json',
                                                    'DGI-API-KEY': Config.APP_WMS_AUTH_HEADER_VALUE
                                                    // 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiJ9.5BG9SEVOGo_xRhtT8IkyoSy60kPg8HM9Vpvb0TdNew4'
                                                }
                                            }} />
                                    </View>

                                    <View style={{ marginBottom: 10, alignItems: 'center' }}>
                                        <Text style={{ color: "#fff", fontSize: 22, fontWeight: "bold", marginBottom: 5, textTransform: "uppercase" }}>{name}</Text>
                                        <Text style={{ color: "#fff", fontSize: 12 }}>{`${roleName}` + ` - ${uID}`}</Text>
                                    </View>
                                </View>
                                <View style={{ bottom: 0 }}>
                                    <View style={{ width: '100%', backgroundColor: primaryColor }}>
                                        <ParalaxTabs 
                                            data={stats}
                                            activeIndex={activeIndex}
                                            onChange={(data) => {
                                                this.setState({
                                                    activeIndex: data
                                                })
                                                onChangeTabs ? onChangeTabs(data) : null
                                            }}
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>
                    )}
                >
                    {/* header */}
                    <View style={{ flex: 1, padding: 15, paddingTop: 10, paddingBottom: 5, backgroundColor: "#fff", flexDirection: "row", alignItems: 'center', justifyContent: 'space-between' }}>
                        <View style={{ paddingRight: 20, flexDirection: "row", alignItems: "center" }}>
                            <Text style={[Styles.textHeader]}>Available Tickets</Text>
                            <View style={{ backgroundColor: "red", borderWidth: 1, borderColor: "#fff", top: 0, left: 10, height: 20, width: 20, borderRadius: 50, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: "#fff" }}>{rawData ? rawData.length : '0'}</Text>
                            </View>
                        </View>
                        <View style={{ alignSelf: 'flex-end' }}>
                            <TouchableOpacity onPress={() => this.setState({ collapse: !this.state.collapse })}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', alignContent: 'center' }}>
                                    <FaIcon name={!collapse ? "plus" : "minus"} size={12} color="#adadad" />
                                    <Text style={{ fontSize: 12, color: '#999', marginLeft: 10 }}>
                                        {collapse ? "Collapse All" : "Expand All"}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* item */}
                    {(rawData.length > 0) && (
                        <FlatList 
                            data={rawData}
                            renderItem={(rowData, sectionID, rowID) => {
                                return (
                                    <View key={rowData.index}>
                                        { card(rowData, data, rowID, collapse) }
                                        {(!loader) && (rawData.length > 0 && rawData.length == rowData.index + 1) && (rawData.length < totalData) && (
                                            <View style={{ alignItems: "center", justifyContent: "center", marginTop: 5, marginBottom: 15 }}>
                                                <TouchableOpacity 
                                                    onPress={() => onMore()} 
                                                    style={{ borderRadius: 100, backgroundColor: "#eee", justifyContent: "center", padding: 20, width: 80, height: 10 }}>
                                                    <Text style={{ color: "#000", textAlign: "center", fontWeight: "bold", fontSize: 14 }}>More</Text>
                                                </TouchableOpacity>
                                            </View>
                                        )}
                                    </View>
                                )
                            }} />
                    )}

                    {(!loader) && (rawData.length === 0) && (
                        <View style={{paddingTop: 50, paddingBottom: 50}}>
                            <Validating icon={'exclamationcircleo'} title={'TICKET EMPTY'} color={Colors.grey} />
                        </View>
                    )}

                    {/* footer */}
                    {(loader) && (
                        <View style={{ alignItems: "center", justifyContent: "center", marginTop: 5, marginBottom: 15 }}>
                            {this.loaderComponent()}
                        </View>
                    )}
                </ParallaxScrollView>
            </View>
        )
    }
}

const window = Dimensions.get('window')
const PARALLAX_HEADER_HEIGHT = 335
const STICKY_HEADER_HEIGHT = 60

const styles = StyleSheet.create({
    stickySection: {
        height: STICKY_HEADER_HEIGHT,
        width: window.width,
        padding: 0,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    parallaxHeader: {
        flex: 1
    }
})

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, null)(ParalaxLayout)