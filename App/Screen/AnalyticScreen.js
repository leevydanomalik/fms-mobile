import React from 'react'
import { StyleSheet, ScrollView, View, TouchableOpacity, Text, Image, Dimensions, FlatList, Alert } from 'react-native'
import FaIcon from 'react-native-vector-icons/FontAwesome'
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon from 'react-native-vector-icons/AntDesign'
import { ProgressCircle, BarChart, StackedBarChart } from 'react-native-svg-charts'
import { ChartGauge, ProgressiveImage } from './Modules'
import { Colors } from '../Themes'
import { FloatingAction } from 'react-native-floating-action'
import Modal from "react-native-modalbox";
import CardClaimList from './Modules/CardClaimList'
import R from 'ramda'
import NavbarMenu from './Components/NavbarMenu'
import Api from '../Services/Api'
import M from 'moment'
import { connect } from 'react-redux'
import { generateUrlPhoto } from '../Utils'
import BottombarMenu from './Components/BottombarMenu'

const mainColor = '#fff'
const { width, height } = Dimensions.get('window')

class AnalyticScreen extends React.Component {
    constructor(props) {
        super(props)
        const { params } = props.navigation.state

        this.state = {
            isGrid: false,
            viewOptions: false,
            data: params,
            plantID: props.auth.user && props.auth.user.data.esCommonDTO && props.auth.user.data.esCommonDTO.plant.plantID ? props.auth.user.data.esCommonDTO.plant.plantID : "",
            chartData: [
                {
                    type: "Perfect Order Rate",
                    charts: [
                        {
                            type: "progress",
                            label: "Current Period",
                            value: 0
                        },
                        {
                            type: "progress",
                            label: "Prior Period",
                            value: 0
                        }
                    ]
                },
                {
                    type: "Not Good Rate",
                    charts: [
                        {
                            type: "progress",
                            label: "Current Period",
                            value: 0
                        },
                        {
                            type: "progress",
                            label: "Prior Period",
                            value: 0
                        }
                    ]
                },
                {
                    type: "Stock Accuracy",
                    charts: [
                        {
                            type: "progress",
                            label: "Current Period",
                            value: 0
                        },
                        {
                            type: "progress",
                            label: "Prior Period",
                            value: 0
                        }
                    ]
                },
                {
                    type: "FIFO",
                    charts: [
                        {
                            type: "progress",
                            label: "Current Period",
                            value: 0
                        },
                        {
                            type: "progress",
                            label: "Prior Period",
                            value: 0
                        }
                    ]
                },
                {
                    type: "IT Infrastructure",
                    description: "Infrastructure is the area of the organization that supports, through technology, all systems used by different areas of the company",
                    firstFooter: "Mean Time between Failures (MTBF)",
                    secondFooter: "Mean Time to Repair (MTTR)",
                    charts: [
                        {
                            type: "progress",
                            label: "Current Period",
                            value: 0
                        },
                        {
                            type: "progress",
                            label: "Prior Period",
                            value: 0
                        }
                    ]
                }
            ],
            chartDataNotFloat: [
                {
                    type: "Claim",
                    description: "A claim and delivery is a legal action to recover personal property which is in the possession of another party",
                    charts: [
                        {
                            type: "progress",
                            label: "Current Period",
                            value: 0
                        },
                        {
                            type: "progress",
                            label: "Prior Period",
                            value: 0
                        }
                    ]
                },
                {
                    type: "PO/PR",
                    description: "This vehicle must stop the engine while parking and please securing surrounding and confirm to loading master",
                    charts: [
                        {
                            type: "progress",
                            label: "Current Period",
                            value: 0
                        },
                        {
                            type: "progress",
                            label: "Prior Period",
                            value: 0
                        }
                    ]
                },
                {
                    type: "GR/PR",
                    charts: [
                        {
                            type: "progress",
                            label: "Current Period",
                            value: 0
                        },
                        {
                            type: "progress",
                            label: "Prior Period",
                            value: 0
                        }
                    ]
                },
                {
                    type: "PDT",
                    charts: [
                        {
                            type: "progress",
                            label: "Current Period",
                            value: 0
                        },
                        {
                            type: "progress",
                            label: "Prior Period",
                            value: 0
                        }
                    ]
                }
            ],
            chartDataGrid: [
                {
                    type: "progress",
                    label: "Perfect Order Rate (POR)",
                    value: 0,
                    anotherPercentile: 15,
                },
                {
                    type: "progress",
                    label: "Not Good Rate (NGR)",
                    value: 0,
                    anotherPercentile: 15,
                },
                {
                    type: "bar",
                    label: "Ratio of PO againts PR",
                    overviewValue: 426,
                    percentile: 13,
                    anotherPercentile: 15,
                    value: [
                        {
                            active: 60,
                            inactive: 40,
                        },
                        {
                            active: 70,
                            inactive: 30,
                        },
                        {
                            active: 50,
                            inactive: 50,
                        },
                        {
                            active: 40,
                            inactive: 60,
                        },
                        {
                            active: 70,
                            inactive: 30,
                        },
                        {
                            active: 50,
                            inactive: 50,
                        },
                        {
                            active: 40,
                            inactive: 60,
                        },
                        {
                            active: 60,
                            inactive: 40,
                        },
                        {
                            active: 70,
                            inactive: 30,
                        },
                        {
                            active: 50,
                            inactive: 50,
                        },
                        {
                            active: 40,
                            inactive: 60,
                        },
                        {
                            active: 70,
                            inactive: 30,
                        },
                        {
                            active: 50,
                            inactive: 50,
                        },
                        {
                            active: 40,
                            inactive: 60,
                        }
                    ]
                },
                {
                    type: "progress",
                    label: "Stock Accuracy (SA)",
                    value: 0,
                    anotherPercentile: 15,
                },
                {
                    type: "progress",
                    label: "PDT",
                    value: 0,
                    anotherPercentile: 15,
                },
                {
                    type: "bar",
                    label: "Ratio of GR againts PR",
                    overviewValue: 426,
                    percentile: 13,
                    anotherPercentile: 15,
                    value: [
                        {
                            active: 60,
                            inactive: 40,
                        },
                        {
                            active: 70,
                            inactive: 30,
                        },
                        {
                            active: 50,
                            inactive: 50,
                        },
                        {
                            active: 40,
                            inactive: 60,
                        },
                        {
                            active: 70,
                            inactive: 30,
                        },
                        {
                            active: 50,
                            inactive: 50,
                        },
                        {
                            active: 40,
                            inactive: 60,
                        },
                        {
                            active: 60,
                            inactive: 40,
                        },
                        {
                            active: 70,
                            inactive: 30,
                        },
                        {
                            active: 50,
                            inactive: 50,
                        },
                        {
                            active: 40,
                            inactive: 60,
                        },
                        {
                            active: 70,
                            inactive: 30,
                        },
                        {
                            active: 50,
                            inactive: 50,
                        },
                        {
                            active: 40,
                            inactive: 60,
                        }
                    ]
                }
            ],
            topics: [
                {
                    label: "ALL",
                    status: "active",
                    plantID: props.auth.user && props.auth.user.data.esCommonDTO && props.auth.user.data.esCommonDTO.plant.plantID
                },
                {
                    label: "L201",
                    status: "inactive",
                    plantID: "1593967251909"
                },
                {
                    label: "L301",
                    status: "inactive",
                    plantID: "1593967227023"
                },
                {
                    label: "R2 BAHARI",
                    status: "inactive",
                    plantID: "1599127371987"
                },
                {
                    label: "LP01 PUJ",
                    status: "inactive",
                    plantID: "1593967126586"
                }
            ]
        }
    }

