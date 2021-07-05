import React, { Component } from 'react'
import { View, ScrollView, Text, TouchableOpacity, Dimensions, TextInput, Keyboard, Image, StyleSheet, Alert } from 'react-native'
import FeIcon from 'react-native-vector-icons/Feather'
import Fa5Icon from 'react-native-vector-icons/FontAwesome5'
import NavbarMenu from '../Components/NavbarMenu'
import ButtonNext from '../Components/ButtonNext'
import { Styles, Colors } from '../../Themes'
import CardSmallScanner from './CardSmallScanner'
import CardContract from './CardContract'
import { connect } from 'react-redux'
import SealAction from '../../Redux/SealRedux'
import BottomPopup from './BottomPopup'
import CardPrintLabelling from './CardPrintLabelling'
import Config from 'react-native-config'
import { generateUrlPhotoMaterial, generateUrlPhotoGR } from '../../Utils'
import ProgressiveImage from '../Modules/ProgressiveImage'
import CardMaterialInfo from './CardMaterialInfo'
import { RNCamera } from 'react-native-camera'
import API from '../../Services/Api'
import M from 'moment'

class CardUploadPicture extends Component {
    constructor(props) {
        super(props)
        this.state = {
            enablePlaceholder: false
        }
    }

    componentDidMount() {
        this.restCache()
    }

    restCache = async () => {
        let rest = await API.create().cacheTrx()
        if (rest) {
            console.log('generatePhoto', rest)
        }
    }

    render() {
        const { enablePlaceholder } = this.state
        const { image, referenceID, itemID } = this.props
        return (
            <TouchableOpacity
                onPress={() => {
                    console.log('ahuy')
                    this.props.openCamera(true)
                }}
                style={{
                    width: 150,
                    height: 200,
                    marginLeft: 5,
                    marginRight: 5,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: Colors.whiteGrey
                }}>
                {image ? (
                    <Image source={{ uri: image }} style={{ width: 200, height: 200, margin: 5 }} /> 
                ) : (
                    <View style={{ 
                        width: "100%", 
                        height: "100%",
                        alignItems: "center"
                    }}>
                        <ProgressiveImage
                            resizeMode="cover" 
                            sizeSpinner={30}
                            disableNotFoundInfo={true}
                            isImageDownloaded={(data) => this.setState({enablePlaceholder: !data})}
                            style={{ 
                                width: "100%", 
                                height: "100%",
                                backgroundColor: Colors.whiteGrey
                            }}
                            source={{
                                uri: generateUrlPhotoGR(referenceID, itemID),
                                headers: {
                                    'Content-Type': 'application/json',
                                    'DGI-API-KEY': Config.APP_WMS_AUTH_HEADER_VALUE
                                    // 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiJ9.5BG9SEVOGo_xRhtT8IkyoSy60kPg8HM9Vpvb0TdNew4'
                                }
                            }} />
                        
                        {enablePlaceholder && (
                            <View style={{ position: 'absolute', top: 60, alignItems: "center" }}>
                                <FeIcon name={'image'} size={42} color={Colors.lightGrey} />
                                <Text style={{ fontSize: 12, fontWeight: 'bold', color: Colors.black, marginTop: 10 }}>Add nore photo..</Text>
                            </View>
                        )}
                    </View>
                )}
            </TouchableOpacity>
        )
    }
}

