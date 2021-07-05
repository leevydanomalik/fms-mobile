import React from 'react'
import { View, Text, Image } from 'react-native'
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Colors } from '../../Themes'
import CardWarehouseRoute from '../Components/CardWarehouseRoute'
import CardMaterialListImageSmall from '../Components/CardMaterialListImageSmall'

class CardTextList extends React.Component {
    render() {
        const {attribute, value} = this.props
        return (
            <View style={{flex: 1, flexDirection: "row", justifyContent: "space-between", marginBottom: 10}}>
                <Text style={{fontSize: 12, fontWeight: "bold", color: Colors.black}}>{attribute}</Text>
                <Text style={{fontSize: 12, color: Colors.lightGrey}}>{value}</Text>
            </View>
        )
    }
}

class CardAuthorityList extends React.Component {
    render() {
        const { title, date, desc, enableBorder } = this.props
        return (
            <View style={{ flex: 1, paddingTop: 10, paddingBottom: 15, borderBottomWidth: enableBorder ? 0.5 : 0, borderBottomColor: '#ccc' }}>
                <View style={{ flex: 1, flexDirection: 'row', marginBottom: 10 }}>
                    <View style={{ flex: 1 }}>
                        <Text style={{ color: Colors.black, fontWeight: "bold", fontSize: 16, marginTop: 5 }}>{title}</Text>
                        <Text style={{ color: Colors.lightGrey, fontWeight: "normal", fontSize: 12 }}>{date}</Text>
                    </View>
                    <MatIcon name={"file-pdf"} size={35} style={{ color: "red", marginTop: 5 }} />
                </View>
                <Text style={{ flex: 1, color: Colors.black, fontSize: 12 }}>{desc}</Text>
            </View>
        )
    }
}

