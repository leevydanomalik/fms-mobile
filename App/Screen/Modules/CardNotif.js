import React from 'react'
import { View, TouchableOpacity, Text, Image, ScrollView } from 'react-native'
import FaIcon from 'react-native-vector-icons/FontAwesome'
import AntIcon from 'react-native-vector-icons/AntDesign'
import { Colors } from '../../Themes'
import Api from '../../Services/Api'
import M from 'moment'
import Spinkit from 'react-native-spinkit'
import * as R from 'ramda'
import NavbarMenu from '../Components/NavbarMenu'
import { connect } from 'react-redux'
import Config from 'react-native-config'
import ProgressiveImage from './ProgressiveImage'
import { generateUrlPhoto } from '../../Utils'

class CardNotif extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: this.props.auth.user,
            collapseAll: false,
            fetching: false,
            dataTaskList: [],
            limit: 5,
            offset: 0,
            totalData: 0,
            notifData: [
                {
                    title: "Leave Manager",
                    subtitle: "22 Minute ago - Deddy - Loan",
                    status: "WAITING FOR APPROVAL",
                    widthLabel: 120,
                    rightLabel: -120,
                    color: "orange",
                    collapse: false
                },
                {
                    title: "Business Trip Manager",
                    subtitle: "22 Minute ago - Deddy - Loan",
                    status: "REJECTED",
                    widthLabel: 80,
                    rightLabel: -80,
                    color: "red",
                    collapse: false
                },
                {
                    title: "Training Manager",
                    subtitle: "22 Minute ago - Deddy - Loan",
                    status: "APPROVED",
                    widthLabel: 80,
                    rightLabel: -80,
                    color: Colors.mainPlaceholder,
                    collapse: false
                }
            ],
            notifDatas: [
                {
                    title: "Leave Manager",
                    subtitle: "22 Minute ago - Deddy - Loan",
                    status: "WAITING FOR APPROVAL",
                    widthLabel: 120,
                    rightLabel: -120,
                    color: "orange",
                    collapse: false
                },
                {
                    title: "Business Trip Manager",
                    subtitle: "22 Minute ago - Deddy - Loan",
                    status: "REJECTED",
                    widthLabel: 80,
                    rightLabel: -80,
                    color: "red",
                    collapse: false
                },
                {
                    title: "Training Manager",
                    subtitle: "22 Minute ago - Deddy - Loan",
                    status: "APPROVED",
                    widthLabel: 80,
                    rightLabel: -80,
                    color: Colors.mainPlaceholder,
                    collapse: false
                }
            ]
        }
    }

    componentDidMount() {
        this.getDataTaskList(this.state.limit, this.state.offset)
    }

    getDataTaskList = async (limit, offset) => {
        this.setState({ fetching: true })
        console.log("tasklist", this.props.roleType, limit, offset)
        let dataTaskList = Object.assign([], this.state.dataTaskList)
        let rawData = Object.assign([], this.state.rawData)
        let payload = {
            limit: limit,
            offset: offset,
            params: {
                humanTaskType: "",
                assignment: this.props.auth.user.data.userID,
                status: ""
            }
        }
        if (R.isNil(this.props.roleType) || R.isEmpty(this.props.roleType)) {
            let count = await Api.create().getCountHumanTaskListByAssignmentID(payload)
            if (count.data && count.data.status === "S") this.setState({ totalData: count.data.data })
        } else {
            let response = await Api.create().getCountHumanTaskListByType(this.props.roleType)
            if (response.data && response.data.status === "S") this.setState({ totalData: response.data.data })
        }
        let res = await Api.create().getHumanTaskListByAssignementID(payload)
        if (res.data && res.data.status === "S") {
            res.data.data.map(item => {
                const { taskStatus, assignment, humanTaskType, humanTaskID, baseCreational, orderBy } = item
                dataTaskList.push({
                    title: humanTaskType.split("_")[2],
                    subtitle: `${M(baseCreational.createdDate, "DD-MM-YYYY HH:mm:ss").format("DD-MM-YYYY")} - ${humanTaskID} - ${orderBy && orderBy.userName}`,
                    status: taskStatus,
                    assignment: assignment,
                    widthLabel: 80,
                    rightLabel: -80,
                    color: "orange",
                    collapse: false
                })
                return null
            })
            rawData.push(...res.data.data)
            this.setState({ dataTaskList, rawData, fetching: false, limit, offset })
        }
    }

    handleCollapse = (index, type) => {
        let { dataTaskList, notifDatas } = this.state
        if (type === "first") dataTaskList[index] = { ...dataTaskList[index], collapse: !dataTaskList[index].collapse }
        else notifDatas[index] = { ...notifDatas[index], collapse: !notifDatas[index].collapse }
        this.setState({ dataTaskList, notifDatas })
    }

    handleCollapseAll = () => {
        let { collapseAll, notifDatas, dataTaskList } = this.state
        dataTaskList = dataTaskList.map(value => {
            return { ...value, collapse: !collapseAll }
        })
        notifDatas = notifDatas.map(val => {
            return { ...val, collapse: !collapseAll }
        })
        this.setState({ notifDatas, dataTaskList, collapseAll: !collapseAll })
    }

    render() {
        const { data } = this.state.user
        let { collapseAll, dataTaskList, notifDatas, rawData, fetching, totalData, limit, offset } = this.state
        return (
            <View style={{ flex: 1, backgroundColor: "#fff" }}>
                <NavbarMenu 
                    title={'Notification'}
                />
                <ScrollView>
                    <View style={{ backgroundColor: "#fff", marginBottom: 10 }}>
                        <View style={{
                            padding: 15,
                            paddingBottom: 5,
                            backgroundColor: "#fff",
                            flexDirection: "row",
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <View style={{ paddingRight: 20, flexDirection: "row", alignItems: "center" }}>
                                <Text style={{
                                    fontSize: 16,
                                    color: "#999",
                                    fontWeight: "bold"
                                }}>Today {M().format("DD MMMM YYYY")}</Text>
                            </View>
                            <View style={{ alignSelf: 'flex-end' }}>
                                <TouchableOpacity onPress={() => this.handleCollapseAll()}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', alignContent: 'center' }}>
                                        <FaIcon name={!collapseAll ? "plus" : "minus"} size={12} color="#adadad" />
                                        <Text style={{ fontSize: 12, color: '#999', marginLeft: 10 }}>
                                            {collapseAll ? "Collapse All" : "Expand All"}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {dataTaskList.map((val, index) => {
                            const { title, subtitle, color, widthLabel, rightLabel, status, collapse, assignment } = val
                            return (
                                <TouchableOpacity 
                                    key={index} 
                                    style={{padding: 15, borderBottomColor: '#ccc', borderBottomWidth: 0.8}}
                                    onPress={() => this.props.page(rawData[index].humanTaskID, rawData[index].humanTaskType)}>
                                    <View style={{
                                        flex: 1,
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                        <View style={{width: 45, height: 45, marginRight: 15}}>
                                            <ProgressiveImage
                                                resizeMode="cover" 
                                                sizeSpinner={28}
                                                style={{ borderRadius: 100, width: "100%", height: "100%", backgroundColor: Colors.white }}
                                                source={{
                                                    uri: generateUrlPhoto(data && data.userID),
                                                    headers: {
                                                        'Content-Type': 'application/json',
                                                        'DGI-API-KEY': Config.APP_WMS_AUTH_HEADER_VALUE
                                                        // 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiJ9.5BG9SEVOGo_xRhtT8IkyoSy60kPg8HM9Vpvb0TdNew4'
                                                    }
                                                }} />
                                        </View>
                                        <View style={{flex: 1, justifyContent: 'flex-start', paddingTop: 5, paddingBottom: 5}}>
                                            <Text 
                                                style={{
                                                    color: "#000",
                                                    fontSize: 16,
                                                    fontWeight: "bold",
                                                    marginBottom: 5
                                                }}>
                                                {title === "ORDER" ? "TRANSFER ORDER" : title}
                                            </Text>
                                            <Text style={{ fontSize: 10, color: "#999" }}>
                                                {subtitle}
                                            </Text>
                                        </View>
                                        <TouchableOpacity 
                                            onPress={() => this.handleCollapse(index, "first")}
                                            style={{
                                                width: 25, 
                                                height: 25, 
                                                borderRadius: 100, 
                                                backgroundColor: color, 
                                                marginLeft: 15,
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <AntIcon name={collapse ? "minus" : "plus"} color="#fff" size={20} />
                                        </TouchableOpacity>
                                    </View>
                                    {collapse ? (
                                        <View style={{marginTop: 10, paddingLeft: 60}}>
                                            <Text style={{ fontSize: 12, color: '#999' }}>
                                                <Text style={{ fontWeight: "bold" }}>Assignment: </Text>
                                                {assignment} - {(this.props.auth.user.data.userName).toUpperCase()}
                                            </Text>
                                        </View>
                                    ) : null}
                                </TouchableOpacity>
                            )
                        })}
                    </View>

                    {fetching && (
                        <View style={{
                            marginTop: 20,
                            backgroundColor: "#fff",
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Spinkit isVisible={true} size={50} type="Circle" color={Colors.main} />
                        </View>
                    )}
                    {dataTaskList.length > 0 && dataTaskList.length < totalData ?
                        <View style={{
                            backgroundColor: "#fff",
                            justifyContent: "center",
                            alignContent: "center",
                            alignItems: "center",
                            paddingTop: 20,
                            paddingBottom: 30
                        }}>
                            <TouchableOpacity onPress={() => this.getDataTaskList(limit, offset + 1)} style={{
                                borderRadius: 100,
                                backgroundColor: "#eee",
                                justifyContent: "center",
                                padding: 10,
                                width: 80
                            }}>
                                <Text style={{
                                    color: "#000",
                                    textAlign: "center",
                                    fontWeight: "bold",
                                    fontSize: 14
                                }}>More</Text>
                            </TouchableOpacity>
                        </View> : <View style={{ paddingTop: 30, paddingBottom: 30 }}></View>}
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    };
};

export default connect(mapStateToProps, null)(CardNotif)