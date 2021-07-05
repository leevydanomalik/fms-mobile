import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, ScrollView, Keyboard } from 'react-native'
import ButtonNext from './ButtonNext'
import BottomPopup from './BottomPopup'
import Spinkit from 'react-native-spinkit'
import { Colors } from '../../Themes'

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

class CardMaterial extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visibleBottomPopup: false,
            visibleLoader: props.loader ? props.loader : false,
            countDone: 0,
            totalMaterial: 0,
            limitIndex: props.limit ? props.limit : 10
        }
    }

    componentDidMount() {
        const {countMaterial} = this.props
        this.setState({totalMaterial: countMaterial})
    }

    componentDidUpdate(prevProps) {
        const {countMaterial} = this.props
        if (countMaterial !== prevProps.countMaterial) {
            this.setState({totalMaterial: countMaterial})
        }
    }

    render() {
        const {title, data, loader, offset, limit, onLoadMore, onPrevMore, onNextMore, enablePaging} = this.props
        const {visibleBottomPopup, totalMaterial} = this.state
        const currentPage = (offset + 1)
        const totalPage = Math.ceil((totalMaterial / limit))
        return (
            <View style={{ backgroundColor: "#fff", marginTop: 0 }}>
                {title && <Text style={{ padding: 15, fontSize: 16, fontWeight: "bold", color: "#999" }}>{title}</Text>}
                <View style={{paddingLeft: 15, paddingRight: 15}}>
                    {data && data.map((items, index) => {
                        // console.log('items', items)
                        const { material } = items.material
                        const qty = items.qtyUoM 
                            ? items.qtyUoM 
                            : '0'
                        return (
                            <View key={index} style={{ flexDirection: 'row', marginBottom: 10, flex: 1 }}>
                                <View style={{ flex: 0.8 }}>
                                    <Text style={{ flex: 1, fontSize: 13, paddingBottom: 10 }}>{`${material && material.materialName} (${material && material.materialKimap})`} </Text>
                                </View>
                                <View style={{ flex: 0.2 }} >
                                    <Text style={{ flex: 1, fontSize: 13, textAlign: "right", paddingBottom: 10 }}>{`${qty} ${material && material.materialUoM.value}`}</Text>
                                </View>
                            </View>
                        )
                    })}
                </View>
                {enablePaging && (
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
                                    onPress={() => this.setState({visibleBottomPopup: true})}
                                    style={{width: 80, height: 40, borderRadius: 40, backgroundColor: Colors.whiteGrey, alignItems: 'center', justifyContent: 'center', marginLeft: 10, marginRight: 10}}>
                                    <Text style={{fontSize: 16, color: Colors.black}}>{currentPage}/{totalPage}</Text>
                                </TouchableOpacity>
                                <ButtonNext 
                                    title={'Next'} 
                                    type={data && data.length === limit ? 'main' : 'primary'}
                                    setBorderRadius={0}
                                    enableBorderRadius={true}
                                    onPress={() => {
                                        data.length === limit && this.setState({limitIndex: (this.state.limitIndex + data.length)})
                                        data.length === limit && onNextMore()
                                    }} />
                            </View>
                        )}
                    </View>
                )}

                {enablePaging && (
                    <BottomPopup 
                        visible={visibleBottomPopup} 
                        title={'Form Page'} 
                        onDismiss={() => this.setState({visibleBottomPopup: false})}>
                        <View style={{ paddingTop: 25, height: 200}}>
                            <View style={{ flex: 1, flexDirection: 'column' }}>
                                <ScrollView>
                                    <FormPage 
                                        currentPage={currentPage} 
                                        totalPage={totalPage} 
                                        onSave={(page) => {
                                            onLoadMore && onLoadMore(page)
                                            this.setState({visibleBottomPopup: false})
                                        }} />
                                </ScrollView>
                            </View>
                        </View>
                    </BottomPopup>
                )}
            </View>
        )
    }
}

export default CardMaterial