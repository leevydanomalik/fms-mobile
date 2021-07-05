import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Dimensions, ScrollView } from 'react-native'
import FeIcon from 'react-native-vector-icons/Feather'
import BottomPopup from '../../Components/BottomPopup'
import ButtonNext from '../../Components/ButtonNext'
import CardCollapse from '../../Components/CardCollapse'
import { Colors } from '../../../Themes'
import Config from 'react-native-config'
import { generateUrlPhotoDriver, generateUrlPhotoSim } from '../../../Utils'
import ProgressiveImage from '../../Modules/ProgressiveImage'
import QRCode from 'react-native-qrcode-svg'
import CardSmallScanner from '../../Components/CardSmallScanner'
import SealAction from '../../../Redux/SealRedux'
import {connect} from 'react-redux'

const {width, height} = Dimensions.get('screen')

class CardQrScanner extends Component {
    render () {
        const {size, code, label, sublabel} = this.props
        return (
            <View style={{ width: size ? size : 200, height: size ? size : 200, alignItems: "center" }}>
                <QRCode size={size ? size : 200} value={code ? code : '-'} />
                <Text style={{ fontSize: 12, color: Colors.lightGrey, marginTop: 10 }}>
                    {label ? label : '-'}
                </Text>
                <Text style={{ color: Colors.black, fontSize: 16, fontWeight: "bold" }}>
                    {sublabel ? sublabel : '-'}
                </Text>
            </View>
        )
    }
}

