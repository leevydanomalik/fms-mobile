import React, { Component } from 'react'
import { View, Text, ScrollView, Dimensions } from 'react-native'
import { Colors } from '../../Themes'
import Config from 'react-native-config'
import { generateUrlPhotoMaterial } from '../../Utils'
import ProgressiveImage from '../Modules/ProgressiveImage'

const {width, height} = Dimensions.get('screen')

class MaterialInfo extends Component {
    render() {
        const {data} = this.props
        const dataMaterial = [
            {id: data && data.id, image: data && data.image_path, title: 'Front View', material: data && data.name, year: data && data.year}
        ]
        console.log(data)
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
                    borderBottomWidth: 1,
                    marginBottom: 15
                 }}>
                    <View horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingTop: 0, paddingLeft: 0, paddingRight: 0, marginBottom: 0 }}>
                        {dataMaterial && dataMaterial.map((dt, index) => {
                            return (
                                <View key={index} style={{
                                    marginRight: ((index + 1) === dataMaterial.length) ? 0 : 15,
                                    borderWidth: 1, 
                                    borderColor: "#ccc", 
                                    borderRadius: 10,
                                    width: 202
                                }}>
                                    <View style={{ height: 160, width: 200, marginBottom: 15}} >
                                        <ProgressiveImage
                                            resizeMode="cover" 
                                            style={{ 
                                                borderRadius: 10, 
                                                width: "100%", 
                                                height: "100%",
                                                backgroundColor: Colors.whiteGrey
                                            }}
                                            source={{
                                                uri: generateUrlPhotoMaterial(data && data.id),
                                                headers: {
                                                    'Content-Type': 'application/json',
                                                    'DGI-API-KEY': Config.APP_WMS_AUTH_HEADER_VALUE
                                                    // 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiJ9.5BG9SEVOGo_xRhtT8IkyoSy60kPg8HM9Vpvb0TdNew4'
                                                }
                                            }} />
                                    </View>
                                    <View style={{padding: 15}}>
                                        <Text style={{ color: Colors.black, fontSize: 16, fontWeight: "bold" }}>{dt.title ? dt.title : '-'}</Text>
                                        <Text style={{ fontSize: 12, color: Colors.lightGrey }}>{dt.material ? dt.material : '-'}</Text>
                                        <Text style={{ fontSize: 12, color: Colors.lightGrey }}>{dt.year ? dt.year : '-'}</Text>
                                    </View>
                                </View>
                            )
                        })}
                    </View>
                </View>
                <View style={{marginBottom: 15}}>
                    <Text style={{ color: Colors.lightGrey, fontSize: 16, fontWeight: "bold" }}>Material Information</Text>
                </View>
                <View style={{ marginBottom: 15 }}>
                    <Text style={{ fontSize: 12, color: Colors.lightGrey, textTransform: "uppercase" }}>MATERIAL TYPE</Text>
                    <Text style={{ color: Colors.black, fontSize: 16, fontWeight: "bold" }}>
                        {data && data.type}
                    </Text>
                </View>
                <View style={{ marginBottom: 15 }}>
                    <Text style={{ fontSize: 12, color: Colors.lightGrey, textTransform: "uppercase" }}>KIMAP</Text>
                    <Text style={{ color: Colors.black, fontSize: 16, fontWeight: "bold" }}>
                        {data && data.kimap}
                    </Text>
                </View>
                <View style={{ marginBottom: 15 }}>
                    <Text style={{ fontSize: 12, color: Colors.lightGrey, textTransform: "uppercase" }}>NAME</Text>
                    <Text style={{ color: Colors.black, fontSize: 16, fontWeight: "bold" }}>
                        {data && data.name}
                    </Text>
                </View>
                <View style={{ marginBottom: 15 }}>
                    <Text style={{ fontSize: 12, color: Colors.lightGrey, textTransform: "uppercase" }}>LOBS</Text>
                    <Text style={{ color: Colors.black, fontSize: 16, fontWeight: "bold" }}>
                        {data && data.lobs}
                    </Text>
                </View>
                <View style={{ marginBottom: 15 }}>
                    <Text style={{ fontSize: 12, color: Colors.lightGrey, textTransform: "uppercase" }}>TO LITER CONSTANT</Text>
                    <Text style={{ color: Colors.black, fontSize: 16, fontWeight: "bold" }}>
                        {data && data.to_liter_constant}
                    </Text>
                </View>
                <View style={{ marginBottom: 15 }}>
                    <Text style={{ fontSize: 12, color: Colors.lightGrey, textTransform: "uppercase" }}>UOM</Text>
                    <Text style={{ color: Colors.black, fontSize: 16, fontWeight: "bold" }}>
                        {data && data.uom}
                    </Text>
                </View>
                <View style={{ marginBottom: 15 }}>
                    <Text style={{ fontSize: 12, color: Colors.lightGrey, textTransform: "uppercase" }}>GROSS WEIGHT (KG)</Text>
                    <Text style={{ color: Colors.black, fontSize: 16, fontWeight: "bold" }}>
                        {data && data.weight}
                    </Text>
                </View>
            </View>
        )
    }
}

export default MaterialInfo