import React from 'react'
import { View, Text, TouchableOpacity, Dimensions, ScrollView } from 'react-native'
import FeIcon from 'react-native-vector-icons/Feather'
import {connect} from 'react-redux'
import QRCode from 'react-native-qrcode-svg'
import BottomPopup from '../../Components/BottomPopup'
import ButtonNext from '../../Components/ButtonNext'
import AntIcon from 'react-native-vector-icons/AntDesign'
import FaIcon from 'react-native-vector-icons/FontAwesome'
import SealAction from '../../../Redux/SealRedux'
import { Colors } from '../../../Themes'

class SealNumber extends React.Component {
    constructor(props) {
        super(props)
        const {isScanned, isScannerCorrect} = props
        this.state = {
            visibleBottomPopup: false,
            startScanner: false,
            isScannerCorrect: isScannerCorrect ? isScannerCorrect : false,
            isScaned: isScanned ? isScanned : false
        }
    }

    static defaultProps = {
        onVerifiedPress: () => null
    }

    componentDidMount() {
        this.setState({visibleBottomPopup: false})
        this.props.changeStatus(false)
    }

    componentDidUpdate(prevProps) {
        const data = this.props.seal
        if (data !== prevProps.seal) {
            if (data.status) {
                this.setState({
                    visibleBottomPopup: true, 
                    startScanner: true
                })
            }
            this.props.changeStatus(false)
        }
    }

    renderScanner = () => {
        const { code } = this.props
        return (
            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                <Text style={{ fontSize: 36, marginBottom: 25, fontWeight: 'bold', color: Colors.black }}>{code ? String(code) : "OUTBSEAL#96869"}</Text>
                <View style={{ width: 200, height: 200, alignItems: "center", justifyContent: "center" }}>
                    <QRCode size={200} value={code ? String(code) : "B29228PPK"} />
                </View>
                <Text style={{ width: 280, textAlign: 'center', fontSize: 12, marginTop: 25, color: Colors.lightGrey }}>This QR code can be used as ID for scanning by other department</Text>
            </View>
        )
    }

    render() {
        const { title, onPress, onScanner } = this.props
        const { visibleBottomPopup, startScanner, isScaned, isScannerCorrect } = this.state
        return (
            <View>
                <View style={{ marginTop: 10, backgroundColor: "#fff", padding: 20 }}>
                    <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 15 }}>
                        <Text style={{ fontSize: 16, fontWeight: "bold", color: Colors.lightGrey }}>Seal Number</Text>
                        {onScanner && (
                            <TouchableOpacity onPress={() => this.setState({visibleBottomPopup: true})} style={{flexDirection: 'row', alignItems: 'center'}}>
                                {isScannerCorrect && (
                                    <FeIcon 
                                        name={'check'} 
                                        size={20} 
                                        color={Colors.main} 
                                    />
                                )}
                                <Text style={{ fontSize: 12, color: Colors.black }}>+ ScanQR</Text>
                            </TouchableOpacity>
                        )}
                    </View>

                    <Text style={{ fontSize: 12, color: Colors.black }}>This vehicle must stop the engine while parking and please securing surrounding and confirm to loading master</Text>

                    {isScaned && this.renderScanner()}
                </View>

                <BottomPopup 
                    visible={visibleBottomPopup} 
                    title={title ? title : 'Inbound Seal Number'} 
                    onDismiss={() => this.setState({visibleBottomPopup: false})}>
                    <View style={{ paddingTop: 25, height: (Dimensions.get('screen').height - 350) }}>
                        <ScrollView>
                            <View style={{padding: 15, alignItems: 'center'}}>
                                <Text style={{ fontSize: 14, marginTop: 20, marginBottom: 15, color: Colors.black }}>This vehicle must stop the engine while parking and please securing surrounding and confirm to loading master</Text>
                                {!startScanner ? (
                                    <View>
                                        <TouchableOpacity 
                                            onPress={() => {
                                                onScanner ? onScanner() : null
                                                this.setState({visibleBottomPopup: false})
                                            }}
                                            style={{paddingTop: 30, paddingBottom: 30, alignItems: 'center'}}>
                                            <View style={{
                                                width: 180,
                                                height: 200,
                                                alignItems: 'flex-start',
                                                justifyContent: 'center'
                                            }}>
                                                <AntIcon name={'qrcode'} size={160} />
                                                <View style={{
                                                    position: 'absolute',
                                                    bottom: 10,
                                                    right: 0,
                                                    width: 120,
                                                    height: 120,
                                                    backgroundColor: '#fff',
                                                    borderRadius: 100,
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}>
                                                    <FaIcon name={'search'} size={100} />
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                        <View style={{width: 240}}>
                                            <Text style={{ fontSize: 14, marginTop: 15, color: Colors.black, textAlign: 'center' }}>
                                                Please scan the QR Code Seal Number of the Transport Outbound Delivery
                                            </Text>
                                        </View>
                                    </View>
                                ) : (
                                    <View style={{ alignItems: 'center' }}>
                                        { this.renderScanner() }
                                    </View>
                                )}
                            </View>
                            {startScanner && (
                                <View style={{padding: 15}}>
                                    <ButtonNext 
                                        title={'CONFIRMED'}
                                        onPress={() => {
                                            onPress ? onPress(true) : null
                                            this.setState({visibleBottomPopup: false, isScaned: true, isScannerCorrect: true})
                                        }}
                                    />
                                </View>
                            )}
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
        changeStatus: (data) => dispatch(SealAction.changeStatus(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SealNumber)