    componentDidMount() {
        // console.log(chartDataGrid)
        // this.start = setInterval(() => {
        //     chartDataGrid = chartDataGrid.map(data => {
        //         let anotherPercentile = Math.floor(Math.random() * 100) + 1
        //         if (data.type == "bar") {
        //             let value = data.value.map(dataa => {
        //                 let active = Math.floor(Math.random() * 100) + 1
        //                 return {
        //                     active,
        //                     inactive: 100 - active
        //                 }
        //             })
        //             let overviewValue = Math.floor(Math.random() * 1000) + 1
        //             let percentile = Math.random() < 0.5 ? Math.floor(Math.random() * 100) + 1 : Math.floor(Math.random() * -100) + 1
        //             return { ...data, value, overviewValue, percentile, anotherPercentile }
        //         }
        //         return {
        //             ...data,
        //             value: Math.floor(Math.random() * 100) + 1,
        //             anotherPercentile
        //         }
        //     })

        //     chartData = chartData.map(data => {
        //         let charts = data.charts.map(dataa => {
        //             if (dataa.type == "bar") {
        //                 let value = dataa.value.map(dataaa => {
        //                     let active = Math.floor(Math.random() * 100) + 1
        //                     return {
        //                         active,
        //                         inactive: 100 - active
        //                     }
        //                 })
        //                 let overviewValue = Math.floor(Math.random() * 1000) + 1
        //                 let percentile = Math.random() < 0.5 ? Math.floor(Math.random() * 100) + 1 : Math.floor(Math.random() * -100) + 1
        //                 return { ...dataa, value, overviewValue, percentile }
        //             }
        //             return {
        //                 ...dataa,
        //                 value: Math.floor(Math.random() * 100) + 1
        //             }
        //         })

        //         return {
        //             ...data,
        //             charts
        //         }
        //     })

        //     this.setState({ chartDataGrid, chartData })
        // }, 2000)
        this.getData(this.state.plantID)
    }