class MaterialStatusCount extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isScanned: false,
            isDone: props.btnStatus ? props.btnStatus : false,
            isRotate: true,
            shipTo: 'Z1000',
            physic: props.material.physic !== '0' ? props.material.physic : ''
        }
    }

    componentDidUpdate(prevProps) {
        const {material} = this.props
        if (material.physic !== prevProps.material.physic) {
            this.setState({physic: material.physic})
            console.log('material.physic', material.physic)
        }
    }

    render() {
        const { physic } = this.state
        const { onEnlarge, onBack, onSave, onScanner, title, BQStatus, HUStatus, materialStatus, palletStatus, data, material } = this.props
        const { materialType, palletType, HUType, BQType, isNeedAlert } = this.props
        const btnStatus = materialType && palletType && HUType && BQType ? true : false
        const bannerStatus = material.isConfirmed ? true : btnStatus ? true : false
        const detail = material && material.detail ? material.detail : null
        return (
            <View style={{ padding: 15 }}>
                <CardBanner
                    isDone={bannerStatus}
                    title={title}
                />
                <View style={{ padding: 0, paddingBottom: 20, paddingTop: 5, borderBottomColor: '#ccc', borderBottomWidth: 0.5, }}>
                    <View style={{ flex: 1, marginBottom: 15 }}>
                        <Text style={{ color: Colors.black, fontSize: 16, fontWeight: "bold" }}>
                            {material && material.wh_name ? material.wh_name : '-'}
                        </Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}>
                        <View style={{ flex: 0, alignItems: 'flex-start', paddingLeft: 0, paddingRight: 20 }}>
                            <Text style={{ fontSize: 12, color: Colors.black, fontWeight: 'bold' }}>SAP</Text>
                            <Text style={{ color: material && material.sap && material.sap !== '0' ? Colors.black : Colors.lightGrey, fontSize: 28 }}>
                                {material && material.sap ? material.sap : '0'}
                            </Text>
                        </View>
                        <View style={{ flex: 0, alignItems: 'flex-start', paddingLeft: 0, paddingRight: 20 }}>
                            <Text style={{ fontSize: 12, color: Colors.black, fontWeight: 'bold' }}>WMS</Text>
                            <Text style={{ color: material && material.wms && material.wms !== '0' ? Colors.black : Colors.lightGrey, fontSize: 28 }}>
                                {material && material.wms ? material.wms : '0'}
                            </Text>
                        </View>
                        <View style={{ flex: 0, alignItems: 'flex-start', paddingLeft: 0, paddingRight: 20 }}>
                            <Text style={{ fontSize: 12, color: Colors.black, fontWeight: 'bold' }}>PHYSIC</Text>
                            <Text style={{ color: physic && physic !== '0' ? Colors.black : Colors.black, fontSize: 28 }}>
                                {physic ? physic : '0'}
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={{ padding: 0, paddingBottom: 20, paddingTop: 20, borderBottomColor: '#ccc', borderBottomWidth: 0.5, }}>
                    <View style={{ flex: 0, flexDirection: "row", justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <TouchableOpacity
                            style={{
                                width: 35,
                                height: 50,
                                marginRight: 8
                            }}
                            onPress={() => onEnlarge()}>
                            <ProgressiveImage
                                resizeMode="cover"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    backgroundColor: Colors.whiteGrey
                                }}
                                sizeSpinner={20}
                                source={{
                                    uri: generateUrlPhotoMaterial(detail && detail.id),
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'DGI-API-KEY': Config.APP_WMS_AUTH_HEADER_VALUE,
                                        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiJ9.5BG9SEVOGo_xRhtT8IkyoSy60kPg8HM9Vpvb0TdNew4'
                                    }
                                }} />
                        </TouchableOpacity>
                        <View style={{ flex: 1, marginBottom: 0 }}>
                            <Text style={{ color: Colors.black, fontSize: 14, fontWeight: "bold" }}>
                                Material
                            </Text>
                            <Text style={{ fontSize: 14, fontWeight: 'normal', color: Colors.grey }}>
                                {material && material.name ? material.name : '-'}
                            </Text>
                            <Text style={{ color: Colors.grey, fontSize: 12, fontWeight: "bold" }}>
                                {material && material.kimap ? material.kimap : '-'}
                            </Text>
                        </View>
                        <View style={{ width: 120, paddingTop: 5, alignItems: 'flex-end' }}>
                            <CardSmallScanner
                                code={material && material.kimap}
                                isScanned={material.isConfirmed ? true : materialStatus}
                                isWrong={material.isConfirmed ? false : !materialType}
                                onPress={onScanner ? () => onScanner('MATERIAL', material && material.kimap) : null}
                                isCheckDesign={true} />
                        </View>
                    </View>

                    <View style={{ flex: 0, flexDirection: "row", justifyContent: 'space-between', alignItems: 'flex-start', marginTop: 20 }}>
                        <View
                            style={{
                                width: 35,
                                height: 35,
                                marginRight: 10,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                            <Fa5Icon name={'pallet'} size={18} color={Colors.lightGrey} />
                        </View>
                        <View style={{ flex: 1, marginBottom: 0 }}>
                            <Text style={{ color: Colors.black, fontSize: 14, fontWeight: "bold" }}>
                                Pallet
                            </Text>
                            <Text style={{ fontSize: 14, fontWeight: 'normal', color: Colors.grey }}>
                                Pallet Type {material && material.hu_cap ? material.hu_cap : '-'} {material && material.uom ? material.uom : '-'}
                            </Text>
                            <Text style={{ color: Colors.grey, fontSize: 12, fontWeight: "bold" }}>
                                {material && material.hu_no ? material.hu_no : '-'}
                            </Text>
                        </View>
                        <View style={{ width: 120, paddingTop: 5, alignItems: 'flex-end' }}>
                            <CardSmallScanner
                                code={material && material.hu_no}
                                isScanned={material.isConfirmed ? true : palletStatus}
                                isWrong={material.isConfirmed ? false : !palletType}
                                onPress={onScanner ? () => onScanner('PALLET', material && material.hu_no) : null}
                                isCheckDesign={true} />
                        </View>
                    </View>
                </View>

                <View style={{ padding: 0, paddingBottom: 20, paddingTop: 0, borderBottomColor: '#ccc', borderBottomWidth: 0.5 }}>
                    <CardContract
                        disableTitle={true}
                        data={data} />
                    {data && (
                        <View style={{ position: 'absolute', top: 30, right: 0 }}>
                            <CardSmallScanner
                                code={material && material.hu_no}
                                isScanned={material.isConfirmed ? true : HUStatus}
                                isWrong={material.isConfirmed ? false : !HUType}
                                onPress={onScanner ? () => onScanner('HU', material && material.hu_no) : null}
                                isCheckDesign={true} />
                        </View>
                    )}
                    {data && (
                        <View style={{ position: 'absolute', top: 120, right: 0 }}>
                            <CardSmallScanner
                                code={data && data[1].description}
                                isScanned={material.isConfirmed ? true : BQStatus}
                                isWrong={material.isConfirmed ? false : !BQType}
                                onPress={onScanner ? () => onScanner('BQ', data && data[1].description) : null}
                                isCheckDesign={true} />
                        </View>
                    )}
                </View>
                
                {btnStatus && (
                    <View style={{ padding: 0, paddingBottom: 20, paddingTop: 20, borderBottomColor: '#ccc', borderBottomWidth: 0.5 }}>
                        <Text style={{ color: Colors.black, fontSize: 16, fontWeight: "bold" }}>Physical Count</Text>
                        <Text style={{ fontSize: 12, color: Colors.black, marginTop: 10 }}>
                            Please input the actual number of containing pallet quantity per UoM base
                        </Text>
                        <View style={{ marginTop: 20 }}>
                            <TextInput
                                onChangeText={(physic) => this.setState({ physic })}
                                onSubmitEditing={() => {
                                    Keyboard.dismiss()
                                }}
                                value={physic}
                                blurOnSubmit={false}
                                returnKeyType={"done"}
                                keyboardType={"numeric"}
                                style={{
                                    padding: 15,
                                    paddingTop: 8,
                                    paddingBottom: 8,
                                    borderRadius: 8,
                                    fontSize: 38,
                                    textAlign: 'center',
                                    color: Colors.error,
                                    borderColor: Colors.error,
                                    borderWidth: 1
                                }}
                                placeholder={"0"}
                                placeholderTextColor={Colors.lightGrey}
                                underlineColorAndroid={'transparent'} />
                        </View>
                    </View>
                )}
                <View style={{ paddingTop: 20, paddingBottom: 10 }}>
                    {btnStatus && (
                        <View style={{ paddingBottom: 10 }}>
                            <ButtonNext
                                title={'CONFIRMED'} type={'main'}
                                enableBorderRadius={false}
                                onPress={() => onSave(btnStatus, physic)} />
                        </View>
                    )}
                    <View style={{ paddingBottom: 0 }}>
                        <ButtonNext
                            title={'CANCEL'}
                            type={'error-reverse'}
                            enableBorderRadius={false}
                            onPress={() => {
                                (isNeedAlert) ? Alert.alert(
                                    'Information',
                                    'Are you sure?',
                                    [
                                        {
                                            text: 'Cancel',
                                            onPress: () => console.log('Cancel Pressed'),
                                            style: 'cancel'
                                        },
                                        { 
                                            text: 'OK', 
                                            onPress: () => onBack()
                                        }
                                    ],
                                    { cancelable: false }
                                ) : onBack()
                            }} />
                    </View>
                </View>
            </View>
        )
    }
}

