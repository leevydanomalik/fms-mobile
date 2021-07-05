import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Dimensions } from 'react-native'
import CardContract from './CardContract'
import CardRoute from '../Modules/CardRoute'
import BottomPopup from './BottomPopup'
import { Colors } from '../../Themes'

class CardContractDelivery extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visibleBottomPopup: false
        }
    }

    static defaultProps = {
        onVerifiedPress: () => null
    }

    componentDidMount() {
        this.setState({visibleBottomPopup: false})
    }

    render() {
        const { visibleBottomPopup } = this.state
        const { data } = this.props
        return (
            <View>
                <View style={{ marginTop: 0, backgroundColor: "#fff", padding: 0, paddingBottom: 10 }}>
                    <View style={{ flex: 0, flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 0 }}>
                        <Text style={{ fontSize: 16, fontWeight: "bold", color: Colors.lightGrey }}>Delivery</Text>
                        <TouchableOpacity onPress={() => this.setState({visibleBottomPopup: true})}>
                            <Text style={{ fontSize: 12, color: Colors.lightGrey }}>+ Map</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ marginTop: 0, backgroundColor: "#fff", padding: 0, paddingTop: 0, paddingBottom: 10 }}>
                    <CardContract
                        disableTitle={true}
                        days={'(0 days)'}
                        data={[
                            {
                                id: 1, 
                                title: data && data.from.title ? data.from.title : '-', 
                                subtitle: data && data.from.subtitle ? data.from.subtitle : '-', 
                                date: data && data.from.date ? data.from.date : '-'
                            },
                            {
                                id: 2, 
                                title: data && data.to.title ? data.to.title : '-', 
                                subtitle: data && data.to.subtitle ? data.to.subtitle : '-', 
                                date: data && data.to.date ? data.to.date : '-'
                            }
                        ]}
                        service={data && data.service ? data.service : 'PDT'}
                        date={data && data.date ? data.date : '-'} />
                </View>
                <BottomPopup 
                    visible={visibleBottomPopup} 
                    title={'Map'} 
                    onDismiss={() => this.setState({visibleBottomPopup: false})}>
                    <View style={{ paddingTop: 25, height: (Dimensions.get('screen').height - 100) }}>
                        <CardRoute 
                            date={data && data.date ? data.date : '-'}
                            title={data && data.km_hours ? data.km_hours : '-'}
                            subtitle={data && data.type ? data.type : '-'}
                            plan={data && data.plan ? data.plan : '-'}
                            data={{
                                from: {
                                    title: data && data.from.title ? data.from.title : '-', 
                                    subtitle: data && data.from.subtitle ? data.from.subtitle : '-', 
                                    date: data && data.from.date ? data.from.date : '-',
                                    location: data && data.from.location
                                },
                                to: {
                                    title: data && data.to.title ? data.to.title : '-', 
                                    subtitle: data && data.to.subtitle ? data.to.subtitle : '-', 
                                    date: data && data.to.date ? data.to.date : '-',
                                    location: data && data.to.location
                                }
                            }}
                        />
                    </View>
                </BottomPopup>
            </View>
        )
    }
}

export default CardContractDelivery