class DriverDetail extends Component {
    render() {
        const { onPress, onScanner, data, isDriver, isGate, isDone, isWrong } = this.props
        return (
            <View style={{ padding: 15 }}>
                <Text style={{ color: Colors.black, fontSize: 16, fontWeight: "bold" }}>
                    {data && data.id ? data.id : ''}
                </Text>
                {isDriver ? (
                    <View style={{
                        borderBottomColor: '#ccc',
                        borderBottomWidth: 0.5,
                        marginBottom: 15
                    }}>
                        <ScrollView 
                            horizontal 
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ 
                                paddingTop: 30,
                                paddingBottom: 30
                            }}>
                            <View style={{ width: (width - 30), alignItems: "center" }}>
                                <CardQrScanner 
                                    size={170}
                                    code={data && data.drv_citizenship ? data.drv_citizenship : ''} 
                                    label={'CITIZENSHIP ID'}
                                    sublabel={data && data.drv_citizenship ? data.drv_citizenship : ''}
                                />
                            </View>
                            <View style={{ width: (width - 30), alignItems: "center" }}>
                                <View style={{ height: 220, width: 220, borderRadius: 0 }} >
                                    <ProgressiveImage
                                        resizeMode="cover" 
                                        style={{ 
                                            borderRadius: 0, 
                                            width: "100%", 
                                            height: "100%",
                                            backgroundColor: Colors.whiteGrey
                                        }}
                                        source={{
                                            uri: generateUrlPhotoDriver(data && data.id),
                                            headers: {
                                                'Content-Type': 'application/json',
                                                'DGI-API-KEY': Config.APP_WMS_AUTH_HEADER_VALUE
                                                // 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiJ9.5BG9SEVOGo_xRhtT8IkyoSy60kPg8HM9Vpvb0TdNew4'
                                            }
                                        }} />
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                ) : (
                    <View 
                        style={{ 
                            flex: 1,
                            paddingTop: 30,
                            paddingBottom: 30,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderBottomColor: '#ccc',
                            borderBottomWidth: 0.5,
                            marginBottom: 15,
                            flexDirection: "row"
                        }}>
                        <View style={{ height: 220, width: 220, borderRadius: 0 }} >
                            <ProgressiveImage
                                resizeMode="cover" 
                                style={{ 
                                    borderRadius: 0, 
                                    width: "100%", 
                                    height: "100%",
                                    backgroundColor: Colors.whiteGrey
                                }}
                                source={{
                                    uri: generateUrlPhotoDriver(data && data.id),
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'DGI-API-KEY': Config.APP_WMS_AUTH_HEADER_VALUE
                                        // 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiJ9.5BG9SEVOGo_xRhtT8IkyoSy60kPg8HM9Vpvb0TdNew4'
                                    }
                                }} />
                        </View>
                    </View>
                )}
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 }}>
                    <Text style={{ color: Colors.lightGrey, fontSize: 16, fontWeight: "bold" }}>Driver Information</Text>
                    {isGate && (
                        <CardSmallScanner 
                            code={data && data.drv_citizenship}
                            isScanned={isDone}
                            isWrong={isWrong}
                            onPress={() => onScanner(data && data.drv_citizenship)} 
                            isCheckDesign={true} />
                    )}
                </View>
                <View style={{ marginBottom: 15 }}>
                    <Text style={{ fontSize: 12, color: Colors.lightGrey }}>NAME</Text>
                    <Text style={{ color: Colors.black, fontSize: 16, fontWeight: "bold" }}>
                        {data && data.name ? data.name : ''}
                    </Text>
                </View>
                <View style={{ marginBottom: 15 }}>
                    <Text style={{ fontSize: 12, color: Colors.lightGrey }}>CITIZENSHIP ID</Text>
                    <Text style={{ color: Colors.black, fontSize: 16, fontWeight: "bold" }}>
                        {data && data.drv_citizenship ? data.drv_citizenship : ''}
                    </Text>
                </View>
                <View style={{ marginBottom: 15 }}>
                    <Text style={{ fontSize: 12, color: Colors.lightGrey }}>HEIGHT/WEGIHT</Text>
                    <Text style={{ color: Colors.black, fontSize: 16, fontWeight: "bold" }}>
                        {data && data.height_weight ? data.height_weight : ''}
                    </Text>
                </View>
                <View style={{ marginBottom: 15 }}>
                    <Text style={{ fontSize: 12, color: Colors.lightGrey }}>DRIVING LICENSE</Text>
                    <Text style={{ color: Colors.black, fontSize: 16, fontWeight: "bold" }}>
                        {data && data.license ? data.license : ''}
                    </Text>
                </View>
                <View style={{ marginBottom: 15 }}>
                    <Text style={{ fontSize: 12, color: Colors.lightGrey }}>DRIVING LICENSE NUMBER</Text>
                    <Text style={{ color: Colors.black, fontSize: 16, fontWeight: "bold" }}>
                        {data && data.license_no ? data.license_no : ''}
                    </Text>
                </View>
                <View style={{ marginBottom: 15 }}>
                    <Text style={{ fontSize: 12, color: Colors.lightGrey }}>DRIVING LICENSE EXPIRE</Text>
                    <Text style={{ color: Colors.black, fontSize: 16, fontWeight: "bold" }}>
                        {data && data.license_expire ? data.license_expire : ''}
                    </Text>
                </View>
                <View style={{ marginBottom: 15 }}>
                    <Text style={{ fontSize: 12, color: Colors.lightGrey }}>ISSUING POLICE</Text>
                    <Text style={{ color: Colors.black, fontSize: 16, fontWeight: "bold" }}>
                        {data && data.issuing_police ? data.issuing_police : ''}
                    </Text>
                </View>
                <View style={{ marginBottom: 15 }}>
                    <Text style={{ fontSize: 12, color: Colors.lightGrey }}>COMPANY</Text>
                    <Text style={{ color: Colors.black, fontSize: 16, fontWeight: "bold" }}>
                        {data && data.company ? data.company : ''}
                    </Text>
                </View>
                <View style={{ marginBottom: 0 }}>
                    <Text style={{ fontSize: 12, color: Colors.lightGrey }}>This vehicle must stop the engine while parking and please securing surrounding and confirm to loading master</Text>
                </View>
                {isGate && isDone && (
                    <View style={{paddingTop: 15}}>
                        <ButtonNext 
                            title={'CONFIRMED'}
                            onPress={onPress ? () => onPress() : () => console.log('confirmed')}
                        />
                    </View>
                )}
            </View>
        )
    }
}