    getData = async (plant) => {
        let { chartData, chartDataGrid, chartDataNotFloat } = this.state
        const period = M().format('DD-MM-YYYY')
        const payload = { period, plant }
        let res = await Api.create().getDashboardKpi(payload)
        console.log("getdata plant ==> ", plant)
        if (res.data && res.data.status === "S") {
            let { grpr, popr, sa, fifo, ngr, por, pdt } = res.data.data
            chartData = [
                {
                    type: "Perfect Order Rate",
                    description: "The Perfect Order Rate KPI measures how many orders you ship without incident, where incidents are damaged goods, inaccurate orders or late shipments",
                    charts: [
                        { ...chartData[0].charts[0], value: por },
                        { ...chartData[0].charts[1], value: por }
                    ]
                },
                {
                    type: "Not Good Rate",
                    description: "The Not Good Order Rate KPI measures how many orders you ship without incident, where incidents are damaged goods, inaccurate orders or late shipments",
                    charts: [
                        { ...chartData[1].charts[0], value: ngr },
                        { ...chartData[1].charts[1], value: ngr }
                    ]
                },
                {
                    type: "Stock Accuracy",
                    description: "Inventory accuracy refers to any disparity that exists between your business’s electronic records reflecting your inventory and your actual inventory",
                    charts: [
                        { ...chartData[2].charts[0], value: sa },
                        { ...chartData[2].charts[1], value: sa }
                    ]
                },
                {
                    type: "FIFO",
                    description: "FIFO assumes that assets with the oldest costs are included in the income statement’s cost of goods sold (COGS)",
                    charts: [
                        { ...chartData[3].charts[0], value: fifo },
                        { ...chartData[3].charts[1], value: fifo }
                    ]
                },
                { ...chartData[4] }
            ]
            chartDataNotFloat = [
                { ...chartDataNotFloat[0] },
                {
                    type: "PO/PR",
                    description: "A ratio indicates throughput of Purchase Order Creation respect to allocated Purchase Requisition. Bigger number of this variable better the result for the business",
                    charts: [
                        { ...chartDataNotFloat[1].charts[0], value: popr },
                        { ...chartDataNotFloat[1].charts[1], value: popr }
                    ]
                },
                {
                    type: "GR/PR",
                    description: "A ratio indicates throughput of Good Receipt creationrespect to allocated Purchase Requisition. Bigger number of this variable better the result for the business",
                    charts: [
                        { ...chartDataNotFloat[2].charts[0], value: grpr },
                        { ...chartDataNotFloat[2].charts[1], value: grpr }
                    ]
                },
                {
                    type: "PDT",
                    description: "This number indicates how often on planned delivery time achieved. Bigger number of this variable better the result for the business",
                    charts: [
                        { ...chartDataNotFloat[3].charts[0], value: pdt },
                        { ...chartDataNotFloat[3].charts[1], value: pdt }
                    ]
                }
            ]
            chartDataGrid = [
                { ...chartDataGrid[0], value: por.toFixed(2) },
                { ...chartDataGrid[1], value: ngr.toFixed(2) },
                { ...chartDataGrid[2], overviewValue: popr.toFixed(2) },
                { ...chartDataGrid[3], value: sa.toFixed(2) },
                { ...chartDataGrid[4], value: pdt.toFixed(2) },
                { ...chartDataGrid[5], overviewValue: grpr.toFixed(2) }
            ]
            this.setState({ chartDataNotFloat, chartData, chartDataGrid, dataDashboard: res.data.data })
        }
    }