class MaterialStatusSimple extends Component {
    constructor(props) {
        super(props)
        const {material} = props
        const info_zone = material.info_zone ? material.info_zone : 'UNSET'
        this.state = {
            isDone: props.btnStatus ? props.btnStatus : false,
            visibleReason: false,
            visibleWrongQty: false,
            isReasonDone: props.disableReason ? true : false,
            openCamera: false,
            image: '',
            indexForZone: null,
            indexForReason: null,
            labelForZone: '',
            labelForReason: '',
            material_wrong_qty: '',
            zone: [
                { id: 1, label: (info_zone + ' - GOOD'), isGood: true },
                { id: 2, label: (info_zone + ' - NOT GOOD'), isGood: false },
            ],
            reasons: [
                { id: 1, label: 'PACKAGE BROKEN' },
                { id: 2, label: 'MATERIAL LEAKS' },
                { id: 3, label: 'MATERIAL WRONG QUANTITY'},
                { id: 4, label: 'MATERIAL WRONG KIMAP' }
            ]

        }
    }

    componentDidMount() {
        const {material} = this.props
        const {material_condition, material_not_good_reason, material_wrong_qty} = material
        this.findZoneByLabel(material_condition)
        this.findReasonByLabel(material_not_good_reason)
        this.setState({visibleWrongQty: (material_not_good_reason === 'MATERIAL WRONG QUANTITY') ? true : false, material_wrong_qty: material_wrong_qty})

        console.log('detail material_wrong_qty', material_wrong_qty)
        console.log('detail material_condition', material_condition)
        console.log('detail material_not_good_reason', material_not_good_reason)
    }

    findZoneByLabel = (label) => {
        let selectedIndex = null
        let visibleReason = false
        if (label === 'GOOD') {
            selectedIndex = 0
            visibleReason = false
        }
        if (label === 'NOT GOOD') {
            selectedIndex = 1
            visibleReason = true
        }
        console.log('findZoneByLabel', selectedIndex)
        this.setState({indexForZone: selectedIndex, labelForZone: label, visibleReason})
    }

    findReasonByLabel = (label) => {
        const {reasons} = this.state
        let selectedIndex = null
        reasons && reasons.map((dt, index) => {
            if (dt.label === label) {
                selectedIndex = index
            }
            return null
        })
        console.log('findReasonByLabel', selectedIndex)
        this.setState({indexForReason: selectedIndex, labelForReason: label})
    }

    takePicture = async () => {
        if (this.camera) {
            const options = { pauseAfterCapture: true, quality: 0.5, base64: true, fixOrientation: true, mirrorImage: false };
            const datas = await this.camera.takePictureAsync(options);
            let image = datas.uri
            this.setState({ image })
            console.log(datas.uri);
        }
    }

    postPhoto = async () => {
        const { material } = this.props
        let reference = material && material.document && material.document.reference ? material.document.reference : "NONE"
        let itemID = material && material.item_id ? material.item_id : "NONE"
        const data = new FormData();
        data.append('objectID', reference)
        data.append('grItemsID', itemID)
        data.append('file', {
            uri: this.state.image,
            type: 'image/jpeg',
            name: 'PHOTO-' + M().format('x') + '.jpg'
        })
        let res = await API.create().postImageMaterialGr(data)
        console.log("upload", res, data)
        this.setState({ openCamera: false, isReasonDone: true })
    }

