import React from 'react'
import { View, TouchableOpacity, Text, Image } from 'react-native'
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { ProgressiveImage } from '../Modules'

class CardStream extends React.Component {
    render() {
        return (
            <View>
                <View style={{ backgroundColor: "#fff", marginBottom: 10 }}>
                    <TouchableOpacity style={{ padding: 10, position: "absolute", right: 0, flexDirection: "row" }}>
                        <MatIcon name={"share-variant"} size={18} color="#ccc" />
                        <MatIcon name={"progress-clock"} size={18} color="#ccc" />
                        <Text style={{ fontSize: 12, color: "#ccc" }}> 1s ago </Text>
                    </TouchableOpacity>
                    <View style={{ padding: 20, flexDirection: "row" }}>
                        <View style={{ height: 60, width: 60, borderRadius: 100 }} >
                            <Image source={{ uri: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg" }} resizeMode="cover" style={{ width: "100%", height: "100%", borderRadius: 100 }} />
                        </View>

                        <View style={{ justifyContent: 'center', flex: 1, marginLeft: 20 }}>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={{ color: "#000", fontSize: 16, fontWeight: "bold" }}>Leevy D. Malik</Text>
                            </View>
                            <Text style={{ color: "#000", fontSize: 14 }}>IT Manager</Text>
                            <Text style={{ fontSize: 10 }}>Period# 15 Jan 2020 - 15 Feb 2020 (-20 days)</Text>
                        </View>
                    </View>

                    <View style={{ paddingLeft: 10, paddingBottom: 10 }}>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={{ fontSize: 22, fontWeight: "bold", color: "#000" }}>System Release V1 Beta</Text>
                        </View>
                        <Text style={{ fontSize: 14, marginTop: 10 }}>This vehicle must stop the engine while parking and please securing surrounding and confirm to loading master</Text>
                    </View>
                    <View style={{ width: "100%", height: 200, justifyContent: "center", alignItems: "center" }}>
                        <Image
                            resizeMode="contain"
                            source={require('../../assets/logo-pertamina.png')}
                            style={{ width: "40%", height: "70%" }}
                        />
                        <Text style={{ fontSize: 16 }}>Proceed with your</Text>
                        <Text style={{ fontWeight: "bold", fontSize: 20, color: "#000" }}>Patralogin</Text>
                    </View>
                    <View style={{ padding: 10, alignItems: "flex-end" }}>
                        <Text style={{ fontSize: 10, color: "#ccc" }}>22 December 2020 17:30 PM</Text>
                    </View>
                </View>

                <View style={{ backgroundColor: "#fff", marginBottom: 10 }}>
                    <TouchableOpacity style={{ padding: 10, position: "absolute", right: 0, flexDirection: "row" }}>
                        <MatIcon name={"share-variant"} size={18} color="#ccc" />
                        <MatIcon name={"progress-clock"} size={18} color="#ccc" />
                        <Text style={{ fontSize: 12, color: "#ccc" }}> 1s ago </Text>
                    </TouchableOpacity>
                    <View style={{ padding: 20, flexDirection: "row" }}>
                        <View style={{ height: 60, width: 60, borderRadius: 100 }} >
                            <Image source={{ uri: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg" }} resizeMode="cover" style={{ width: "100%", height: "100%", borderRadius: 100 }} />
                        </View>

                        <View style={{ justifyContent: 'center', flex: 1, marginLeft: 20 }}>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={{ color: "#000", fontSize: 16, fontWeight: "bold" }}>Leevy D. Malik</Text>
                            </View>
                            <Text style={{ color: "#000", fontSize: 14 }}>Inbound Delivery</Text>
                            <Text style={{ fontSize: 10 }}>Period# 15 Jan 2020 - 15 Feb 2020 (-20 days)</Text>
                        </View>
                    </View>

                    <View style={{ paddingLeft: 10, paddingBottom: 10 }}>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={{ fontSize: 22, fontWeight: "bold", color: "#000" }}>Inbound Delivery#8776777</Text>
                        </View>
                        <Text style={{ fontSize: 14, marginTop: 10 }}>This vehicle must stop the engine while parking and please securing surrounding and confirm to loading master</Text>
                    </View>
                    <View style={{ width: "100%", height: 200, justifyContent: "center", alignItems: "center" }}>
                        <Image resizeMode="cover" style={{ width: "100%", height: "100%" }} source={{ uri: "https://morningstaronline.co.uk/sites/default/files/styles/article_full/public/PA-9846609.jpg" }} />
                    </View>
                    <View style={{ padding: 10, alignItems: "flex-end" }}>
                        <Text style={{ fontSize: 10, color: "#ccc" }}>22 December 2020 17:30 PM</Text>
                    </View>
                </View>

                <View style={{ backgroundColor: "#fff", marginBottom: 10 }}>
                    <TouchableOpacity style={{ padding: 10, position: "absolute", right: 0, flexDirection: "row" }}>
                        <MatIcon name={"share-variant"} size={18} color="#ccc" />
                        <MatIcon name={"progress-clock"} size={18} color="#ccc" />
                        <Text style={{ fontSize: 12, color: "#ccc" }}> 1s ago </Text>
                    </TouchableOpacity>
                    <View style={{ padding: 20, flexDirection: "row" }}>
                        <View style={{ height: 60, width: 60, borderRadius: 100 }} >
                            <Image source={{ uri: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg" }} resizeMode="cover" style={{ width: "100%", height: "100%", borderRadius: 100 }} />
                        </View>

                        <View style={{ justifyContent: 'center', flex: 1, marginLeft: 20 }}>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={{ color: "#000", fontSize: 16, fontWeight: "bold" }}>Leevy D. Malik</Text>
                            </View>
                            <Text style={{ color: "#000", fontSize: 14 }}>Inbound Delivery</Text>
                            <Text style={{ fontSize: 10 }}>Period# 15 Jan 2020 - 15 Feb 2020 (-20 days)</Text>
                        </View>
                    </View>

                    <View style={{ paddingLeft: 10, paddingBottom: 10 }}>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={{ fontSize: 22, fontWeight: "bold", color: "#000" }}>Inbound Delivery#8776777</Text>
                        </View>
                        <Text style={{ fontSize: 14, marginTop: 10 }}>This vehicle must stop the engine while parking and please securing surrounding and confirm to loading master</Text>
                    </View>
                    <View style={{ width: "100%", height: 200, justifyContent: "center", alignItems: "center" }}>
                        <ProgressiveImage resizeMode="cover" style={{ width: "100%", height: "100%" }} source={{ uri: "https://morningstaronline.co.uk/sites/default/files/styles/article_full/public/PA-9846609.jpg" }} />
                        {/* <Image resizeMode="cover" style={{ width: "100%", height: "100%" }} source={{ uri: "https://morningstaronline.co.uk/sites/default/files/styles/article_full/public/PA-9846609.jpg" }} /> */}
                    </View>
                    <View style={{ padding: 10, alignItems: "flex-end" }}>
                        <Text style={{ fontSize: 10, color: "#ccc" }}>22 December 2020 17:30 PM</Text>
                    </View>
                </View>
            </View>
        )
    }
}

export default CardStream