class DriverLicense extends Component {
    render() {
        const { onPress, onScanner, data, isDriver, isGate, isDone, isWrong } = this.props
        return (
            <View style={{ padding: 15 }}>
                <Text style={{ color: Colors.black, fontSize: 16, fontWeight: "bold" }}>
                    {data && data.id ? data.id : ''}
                </Text>
                {isDriver ? (
                    <View style={{
                        borderBottomColor: '#ccc',
                        borderBottomWidth: 0.5,
                        marginBottom: 15
                    }}>
                        <ScrollView 
                            horizontal 
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ 
                                paddingTop: 30,
                                paddingBottom: 30,
                            }}>
                            <View style={{ width: (width - 30), alignItems: "center" }}>
                                <CardQrScanner 
                                    code={data && data.license_no ? data.license_no : ''} 
                                    label={'DRIVER LICENSE NUMBER'}
                                    sublabel={data && data.license_no ? data.license_no : ''}
                                />
                            </View>
                            <View style={{ width: (width - 30), height: 240, marginBottom: 10, borderWidth: 1, borderColor: "#ccc", borderRadius: 5 }}>
                                <ProgressiveImage
                                    resizeMode="cover" 
                                    style={{ 
                                        borderRadius: 5, 
                                        width: "100%", 
                                        height: "100%",
                                        backgroundColor: Colors.whiteGrey
                                    }}
                                    source={{
                                        uri: generateUrlPhotoSim(data && data.id),
                                        headers: {
                                            'Content-Type': 'application/json',
                                            'DGI-API-KEY': Config.APP_WMS_AUTH_HEADER_VALUE
                                            // 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiJ9.5BG9SEVOGo_xRhtT8IkyoSy60kPg8HM9Vpvb0TdNew4'
                                        }
                                    }} />
                            </View>
                        </ScrollView>
                    </View>
                ) : (
                    <View style={{ 
                        flex: 1,
                        paddingTop: 30,
                        paddingBottom: 30,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderBottomColor: '#ccc',
                        borderBottomWidth: 0.5,
                        marginBottom: 15
                    }}>
                        <View style={{ width: '100%', height: 240, marginBottom: 10, borderWidth: 1, borderColor: "#ccc", borderRadius: 5, alignItems: "center", justifyContent: "center" }}>
                            <ProgressiveImage
                                resizeMode="cover" 
                                style={{ 
                                    borderRadius: 5, 
                                    width: "100%", 
                                    height: "100%",
                                    backgroundColor: Colors.whiteGrey
                                }}
                                source={{
                                    uri: generateUrlPhotoSim(data && data.id),
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'DGI-API-KEY': Config.APP_WMS_AUTH_HEADER_VALUE
                                        // 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiJ9.5BG9SEVOGo_xRhtT8IkyoSy60kPg8HM9Vpvb0TdNew4'
                                    }
                                }} />
                        </View>
                    </View>
                )}
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 }}>
                    <Text style={{ color: Colors.lightGrey, fontSize: 16, fontWeight: "bold" }}>Driver License Information</Text>
                    {isGate && (
                        <CardSmallScanner 
                            code={data && data.license_no}
                            isScanned={isDone}
                            isWrong={isWrong}
                            onPress={() => onScanner(data && data.license_no)} 
                            isCheckDesign={true} />
                    )}
                </View>
                <View style={{ marginBottom: 15 }}>
                    <Text style={{ fontSize: 12, color: Colors.lightGrey }}>TYPE</Text>
                    <Text style={{ color: Colors.black, fontSize: 16, fontWeight: "bold" }}>
                        {data && data.license ? data.license : ''}
                    </Text>
                </View>
                <View style={{ marginBottom: 15 }}>
                    <Text style={{ fontSize: 12, color: Colors.lightGrey }}>DRIVING LICENSE NUMBER</Text>
                    <Text style={{ color: Colors.black, fontSize: 16, fontWeight: "bold" }}>
                        { data && data.license_no ? data.license_no : '' }
                    </Text>
                </View>
                <View style={{ marginBottom: 15 }}>
                    <Text style={{ fontSize: 12, color: Colors.lightGrey }}>OWNER</Text>
                    <Text style={{ color: Colors.black, fontSize: 16, fontWeight: "bold" }}>
                        {data && data.name ? data.name : ''}
                    </Text>
                </View>
                <View style={{ marginBottom: 15 }}>
                    <Text style={{ fontSize: 12, color: Colors.lightGrey }}>ADDRESS</Text>
                    <Text style={{ color: Colors.black, fontSize: 16, fontWeight: "bold" }}>
                        {data && data.address ? data.address : ''}
                    </Text>
                </View>
                <View style={{ marginBottom: 15 }}>
                    <Text style={{ fontSize: 12, color: Colors.lightGrey }}>ISSUER</Text>
                    <Text style={{ color: Colors.black, fontSize: 16, fontWeight: "bold" }}>
                        {data && data.issuing_police ? data.issuing_police : ''}
                    </Text>
                </View>
                <View style={{ marginBottom: 0 }}>
                    <Text style={{ fontSize: 12, color: Colors.lightGrey }}>EXPIRE</Text>
                    <Text style={{ color: Colors.black, fontSize: 16, fontWeight: "bold" }}>
                        {data && data.license_expire ? data.license_expire : ''}
                    </Text>
                </View>
                {isGate && isDone && (
                    <View style={{paddingTop: 15}}>
                        <ButtonNext 
                            title={'CONFIRMED'}
                            onPress={onPress ? () => onPress() : () => console.log('confirmed')}
                        />
                    </View>
                )}
            </View>
        )
    }
}

class DriverInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visibleBottomPopup: false,
            isFirstDone: false,
            isSecondDone: false,
            isDriverDetail: false,
            isDriverDone: false,
            isSIMDone: false,
            isDriverType: false,
            isSIMType: false
        }
    }

    static defaultProps = {
        onVerifiedPress: () => null
    }

    componentDidMount() {
        this.resetScanner()
    }

    componentDidUpdate(prevProps) {
        const {isFirstDone, isSecondDone} = this.props
        const data = this.props.seal
        if (data !== prevProps.seal) {
            if (data.statusDriver) {
                this.setState({
                    visibleBottomPopup: true, 
                    isDriverDetail: true,
                    isDriverDone: true,
                    isDriverType: data.qrTypeDriver === 'good' ? true : false
                })
            }
            if (data.statusSIM) {
                this.setState({
                    visibleBottomPopup: true, 
                    isDriverDetail: false,
                    isSIMDone: true,
                    isSIMType: data.qrTypeSIM === 'good' ? true : false
                })
            }
            this.props.changeStatusDriver(false)
            this.props.changeStatusSIM(false)
        }

        if (isFirstDone !== prevProps.isFirstDone && isSecondDone !== prevProps.isSecondDone) {
            this.resetScanner()
        }
    }

    resetScanner() {
        const {isFirstDone, isSecondDone} = this.props
        this.setState({
            visibleBottomPopup: false, 
            isFirstDone: isFirstDone, 
            isSecondDone: isSecondDone,
            isDriverDone: isFirstDone,
            isSIMDone: isSecondDone,
            isDriverType: isFirstDone,
            isSIMType: isSecondDone

        })
        this.props.changeStatusDriver(false)
        this.props.changeStatusSIM(false)
    }

    render() {
        const { onScanner, onPressFirst, onPressSecond, data, isDriver, isGate } = this.props
        const { visibleBottomPopup, isDriverDetail, isDriverDone, isSIMDone, isDriverType, isSIMType, isSecondDone, isFirstDone } = this.state
        return (
            <View>
                <View style={{ marginTop: 10, backgroundColor: "#fff", padding: 20 }}>
                    <View style={{ flex: 0, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <Text style={{ fontSize: 16, fontWeight: "bold", color: Colors.lightGrey }}>Driver Information</Text>
                    </View>

                    <CardCollapse
                        top={-20}
                        right={0}
                    >
                        <View style={{ flex: 0, flexDirection: "row", justifyContent: 'space-between', alignItems: 'center', marginBottom: 15, marginTop: 15 }}>
                            <View style={{ marginBottom: 0 }}>
                                <Text style={{ fontSize: 12, color: Colors.lightGrey }}>NAME</Text>
                                <Text style={{ color: Colors.black, fontSize: 16, fontWeight: "bold" }}>
                                    {data && data.name ? data.name : ''}
                                </Text>
                            </View>
                            <View style={{ marginBottom: 0, justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{ height: 50, width: 50, borderRadius: 100, marginBottom: 5 }} >
                                    <ProgressiveImage
                                        resizeMode="cover" 
                                        sizeSpinner={28}
                                        style={{ 
                                            borderRadius: 100, 
                                            width: "100%", 
                                            height: "100%",
                                            backgroundColor: Colors.whiteGrey
                                        }}
                                        source={{
                                            uri: generateUrlPhotoDriver(data && data.id),
                                            headers: {
                                                'Content-Type': 'application/json',
                                                'DGI-API-KEY': Config.APP_WMS_AUTH_HEADER_VALUE
                                                // 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiJ9.5BG9SEVOGo_xRhtT8IkyoSy60kPg8HM9Vpvb0TdNew4'
                                            }
                                        }} />
                                </View>
                                <TouchableOpacity onPress={() => this.setState({visibleBottomPopup: true, isDriverDetail: true, flexDirection: 'row'})} style={{flexDirection: 'row', alignItems: 'center'}}>
                                    {isFirstDone && (
                                        <FeIcon 
                                            name={'check'} 
                                            size={20} 
                                            color={Colors.main} 
                                        />
                                    )}
                                    <Text style={{ fontSize: 12, color: Colors.lightGrey }}>{ '+ Enlarge' }</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{ flex: 0, marginBottom: 15 }}>
                            <Text style={{ fontSize: 12, color: Colors.lightGrey }}>HEIGHT/WEIGHT</Text>
                            <Text style={{ color: Colors.black, fontSize: 16, fontWeight: "bold" }}>
                                {data && data.height_weight ? data.height_weight : ''}
                            </Text>
                        </View>

                        <View style={{ flex: 0, marginBottom: 15 }}>
                            <Text style={{ fontSize: 12, color: Colors.lightGrey }}>DRIVING LICENSE</Text>
                            <Text style={{ color: Colors.black, fontSize: 16, fontWeight: "bold" }}>
                                {data && data.license ? data.license : ''}
                            </Text>
                        </View>

                        <View style={{ flex: 0, marginBottom: 15 }}>
                            <Text style={{ fontSize: 12, color: Colors.lightGrey }}>DRIVING LICENSE NUMBER</Text>
                            <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ color: Colors.black, fontSize: 16, fontWeight: "bold" }}>
                                    {data && data.license_no ? data.license_no : ''}
                                </Text>
                                <TouchableOpacity onPress={() => this.setState({visibleBottomPopup: true, isDriverDetail: false})} style={{flexDirection: 'row', alignItems: 'center'}}>
                                    {isSecondDone && (
                                        <FeIcon 
                                            name={'check'} 
                                            size={20} 
                                            color={Colors.main} 
                                        />
                                    )}
                                    <Text style={{ fontSize: 12, color: Colors.lightGrey }}>{ '+ Show' }</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{ flex: 0, marginBottom: 15 }}>
                            <Text style={{ fontSize: 12, color: Colors.lightGrey }}>DRIVING LICENSE EXPIRE</Text>
                            <Text style={{ color: Colors.black, fontSize: 16, fontWeight: "bold" }}>
                                {data && data.license_expire ? data.license_expire : ''}
                            </Text>
                        </View>

                        <View style={{ flex: 0, marginBottom: 15 }}>
                            <Text style={{ fontSize: 12, color: Colors.lightGrey }}>ISSUING POLICE</Text>
                            <Text style={{ color: Colors.black, fontSize: 16, fontWeight: "bold" }}>
                                {data && data.issuing_police ? data.issuing_police : ''}
                            </Text>
                        </View>

                        <View style={{ flex: 0, marginBottom: 15 }}>
                            <Text style={{ fontSize: 12, color: Colors.lightGrey }}>COMPANY</Text>
                            <Text style={{ color: Colors.black, fontSize: 16, fontWeight: "bold" }}>
                                {data && data.company ? data.company : ''}
                            </Text>
                        </View>
                        <View style={{ flex: 0 }}>
                            <Text style={{ fontSize: 12, color: Colors.lightGrey, marginBottom: 5 }}>NOTES</Text>
                            <Text style={{ fontSize: 12, color: Colors.black }}>
                                This vehicle must stop the engine while parking and please securing surrounding and confirm to loading master
                            </Text>
                        </View>
                    </CardCollapse>
                </View>

                <BottomPopup 
                    visible={visibleBottomPopup} 
                    title={(isDriverDetail) ? 'Driver Detail' : 'Driver License Detail'} 
                    onDismiss={() => this.setState({visibleBottomPopup: false})}>
                    <View style={{ paddingTop: 25, height: (Dimensions.get('screen').height - 200) }}>
                        <ScrollView>
                            {(isDriverDetail) 
                                ? <DriverDetail 
                                    data={data}
                                    isDriver={isDriver}
                                    isGate={isGate}
                                    isDone={isDriverDone}
                                    isWrong={!isDriverType}
                                    onScanner={(validateID) => {
                                        onScanner ? onScanner('DRIVER', validateID) : null
                                        this.setState({visibleBottomPopup: false})
                                    }}
                                    onPress={() => {
                                        onPressFirst ? onPressFirst(isDriverDone) : null
                                        this.setState({visibleBottomPopup: false, isFirstDone: true})
                                    }} 
                                    /> 
                                : <DriverLicense 
                                    data={data}
                                    isDriver={isDriver}
                                    isGate={isGate}
                                    isDone={isSIMDone}
                                    isWrong={!isSIMType}
                                    onScanner={(validateID) => {
                                        onScanner ? onScanner('SIM', validateID) : null
                                        this.setState({visibleBottomPopup: false})
                                    }}
                                    onPress={() => {
                                        onPressSecond ? onPressSecond(isSIMDone) : null
                                        this.setState({visibleBottomPopup: false, isSecondDone: true})
                                    }} 
                                    />
                            }
                        </ScrollView>
                    </View>
                </BottomPopup>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
        seal: state.seal
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changeStatusDriver: (data) => dispatch(SealAction.changeStatusDriver(data)),
        changeStatusSIM: (data) => dispatch(SealAction.changeStatusSIM(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DriverInfo)