    render() {
        const { visibleReason, isReasonDone, openCamera, image, indexForZone, indexForReason, labelForZone, labelForReason, zone, reasons, visibleWrongQty, material_wrong_qty } = this.state
        const { onEnlarge, onSave, data, title, onScanner, onBack, material, disableReason, isNeedAlert } = this.props
        const detail = material && material.detail ? material.detail : null
        const driver = material && material.driver ? material.driver : null
        const document = material && material.document ? material.document : null
        const reasonMaterial = material && material.reason ? material.reason : null
        const { materialStatus, BQStatus, HUStatus, palletStatus } = this.props
        const { materialType, BQType, HUType, palletType } = this.props
        const btnStatus = materialType && palletType && HUType && BQType ? true : false
        const bannerStatus = material.isConfirmed ? true : btnStatus ? true : false
        const isDone = reasonMaterial === 'GOOD' ? true : false
        const btnReasonSatus = isReasonDone && bannerStatus ? true : false
        console.log('bannerStatus', bannerStatus)
        console.log('isReasonDone', isReasonDone)
        return (
            <View>
                {openCamera ?
                    image === "" ?
                        <View style={{ backgroundColor: "black", height: (Dimensions.get('screen').height) }}>
                            <RNCamera
                                ref={ref => {
                                    this.camera = ref;
                                }}
                                style={styles.preview}
                                type={RNCamera.Constants.Type.back}
                                flashMode={RNCamera.Constants.FlashMode.on}
                                androidCameraPermissionOptions={{
                                    title: 'Permission to use camera',
                                    message: 'We need your permission to use your camera',
                                    buttonPositive: 'Ok',
                                    buttonNegative: 'Cancel',
                                }}
                                androidRecordAudioPermissionOptions={{
                                    title: 'Permission to use audio recording',
                                    message: 'We need your permission to use your audio',
                                    buttonPositive: 'Ok',
                                    buttonNegative: 'Cancel',
                                }}
                            />
                            <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                                <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
                                    <Fa5Icon name={'camera'} size={40} color={Colors.white} />
                                </TouchableOpacity>
                            </View>
                        </View> :
                        <View style={{ backgroundColor: "black", height: (Dimensions.get('screen').height) }}>
                            <Image source={{ uri: image }} style={{ width: "100%", height: "100%", backgroundColor: 'black' }} />
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', position: "absolute", bottom: 10, alignSelf: "center" }}>
                                <View style={{ width: "90%", flexDirection: "row", paddingBottom: 10 }}>
                                    <TouchableOpacity
                                        onPress={() => this.setState({ image: "" })}
                                        style={{
                                            backgroundColor: Colors.main,
                                            borderRadius: 5,
                                            padding: 10,
                                            alignSelf: 'center',
                                            alignItems: "center",
                                            flex: 1,
                                            marginRight: 5
                                        }}>
                                        <Text style={{ letterSpacing: 1, color: "#fff", fontSize: 14 }}>Retake Photo</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => this.postPhoto()}
                                        style={{
                                            backgroundColor: Colors.main,
                                            borderRadius: 5,
                                            padding: 10,
                                            alignSelf: 'center',
                                            alignItems: "center",
                                            flex: 1,
                                            marginLeft: 5
                                        }}>
                                        <Text style={{ letterSpacing: 1, color: "#fff", fontSize: 14 }}>Save</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View> :
                    <View style={{ padding: 15 }}>
                        <CardBanner isDone={bannerStatus} title={title} />
                        <View style={{ padding: 0, paddingBottom: 20, paddingTop: 0, borderBottomColor: '#ccc', borderBottomWidth: 0.5, }}>
                            <Text style={{ color: Colors.black, fontSize: 16, fontWeight: "bold" }}>
                                Notes
                            </Text>
                            <Text style={{ fontSize: 14, color: Colors.grey, marginTop: 5 }}>
                                {material && material.note ? material.note : '-'}
                            </Text>
                        </View>
                        <View style={{ padding: 0, paddingBottom: 20, paddingTop: 20, borderBottomColor: '#ccc', borderBottomWidth: 0.5, }}>
                            <View style={{ flex: 0, flexDirection: "row", justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <TouchableOpacity
                                    style={{
                                        width: 35,
                                        height: 50,
                                        marginRight: 8
                                    }}
                                    onPress={() => onEnlarge()}>
                                    <ProgressiveImage
                                        resizeMode="cover"
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            backgroundColor: Colors.whiteGrey
                                        }}
                                        sizeSpinner={20}
                                        source={{
                                            uri: generateUrlPhotoMaterial(detail && detail.id),
                                            headers: {
                                                'Content-Type': 'application/json',
                                                'DGI-API-KEY': Config.APP_WMS_AUTH_HEADER_VALUE
                                                // 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiJ9.5BG9SEVOGo_xRhtT8IkyoSy60kPg8HM9Vpvb0TdNew4'
                                            }
                                        }} />
                                </TouchableOpacity>
                                <View style={{ flex: 1, marginBottom: 0 }}>
                                    <Text style={{ color: Colors.black, fontSize: 14, fontWeight: "bold" }}>
                                        Material
                                    </Text>
                                    <Text style={{ fontSize: 14, fontWeight: 'normal', color: Colors.grey }}>
                                        {material && material.name ? material.name : '-'}
                                    </Text>
                                    <Text style={{ color: Colors.grey, fontSize: 12, fontWeight: "bold" }}>
                                        {material && material.kimap ? material.kimap : '-'}
                                    </Text>
                                </View>
                                <View style={{ width: 120, paddingTop: 5, alignItems: 'flex-end' }}>
                                    <CardSmallScanner
                                        code={material && material.kimap}
                                        isScanned={material.isConfirmed ? true : materialStatus}
                                        isWrong={material.isConfirmed ? false : !materialType}
                                        onPress={onScanner ? () => onScanner('MATERIAL', material && material.kimap) : null}
                                        isCheckDesign={true} />
                                </View>
                            </View>

                            <View style={{ flex: 0, flexDirection: "row", justifyContent: 'space-between', alignItems: 'flex-start', marginTop: 20 }}>
                                <View
                                    style={{
                                        width: 35,
                                        height: 35,
                                        marginRight: 10,
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                    <Fa5Icon name={'pallet'} size={18} color={Colors.lightGrey} />
                                </View>
                                <View style={{ flex: 1, marginBottom: 0 }}>
                                    <Text style={{ color: Colors.black, fontSize: 14, fontWeight: "bold" }}>
                                        Pallet
                                    </Text>
                                    <Text style={{ fontSize: 14, fontWeight: 'normal', color: Colors.grey }}>
                                        Pallet Type {material && material.detail.hu_cap ? material.detail.hu_cap : '-'} {material && material.detail.uom ? material.detail.uom : '-'}
                                    </Text>
                                    <Text style={{ color: Colors.grey, fontSize: 12, fontWeight: "bold" }}>
                                        {material && material.hu_no ? material.hu_no : '-'}
                                    </Text>
                                </View>
                                <View style={{ width: 120, paddingTop: 5, alignItems: 'flex-end' }}>
                                    <CardSmallScanner
                                        code={material && material.hu_no}
                                        isScanned={material.isConfirmed ? true : palletStatus}
                                        isWrong={material.isConfirmed ? false : !palletType}
                                        onPress={onScanner ? () => onScanner('PALLET', material && material.hu_no) : null}
                                        isCheckDesign={true} />
                                </View>
                            </View>
                        </View>
                        <View style={{ padding: 0, paddingBottom: 20, paddingTop: 0, borderBottomColor: '#ccc', borderBottomWidth: 0.5, }}>
                            <CardContract
                                disableTitle={true}
                                data={data}
                            />
                            {data && data.map((dt, index) => {
                                let status = false
                                let type = false
                                let route = 'HU'
                                let position = 35 + (90 * index)

                                switch (index) {
                                    case 0:
                                        status = HUStatus
                                        type = HUType
                                        route = 'HU'
                                        break
                                    case 1:
                                        status = BQStatus
                                        type = BQType
                                        route = 'BQ'
                                        break
                                    default:
                                        break
                                }

                                return (
                                    <View 
                                        key={index}
                                        style={{ position: 'absolute', top: position, right: 0 }}>
                                        <CardSmallScanner
                                            code={dt.id}
                                            isScanned={material.isConfirmed ? true : status}
                                            isWrong={material.isConfirmed ? false : !type}
                                            onPress={onScanner ? () => onScanner(route, dt.id) : null}
                                            isCheckDesign={true} />
                                    </View>
                                )
                            })}
                        </View>
                        {!disableReason && (
                            <View style={{ padding: 0, paddingBottom: 30, paddingTop: 20, borderBottomColor: '#ccc', borderBottomWidth: 0.5, }}>
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 }}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ color: Colors.black, fontSize: 16, fontWeight: "bold" }}>Select Receiving Zone</Text>
                                        <Text style={{ color: Colors.grey, fontSize: 12, fontWeight: "normal" }}>
                                            #{document && document.delivery_order ? document.delivery_order : '-'}
                                        </Text>
                                    </View>
                                    <Text style={{ color: Colors.grey, fontSize: 12, fontWeight: "normal" }}>
                                        {driver && driver.company ? driver.company : '-'}
                                    </Text>
                                </View>
                                <View>
                                    <CardZone
                                        activeIndex={indexForZone}
                                        isDone={isDone}
                                        data={zone}
                                        onChange={(data, index) => {
                                            this.setState({
                                                visibleReason: !data ? true : false,
                                                isReasonDone: !data ? false : true,
                                                indexForZone: index,
                                                labelForZone: data ? 'GOOD' : 'NOT GOOD',
                                                labelForReason: '',
                                                indexForReason: null,
                                                material_wrong_qty: ''
                                            })
                                        }}
                                    />
                                </View>
                            </View>
                        )}
                        {!disableReason && visibleReason && (
                            <View style={{ padding: 0, paddingBottom: 30, paddingTop: 20, marginBottom: 1, borderBottomColor: '#ccc', borderBottomWidth: 0.5, }}>
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 }}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ color: Colors.black, fontSize: 16, fontWeight: "bold" }}>Select Reason</Text>
                                        <Text style={{ color: Colors.grey, fontSize: 12, fontWeight: "normal" }}>
                                            #{document && document.delivery_order ? document.delivery_order : '-'}
                                        </Text>
                                    </View>
                                    <Text style={{ color: Colors.grey, fontSize: 12, fontWeight: "normal" }}>
                                        {driver && driver.company ? driver.company : '-'}
                                    </Text>
                                </View>
                                <View>
                                    <CardZone
                                        activeIndex={indexForReason}
                                        onChange={(data, index) => {
                                            this.setState({
                                                isReasonDone: true,
                                                indexForReason: index,
                                                labelForReason: reasons[index].label,
                                                visibleWrongQty: (index === 2) ? true : false
                                            })
                                        }}
                                        isDone={isDone}
                                        data={reasons}
                                    />
                                </View>
                            </View>
                        )}
                        {!disableReason && visibleReason && visibleWrongQty && (
                            <View style={{ padding: 0, paddingBottom: 30, paddingTop: 20, marginBottom: 1, borderBottomColor: '#ccc', borderBottomWidth: 0.5, }}>
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 }}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ color: Colors.black, fontSize: 16, fontWeight: "bold" }}>Material Quantity</Text>
                                        <Text style={{ color: Colors.grey, fontSize: 12, fontWeight: "normal" }}>
                                            #{document && document.delivery_order ? document.delivery_order : '-'}
                                        </Text>
                                    </View>
                                </View>
                                <View style={{ marginTop: 0 }}>
                                    <TextInput
                                        onChangeText={(qty) => this.setState({ material_wrong_qty: qty, isReasonDone: true })}
                                        onSubmitEditing={() => {
                                            Keyboard.dismiss()
                                        }}
                                        value={material_wrong_qty.toString()}
                                        blurOnSubmit={false}
                                        returnKeyType={"done"}
                                        keyboardType={"numeric"}
                                        style={{
                                            padding: 15,
                                            paddingTop: 8,
                                            paddingBottom: 8,
                                            borderRadius: 8,
                                            fontSize: 38,
                                            textAlign: 'center',
                                            color: Colors.error,
                                            borderColor: Colors.error,
                                            borderWidth: 1
                                        }}
                                        placeholder={"0"}
                                        placeholderTextColor={Colors.lightGrey}
                                        underlineColorAndroid={'transparent'} />
                                </View>
                            </View>
                        )}
                        {!disableReason && visibleReason && (
                            <View style={{ padding: 0, paddingBottom: 30, paddingTop: 20, marginBottom: 1, borderBottomColor: '#ccc', borderBottomWidth: 0.5, }}>
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 }}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ color: Colors.black, fontSize: 16, fontWeight: "bold" }}>Upload Product Defect Picture</Text>
                                        <Text style={{ color: Colors.grey, fontSize: 12, fontWeight: "normal" }}>
                                            #{document && document.delivery_order ? document.delivery_order : '-'}
                                        </Text>
                                    </View>
                                </View>
                                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingTop: 0, paddingLeft: 0, paddingRight: 0, marginBottom: 0 }}>
                                    <CardUploadPicture 
                                        image={image} 
                                        referenceID={material && material.document && material.document.reference ? material.document.reference : "NONE"}
                                        itemID={material && material.item_id ? material.item_id : "NONE"}
                                        openCamera={(openCamera) => this.setState({ openCamera })} />
                                </ScrollView>
                            </View>
                        )}
                        <View style={{ paddingTop: 20, paddingBottom: 10 }}>
                            {btnReasonSatus && (
                                <View style={{ paddingBottom: 10 }}>
                                    <ButtonNext
                                        title={'CONFIRMED'}
                                        type={'main'}
                                        enableBorderRadius={false}
                                        onPress={() => onSave(btnStatus, labelForZone, labelForReason, material_wrong_qty)} />
                                </View>
                            )}
                            <View style={{ paddingBottom: 0 }}>
                                <ButtonNext
                                    title={'CANCEL'}
                                    type={'error-reverse'}
                                    enableBorderRadius={false}
                                    onPress={() => {
                                        (material.isConfirmed || isNeedAlert) ? Alert.alert(
                                            'Information',
                                            'Are you sure?',
                                            [
                                                {
                                                    text: 'Cancel',
                                                    onPress: () => console.log('Cancel Pressed'),
                                                    style: 'cancel'
                                                },
                                                { 
                                                    text: 'OK', 
                                                    onPress: () => onBack()
                                                }
                                            ],
                                            { cancelable: false }
                                        ) : onBack()
                                    }} />
                            </View>
                        </View>
                    </View>}
            </View>
        )
    }
}