class CardClaim extends React.Component {
    render() {
        const { rowData } = this.props
        const driverInfo = [
            {attribute: "Contract Number", value: "FC00000001"},
            {attribute: "Product Transfer Ref", value: "PT00000001"},
            {attribute: "PIC", value: "YONO"},
            {attribute: "Phone", value: "081276255525"},
        ]
        const claimInfo = [
            {attribute: "Claim Type", value: "CLAIM_DETAIL"},
            {attribute: "PDT", value: "22 January 2021 4:00 PM"},
            {attribute: "ADT", value: "23 January 2021 4:00 PM"},
            {attribute: "Fleet", value: "FLATWING/B88871BBX"},
            {attribute: "Delay", value: "24 Hours 76 Minute"},
            {attribute: "From", value: "DSP PLUMPANG - L301"},
            {attribute: "To", value: "DSP KERTAPATI - L201"},
            {attribute: "Claim Request", value: "CR00000000001/22 January 2021"},
        ]
        const dtMaterial = [
            {id: '0001', name: 'MESRAN 20X20L ENDURO', hu_cap: '20', uom: 'BOX', kimap: 'K00001'},
            {id: '0001', name: 'MESRAN 20X20L ENDURO', hu_cap: '20', uom: 'BOX', kimap: 'K00001'},
        ]
        const claimedMaterial = [
            {id: '0001', name: 'MESRAN 20X20L ENDURO', hu_cap: '20', uom: 'BOX', kimap: 'K00001', isLeaks: true, description: 'This product had opened seal and broken during delivery because of accident impact'},
            {id: '0001', name: 'MESRAN 20X20L ENDURO', hu_cap: '20', uom: 'BOX', kimap: 'K00001', isLeaks: true, description: 'This product had opened seal and broken during delivery because of accident impact'},
        ]
        const dtAuthority = [
            {id: '0001', title: 'Pangkalan Balam Port of Authority', date: 'Bangka, 22 January 2021', description: 'Due to uncertainty of ocean tide near Banka island, all incoming boat to the strait is prohibited until the further announcement is released'},
            {id: '0001', title: 'Pangkalan Balam Port of Authority', date: 'Bangka, 22 January 2021', description: 'Due to uncertainty of ocean tide near Banka island, all incoming boat to the strait is prohibited until the further announcement is released'},
        ]
        return (
            <View style={{flex: 1, backgroundColor: "#f0f0f0"}}>
                <View style={{ padding: 15, backgroundColor: "#fff", marginBottom: 10 }}>
                    <View style={{ flex: 1, flexDirection: "row", marginBottom: 15 }}>
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={{ color: Colors.black, fontSize: 16, fontWeight: "bold" }}>PT. Sentral Cargo GmBh</Text>
                                <View style={{ marginLeft: 10, borderRadius: 40, paddingLeft: 10, paddingRight: 10, paddingTop: 3, paddingBottom: 2, backgroundColor: 'red' }}>
                                    <Text style={{ fontSize: 10, color: Colors.white }}>ACTIVE</Text>
                                </View>
                            </View>
                            <Text style={{ fontSize: 12, color: Colors.lightGrey }}>Jl. Dermaga III Jakarta Utara</Text>
                        </View>
                        <View style={{ height: 45, width: 45, borderRadius: 100 }} >
                            <Image source={{ uri: "https://st2.depositphotos.com/1011434/7519/i/950/depositphotos_75196567-stock-photo-handsome-man-smiling.jpg" }} resizeMode="cover" style={{ width: "100%", height: "100%", borderRadius: 100 }} />
                        </View>
                    </View>
                    <View style={{flex: 1, marginBottom: 5}}>
                        {driverInfo && driverInfo.map((dt, index) => {
                            return (
                                <CardTextList key={index} attribute={dt.attribute} value={dt.value} />
                            )
                        })}
                    </View>
                </View>

                <View style={{ padding: 15, backgroundColor: "#fff" }}>
                    <Text style={{ fontSize: 16, fontWeight: "bold", color: Colors.lightGrey, marginBottom: 10 }}>Claim Detail</Text>
                    <View style={{flex: 1, marginBottom: 15}}>
                        {claimInfo && claimInfo.map((dt, index) => {
                            return (
                                <CardTextList key={index} attribute={dt.attribute} value={dt.value} />
                            )
                        })}
                    </View>

                    <Text style={{ fontSize: 16, fontWeight: "bold", color: Colors.lightGrey, marginBottom: 10 }}>Notes</Text>
                    <Text style={{ fontSize: 12, color: Colors.black, marginBottom: 10 }}>This claim is still undergoing process to negotiate the elimination of claim portion of delayed material</Text>
                </View>

                <View style={{ backgroundColor: "#fff", padding: 15, borderTopWidth: 0.5, borderColor: "#ccc" }}>
                    <Text style={{ fontSize: 16, fontWeight: "bold", color: Colors.grey, marginBottom: 10 }}>Delivery (Delay)</Text>
                    <CardTextList attribute={'Contract Delivery Date (PDT)'} value={'23 December 2020 14:00 PM'} />
                    <View style={{marginTop: 15, marginBottom: 10}}>
                        <CardWarehouseRoute 
                            calculate={"24 Hour 76 Minute"}
                            start={{
                                icon: "warehouse",
                                title: 'DSP Plumpang L301',
                                subtitle: 'Warehouse L301 SLOC 304',
                                date: '22 January 2021 14:00PM'
                            }}
                            stop={{
                                icon: "warehouse",
                                title: 'DSP Plumpang L301',
                                subtitle: 'Warehouse L301 SLOC 304',
                                date: '23 January 2021 14:00PM'
                            }}
                        />
                    </View>
                </View>

                <View style={{ backgroundColor: "#fff", padding: 15, marginBottom: 10, borderTopWidth: 0.5, borderColor: "#ccc" }}>
                    <Text style={{ fontSize: 16, fontWeight: "bold", color: Colors.lightGrey, marginBottom: 10 }}>Materials</Text>
                    {dtMaterial && dtMaterial.map((dt, index) => {
                        return (
                            <CardMaterialListImageSmall
                                key={index}
                                enableImage={true}
                                data={{
                                    id: dt.id,
                                    name: dt.name,
                                    kimap: dt.kimap,
                                    hu_cap: dt.hu_cap,
                                    uom: dt.uom,
                                }}
                            />
                        )
                    })}
                </View>

                <View style={{ backgroundColor: "#fff", padding: 15, paddingBottom: 0, marginBottom: 10 }}>
                    <Text style={{ fontSize: 16, fontWeight: "bold", color: Colors.lightGrey, marginBottom: 10 }}>Claimed Materials</Text>
                    {claimedMaterial && claimedMaterial.map((dt, index) => {
                        return (
                            <CardMaterialListImageSmall
                                key={index}
                                enableImage={true}
                                enableBorder={(index < (claimedMaterial.length - 1)) ? true : false}
                                data={{
                                    id: dt.id,
                                    name: dt.name,
                                    kimap: dt.kimap,
                                    hu_cap: dt.hu_cap,
                                    uom: dt.uom,
                                    isLeaks: dt.isLeaks,
                                    description: dt.description
                                }}
                            />
                        )
                    })}
                </View>

                <View style={{ backgroundColor: "#fff", padding: 15, marginBottom: 10 }}>
                    <Text style={{ fontSize: 16, fontWeight: "bold", color: Colors.lightGrey, marginBottom: 5 }}>Authority Letter</Text>
                    {dtAuthority && dtAuthority.map((dt, index) => {
                        return (
                            <CardAuthorityList 
                                key={index} 
                                title={dt.title}
                                date={dt.date}
                                desc={dt.description}
                                enableBorder={(index < (dtAuthority.length - 1)) ? true : false} />
                        )
                    })}
                </View>

            </View>
        )
    }
}

export default CardClaim