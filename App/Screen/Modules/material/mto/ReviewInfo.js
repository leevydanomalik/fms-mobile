import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Colors } from '../../../../Themes'
import QRCode from 'react-native-qrcode-svg'
import BottomPopup from '../../../Components/BottomPopup'
import CardMaterialListSmall from '../../../Components/CardMaterialListSmall'
import CardSmallScanner from '../../../Components/CardSmallScanner'
import SealAction from '../../../../Redux/SealRedux'
import {connect} from 'react-redux'
import ButtonNext from '../../../Components/ButtonNext'

class ReviewInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visibleBottomPopup: false,
            isMaterialDetail: false,
            codeScanner: '',
            isReferenceDone: false,
            isDODone: false,
            isReferenceType: false,
            isDOType: false,
            limitIndex: 3,
            totalMaterial: 0
        }
    }

    static defaultProps = {
        onVerifiedPress: () => null
    }

    componentDidMount() {
        const { material } = this.props
        this.setState({visibleBottomPopup: false, totalMaterial: material.length})
        this.props.changeStatusReference(false)
        this.props.changeStatusDO(false)
    }

    componentDidUpdate(prevProps) {
        const data = this.props.seal
        if (data !== prevProps.seal) {
            console.log('seal', data)
            if (data.statusReference) {
                this.setState({
                    isReferenceDone: true,
                    isReferenceType: data.qrTypeReference === 'good' ? true : false
                })
            }
            if (data.statusDO) {
                this.setState({
                    isDODone: true,
                    isDOType: data.qrTypeDO === 'good' ? true : false
                })
            }
            this.props.changeStatusReference(false)
            this.props.changeStatusDO(false)
        }
    }

    renderScanner = () => {
        const code = this.state.codeScanner
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
        const { onScanner, title, material, type, reference, delivery_order, isScanner, isQr, labelReference, labelDO, disableReview } = this.props
        const { visibleBottomPopup, isReferenceDone, isDODone, isReferenceType, isDOType, limitIndex, totalMaterial } = this.state
        return (
            <View>
                {!disableReview && (
                    <View style={{ marginTop: 0, backgroundColor: "#fff", padding: 20, borderTopWidth: 0.5, borderTopColor: '#ccc' }}>
                        <View style={{ flex: 0, flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 15 }}>
                            <Text style={{ fontSize: 16, fontWeight: "bold", color: Colors.lightGrey }}>{title ? title : 'Review Movement'}</Text>
                        </View>

                        <View style={{ flex: 0, marginBottom: 15 }}>
                            <Text style={{ fontSize: 12, color: Colors.lightGrey }}>TYPE</Text>
                            <Text style={{ color: Colors.black, fontSize: 16, fontWeight: "bold" }}>
                                {type ? type : '-'}
                            </Text>
                        </View>
                        
                        <View style={{ flex: 0, marginBottom: 15 }}>
                            <Text style={{ fontSize: 12, color: Colors.lightGrey }}>{labelReference ? labelReference : 'REFERENCE (SOURCE ID)'}</Text>
                            <View style={{ flex: 0, flexDirection: "row", alignItems: "flex-end", alignContent: 'flex-end', justifyContent: "space-between" }}>
                                <Text style={{ color: Colors.black, fontSize: 16, fontWeight: "bold" }}>
                                    {reference ? reference : '-'}
                                </Text>
                                {isQr && (
                                    <TouchableOpacity onPress={() => this.setState({visibleBottomPopup: true, codeScanner: reference ? reference : '-'})}>
                                        <Text style={{ fontSize: 12, color: Colors.lightGrey }}>+ Show</Text>
                                    </TouchableOpacity>
                                )}
                                {isScanner && (
                                    <CardSmallScanner 
                                        code={reference}
                                        isScanned={isReferenceDone}
                                        isWrong={!isReferenceType}
                                        onPress={onScanner ? () => onScanner('REFERENCE', reference) : null} 
                                        isCheckDesign={true} />
                                )}
                            </View>
                        </View>

                        <View style={{ flex: 0, marginBottom: 0 }}>
                            <Text style={{ fontSize: 12, color: Colors.lightGrey }}>{labelDO ? labelDO : 'DELIVERY ORDER'}</Text>
                            <View style={{ flex: 0, flexDirection: "row", alignItems: "flex-end", alignContent: 'flex-end', justifyContent: "space-between" }}>
                                <Text style={{ color: Colors.black, fontSize: 16, fontWeight: "bold" }}>
                                    {delivery_order ? delivery_order : '-'}
                                </Text>
                                {isQr && (
                                    <TouchableOpacity onPress={() => this.setState({visibleBottomPopup: true, codeScanner: delivery_order ? delivery_order : '-'})}>
                                        <Text style={{ fontSize: 12, color: Colors.lightGrey }}>+ Show</Text>
                                    </TouchableOpacity>
                                )}
                                {isScanner && (
                                    <CardSmallScanner 
                                        code={delivery_order}
                                        isScanned={isDODone}
                                        isWrong={!isDOType}
                                        onPress={onScanner ? () => onScanner('DO', delivery_order) : null} 
                                        isCheckDesign={true} />
                                )}
                            </View>
                        </View>
                    </View>
                )}

                <View style={{ marginTop: 1, backgroundColor: "#fff", padding: 20, borderTopColor: '#ccc', borderTopWidth: 0.5, borderBottomWidth: 0.5, borderBottomColor: '#ccc' }}>
                    <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 15 }}>
                        <Text style={{ fontSize: 16, fontWeight: "bold", color: Colors.lightGrey }}>Materials</Text>
                    </View>
                    {material && material.slice(0, limitIndex).map((dt, index) => {
                        return (
                            <CardMaterialListSmall 
                                key={index}
                                data={{
                                    name: dt.name,
                                    kimap: dt.kimap,
                                    hu_cap: dt.hu_cap,
                                    uom: dt.detail.uom,
                                    is_confirmed: dt.isConfirmed
                                }}
                            />
                        )
                    })}
                    {(limitIndex < totalMaterial) && (
                        <View style={{ marginTop: 0, padding: 20, paddingTop: 18, paddingBottom: 0, justifyContent: 'center', alignItems: 'center'}}>
                            <View style={{ width: 90 }}>
                                <ButtonNext 
                                    title={'More'} 
                                    type={'primary'}
                                    enableBorderRadius={true}
                                    onPress={() => this.setState({limitIndex: (this.state.limitIndex + 3)})} />
                            </View>
                        </View>
                    )}
                </View>

                <BottomPopup 
                    visible={visibleBottomPopup} 
                    title={'Document Information'} 
                    onDismiss={() => this.setState({visibleBottomPopup: false})}>
                    <View style={{padding: 15, paddingTop: 30, paddingBottom: 30, alignItems: 'center'}}>
                        { this.renderScanner() }
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
        changeStatusReference: (data) => dispatch(SealAction.changeStatusReference(data)),
        changeStatusDO: (data) => dispatch(SealAction.changeStatusDO(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewInfo)