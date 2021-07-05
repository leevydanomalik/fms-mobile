import React, { Component } from 'react'
import { View, Text, Image, Dimensions, ScrollView, TouchableOpacity, TextInput, Keyboard, } from 'react-native'
import BottomPopup from './BottomPopup'
import ButtonNext from './ButtonNext'
import CardMaterialListCount from './CardMaterialListCount'
import Icon from 'react-native-vector-icons/AntDesign'
import Spinkit from 'react-native-spinkit'
import { Colors } from '../../Themes'

const img = require('../../assets/product.png')
let msecs = 0

class MaterialDetail extends Component {
    render() {
        return (
            <View style={{ padding: 15 }}>
                <View style={{ 
                    flex: 1,
                    paddingTop: 30,
                    paddingBottom: 30,
                    alignItems: 'center',
                    borderBottomColor: '#ccc',
                    borderBottomWidth: 1,
                    marginBottom: 15
                 }}>
                    <View style={{ height: 240, width: 200, borderRadius: 0 }} >
                        <Image source={img} resizeMode="cover" style={{ width: "100%", height: "100%", borderRadius: 0 }} />
                    </View>
                </View>
                <View style={{ marginBottom: 15 }}>
                    <Text style={{ fontSize: 12, color: "#999" }}>Material KIMAP</Text>
                    <Text style={{ color: "#000", fontSize: 16, fontWeight: "bold" }}>A94949488809</Text>
                </View>
                <View style={{ marginBottom: 15 }}>
                    <Text style={{ fontSize: 12, color: "#999" }}>TYPE</Text>
                    <Text style={{ color: "#000", fontSize: 16, fontWeight: "bold" }}>Inbound Delivery</Text>
                </View>
                <View style={{ marginBottom: 15 }}>
                    <Text style={{ fontSize: 12, color: "#999" }}>REFERENCE</Text>
                    <Text style={{ color: "#000", fontSize: 16, fontWeight: "bold" }}>PO#86868686</Text>
                </View>
                <View style={{ marginBottom: 15 }}>
                    <Text style={{ fontSize: 12, color: "#999" }}>DELIVERY ORDER</Text>
                    <Text style={{ color: "#000", fontSize: 16, fontWeight: "bold" }}>DO#86868686</Text>
                </View>
                <View style={{ marginBottom: 15 }}>
                    <Text style={{ fontSize: 12, color: "#999" }}>TYPE</Text>
                    <Text style={{ color: "#000", fontSize: 16, fontWeight: "bold" }}>Inbound Delivery</Text>
                </View>
                <View style={{ marginBottom: 15 }}>
                    <Text style={{ fontSize: 12, color: "#999" }}>REFERENCE</Text>
                    <Text style={{ color: "#000", fontSize: 16, fontWeight: "bold" }}>PO#86868686</Text>
                </View>
                <View style={{ marginBottom: 0 }}>
                    <Text style={{ fontSize: 12, color: "#999" }}>DELIVERY ORDER</Text>
                    <Text style={{ color: "#000", fontSize: 16, fontWeight: "bold" }}>DO#86868686</Text>
                </View>
            </View>
        )
    }
}

class FormPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            page: props.currentPage ? props.currentPage : '1',
            isError: true
        }
    }

    componentDidUpdate(prevProps) {
        const {currentPage} = this.props
        if (currentPage !== prevProps.currentPage) {
            this.setState({page: currentPage})
        }
    }

    render() {
        const {page, isError} = this.state
        const {totalPage, onSave} = this.props
        return (
            <View style={{ padding: 15 }}>
                <View style={{ marginBottom: 15 }}>
                    <Text style={{fontSize: 16, color: Colors.black, marginBottom: 10}}>Set page from 1 until {totalPage}</Text>
                    <TextInput
                        onChangeText={(page) => {
                            let status = true
                            if (page != '' && page != '0' && page <= totalPage) {
                                status = false
                            }
                            this.setState({ page, isError: status })
                        }}
                        onSubmitEditing={() => {
                            Keyboard.dismiss()
                        }}
                        value={page}
                        blurOnSubmit={false}
                        returnKeyType={"done"}
                        keyboardType={"numeric"}
                        style={{
                            padding: 15,
                            paddingTop: 5,
                            paddingBottom: 5,
                            borderRadius: 8,
                            fontSize: 38,
                            textAlign: 'center',
                            color: isError ? Colors.error : Colors.lightGrey,
                            borderColor: isError ? Colors.error : Colors.lightGrey,
                            borderWidth: 1
                        }}
                        placeholder={"0"}
                        placeholderTextColor={Colors.lightGrey}
                        underlineColorAndroid={'transparent'} />
                </View>
                <ButtonNext 
                    title={'Save Changes'} 
                    type={isError ? 'primary' : 'main'}
                    onPress={() => {
                        !isError ? onSave(page) : console.log('preseed')
                    }} />
            </View>
        )
    }
}

class CardSearchMaterial extends Component {
    constructor(props) {
        super(props)
        this.state = {
            search: ''
        }
    }

    render () {
        const {search} = this.state
        const {onChange} = this.props
        return (
            <View style={{ padding: 15, borderBottomWidth: 0.5, borderBottomColor: '#ccc' }}>
                <View>
                    <TextInput
                        onChangeText={(search) => {
                            this.setState({ search })
                            // this.setState({ search }, () => onChange(search))
                        }}
                        onSubmitEditing={() => {
                            Keyboard.dismiss()
                            onChange(search)
                        }}
                        value={search}
                        blurOnSubmit={false}
                        returnKeyType={"search"}
                        keyboardType={"text"}
                        style={{
                            padding: 15,
                            paddingTop: 6,
                            paddingBottom: 6,
                            borderRadius: 8,
                            fontSize: 16,
                            textAlign: 'left',
                            color: Colors.black,
                            borderColor: Colors.lightGrey,
                            borderWidth: 1
                        }}
                        placeholder={"Search material by name or kimap.."}
                        placeholderTextColor={Colors.lightGrey}
                        underlineColorAndroid={'transparent'} />
                    {search !== '' && (
                        <TouchableOpacity 
                            onPress={() => {
                                this.setState({ search: '' }, () => onChange(''))
                            }}
                            style={{
                                position: 'absolute',
                                right: 0,
                                width: 42,
                                height: 42,
                                borderRadius: 100,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                            <Icon name={'close'} size={20} />
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        )
    }
}

class CardMaterialCheckCount extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isFormPage: false,
            stopwatchStart: false,
            stopwatchReset: false,
            visibleBottomPopup: false,
            visibleLoader: props.loader ? props.loader : false,
            countDone: 0,
            lastMsecs: props.lastMsecs ? props.lastMsecs : msecs,
            limitIndex: props.limit ? props.limit : 10,
            totalMaterial: 0
        }
    }

    static defaultProps = {
        onVerifiedPress: () => null
    }

    componentDidMount() {
        const {data, countMaterial} = this.props
        let count = 0
        data && data.map((dt) => {
            count += (dt.isConfirmed) ? 1 : 0
            return null
        })
        this.setState({countDone: count, totalMaterial: countMaterial})
    }

    componentDidUpdate(prevProps) {
        const {data, countMaterial, loader} = this.props
        if (data !== prevProps.data) {
            this.setState({totalMaterial: countMaterial})
        }
    }

    render() {
        const { onLoadMore, onPrevMore, onNextMore, onPress, onScanner, onChangePhysic, btnTitle, data, isRouteEnable, enablePrinting, ml_number, do_number, wh_name, loader, offset, limit, onSearchChange } = this.props
        const { visibleBottomPopup, countDone, totalMaterial, isFormPage } = this.state
        const totalPage = Math.ceil((totalMaterial / limit))
        const currentPage = totalPage !== 0 ? (offset + 1) : 0
        return (
            <View style={{ borderBottomWidth: 0.5, borderBottomColor: '#ccc' }}>
                <View style={{ marginTop: 0, backgroundColor: "#fff", padding: 20, borderTopWidth: 0.5, borderTopColor: '#ccc', borderBottomWidth: 0.5, borderBottomColor: '#ccc' }}>
                    <View style={{ flex: 0, flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 5 }}>
                        <Text style={{ fontSize: 16, fontWeight: "bold", color: "#000" }}>Material List (#{ml_number ? ml_number : '-'})</Text>
                    </View>
                    <View style={{ flex: 0, flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 0 }}>
                        <Text style={{ fontSize: 12, fontWeight: "normal", color: "#999" }}>#{do_number ? do_number : '-'}</Text>
                        <Text style={{ fontSize: 12, fontWeight: "normal", color: "#999" }}>{wh_name ? wh_name : '-'}</Text>
                    </View>
                </View>

                <CardSearchMaterial onChange={(search) => onSearchChange(search)} />

                {data && data.map((dt, index) => {
                    return (
                        <CardMaterialListCount 
                            key={index} 
                            data={dt}
                            enablePrinting={enablePrinting}
                            isRouteEnable={isRouteEnable}
                            onScanner={onScanner ? (type) => onScanner(type, dt) : () => console.log('scanner')}
                            onChange={(data, physic, material, status) => {
                                onChangePhysic(physic, material, status)
                                this.setState({countDone: (this.state.countDone + data)})
                            }} 
                            onEnlarge={() => this.setState({visibleBottomPopup: true, isMaterialDetail: false})} />
                    )
                })}

                <View style={{ marginTop: 0, padding: 20, paddingTop: 18, justifyContent: 'center', alignItems: 'center'}}>
                    {loader ? (
                        <View style={{ width: 100, alignItems: 'center' }}>
                            <Spinkit isVisible={true} size={35} type="Circle" color={Colors.main} />
                        </View>
                    ) : (
                        <View style={{ width: 300, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <ButtonNext 
                                title={'Prev'} 
                                type={offset === 0 ? 'primary' : 'main'}
                                setBorderRadius={0}
                                enableBorderRadius={true}
                                onPress={() => {
                                    offset > 0 && this.setState({limitIndex: (this.state.limitIndex - data.length)})
                                    offset > 0 && onPrevMore()
                                }} />
                            <TouchableOpacity 
                                onPress={() => currentPage ? this.setState({visibleBottomPopup: true, isFormPage: true}) : console.log('no data')}
                                style={{width: 80, height: 40, borderRadius: 40, backgroundColor: Colors.whiteGrey, alignItems: 'center', justifyContent: 'center', marginLeft: 10, marginRight: 10}}>
                                <Text style={{fontSize: 16, color: currentPage ? Colors.black : Colors.lightGrey}}>{currentPage}/{totalPage}</Text>
                            </TouchableOpacity>
                            <ButtonNext 
                                title={'Next'} 
                                type={data.length === limit ? 'main' : 'primary'}
                                setBorderRadius={0}
                                enableBorderRadius={true}
                                onPress={() => {
                                    data.length === limit && this.setState({limitIndex: (this.state.limitIndex + data.length)})
                                    data.length === limit && onNextMore()
                                }} />
                        </View>
                    )}
                </View>

                {(countDone >= data.length) && (
                    <View style={{ marginTop: 0, backgroundColor: "#fff", padding: 20, borderTopColor: '#ccc', borderTopWidth: 0.5}}>
                        {(data.length > 0) && (
                            <ButtonNext 
                                title={btnTitle ? btnTitle : 'Done and Next'} 
                                onPress={() => onPress()} />
                        )}
                    </View>
                )}

                <BottomPopup 
                    visible={visibleBottomPopup} 
                    title={isFormPage ? 'Form Page' : 'Material KIMAP'} 
                    onDismiss={() => this.setState({visibleBottomPopup: false, isFormPage: false})}>
                    <View style={{ paddingTop: 25, height: isFormPage ? 200 : (Dimensions.get('screen').height - 200)}}>
                        <View style={{ flex: 1, flexDirection: 'column' }}>
                            <ScrollView>
                                {!isFormPage ? (
                                    <MaterialDetail />
                                 ) : (
                                    <FormPage 
                                        currentPage={currentPage} 
                                        totalPage={totalPage} 
                                        onSave={(page) => {
                                            onLoadMore && onLoadMore(page)
                                            this.setState({visibleBottomPopup: false, isFormPage: false})
                                        }} />
                                 )}
                            </ScrollView>
                        </View>
                    </View>
                </BottomPopup>
            </View>
        )
    }
}

const options = {
    container: {
        backgroundColor: '#fff',
        padding: 0,
        borderRadius: 5
    },
    text: {
        fontSize: 12,
        fontWeight: 'normal',
        color: '#999',
    }
}

export default CardMaterialCheckCount