class MaterialStatusList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isDone: props.btnStatus ? props.btnStatus : false,
            isRotate: true,
            shipTo: 'Z1000'
        }
    }
    render() {
        const { shipTo, isRotate } = this.state
        const { onEnlarge, onSave, title, enablePrinting, disableRouteZone, onScanner, onBack, data, material, label } = this.props
        const { materialStatus, BQStatus, HUStatus, VXStatus, palletStatus, isNeedAlert } = this.props
        const { materialType, BQType, HUType, VXType, palletType } = this.props
        const btnStatus = materialType && palletType && HUType && BQType && VXType ? true : false
        const bannerStatus = material.isConfirmed ? true : btnStatus ? true : false
        const detail = material && material.detail ? material.detail : null
        return (
            <View style={{ padding: 15 }}>
                <CardBanner
                    isDone={bannerStatus}
                    title={title}
                />
                <View style={{ padding: 0, paddingBottom: 20, paddingTop: 0, borderBottomColor: '#ccc', borderBottomWidth: 0.5, }}>
                    <Text style={{ color: Colors.black, fontSize: 16, fontWeight: "bold" }}>
                        Notes
                    </Text>
                    <Text style={{ fontSize: 14, color: Colors.grey, marginTop: 5 }}>
                        {material && material.note ? material.note : '-'}
                    </Text>
                </View>
                <View style={{ padding: 0, marginBottom: 1, paddingBottom: 20, paddingTop: 20, borderBottomColor: '#ccc', borderBottomWidth: 0.5, }}>
                    <View style={{ flex: 0, flexDirection: "row", justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <TouchableOpacity
                            style={{
                                width: 35,
                                height: 50,
                                marginRight: 8
                            }}
                            onPress={() => onEnlarge()}>
                            <ProgressiveImage
                                resizeMode="cover"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    backgroundColor: Colors.whiteGrey
                                }}
                                sizeSpinner={20}
                                source={{
                                    uri: generateUrlPhotoMaterial(detail && detail.id),
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'DGI-API-KEY': Config.APP_WMS_AUTH_HEADER_VALUE
                                        // 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiJ9.5BG9SEVOGo_xRhtT8IkyoSy60kPg8HM9Vpvb0TdNew4'
                                    }
                                }} />
                        </TouchableOpacity>
                        <View style={{ flex: 1, marginBottom: 0 }}>
                            <Text style={{ color: Colors.black, fontSize: 14, fontWeight: "bold" }}>
                                Material
                            </Text>
                            <Text style={{ fontSize: 14, fontWeight: 'normal', color: Colors.grey }}>
                                {material && material.name ? material.name : '-'}
                            </Text>
                            <Text style={{ color: Colors.grey, fontSize: 12, fontWeight: "bold" }}>
                                {material && material.kimap ? material.kimap : '-'}
                            </Text>
                        </View>
                        <View style={{ width: 120, paddingTop: 5, alignItems: 'flex-end' }}>
                            <CardSmallScanner
                                code={material && material.kimap}
                                isScanned={material.isConfirmed ? true : materialStatus}
                                isWrong={material.isConfirmed ? false : !materialType}
                                onPress={onScanner ? () => onScanner('MATERIAL', material && material.kimap) : null}
                                isCheckDesign={true} />
                        </View>
                    </View>

                    <View style={{ flex: 0, flexDirection: "row", justifyContent: 'space-between', alignItems: 'flex-start', marginTop: 20 }}>
                        <View
                            style={{
                                width: 35,
                                height: 35,
                                marginRight: 10,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                            <Fa5Icon name={'pallet'} size={18} color={Colors.lightGrey} />
                        </View>
                        
                        <View style={{ flex: 1, marginBottom: 0 }}>
                            <Text style={{ color: Colors.black, fontSize: 14, fontWeight: "bold" }}>
                                Pallet
                            </Text>
                            <Text style={{ fontSize: 14, fontWeight: 'normal', color: Colors.grey }}>
                                Pallet Type {material && material.detail.hu_cap ? material.detail.hu_cap : '-'} {material && material.detail.uom ? material.detail.uom : '-'}
                            </Text>
                            <Text style={{ color: Colors.grey, fontSize: 12, fontWeight: "bold" }}>
                                {material && material.hu_no ? material.hu_no : '-'}
                            </Text>
                        </View>
                        {!material.disable_pallet && (
                            <View style={{ width: 120, paddingTop: 5, alignItems: 'flex-end' }}>
                                <CardSmallScanner
                                    code={material && material.hu_no}
                                    isScanned={material.isConfirmed ? true : palletStatus}
                                    isWrong={material.isConfirmed ? false : !palletType}
                                    onPress={onScanner ? () => onScanner('PALLET', material && material.hu_no) : null}
                                    isCheckDesign={true} />
                            </View>
                        )}
                    </View>
                </View>
                {!disableRouteZone && (
                    <View style={{ padding: 0, paddingBottom: 20, paddingTop: 0, borderBottomColor: '#ccc', borderBottomWidth: 0.5, }}>
                        <CardContract
                            disableTitle={true}
                            data={data}
                        />
                        {data && data.map((dt, index) => {
                            let status = false
                            let type = false
                            let route = 'HU'
                            let position = 35 + (90 * index)

                            switch (index) {
                                case 0:
                                    status = HUStatus
                                    type = HUType
                                    route = 'HU'
                                    break
                                case 1:
                                    status = BQStatus
                                    type = BQType
                                    route = 'BQ'
                                    break
                                case 2:
                                    status = VXStatus
                                    type = VXType
                                    route = 'VX'
                                    break
                                default:
                                    break
                            }

                            return (
                                <View 
                                    key={index}
                                    style={{ position: 'absolute', top: position, right: 0 }}>
                                    <CardSmallScanner
                                        code={dt.id}
                                        isScanned={material.isConfirmed ? true : status}
                                        isWrong={material.isConfirmed ? false : !type}
                                        onPress={onScanner ? () => onScanner(route, dt.id) : null}
                                        isCheckDesign={true} />
                                </View>
                            )
                        })}
                    </View>
                )}
                {enablePrinting && (
                    <View style={{ flex: 1, padding: 20, marginTop: 20 }}>
                        <ScrollView style={{
                            height: isRotate ? 665 : 465,
                            backgroundColor: Colors.whiteGrey,
                            borderRadius: 15,
                            borderColor: '#ccc',
                            borderWidth: 0.5,
                        }}
                            horizontal
                            showsHorizontalScrollIndicator={false}>
                            <CardPrintLabelling label={label ? label : null} isOutbound={material.isOutbound} isRotate={isRotate} />
                        </ScrollView>
                    </View>
                )}
                <View style={{ paddingTop: 20, paddingBottom: 10 }}>
                    {btnStatus && (
                        <View style={{ paddingBottom: 10 }}>
                            <ButtonNext
                                title={'CONFIRMED'}
                                type={'main'}
                                enableBorderRadius={false}
                                onPress={() => onSave(btnStatus, shipTo)} />
                        </View>
                    )}
                    <View style={{ paddingBottom: 0 }}>
                        <ButtonNext
                            title={'CANCEL'}
                            type={'error-reverse'}
                            enableBorderRadius={false}
                            onPress={() => {
                                (material.isConfirmed || isNeedAlert) ? Alert.alert(
                                    'Information',
                                    'Are you sure?',
                                    [
                                        {
                                            text: 'Cancel',
                                            onPress: () => console.log('Cancel Pressed'),
                                            style: 'cancel'
                                        },
                                        { 
                                            text: 'OK', 
                                            onPress: () => onBack()
                                        }
                                    ],
                                    { cancelable: false }
                                ) : onBack()
                            }} />
                    </View>
                </View>
            </View>
        )
    }
}

class CardBanner extends Component {
    render() {
        const { isDone, title } = this.props
        const ttl = title ? title : 'Good Issue'
        let confirmed = "Your " + ttl + " is confirmed.."
        let unconfirmed = "Your " + ttl + " is unconfirmed.."
        switch (title) {
            case 'Good Issue':
                confirmed = "Your " + ttl + " is confirmed.."
                unconfirmed = "Your " + ttl + " for this pallet is cancelled.."
                break
            default:
                confirmed = "Your " + ttl + " is confirmed.."
                unconfirmed = "Your " + ttl + " is unconfirmed.."
                break
        }
        return (
            <View style={{
                flex: 1,
                paddingTop: 30,
                paddingBottom: 30,
                alignItems: 'center',
                marginBottom: 15,
                backgroundColor: Colors.white
            }}>
                <View style={{ width: '100%', height: 140, alignItems: "center", justifyContent: "center" }}>
                    <FeIcon name={isDone ? 'check-circle' : 'x-circle'} size={120} color={isDone ? Colors.main : Colors.error} />
                </View>
                <Text style={{ fontSize: 14, color: isDone ? Colors.main : Colors.error, fontWeight: 'bold', marginTop: 10 }}>
                    {isDone ? confirmed : unconfirmed}
                </Text>
            </View>
        )
    }
}

