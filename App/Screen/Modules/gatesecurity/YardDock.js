import React from 'react'
import { View, Text } from 'react-native'
import CardCollapse from '../../Components/CardCollapse'
import CardYardDock from '../../Components/CardYardDock'
import { Colors } from '../../../Themes'

class YardDock extends React.Component {
    // constructor(props) {
    //     super(props)
    //     const { params } = props.navigation.state
    //     this.state = {}
    // }

    static defaultProps = {
        onVerifiedPress: () => null
    }

    render() {
        const { onVerifiedPress, data } = this.props
        return (
            <View>
                <View style={{ marginTop: 10, backgroundColor: "#fff", padding: 20 }}>
                    <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <Text style={{ fontSize: 16, fontWeight: "bold", color: Colors.lightGrey }}>Yard and Dock</Text>
                    </View>
                </View>
                <CardCollapse
                    top={-40}
                    right={20}
                >
                    <View style={{paddingLeft: 20, paddingRight: 20, paddingBottom: 20}}>
                        <Text style={{ fontSize: 12, marginBottom: 0, color: Colors.black }}>This vehicle must stop the engine while parking and please securing surrounding and confirm to loading master</Text>
                    </View>
                    <View style={{ marginTop: 0, backgroundColor: "#fff", padding: 5, paddingTop: 0, paddingBottom: 15 }}>
                        <CardYardDock
                            data={[
                                {
                                    id: data && data.id ? data.id : '', 
                                    title: data && data.yard ? data.yard : '-', 
                                    warehouse: data && data.origin ? data.origin : '-',  
                                    worker: data && data.master ? data.master : '-', 
                                    date: data && data.org_time ? data.org_time : '-', 
                                    image: data && data.master_image_path
                                },
                                {
                                    id: data && data.id ? data.id : '', 
                                    title: data && data.dock ? data.dock : '-', 
                                    warehouse: data && data.dest ? data.dest : '-',  
                                    worker: data && data.master ? data.master : '-', 
                                    date: data && data.dest_time ? data.dest_time : '-', 
                                    image: data && data.master_image_path
                                }
                            ]} />
                    </View>
                </CardCollapse>
            </View>
        )
    }
}

export default YardDock