import React, { Component } from 'react'
import { View, Text, Dimensions, FlatList, Switch, UIManager, findNodeHandle } from 'react-native'
import { normalize } from '../../Utils'
import Icon from 'react-native-vector-icons/Ionicons'
import AnIcon from 'react-native-vector-icons/AntDesign'
import Ripple from 'react-native-material-ripple'
import { connect } from 'react-redux'
import ConfigAction from '../../Redux/ConfigRedux'
import {Colors} from '../../Themes'

const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
} = Dimensions.get('window');

class Header extends Component {
    render() {
        const {goBack} = this.props
      return (
        <View style={{ backgroundColor: Colors.main, height: 0.06 * SCREEN_HEIGHT, shadowColor: "#000", shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.27, shadowRadius: 4.65, elevation: 5 }}>
            <View style={{ flex: 1, flexDirection: "row", alignItems: "center", paddingLeft: 0, paddingRight: 0 }}>
                <Ripple 
                    onPress={() => goBack()}
                    style={{ flex: 0.1, padding: 20, paddingLeft: 15, paddingRight: 15 }}>
                    <AnIcon size={30} color="#fff" name="arrowleft" />
                </Ripple>
                <View style={{ flex: 1 }}>
                    <Text style={{ color: "#fff", fontSize: normalize(14), fontWeight: "400"  }}>Bitozen Client</Text>
                </View>
                <View style={{ justifyContent: "flex-end", flex: 0.3, flexDirection: "row", alignItems: "center" }}>
                    <Ripple style={{ padding: 10, paddingTop: 20, paddingBottom: 20, paddingRight: 20 }} onPress={() => this.props.clear()}>
                        <Text style={{ color: "#fff", fontSize: normalize(12) }}>CLEAR</Text>
                    </Ripple>
                </View>
            </View>
        </View>
      );
    }
}

class TraccarStatusScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: this.props.config.history
        }
    }

    UNSAFE_componentWillReceiveProps(newProps) {
        this.setState({ data: newProps.config.history })
    }

    renderList = (item) => {
        return (
            <View style={{ padding: 15, borderBottomWidth: 0.5 }}>
                <Text style={{ color: "#000", fontSize: normalize(15) }}>{item}</Text>
            </View>
        )
    }

    render() {
        let { data } = this.state
        return (
            <View>
                <Header goBack={() => this.props.navigation.goBack()} clear={() => this.props.clearHistory()}/>
                <FlatList
                    data={data}
                    keyExtractor={(item, index) => String(index)}
                    renderItem={({item, index}) => this.renderList(item)}
                />
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
      config: state.config
    };
};

const mapDispatchToProps = dispatch => {
    return {
      clearHistory: () => dispatch(ConfigAction.clearHistory()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TraccarStatusScreen)