class CardZone extends Component {
    constructor(props) {
        super(props)
        const { activeIndex } = this.props
        this.state = {
            activeIndex: (activeIndex >= 0) ? activeIndex : null
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.activeIndex !== prevProps.activeIndex) {
            this.setState({activeIndex: this.props.activeIndex})
        }
    }

    render() {
        const { data, onChange } = this.props
        const { activeIndex } = this.state
        return (
            <View>
                {data && data.map((dt, index) => {
                    return (
                        <TouchableOpacity
                            key={index}
                            onPress={() => {
                                this.setState({ activeIndex: index })
                                onChange ? onChange(dt.isGood, index) : null
                            }}
                            style={[
                                (activeIndex === index)
                                    ? (dt.isGood)
                                        ? Styles.buttonMain
                                        : Styles.buttonError
                                    : Styles.buttonSekunder,
                                {
                                    borderRadius: 100,
                                    marginBottom: (data.length === (index + 1)) ? 0 : 10
                                }
                            ]}
                        >
                            <Text style={{
                                color: (activeIndex === index) ? '#fff' : (dt.isGood) ? Colors.main : Colors.error,
                                fontSize: 12
                            }}>
                                {dt.label}
                            </Text>
                        </TouchableOpacity>
                    )
                })}
            </View>
        )
    }
}

class CardMaterialDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            activeIndex: 0,
            isDone: 'unset',
            visibleBottomPopup: false,
            materialStatus: false,
            palletStatus: false,
            BQStatus: false,
            HUStatus: false,
            VXStatus: false,
            materialType: false,
            palletType: false,
            BQType: false,
            HUType: false,
            VXType: false,
            btnStatus: props.btnStatus ? props.btnStatus : false
            // btnStatus: true
        }
    }

    static defaultProps = {
        onVerifiedPress: () => null
    }

    borderBoldBottom = () => {
        return (
            <View style={{ borderBottomColor: '#f0f0f0', borderBottomWidth: 10, marginTop: 10 }} />
        )
    }

    goBack(status = 'unset', physic = '', zone = '', reason = '', qty = 0) {
        const { navigation } = this.props;
        navigation.goBack();
        navigation.state.params.type({ status: status, physic: physic, zone: zone, reason: reason, qty: qty })
    }

    componentDidMount() {
        const { params } = this.props.navigation.state
        let material = params.material ? params.material : null

        if (material.disable_pallet) {
            this.setState({
                palletStatus: true,
                palletType: true
            })
        }

        this.props.changeStatusMaterial(false)
        this.props.changeStatusPallet(false)
        this.props.changeStatusHU(false)
        this.props.changeStatusBQ(false)
        this.props.changeStatusVX(false)
    }

    componentDidUpdate(prevProps) {
        const { params } = this.props.navigation.state
        const data = this.props.seal
        if (data !== prevProps.seal) {
            if (data.statusMaterial) {
                this.setState({
                    materialStatus: true,
                    materialType: data.qrTypeMaterial === 'good' ? true : false
                })
            }
            if (data.statusPallet) {
                this.setState({
                    palletStatus: true,
                    palletType: data.qrTypePallet === 'good' ? true : false
                })
            }
            if (data.statusHU) {
                this.setState({
                    HUStatus: true,
                    HUType: data.qrTypeHU === 'good' ? true : false
                })
            }
            if (data.statusBQ) {
                this.setState({
                    BQStatus: true,
                    BQType: data.qrTypeBQ === 'good' ? true : false
                })
            }
            if (data.statusVX) {
                this.setState({
                    VXStatus: true,
                    VXType: data.qrTypeVX === 'good' ? true : false
                })
            }

            if (params.material.warehouse.length <= 2) {
                this.setState({
                    VXStatus: true,
                    VXType: true
                })
            }

            if (params.disableRouteZone) {
                if (data.statusMaterial && data.statusPallet) {
                    this.setState({ HUType: true, BQType: true, VXType: true })
                }
            }
        }
    }

    render() {
        const { visibleBottomPopup, btnStatus } = this.state
        const { materialStatus, palletStatus, BQStatus, HUStatus, VXStatus } = this.state
        const { materialType, palletType, BQType, HUType, VXType } = this.state
        const { params } = this.props.navigation.state
        let material = params.material ? params.material : null
        let label = params.material.label ? params.material.label : null
        let title = params.material.title ? params.material.title : null
        let isNeedAlert = materialType || palletType || BQType || HUType || VXType ? true : false
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <View style={{ backgroundColor: '#fff' }}>
                    <NavbarMenu
                        onBack={() => {
                            isNeedAlert ? Alert.alert(
                                'Information',
                                'Are you sure?',
                                [
                                    {
                                        text: 'Cancel',
                                        onPress: () => console.log('Cancel Pressed'),
                                        style: 'cancel'
                                    },
                                    { 
                                        text: 'OK', 
                                        onPress: () => this.props.navigation.goBack() 
                                    }
                                ],
                                { cancelable: false }
                            ) : this.props.navigation.goBack() 
                        }}
                        title={material && material.name} />
                </View>
                <ScrollView>
                    {params.roleType === 'list' ? (
                        <MaterialStatusList
                            isNeedAlert={isNeedAlert}
                            title={title}
                            disableRouteZone={params.disableRouteZone}
                            enablePrinting={params.enablePrinting}
                            data={params.material.warehouse}
                            label={label}
                            material={material}
                            materialStatus={materialStatus}
                            BQStatus={BQStatus}
                            HUStatus={HUStatus}
                            VXStatus={VXStatus}
                            btnStatus={btnStatus}
                            palletStatus={palletStatus}
                            materialType={materialType}
                            palletType={palletType}
                            HUType={HUType}
                            BQType={BQType}
                            VXType={VXType}
                            onEnlarge={() => this.setState({ visibleBottomPopup: true })}
                            onScanner={(type, validateID) => this.props.navigation.navigate('GateScannerScreen', {
                                value: "https://connexpro.daya-dms.id/wmx/trxquery/query/get.inbound.delivery.by.id/1597664988576",
                                role: "SEAL",
                                title: "SCAN " + (type === 'HU' ? 'FROM' : type === 'BQ' ? 'TO' : type) + " ID",
                                type: type,
                                validateID: validateID
                            })}
                            onBack={() => this.props.navigation.goBack()}
                            onSave={(status) => this.goBack(status ? 'good' : 'bad', material)} />
                    ) : (params.roleType === 'simple') ? (
                        <MaterialStatusSimple
                            isNeedAlert={isNeedAlert}
                            title={title}
                            data={params.material.warehouse}
                            material={material}
                            materialStatus={materialStatus}
                            disableReason={params.material.disableReason}
                            BQStatus={BQStatus}
                            HUStatus={HUStatus}
                            palletStatus={palletStatus}
                            materialType={materialType}
                            palletType={palletType}
                            HUType={HUType}
                            BQType={BQType}
                            btnStatus={btnStatus}
                            onEnlarge={() => this.setState({ visibleBottomPopup: true })}
                            onScanner={(type, validateID) => this.props.navigation.navigate('GateScannerScreen', {
                                value: "https://connexpro.daya-dms.id/wmx/trxquery/query/get.inbound.delivery.by.id/1597664988576",
                                role: "SEAL",
                                title: "SCAN " + (type === 'HU' ? 'FROM' : type === 'BQ' ? 'TO' : type) + " ID",
                                type: type,
                                validateID: validateID
                            })}
                            onBack={() => this.props.navigation.goBack()}
                            onSave={(status, zone, reason, qty) => {
                                this.goBack(status ? 'good' : 'bad', material, zone, reason, qty)
                            }} />
                    ) : (
                        <MaterialStatusCount
                            isNeedAlert={isNeedAlert}
                            title={title}
                            data={params.material.warehouse}
                            material={material}
                            materialStatus={materialStatus}
                            BQStatus={BQStatus}
                            HUStatus={HUStatus}
                            btnStatus={btnStatus}
                            palletStatus={palletStatus}
                            materialType={materialType}
                            palletType={palletType}
                            HUType={HUType}
                            BQType={BQType}
                            onEnlarge={() => this.setState({ visibleBottomPopup: true })}
                            onScanner={(type, validateID) => this.props.navigation.navigate('GateScannerScreen', {
                                value: "https://connexpro.daya-dms.id/wmx/trxquery/query/get.inbound.delivery.by.id/1597664988576",
                                role: "SEAL",
                                title: "SCAN " + (type === 'HU' ? 'FROM' : type === 'BQ' ? 'TO' : type) + " ID",
                                type: type,
                                validateID: validateID
                            })}
                            onBack={() => this.props.navigation.goBack()}
                            onSave={(status, physic) => this.goBack(status ? 'good' : 'bad', physic, material)} />
                    )}
                    <BottomPopup
                        visible={visibleBottomPopup}
                        title={'Material KIMAP'}
                        onDismiss={() => this.setState({ visibleBottomPopup: false })}>
                        <View style={{ paddingTop: 25, height: (Dimensions.get('screen').height - 200) }}>
                            <View style={{ flex: 1, flexDirection: 'column' }}>
                                <ScrollView>
                                    <CardMaterialInfo data={{
                                        id: material.detail.id,
                                        kimap: material.detail.kimap,
                                        name: material.detail.name,
                                        year: material.detail.material_year,
                                        type: material.detail.material_type,
                                        lobs: material.detail.material_lobs,
                                        to_liter_constant: material.detail.material_to_liter,
                                        uom: material.detail.uom,
                                        weight: material.detail.material_gross_weight
                                    }} />
                                </ScrollView>
                            </View>
                        </View>
                    </BottomPopup>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    capture: {
        flex: 0,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
    },
});


const mapStateToProps = state => {
    return {
        auth: state.auth,
        seal: state.seal
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changeStatus: (status) => dispatch(SealAction.changeStatus(status)),
        changeStatusMaterial: (status) => dispatch(SealAction.changeStatusMaterial(status)),
        changeStatusPallet: (status) => dispatch(SealAction.changeStatusPallet(status)),
        changeStatusBQ: (status) => dispatch(SealAction.changeStatusBQ(status)),
        changeStatusHU: (status) => dispatch(SealAction.changeStatusHU(status)),
        changeStatusVX: (status) => dispatch(SealAction.changeStatusVX(status)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardMaterialDetail)