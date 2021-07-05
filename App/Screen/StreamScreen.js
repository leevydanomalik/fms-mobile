import React from 'react'
import { ScrollView, View, TouchableOpacity } from 'react-native'
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { CardStream } from './Modules'
import NavbarMenu from './Components/NavbarMenu'

class StreamScreen extends React.Component {
    render() {
        return (
            <View style={{flex: 1}}>
                <View>
                    <NavbarMenu 
                        onBack={() => this.props.navigation.goBack()}
                        title={'Patralogistik Stream'} 
                    />
                    <TouchableOpacity style={{ position: 'absolute', right: 0, padding: 10 }}>
                        <MatIcon size={22} color="#fff" name={"grain"} />
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    <CardStream />
                </ScrollView>
            </View>
        )
    }
}

export default StreamScreen