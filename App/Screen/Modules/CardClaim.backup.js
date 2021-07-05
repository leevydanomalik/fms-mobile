import React from 'react'
import { View, Text, TouchableOpacity, Image, Dimensions, ScrollView } from 'react-native'
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import Svg, { Line } from 'react-native-svg'
import { ProgressiveImage } from '.'

const blue = "#0e74ff"
const green = "#2B9133"
const { width, height } = Dimensions.get('window')

class CardClaim extends React.Component {
    render() {
        const delivery = [
            {
                title: "DSP L201 Kertapati",
                to: "Ship To",
                desc: "Jl. Ci Ditiro No 12 Palembang 5011 Sumatera Selatan"
            },
            {
                title: "DSP L301 Plumpang",
                to: "Bill To",
                desc: "Jl. Medan Merdeka Timur 1A 10110 Jakarta "
            }
        ]
        const { rowData, onPress, id, mainDesc } = this.props
        const { ticketNumber, transportVendor, fleetType, fleetMfg, fleetMfgType, driverName, driverLicense, licensePlate, vendor, opsType, poNumber, descNote, dlvDate, status, type } = rowData.item
        return (
            <View>
                <View style={{ padding: 20, backgroundColor: "#fff", borderColor: "#ccc", borderBottomWidth: 1 }}>
                    <View style={{ flexDirection: "row", marginBottom: 20 }}>
                        <View style={{ height: 40, width: 40, borderRadius: 100 }} >
                            <Image source={{ uri: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg" }} resizeMode="cover" style={{ width: "100%", height: "100%", borderRadius: 100 }} />
                        </View>
                        <View style={{ marginLeft: 10, justifyContent: 'center', width: "70%" }}>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={{ color: "#000", fontSize: 16, fontWeight: "bold" }}>{vendor}</Text>
                            </View>
                            <Text style={{ fontSize: 10, marginTop: 5 }}>{fleetType + ' - ' + licensePlate + ' - ' + driverName + '/' + driverLicense + ' - ' + type}</Text>
                        </View>
                    </View>
                    <View>
                        <View style={{ flexDirection: "row", marginTop: 10, marginBottom: 30 }}>
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <View style={{ height: 150, width: 150, borderWidth: 5, borderRadius: 100, borderColor: "#ccc" }}>
                                    <Image style={{ height: "100%", width: "100%", borderRadius: 100 }} resizeMode="contain" source={{ uri: "https://pngimage.net/wp-content/uploads/2018/05/caminhão-em-png-2.png" }} />
                                </View>
                                <Text style={{ color: "#000", fontSize: 16 }}>{fleetMfg}</Text>
                                <Text style={{ color: "#000", fontSize: 10 }}>{fleetMfgType}</Text>
                            </View>
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <View style={{ height: 150, width: 150, borderWidth: 5, borderRadius: 100, borderColor: "#ccc" }}>
                                    <Image style={{ height: "100%", width: "100%", borderRadius: 100 }} resizeMode="contain" source={{ uri: "https://pbs.twimg.com/profile_images/932462975679586304/EbbRb6Ne_400x400.jpg" }} />
                                </View>
                                <Text style={{ color: "#000", fontSize: 16 }}>PT. Sentral Cargo GmBh</Text>
                                <Text style={{ color: "#000", fontSize: 10 }}>Protos 9890MZ</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={{ padding: 15, backgroundColor: "#fff", borderColor: "#ccc", borderBottomWidth: 1, marginTop: 10 }}>
                    <View>
                        <Text style={{ color: "#BDBDBD", fontWeight: "bold", fontSize: 18 }}>Claim Details</Text>
                        <TouchableOpacity style={{ width: 80, borderRadius: 10, alignItems: "center", backgroundColor: "#64DD17", position: "absolute", bottom: 5, right: 0, top: 2, paddingTop: 2, height: 20 }}>
                            <Text style={{ color: "#fff", fontSize: 10 }}>In Progress</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={{ color: "#000", fontWeight: "bold", fontSize: 14, paddingTop: 5 }}>Timed bound delays</Text>
                    <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                        <MatIcon name={"progress-clock"} size={60} style={{ color: "#000", marginTop: 5 }} />
                        <Text style={{ flex: 1, fontSize: 13, padding: 15, paddingRight: 2 }}>{mainDesc}</Text>
                    </View>
                </View>

                <View style={{ backgroundColor: "#fff", marginTop: 10 }}>
                    <Text style={{ padding: 15, color: "#BDBDBD", fontWeight: "bold", fontSize: 18, marginBottom: 10 }}>Purchase Order</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ padding: 15, paddingTop: 0, paddingRight: 20, paddingBottom: 5 }}>
                        {delivery.map((data, index) => {
                            return (
                                <View key={index} style={{ elevation: 3, borderWidth: 1, borderColor: "#CCC", backgroundColor: green, padding: 15, borderRadius: 10, width: 300, height: 150, marginRight: index + 1 == delivery.length ? 0 : 15 }}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ marginLeft: 5, fontSize: 15, fontWeight: "bold", marginTop: 5, color: "#fff" }}>{data.to}</Text>
                                        <View style={{ flexDirection: "row" }}>
                                            <View style={{ flex: 0.5, marginBottom: 30 }}>
                                                <ProgressiveImage resizeMode="cover" style={{ width: "90%", height: "75%" }} source={{ uri: "https://images.unsplash.com/photo-1553413077-190dd305871c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=150&q=60" }} />
                                            </View>
                                            <View style={{ flex: 0.5 }}>
                                                <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 14, marginTop: 7 }}>{data.title}</Text>
                                                <Text style={{ fontSize: 13, marginTop: 5, color: "#fff" }}>{data.desc}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            )
                        })}
                    </ScrollView>
                    <View style={{ padding: 15 }}>
                        <Text style={{ color: "#000", fontWeight: "bold", fontSize: 16, marginTop: 5 }}>Terms</Text>
                        <Text style={{ flex: 1, fontSize: 12, padding: 5 }}>{mainDesc}</Text>
                    </View>
                    <View style={{ borderTopWidth: 1, borderColor: "#ccc" }}></View>
                    <View style={{ padding: 15 }}>
                        <Text style={{ color: "#000", fontWeight: "bold", fontSize: 16, marginTop: 5 }}>Delivery</Text>
                        <Text style={{ fontSize: 12, color: "#000", marginTop: 10, marginBottom: 15 }}>Contract Delivery Date (PDT) : <Text style={{ fontWeight: "bold", color: "#000" }}>23 December 2020 </Text></Text>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <View style={{ flex: 0.1 }}>
                                <View style={{ width: 30, height: 30, borderColor: "#CCC", borderWidth: 1, justifyContent: 'center', alignItems: "center", borderRadius: 30 }}>
                                    <MatIcon name="garage" style={{ color: "#BDBDBD", fontSize: 30, textAlign: "center", marginBottom: 5 }} />
                                </View>
                            </View>
                            <View style={{ flex: 0.9 }}>
                                <Text style={{ fontSize: 12, marginRight: 5, paddingLeft: 10, color: "#000" }}>DSP L301 - Plumpang</Text>
                                <Text style={{ fontSize: 12, marginRight: 5, paddingLeft: 10, color: "#BDBDBD" }}>Warehouse L301 SLOC 304</Text>
                            </View>
                        </View>
                        <Svg height={50} width={1} style={{ marginLeft: 15 }}>
                            <Line
                                stroke="black"
                                strokeDasharray="5, 5"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2={"100%"}
                            />
                        </Svg>
                        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
                            <View style={{ flex: 0.1 }}>
                                <View style={{ width: 30, height: 30, borderColor: "#CCC", borderWidth: 1, justifyContent: 'center', alignItems: "center", borderRadius: 30 }}>
                                    <MatIcon name="garage" style={{ color: "#BDBDBD", fontSize: 30, textAlign: "center", marginBottom: 5 }} />
                                </View>
                            </View>
                            <View style={{ flex: 0.9 }}>
                                <Text style={{ fontSize: 12, marginRight: 5, paddingLeft: 10, color: "#000" }}>DSP L201 - Kertapati</Text>
                                <Text style={{ fontSize: 12, marginRight: 5, paddingLeft: 10, color: "#BDBDBD" }}>Warehouse L201 SLOC 204</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ borderTopWidth: 1, borderColor: "#ccc" }}></View>
                    <View style={{ padding: 15 }}>
                        <Text style={{ color: "#000", fontWeight: "bold", fontSize: 16, marginTop: 5, marginBottom: 10 }}>Materials</Text>
                        <View style={{ flexDirection: 'row', marginBottom: 10, flex: 1 }}>
                            <View style={{ flex: 0.7 }}>
                                <Text style={{ flex: 1, fontSize: 13 }}>MESRAN 20X20L ENDURO </Text>
                                <Text style={{ flex: 1, fontWeight: 'bold', color: "#000", fontSize: 12 }}>A90696968</Text>
                                <Text style={{ flex: 1, color: "#000", fontSize: 13, marginTop: 10 }}>Quantity & UOM</Text>
                                <Text style={{ flex: 1, fontSize: 12 }}>20 Box</Text>
                            </View>
                            <View style={{ flex: 0.3, height: 100 }} >
                                <Image source={{ uri: "https://www.pertaminalubricants.com/images/logo/P.%20Mesran%20Marine%204T.png?v-457" }} resizeMode="contain" style={{ width: "100%", height: "100%" }} />
                            </View>
                        </View>
                    </View>
                    <View style={{ borderTopWidth: 1, borderColor: "#ccc" }}></View>
                    <View style={{ padding: 15 }}>
                        <Text style={{ color: "#000", fontWeight: "bold", fontSize: 16, marginTop: 5 }}>Notes</Text>
                        <Text style={{ flex: 1, fontSize: 12, padding: 5 }}>{mainDesc}</Text>
                    </View>
                </View>

                <View style={{ padding: 15, backgroundColor: "#fff", borderColor: "#ccc", borderBottomWidth: 1, marginTop: 10 }}>
                    <Text style={{ color: "#BDBDBD", fontWeight: "bold", fontSize: 18, marginBottom: 10 }}>Claim Materials</Text>
                    <View style={{ flexDirection: 'row', flex: 1 }}>
                        <View style={{ flex: 0.7 }}>
                            <Text style={{ flex: 1, fontSize: 13 }}>MESRAN 20X20L ENDURO </Text>
                            <Text style={{ flex: 1, fontWeight: 'bold', color: "#000", fontSize: 12 }}>A90696968</Text>
                            <Text style={{ flex: 1, color: "#000", fontSize: 13, marginTop: 10 }}>Quantity & UOM</Text>
                            <Text style={{ flex: 1, fontSize: 12 }}>20 Box</Text>
                        </View>
                        <View style={{ flex: 0.3, height: 100 }} >
                            <Image source={{ uri: "https://www.pertaminalubricants.com/images/logo/P.%20Mesran%20Marine%204T.png?v-457" }} resizeMode="contain" style={{ width: "100%", height: "100%" }} />
                        </View>
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        <Text style={{ flex: 1, color: "#000", fontSize: 13, marginTop: 10 }}>Description</Text>
                        <Text style={{ flex: 1, fontSize: 12 }}>{mainDesc}</Text>
                    </View>
                </View>

                <View style={{ backgroundColor: "#fff", borderColor: "#ccc", borderBottomWidth: 1, marginTop: 10 }}>
                    <View style={{ padding: 15 }}>
                        <Text style={{ color: "#ccc", fontWeight: "bold", fontSize: 18 }}>Authority Letter</Text>
                        <Text style={{ color: "#000", fontWeight: "bold", fontSize: 16, marginTop: 5 }}>Part of Authority</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <MatIcon name={"file-pdf"} size={40} style={{ color: "red", marginTop: 5 }} />
                            <Text style={{ flex: 1, fontSize: 12, padding: 15 }}>{mainDesc}</Text>
                        </View>
                    </View>
                    <View style={{ borderTopWidth: 1, borderColor: "#ccc" }}></View>
                    <View style={{ padding: 15 }}>
                        <Text style={{ color: "#000", fontWeight: "bold", fontSize: 16, marginTop: 5 }}>DSP Certificate</Text>
                        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                            <MatIcon name={"file-pdf"} size={40} style={{ color: "red", marginTop: 5 }} />
                            <Text style={{ flex: 1, fontSize: 12, padding: 15 }}>{mainDesc}</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

export default CardClaim