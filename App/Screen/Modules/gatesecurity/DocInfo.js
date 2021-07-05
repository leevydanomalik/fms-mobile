import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import CardCollapse from '../../Components/CardCollapse'
import CardContractDelivery from '../../Components/CardContractDelivery'
import CardPeriority from '../../Components/CardPeriority'
import QRCode from 'react-native-qrcode-svg'
import BottomPopup from '../../Components/BottomPopup'
import CardSmallScanner from '../../Components/CardSmallScanner'
import SealAction from '../../../Redux/SealRedux'
import { connect } from 'react-redux'
import { Colors } from '../../../Themes'
import CardMaterialListSmall from '../../Components/CardMaterialListSmall'

class DocInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visibleBottomPopup: false,
            codeScanner: '',
            isReferenceDone: false,
            isDODone: false,
            isReferenceType: false,
            isDOType: false
        }
    }

    static defaultProps = {
        onVerifiedPress: () => null
    }

    componentDidMount() {
        this.resetScanner()
    }

    componentDidUpdate(prevProps) {
        const { onChange, isDOCorrect } = this.props
        const data = this.props.seal
        if (data !== prevProps.seal) {
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
                onChange && onChange(data.qrTypeDO === 'good' ? true : false)
            }
            this.props.changeStatusReference(false)
            this.props.changeStatusDO(false)
        }

        if (isDOCorrect !== prevProps.isDOCorrect) {
            this.resetScanner()
        }
    }

    resetScanner() {
        const {isDOCorrect} = this.props
        this.setState({ 
            visibleBottomPopup: false,
            isReferenceDone: isDOCorrect,
            isReferenceType: isDOCorrect,
            isDODone: isDOCorrect,
            isDOType: isDOCorrect
        })
        this.props.changeStatusReference(false)
        this.props.changeStatusDO(false)
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
        const { onScanner, data, isDriver, isGate, labelReference, labelDO, disableReferenceScanner, disableDOScanner, goodIssue } = this.props
        const { visibleBottomPopup, isReferenceDone, isDODone, isReferenceType, isDOType } = this.state
        const dtMaterial = data && data.material ? data.material : []
        return (
            <View>
                <View style={{ backgroundColor: "#fff", padding: 20, borderTopColor: '#ccc', borderTopWidth: 0.5 }}>
                    <View style={{ flex: 0, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <Text style={{ fontSize: 16, fontWeight: "bold", color: Colors.lightGrey }}>Document Information</Text>
                    </View>

                    <CardCollapse
                        top={-20}
                        right={0}
                    >
                        <View style={{ flex: 0, marginBottom: 15, marginTop: 15 }}>
                            <Text style={{ fontSize: 12, color: Colors.lightGrey }}>TYPE</Text>
                            <Text style={{ color: Colors.black, fontSize: 16, fontWeight: "bold" }}>
                                {data && data.type ? data.type : '-'}
                            </Text>
                        </View>

                        <View style={{ flex: 0, marginBottom: 15 }}>
                            <Text style={{ fontSize: 12, color: Colors.lightGrey }}>{labelReference ? labelReference : 'REFERENCE (SOURCE ID)'}</Text>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ color: Colors.black, fontSize: 16, fontWeight: "bold" }}>
                                    {data && data.reference ? data.reference : '-'}
                                </Text>
                                {isDriver && (
                                    <TouchableOpacity onPress={isDriver ? () => this.setState({ visibleBottomPopup: true, codeScanner: data && data.reference }) : null}>
                                        <Text style={{ fontSize: 12, color: Colors.lightGrey }}>+ Show</Text>
                                    </TouchableOpacity>
                                )}
                                {!disableReferenceScanner && isGate && (
                                    <CardSmallScanner
                                        code={data && data.reference}
                                        isScanned={isReferenceDone}
                                        isWrong={!isReferenceType}
                                        onPress={onScanner ? () => onScanner('REFERENCE', data && data.reference) : null}
                                        isCheckDesign={true} />
                                )}
                            </View>
                        </View>

                        {goodIssue &&
                            <View style={{ flex: 0, marginBottom: 15 }}>
                                <Text style={{ fontSize: 12, color: Colors.lightGrey }}>{'OUTBOUND DELIVERY'}</Text>
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ color: Colors.black, fontSize: 16, fontWeight: "bold" }}>
                                        {data && data.outbound_delivery ? data.outbound_delivery : '-'}
                                    </Text>
                                </View>
                            </View>}

                        <View style={{ flex: 0, marginBottom: 10 }}>
                            <Text style={{ fontSize: 12, color: Colors.lightGrey }}>{labelDO ? labelDO : 'DELIVERY ORDER'}</Text>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ color: Colors.black, fontSize: 16, fontWeight: "bold" }}>
                                    {data && data.delivery_order ? data.delivery_order : '-'}
                                </Text>
                                {isDriver && (
                                    <TouchableOpacity onPress={isDriver ? () => this.setState({ visibleBottomPopup: true, codeScanner: data && data.delivery_order }) : null}>
                                        <Text style={{ fontSize: 12, color: Colors.lightGrey }}>+ Show</Text>
                                    </TouchableOpacity>
                                )}
                                {!disableDOScanner && isGate && (
                                    <CardSmallScanner
                                        code={data && data.delivery_order}
                                        isScanned={isDODone}
                                        isWrong={!isDOType}
                                        onPress={onScanner ? () => onScanner('DO', data && data.delivery_order) : null}
                                        isCheckDesign={true} />
                                )}
                            </View>
                        </View>

                        <View style={{ marginTop: 15, backgroundColor: "#fff", padding: 0, paddingBottom: 25, paddingTop: 20, borderBottomWidth: 0.5, borderTopWidth: 0.5, borderColor: '#ccc' }}>
                            <CardContractDelivery
                                data={{
                                    service: 'PDT',
                                    date: data && data.pdt,
                                    type: data && data.fleet_type,
                                    km_hours: data && data.km_hours,
                                    plan: data && data.plan,
                                    from: {
                                        title: data && data.origin,
                                        subtitle: data && data.org_dsp,
                                        date: data && data.org_etd,
                                        location: data && data.org_location
                                    },
                                    to: {
                                        title: data && data.dest,
                                        subtitle: data && data.dest_dsp,
                                        date: data && data.dest_eta,
                                        location: data && data.dest_location
                                    }
                                }}
                            />
                        </View>

                        <View style={{ marginTop: 1, backgroundColor: "#fff", padding: 0, paddingTop: 20, paddingBottom: 20, borderBottomWidth: 0.5, borderColor: '#ccc' }}>
                            <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 15 }}>
                                <Text style={{ fontSize: 16, fontWeight: "bold", color: Colors.lightGrey }}>Materials</Text>
                            </View>
                            {dtMaterial && dtMaterial.map((dt, index) => {
                                return (
                                    <CardMaterialListSmall
                                        key={index}
                                        data={{
                                            name: dt.name,
                                            kimap: dt.kimap,
                                            hu_cap: dt.hu_cap,
                                            uom: dt.uom,
                                        }}
                                    />
                                )
                            })}
                        </View>

                        <View style={{ marginTop: 1, backgroundColor: "#fff", padding: 0, paddingTop: 20, paddingBottom: 20, borderBottomWidth: 0.5, borderColor: '#ccc' }}>
                            <CardPeriority data={data && data.periority} />
                        </View>

                        <View style={{ marginTop: 1, backgroundColor: "#fff", padding: 0, paddingTop: 20, paddingBottom: 0, }}>
                            <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 15 }}>
                                <Text style={{ fontSize: 16, fontWeight: "bold", color: Colors.lightGrey }}>Notes</Text>
                            </View>
                            <Text style={{ fontSize: 12, marginBottom: 0, color: Colors.black }}>
                                {data && data.note ? data.note : '-'}
                            </Text>
                        </View>

                    </CardCollapse>
                </View>

                <BottomPopup
                    visible={visibleBottomPopup}
                    title={'Document Information'}
                    onDismiss={() => this.setState({ visibleBottomPopup: false })}>
                    <View style={{ padding: 15, paddingTop: 30, paddingBottom: 30, alignItems: 'center' }}>
                        {this.renderScanner()}
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

export default connect(mapStateToProps, mapDispatchToProps)(DocInfo)