    componentWillUnmount() {
        clearInterval(this.start)
    }

    makeItem = (item, index) => {
        const { type, charts, description, firstFooter, secondFooter } = item

        const colors = ['#2B9133', '#ccc']
        const keys = ['active', 'inactive']

        return (
            <View key={index} style={{ backgroundColor: "#fff", marginBottom: 10 }}>
                <View style={{ padding: 5, right: 5, top: 10, position: 'absolute', flexDirection: "row" }}>
                    <MatIcon name={"progress-clock"} size={18} color={Colors.lightGrey} />
                    <Text style={{ fontSize: 12, color: Colors.lightGrey }}> 1s ago </Text>
                </View>
                <View style={{ padding: 20, flexDirection: "row" }}>
                    <View style={{ height: 60, width: 60, borderRadius: 100 }} >
                        <ProgressiveImage
                            resizeMode="cover"
                            style={{
                                borderRadius: 100,
                                width: "100%",
                                height: "100%",
                                backgroundColor: Colors.whiteGrey
                            }}
                            sizeSpinner={20}
                            source={{
                                uri: generateUrlPhoto(this.props.auth.user && this.props.auth.user.data.userID),
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiJ9.5BG9SEVOGo_xRhtT8IkyoSy60kPg8HM9Vpvb0TdNew4'
                                }
                            }} />
                    </View>

                    <View style={{ justifyContent: 'center', flex: 1, marginLeft: 20 }}>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={{ color: Colors.black, fontSize: 16, fontWeight: "bold" }}>{this.props.auth.user && this.props.auth.user.data.userID ? this.props.auth.user.data.userName : ""}</Text>
                        </View>
                        <Text style={{ color: Colors.black, fontSize: 14 }}>{this.props.auth.user && this.props.auth.user.data.esCommonDTO ? this.props.auth.user.data.esCommonDTO.plant.plantName : ""}</Text>
                        <Text style={{ fontSize: 12 }}>Period# 15 Jan 2020 - 15 Feb 2020 (+15 days)</Text>
                    </View>
                </View>

                <View style={{ paddingLeft: 20, borderLeftWidth: 10, borderLeftColor: "#8BC34A", paddingBottom: 10 }}>
                    <View style={{ flex: 1, flexDirection: "row", alignItems: "center", paddingRight: 15 }}>
                        <View style={{ flex: 1, flexDirection: "row" }}>
                            <Text style={{ fontSize: 18, fontWeight: "bold", color: Colors.black }}>{type}</Text>
                            <TouchableOpacity style={{ paddingTop: 2, paddingBottom: 2, marginLeft: 10, borderRadius: 2, alignItems: 'center', width: 95, backgroundColor: "#00b1dd", alignSelf: "center" }}>
                                <Text style={{ color: "#fff", fontSize: 10 }}>Explore History</Text>
                            </TouchableOpacity>
                        </View>
                        {type === "Claim" && (
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('AnalyticListScreen', { data: { role: "CLAIMHISTORY" } })}>
                                <Text style={{ color: Colors.lightGrey, fontSize: 10 }}>+ Show All</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    <Text style={{ fontSize: 14, marginTop: 10, color: Colors.black }}>{description}</Text>
                </View>
                <FlatList
                    keyExtractor={(item, index) => index.toString()}
                    data={charts}
                    // ref={(ref) => { this.flatListRef = ref; }}
                    numColumns={2}
                    contentContainerStyle={{ padding: 10 }}
                    renderItem={({ item }) => {
                        return (
                            <View style={{ flex: 1, paddingTop: 10, paddingBottom: 10, alignItems: 'center' }}>
                                {item.type == "progress" && (
                                    <View style={{ height: 120, width: 120, justifyContent: 'center', alignItems: 'center' }} >
                                        <ProgressCircle style={{ width: "90%", height: "90%" }} progress={item.value / 100} progressColor={'#2B9133'} cornerRadius={0} strokeWidth={15} />
                                        <View style={{ paddingTop: 5, position: "absolute", width: "90%", height: "90%", justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ color: "#4b4b4b", fontSize: 20, fontWeight: "bold" }}>{item.value.toFixed(2)}</Text>
                                            <Text style={{ fontSize: 10, color: "#ccc", paddingBottom: 10 }}>Liters/LOBS</Text>
                                        </View>
                                    </View>
                                )}
                                {item.type == "bar" && (
                                    <View style={{ height: 120, width: "100%", justifyContent: 'center', alignItems: 'center' }} >
                                        <StackedBarChart
                                            style={{ height: "100%", width: "60%" }}
                                            keys={keys}
                                            colors={colors}
                                            data={item.value}
                                            showGrid={false}
                                            contentInset={{ top: 10, bottom: 10, left: 10, right: 10 }}
                                        />
                                    </View>
                                )}
                                {item.type == "gauge" && (
                                    <View style={{ height: 100, width: "100%", justifyContent: 'center', alignItems: 'center', paddingTop: 20 }} >
                                        <ChartGauge size={150} currentValue={item.value} needleSharp={true} />
                                    </View>
                                )}

                                <View style={{ alignItems: 'center', width: '100%' }}>
                                    {item.type == "gauge" && <Text style={{ color: "#4b4b4b", fontSize: 22, fontWeight: "bold", paddingTop: 5 }}>{item.value}</Text>}
                                    {item.type == "gauge" && <Text style={{ fontSize: 12, color: "#ccc", paddingBottom: 10 }}>Unique Hits</Text>}
                                    {item.type == "bar" && (
                                        <View style={{ width: '55%', marginBottom: 15 }}>
                                            <View style={{ marginBottom: 5, paddingBottom: 5, borderBottomWidth: 1, borderColor: "#ccc" }}>
                                                <Text style={{ fontSize: 10, textAlign: "left" }}>OVERVIEW</Text>
                                            </View>
                                            <View style={{ justifyContent: "center" }}>
                                                <Text style={{ color: "#4b4b4b", fontSize: 24, fontFamily: "sans-serif-medium" }}>{item.overviewValue}</Text>
                                                <View style={{ flexDirection: "row", position: "absolute", right: 0, backgroundColor: item.percentile > 0 ? "rgba(0,255,0,0.2)" : "rgba(255,0,0,0.2)", padding: 2, paddingLeft: 5, paddingRight: 5 }}>
                                                    <FaIcon name={item.percentile > 0 ? "angle-up" : "angle-down"} size={20} color={item.percentile > 0 ? "green" : "red"} />
                                                    <Text style={{ color: item.percentile > 0 ? "green" : "red", fontSize: 14, paddingLeft: 3 }}>{Math.abs(item.percentile) + '%'}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    )}
                                    <Text style={{ fontSize: 14, fontWeight: "bold", color: Colors.black }}>{item.label}</Text>
                                </View>
                            </View>
                        )
                    }}
                />
                <View style={{ justifyContent: "center", alignItems: "center", alignContent: "center", marginTop: -38 }}>
                    <View style={{ flexDirection: "row", marginBottom: 30, borderRadius: 10, paddingTop: 2, paddingBottom: 2, borderWidth: 1, borderColor: "#CCC", width: "15%" }}>
                        <MatIcon name={"triangle-outline"} size={12} color={Colors.lightGrey} style={{ textAlign: "center", marginLeft: 10 }} />
                        <Text style={{ fontSize: 10, textAlign: "center", color: Colors.lightGrey }}>+15%</Text>
                    </View>
                </View>
                <View style={{ alignItems: "center" }}>
                    {firstFooter && <Text style={{ fontSize: 14, color: Colors.lightGrey }}>{firstFooter}</Text>}
                    {secondFooter && <Text style={{ fontSize: 14, color: Colors.lightGrey, marginBottom: 20 }}>{secondFooter}</Text>}
                </View>
            </View>
        )
    }

    renderGrid = () => {
        const { chartDataGrid } = this.state
        const colors = ['#2B9133', '#fff']
        const keys = ['active', 'inactive']
        const data = [
            {
                active: 60,
                inactive: 40,
            },
            {
                active: 70,
                inactive: 30,
            },
            {
                active: 50,
                inactive: 50,
            },
            {
                active: 40,
                inactive: 60,
            },
            {
                active: 70,
                inactive: 30,
            },
            {
                active: 50,
                inactive: 50,
            },
            {
                active: 40,
                inactive: 60,
            },
            {
                active: 60,
                inactive: 40,
            },
            {
                active: 70,
                inactive: 30,
            },
            {
                active: 50,
                inactive: 50,
            },
            {
                active: 40,
                inactive: 60,
            },
            {
                active: 70,
                inactive: 30,
            },
            {
                active: 50,
                inactive: 50,
            },
            {
                active: 40,
                inactive: 60,
            }
        ]

        return (
            <View style={{ backgroundColor: "#fff" }}>
                <View style={{ backgroundColor: "#fff" }}>
                    <View style={{ padding: 20, flexDirection: "row" }}>
                        <View style={{ height: 60, width: 60, borderRadius: 100 }} >
                            <ProgressiveImage
                                resizeMode="cover"
                                style={{
                                    borderRadius: 100,
                                    width: "100%",
                                    height: "100%",
                                    backgroundColor: Colors.whiteGrey
                                }}
                                sizeSpinner={20}
                                source={{
                                    uri: generateUrlPhoto(this.props.auth.user && this.props.auth.user.data.userID),
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiJ9.5BG9SEVOGo_xRhtT8IkyoSy60kPg8HM9Vpvb0TdNew4'
                                    }
                                }} />
                        </View>

                        <View style={{ justifyContent: 'center', flex: 1, marginLeft: 20 }}>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={{ color: Colors.black, fontSize: 16, fontWeight: "bold" }}>{this.props.auth.user && this.props.auth.user.data.userID ? this.props.auth.user.data.userName : ""}</Text>
                            </View>
                            <Text style={{ color: Colors.black, fontSize: 14 }}>{this.props.auth.user && this.props.auth.user.data.esCommonDTO ? this.props.auth.user.data.esCommonDTO.plant.plantName : ""}</Text>
                            <Text style={{ fontSize: 10 }}>Period# {M().format('DD-MMMM-YYYY')}</Text>
                        </View>
                    </View>

                    <View style={{ paddingLeft: 15, paddingRight: 15, paddingBottom: 10 }}>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={{ fontSize: 24, fontWeight: "bold", color: Colors.black }}>All KPIs</Text>
                            <TouchableOpacity style={{ paddingTop: 2, paddingBottom: 2, marginLeft: 10, borderRadius: 2, alignItems: 'center', width: 100, backgroundColor: "#00b1dd", alignSelf: "center" }}>
                                <Text style={{ color: "#fff", fontSize: 10 }}>Explore History</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={{ fontSize: 14, marginTop: 10 }}>List all KPIs represent operational progress of work</Text>
                    </View>
                </View>

                <FlatList
                    keyExtractor={(item, index) => index.toString()}
                    data={chartDataGrid}
                    numColumns={2}
                    contentContainerStyle={{ padding: 10 }}
                    renderItem={({ item }) => {
                        return (
                            <View style={{ padding: 5, flex: 1 }}>
                                <View style={{ elevation: 3, flex: 1, height: 180, borderRadius: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: "#fff" }}>
                                    <View style={{ position: "absolute", right: 10, top: 10, flexDirection: "row", alignItems: 'center' }}>
                                        <Text style={{ fontSize: 10 }}>{'+' + item.anotherPercentile + '%'}</Text>
                                    </View>
                                    {item.type == "progress" && (
                                        <View style={{ height: 120, width: 120, justifyContent: 'center', alignItems: 'center' }} >
                                            <ProgressCircle style={{ width: "90%", height: "90%" }} progress={item.value / 100} progressColor={'#2B9133'} cornerRadius={0} strokeWidth={15} />
                                            <View style={{ paddingTop: 5, position: "absolute", width: "90%", height: "90%", justifyContent: 'center', alignItems: 'center' }}>
                                                <Text style={{ color: "#4b4b4b", fontSize: 20, fontWeight: "bold" }}>{item.value}</Text>
                                                <Text style={{ fontSize: 10, color: "#ccc", paddingBottom: 10 }}>Unique Hits</Text>
                                            </View>
                                        </View>
                                    )}
                                    {item.type == "bar" && (
                                        <View style={{ height: 60, width: "100%", alignItems: 'center', position: "absolute", top: 20 }} >
                                            <StackedBarChart
                                                style={{ height: "100%", width: "80%" }}
                                                keys={keys}
                                                colors={colors}
                                                data={item.value}
                                                showGrid={false}
                                                contentInset={{ top: 10, bottom: 10, left: 10, right: 10 }}
                                            />
                                        </View>
                                    )}

                                    {item.type == "gauge" && (
                                        <View style={{ position: "absolute", top: 20, height: 90, width: "100%", justifyContent: 'flex-end', alignItems: 'center' }} >
                                            <ChartGauge size={130} currentValue={item.value} needleSharp={true} />
                                        </View>
                                    )}

                                    <View style={{ alignItems: 'center', bottom: 10, position: "absolute" }}>
                                        {item.type == "gauge" && <Text style={{ color: "#4b4b4b", fontSize: 22, fontWeight: "bold", paddingTop: 5 }}>{item.value}</Text>}
                                        {item.type == "gauge" && <Text style={{ fontSize: 12, color: "#ccc", paddingBottom: 10 }}>Unique Hits</Text>}
                                        {item.type == "bar" && (
                                            <View style={{ width: '100%' }}>
                                                <View style={{ marginBottom: 5, paddingBottom: 5, borderBottomWidth: 1, borderColor: "#ccc" }}>
                                                    <Text style={{ fontSize: 10, textAlign: "left" }}>OVERVIEW</Text>
                                                </View>
                                                <View style={{ justifyContent: "center" }}>
                                                    <Text style={{ color: "#4b4b4b", fontSize: 24, fontFamily: "sans-serif-medium" }}>{item.overviewValue}</Text>
                                                    <View style={{ flexDirection: "row", position: "absolute", right: 0, backgroundColor: item.percentile > 0 ? "rgba(0,255,0,0.2)" : "rgba(255,0,0,0.2)", padding: 2, paddingLeft: 5, paddingRight: 5 }}>
                                                        <FaIcon name={item.percentile > 0 ? "angle-up" : "angle-down"} size={20} color={item.percentile > 0 ? "green" : "red"} />
                                                        <Text style={{ color: item.percentile > 0 ? "green" : "red", fontSize: 14, paddingLeft: 3 }}>{Math.abs(item.percentile) + '%'}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        )}
                                        <Text style={{ color: Colors.black }}>{item.label}</Text>
                                    </View>
                                </View>
                            </View>
                        )
                    }}
                />
            </View>
        )
    }

    getModal() {
        return (
            <Modal
                entry="bottom"
                backdropPressToClose={true}
                isOpen={this.state.viewOptions}
                style={styles.modalBox}
                onClosed={() => this.setState({ viewOptions: false })}>
                <View style={styles.content}>
                    <Text style={styles.textHeadStyle}> Select DSP</Text>
                    <TouchableOpacity>
                        <Text style={styles.textStyle}> L201 - Kertapati Plumpang </Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.textStyle}> L201 - Kertapati Plumpang</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.textStyle}> L201 - Kertapati Plumpang</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.textStyle}> L201 - Kertapati Plumpang</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.textStyle}> L201 - Kertapati Plumpang</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        )
    }

    handleTab(data, index) {
        let topics = Object.assign([], this.state.topics)
        let isActive = R.findIndex(R.propEq("status", "active"))(topics)
        topics[isActive].status = "inactive"
        topics[index].status = "active"
        this.getData(topics[index].plantID)
        this.setState({ topics })
    }

    render() {
        const { isGrid, chartData, chartDataNotFloat, viewOptions, topics } = this.state
        return (
            <View style={{ flex: 1 }}>
                <View>
                    <NavbarMenu
                        onBack={() => this.props.navigation.goBack()}
                        title={'Patralogistik Analytic'}
                    />
                    <View style={{ position: "absolute", right: 2, top: 1, flexDirection: "row" }}>
                        <TouchableOpacity onPress={() => this.setState({ isGrid: !isGrid })} style={{ padding: 10 }}>
                            <FaIcon size={22} color="#fff" name={isGrid ? "th-list" : "th-large"} />
                        </TouchableOpacity>
                    </View>
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ padding: 10, backgroundColor: "#fff" }}>
                    {topics.map((data, index) => {
                        return (
                            <TouchableOpacity onPress={() => this.handleTab(data, index)} key={index} style={{ width: 110, backgroundColor: data.status === "active" ? "#2B9133" : "#fff", borderWidth: 1, borderColor: data.status === "active" ? "#2B9133" : "#ccc", paddingLeft: 15, paddingRight: 15, paddingBottom: 5, paddingTop: 5, borderRadius: 100, marginRight: index + 1 == topics.length ? 0 : 10, alignContent: "center", alignItems: "center", justifyContent: "center" }}>
                                <Text style={{ color: data.status === "active" ? "#fff" : "#555", fontSize: 12, textAlign: "center", padding: 5 }}>{data.label}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </ScrollView>

                <ScrollView ref='_scrollView' style={{ paddingTop: 10 }}>
                    {!isGrid && chartData.map((data, index) => this.makeItem(data, index))}
                    {!isGrid && chartDataNotFloat.map((datas, index) => this.makeItem(datas, index))}

                    {isGrid && this.renderGrid()}
                </ScrollView>

                <FloatingAction
                    color={Colors.main}
                    actions={actions}
                    style={{ marginBottom: 20 }}
                    onPressItem={(name) => {
                        this.refs._scrollView.scrollTo((400 * name))
                        console.log(`selected button: ${name}`)
                    }}
                />

                {/* <View>
                    <BottombarMenu 
                        menu={navButtons} 
                        onChange={(data, index) => {
                            this.props.navigation.navigate('MainScreen', {data: data.label, index})
                        }} />
                </View> */}
            </View>
        )
    }
}

const pst = 410

const actions = [
    {
        name: 0,
        text: "Perfect Order Rate",
        icon: require("../assets/circle-shape-outline.png"),
        // name: "bt_por",
        color: Colors.main
    },
    {
        name: 1,
        text: "Not Good Rate",
        icon: require("../assets/circle-shape-outline.png"),
        // name: "bt_ngr",
        color: Colors.main
    },
    {
        name: 2,
        text: "Stock Accuracy",
        icon: require("../assets/circle-shape-outline.png"),
        // name: "bt_sa",
        color: Colors.main
    },
    {
        name: 3,
        text: "FIFO",
        icon: require("../assets/circle-shape-outline.png"),
        // name: "bt_fifo",
        color: Colors.main
    },
    {
        name: 4,
        text: "IT Infrastucture",
        icon: require("../assets/circle-shape-outline.png"),
        // name: "bt_it",
        color: Colors.main
    },
    {
        name: 5,
        text: "Claim",
        icon: require("../assets/circle-shape-outline.png"),
        // name: "bt_claim",
        color: Colors.main
    },
    {
        name: 6,
        text: "PO/PR",
        icon: require("../assets/circle-shape-outline.png"),
        // name: "bt_popr",
        color: Colors.main
    },
    {
        name: 7,
        text: "GR/PR",
        icon: require("../assets/circle-shape-outline.png"),
        // name: "bt_grpr",
        color: Colors.main
    },
    {
        name: 8,
        text: "PDT",
        icon: require("../assets/circle-shape-outline.png"),
        // name: "bt_pdt",
        color: Colors.main
    }
]

const navButtons = [
    {
        label: "Home",
        icon: "home",
        notif: 4,
        size: 28
    },
    {
        label: "Notification",
        icon: "bells",
        notif: 0,
        size: 24
    },
    {
        label: "Profile",
        icon: "user",
        notif: 1,
        size: 24
    }
]

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        alignItems: "center",
        justifyContent: "center"
    },
    modalBox: {
        overflow: "hidden",
        alignItems: "center",
        justifyContent: "center",
        height,
        width,
        backgroundColor: "transparent"
    },
    content: {
        padding: 20,
        position: "absolute",
        bottom: 0,
        width: "80%",
        height: 300,
        borderTopLeftRadius: 20,
        //   justifyContent: "center",
        //   alignItems: "center",
        borderTopRightRadius: 20,
        backgroundColor: "#2B9133"
    },
    textHeadStyle: {
        color: "#fff",
        fontSize: 16,
        textAlign: "left",
        fontWeight: "bold"
    },
    textStyle: {
        paddingTop: 10,
        color: "#fff",
        fontSize: 16,
        textAlign: "left"
    }
});

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, null)(AnalyticScreen)