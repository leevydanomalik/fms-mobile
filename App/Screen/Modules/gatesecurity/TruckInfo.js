import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Dimensions, ScrollView } from 'react-native'
import FeIcon from 'react-native-vector-icons/Feather'
import BottomPopup from '../../Components/BottomPopup'
import ButtonNext from '../../Components/ButtonNext'
import CardCollapse from '../../Components/CardCollapse'
import { Colors } from '../../../Themes'
import Config from 'react-native-config'
import { generateUrlPhotoFleet, generateUrlPhotoKir } from '../../../Utils'
import ProgressiveImage from '../../Modules/ProgressiveImage'
import QRCode from 'react-native-qrcode-svg'
import CardSmallScanner from '../../Components/CardSmallScanner'
import SealAction from '../../../Redux/SealRedux'
import {connect} from 'react-redux'

const {width, height} = Dimensions.get('screen')

class CardQrScanner extends Component {
    render () {
        const {isLeft, size, code, label, sublabel} = this.props
        return (
            <View style={{ width: size ? size : 170, height: size ? size : 170, alignItems: isLeft ? "flex-start" : "center" }}>
                <QRCode size={size ? size : 170} value={code ? code : '-'} />
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

class TruckDetail extends Component {
    render() {
        const {onPress, onScanner, data, isDriver, isGate, isDone, isWrong} = this.props
        const dataCar = [
            {id: data && data.id, image: data && data.image_path, title: 'Front View', car: data && data.name, year: data && data.year},
            // {id: data && data.id, image: data && data.image_path, title: 'Rear View', car: data && data.name, year: data && data.year},
            // {id: data && data.id, image: data && data.image_path, title: 'Top View', car: data && data.name, year: data && data.year},
            // {id: data && data.id, image: data && data.image_path, title: 'Back View', car: data && data.name, year: data && data.year}
        ]
        return (
            <View style={{ padding: 15 }}>
                <Text style={{ color: Colors.black, fontSize: 16, fontWeight: "bold" }}>
                    {data && data.id ? data.id : ''}
                </Text>
                <View style={{ 
                    flex: 1,
                    paddingTop: 30,
                    paddingBottom: 30,
                    alignItems: 'center',
                    borderBottomColor: '#ccc',
                    borderBottomWidth: 0.5,
                    marginBottom: 15
                 }}>
                     <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingTop: 0, paddingLeft: 0, paddingRight: 0, marginBottom: 0 }}>
                        {isDriver && (
                            <View style={{ width: (width - 30), marginTop: 0, alignItems: "center" }}>
                                <CardQrScanner 
                                    code={data && data.id ? data.id : ''} 
                                    label={'FLEET ID'}
                                    sublabel={data && data.id ? data.id : ''}
                                />
                            </View>
                        )}
                        {dataCar && dataCar.map((dt, index) => {
                            return (
                                <View key={index} style={{
                                    width: (width - 30),
                                    marginRight: ((index + 1) === dataCar.length) ? 0 : 15
                                }}>
                                    <View style={{ height: 200, width: '100%', borderWidth: 1, borderColor: "#ccc", borderRadius: 10, marginBottom: 15}} >
                                        <ProgressiveImage
                                            resizeMode="cover" 
                                            style={{ 
                                                borderRadius: 10, 
                                                width: "100%", 
                                                height: "100%",
                                                backgroundColor: Colors.whiteGrey
                                            }}
                                            source={{
                                                uri: generateUrlPhotoFleet(data && data.id),
                                                headers: {
                                                    'Content-Type': 'application/json',
                                                    'DGI-API-KEY': Config.APP_WMS_AUTH_HEADER_VALUE
                                                    // 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiJ9.5BG9SEVOGo_xRhtT8IkyoSy60kPg8HM9Vpvb0TdNew4'
                                                }
                                            }} />
                                    </View>
                                    <Text style={{ color: Colors.black, fontSize: 16, fontWeight: "bold" }}>{dt.title}</Text>
                                    <Text style={{ fontSize: 12, color: Colors.lightGrey }}>{dt.car}</Text>
                                    <Text style={{ fontSize: 12, color: Colors.lightGrey }}>{dt.year}</Text>
                                </View>
                            )
                        })}
                    </ScrollView>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 }}>
                    <Text style={{ color: Colors.lightGrey, fontSize: 16, fontWeight: "bold" }}>Truck Information</Text>
                    {isGate && (
                        <CardSmallScanner 
                            code={data && data.id}
                            isScanned={isDone}
                            isWrong={isWrong}
                            onPress={() => onScanner(data && data.id)} 
                            isCheckDesign={true} />
                    )}
                </View>
                <View style={{ marginBottom: 15 }}>
                    <Text style={{ fontSize: 12, color: Colors.lightGrey }}>TRUCK TYPE</Text>
                    <Text style={{ color: Colors.black, fontSize: 16, fontWeight: "bold" }}>
                        {data && data.type ? data.type : ''}
                    </Text>
                </View>
                <View style={{ marginBottom: 15 }}>
                    <Text style={{ fontSize: 12, color: Colors.lightGrey }}>HEIGHT/LENGTH/WEIGHT</Text>
                    <Text style={{ color: Colors.black, fontSize: 16, fontWeight: "bold" }}>
                        {data && data.height_length_weight ? data.height_length_weight : ''}
                    </Text>
                </View>
                <View style={{ marginBottom: 15 }}>
                    <Text style={{ fontSize: 12, color: Colors.lightGrey }}>LICENSE PLATE</Text>
                    <Text style={{ color: Colors.black, fontSize: 16, fontWeight: "bold" }}>
                        {data && data.nopol ? data.nopol : ''}
                    </Text>
                </View>
                <View style={{ marginBottom: 15 }}>
                    <Text style={{ fontSize: 12, color: Colors.lightGrey }}>KIR LICENSE NUMBER</Text>
                    <Text style={{ color: Colors.black, fontSize: 16, fontWeight: "bold" }}>
                        {data && data.kir_no ? data.kir_no : ''}
                    </Text>
                </View>
                <View style={{ marginBottom: 15 }}>
                    <Text style={{ fontSize: 12, color: Colors.lightGrey }}>KIR LICENSE EXPIRE</Text>
                    <Text style={{ color: Colors.black, fontSize: 16, fontWeight: "bold" }}>
                        {data && data.kir_expired ? data.kir_expired : ''}
                    </Text>
                </View>
                <View style={{ marginBottom: 15 }}>
                    <Text style={{ fontSize: 12, color: Colors.lightGrey }}>ISSUING DISHUB</Text>
                    <Text style={{ color: Colors.black, fontSize: 16, fontWeight: "bold" }}>
                        {data && data.issuing_dishub ? data.issuing_dishub : ''}
                    </Text>
                </View>
                <View style={{ marginBottom: 0 }}>
                    <Text style={{ fontSize: 12, color: Colors.lightGrey }}>TRANSPORTER/CARRIER</Text>
                    <Text style={{ color: Colors.black, fontSize: 16, fontWeight: "bold" }}>
                        {data && data.transporter_carrier ? data.transporter_carrier : ''}
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

class TruckKIR extends Component {
    render() {
        const {onPress, onScanner, data, isDriver, isGate, isDone, isWrong} = this.props
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
                            <View style={{ width: (width - 30), marginTop: 20, alignItems: "center" }}>
                                <CardQrScanner 
                                    size={220}
                                    code={data && data.kir_no ? data.kir_no : ''} 
                                    label={'KIR LICENSE NUMBER'}
                                    sublabel={data && data.kir_no ? data.kir_no : ''}
                                />
                            </View>
                            <View style={{ width: (width - 30), height: 300, marginBottom: 0, borderWidth: 1, borderColor: "#ccc", borderRadius: 5 }}>
                                <ProgressiveImage
                                    resizeMode="cover" 
                                    style={{ 
                                        borderRadius: 5, 
                                        width: "100%", 
                                        height: "100%",
                                        backgroundColor: Colors.whiteGrey
                                    }}
                                    source={{
                                        uri: generateUrlPhotoKir(data && data.id),
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
                        borderBottomColor: '#ccc',
                        borderBottomWidth: 0.5,
                        marginBottom: 15
                    }}>
                        <View style={{ width: '100%', height: 300, marginBottom: 10, borderWidth: 1, borderColor: "#ccc", borderRadius: 5, alignItems: "center", justifyContent: "center" }}>
                            <ProgressiveImage
                                resizeMode="cover" 
                                style={{ 
                                    borderRadius: 5, 
                                    width: "100%", 
                                    height: "100%",
                                    backgroundColor: Colors.whiteGrey
                                }}
                                source={{
                                    uri: generateUrlPhotoKir(data && data.id),
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
                    <Text style={{ color: Colors.lightGrey, fontSize: 16, fontWeight: "bold" }}>Truck KIR Information</Text>
                    {isGate && (
                        <CardSmallScanner 
                            code={data && data.kir_no}
                            isScanned={isDone}
                            isWrong={isWrong}
                            onPress={() => onScanner(data && data.kir_no)} 
                            isCheckDesign={true} />
                    )}
                </View>
                <View style={{ marginBottom: 15 }}>
                    <Text style={{ fontSize: 12, color: Colors.lightGrey }}>TRUCK TYPE</Text>
                    <Text style={{ color: Colors.black, fontSize: 16, fontWeight: "bold" }}>
                        {data && data.type ? data.type : ''}
                    </Text>
                </View>
                <View style={{ marginBottom: 15 }}>
                    <Text style={{ fontSize: 12, color: Colors.lightGrey }}>HEIGHT/LENGTH/WEIGHT</Text>
                    <Text style={{ color: Colors.black, fontSize: 16, fontWeight: "bold" }}>
                        {data && data.height_length_weight ? data.height_length_weight : ''}
                    </Text>
                </View>
                <View style={{ marginBottom: 15 }}>
                    <Text style={{ fontSize: 12, color: Colors.lightGrey }}>LICENSE PLATE</Text>
                    <Text style={{ color: Colors.black, fontSize: 16, fontWeight: "bold" }}>
                        {data && data.nopol ? data.nopol : ''}
                    </Text>
                </View>
                <View style={{ marginBottom: 15 }}>
                    <Text style={{ fontSize: 12, color: Colors.lightGrey }}>KIR LICENSE NUMBER</Text>
                    <Text style={{ color: Colors.black, fontSize: 16, fontWeight: "bold" }}>
                        {data && data.kir_no ? data.kir_no : ''}
                    </Text>
                </View>
                <View style={{ marginBottom: 15 }}>
                    <Text style={{ fontSize: 12, color: Colors.lightGrey }}>KIR LICENSE EXPIRE</Text>
                    <Text style={{ color: Colors.black, fontSize: 16, fontWeight: "bold" }}>
                        {data && data.kir_expired ? data.kir_expired : ''}
                    </Text>
                </View>
                <View style={{ marginBottom: 15 }}>
                    <Text style={{ fontSize: 12, color: Colors.lightGrey }}>ISSUING DISHUB</Text>
                    <Text style={{ color: Colors.black, fontSize: 16, fontWeight: "bold" }}>
                        {data && data.issuing_dishub ? data.issuing_dishub : ''}
                    </Text>
                </View>
                <View style={{ marginBottom: 0 }}>
                    <Text style={{ fontSize: 12, color: Colors.lightGrey }}>TRANSPORTER/CARRIER</Text>
                    <Text style={{ color: Colors.black, fontSize: 16, fontWeight: "bold" }}>
                        {data && data.transporter_carrier ? data.transporter_carrier : ''}
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

class TruckInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visibleBottomPopup: false,
            isFirstDone: false,
            isSecondDone: false,
            isTruckDetail: false,
            isFleetDone: false,
            isKIRDone: false,
            isFleetType: false,
            isKIRType: false,
            isQRCode: false,
            codeQR: ''
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
            if (data.statusFleet) {
                this.setState({
                    visibleBottomPopup: true, 
                    isTruckDetail: true,
                    isFleetDone: true,
                    isFleetType: data.qrTypeFleet === 'good' ? true : false
                })
            }
            if (data.statusKIR) {
                this.setState({
                    visibleBottomPopup: true, 
                    isTruckDetail: false,
                    isKIRDone: true,
                    isKIRType: data.qrTypeKIR === 'good' ? true : false
                })
            }
            this.props.changeStatusFleet(false)
            this.props.changeStatusKIR(false)
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
            isFleetDone: isFirstDone,
            isKIRDone: isSecondDone,
            isFleetType: isFirstDone,
            isKIRType: isSecondDone

        })
        this.props.changeStatusFleet(false)
        this.props.changeStatusKIR(false)
    }

    render() {
        const { onScanner, isSmallInfo, onPressFirst, onPressSecond, data, isDriver, isGate } = this.props
        const { visibleBottomPopup, isTruckDetail, isFleetDone, isKIRDone, isFleetType, isKIRType, isQRCode, codeQR, isSecondDone, isFirstDone } = this.state
        return (
            <View>
                <View style={{ marginTop: 10, backgroundColor: "#fff", padding: 20 }}>
                    <View style={{ flex: 0, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <Text style={{ fontSize: 16, fontWeight: "bold", color: Colors.lightGrey }}>Truck Information</Text>
                    </View>

                    <CardCollapse
                        top={-20}
                        right={0}
                    >
                        <View style={{ flex: 0, flexDirection: "row", justifyContent: 'space-between', alignItems: 'center', marginBottom: 15, marginTop: 15 }}>
                            <View style={{ marginBottom: 0 }}>
                                <Text style={{ fontSize: 12, color: Colors.lightGrey }}>TRUCK TYPE</Text>
                                <Text style={{ color: Colors.black, fontSize: 16, fontWeight: "bold" }}>
                                    {data && data.type ? data.type : ''}
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
                                            uri: generateUrlPhotoFleet(data && data.id),
                                            headers: {
                                                'Content-Type': 'application/json',
                                                'DGI-API-KEY': Config.APP_WMS_AUTH_HEADER_VALUE
                                                // 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiJ9.5BG9SEVOGo_xRhtT8IkyoSy60kPg8HM9Vpvb0TdNew4'
                                            }
                                        }} />
                                </View>
                                <TouchableOpacity onPress={() => this.setState({visibleBottomPopup: true, isTruckDetail: true})} style={{flexDirection: 'row', alignItems: 'center'}}>
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
                            <Text style={{ fontSize: 12, color: Colors.lightGrey }}>HEIGHT/LENGTH/WEIGHT</Text>
                            <Text style={{ color: Colors.black, fontSize: 16, fontWeight: "bold" }}>
                                {data && data.height_length_weight ? data.height_length_weight : ''}
                            </Text>
                        </View>

                        <View style={{ flex: 0, marginBottom: 15 }}>
                            <Text style={{ fontSize: 12, color: Colors.lightGrey }}>LICENSE PLATE</Text>
                            <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ color: Colors.black, fontSize: 16, fontWeight: "bold" }}>
                                    {data && data.nopol ? data.nopol : ''}
                                </Text>
                                {isDriver && (
                                    <TouchableOpacity onPress={() => this.setState({visibleBottomPopup: true, isQRCode: true, codeQR: data && data.nopol})}>
                                        <Text style={{ fontSize: 12, color: Colors.lightGrey }}>{ '+ Show' }</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>

                        {!isSmallInfo && <View style={{ flex: 0, marginBottom: 15 }}>
                            <Text style={{ fontSize: 12, color: Colors.lightGrey }}>KIR LICENSE NUMBER</Text>
                            <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ color: Colors.black, fontSize: 16, fontWeight: "bold" }}>
                                    {data && data.kir_no ? data.kir_no : ''}
                                </Text>
                                <TouchableOpacity onPress={() => this.setState({visibleBottomPopup: true, isTruckDetail: false})} style={{flexDirection: 'row', alignItems: 'center'}}>
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
                        </View>}

                        {!isSmallInfo && <View style={{ flex: 0, marginBottom: 15 }}>
                            <Text style={{ fontSize: 12, color: Colors.lightGrey }}>KIR LICENSE EXPIRE</Text>
                            <Text style={{ color: Colors.black, fontSize: 16, fontWeight: "bold" }}>
                                {data && data.kir_expired ? data.kir_expired : ''}
                            </Text>
                        </View>}

                        {!isSmallInfo && <View style={{ flex: 0, marginBottom: 15 }}>
                            <Text style={{ fontSize: 12, color: Colors.lightGrey }}>ISSUING DISHUB</Text>
                            <Text style={{ color: Colors.black, fontSize: 16, fontWeight: "bold" }}>
                                {data && data.issuing_dishub ? data.issuing_dishub : ''}
                            </Text>
                        </View>}

                        {!isSmallInfo && <View style={{ flex: 0, marginBottom: 0 }}>
                            <Text style={{ fontSize: 12, color: Colors.lightGrey }}>TRANSPORTER/CARRIER</Text>
                            <Text style={{ color: Colors.black, fontSize: 16, fontWeight: "bold" }}>
                                {data && data.transporter_carrier ? data.transporter_carrier : ''}
                            </Text>
                        </View>}
                    </CardCollapse>
                </View>

                <BottomPopup 
                    visible={visibleBottomPopup} 
                    title={(isQRCode) ? 'QR License Plate' : (isTruckDetail) ? 'Truck Detail' : 'Truck KIR Detail'} 
                    onDismiss={() => this.setState({visibleBottomPopup: false, isQRCode: false})}>
                    {isQRCode && (
                        <View style={{ paddingTop: 25, height: (Dimensions.get('screen').height - 450) }}>
                            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                                <Text style={{ fontSize: 36, marginBottom: 25, fontWeight: 'bold', color: Colors.black }}>{codeQR ? String(codeQR) : "-"}</Text>
                                <View style={{ width: 200, height: 200, alignItems: "center", justifyContent: "center" }}>
                                    <QRCode size={200} value={codeQR ? String(codeQR) : "-"} />
                                </View>
                                <Text style={{ width: 280, textAlign: 'center', fontSize: 12, marginTop: 25, color: Colors.lightGrey }}>This QR code can be used as ID for scanning by other department</Text>
                            </View>
                        </View>
                    )}
                    {!isQRCode && (
                        <View style={{ paddingTop: 25, height: (Dimensions.get('screen').height - 200) }}>
                            <ScrollView>
                                {(isTruckDetail) 
                                    ? <TruckDetail 
                                        data={data}
                                        isDriver={isDriver}
                                        isGate={isGate}
                                        isDone={isFleetDone}
                                        isWrong={!isFleetType}
                                        onScanner={(validateID) => {
                                            onScanner ? onScanner('FLEET', validateID) : null
                                            this.setState({visibleBottomPopup: false})
                                        }}
                                        onPress={() => {
                                            onPressFirst ? onPressFirst(isFleetDone) : null
                                            this.setState({visibleBottomPopup: false, isFirstDone: true})
                                        }} 
                                        /> 
                                    : <TruckKIR 
                                        data={data}
                                        isDriver={isDriver}
                                        isGate={isGate}
                                        isDone={isKIRDone}
                                        isWrong={!isKIRType}
                                        onScanner={(validateID) => {
                                            onScanner ? onScanner('KIR', validateID) : null
                                            this.setState({visibleBottomPopup: false})
                                        }}
                                        onPress={() => {
                                            onPressSecond ? onPressSecond(isKIRDone) : null
                                            this.setState({visibleBottomPopup: false, isSecondDone: true})
                                        }} 
                                        />
                                }
                            </ScrollView>
                        </View>
                    )}
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
        changeStatusFleet: (data) => dispatch(SealAction.changeStatusFleet(data)),
        changeStatusKIR: (data) => dispatch(SealAction.changeStatusKIR(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TruckInfo)