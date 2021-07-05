import React from 'react'
import { View, Text } from 'react-native'
import FaIcon from 'react-native-vector-icons/FontAwesome'
import { Colors } from '../../Themes'
import { generateUrlPhoto } from '../../Utils'
import ProgressiveImage from '../Modules/ProgressiveImage'
import { connect } from 'react-redux'

class CardOrder extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        const {date, movement, warehouse} = this.props
        const { user } = this.props.auth
        return (
            <View style={{ marginTop: 0, backgroundColor: "#fff", padding: 15 }}>
                <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                    <Text style={{ fontSize: 16, fontWeight: "bold", color: "#999" }}>Order By</Text>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <FaIcon name="clock-o" color="#ccc" size={13} />
                        <Text style={{ fontSize: 10, color: "#ccc", marginLeft: 5 }}>{date ? date : '-'}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <View style={{ height: 50, width: 50, borderRadius: 100 }} >
                        <ProgressiveImage
                            resizeMode="cover" 
                            style={{ 
                                borderRadius: 100, 
                                width: "100%", 
                                height: "100%",
                                backgroundColor: Colors.whiteGrey
                            }}
                            sizeSpinner={20}
                            source={{
                                uri: generateUrlPhoto(user && user.data.userID),
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiJ9.5BG9SEVOGo_xRhtT8IkyoSy60kPg8HM9Vpvb0TdNew4'
                                }
                            }} />
                    </View>
                    <View style={{ flex: 1, marginLeft: 10, justifyContent: 'center', }}>
                        <Text style={{ color: "#000", fontSize: 16, fontWeight: "bold" }}>{user && user.data.userName}</Text>
                        {/* <Text style={{ fontSize: 10 }}>{movement}</Text> */}
                        <Text style={{ fontSize: 10 }}>{warehouse}</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, null)(CardOrder)