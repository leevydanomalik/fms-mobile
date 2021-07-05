import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  ListView,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import Icon from 'react-native-vector-icons/AntDesign';
import { Colors } from '../../Themes';
import { ProgressiveImage } from '../Modules';
import CardListProduct from './CardListProduct';

class DetailScreen extends Component {
    constructor(props) {
        super(props)
        const { params } = props.navigation.state
        this.state = {
            startScrolling: false,
            dataRecomended: params.dataRecomended
        }
    }

    render() {
        const { startScrolling, dataRecomended } = this.state
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    enableEmptySections={true}
                    ref="FlatList"
                    dataSource={[]}
                    renderItem={() => {
                        return (
                            <CardListProduct dataRecomended={dataRecomended} onPress={() => this.props.navigation.navigate('SalesProductDetailScreen')} />
                        )
                    }}
                    ListFooterComponent={() => {
                        return (
                            <View style={{ backgroundColor: "#fff", borderTopWidth: 15, borderTopColor: "#f5f5f5" }}>
                                <View style={{ padding: 20 }}>
                                    <Text style={{ fontSize: 16, color: "#999", fontWeight: "bold" }}>Today 20 Feb 2020</Text>
                                </View>
                                <CardListProduct dataRecomended={dataRecomended} onPress={() => this.props.navigation.navigate('SalesProductDetailScreen')} />
                            </View>
                        )
                    }}
                    renderScrollComponent={(props) => (
                        <ParallaxScrollView
                            contentContainerStyle={{ paddingBottom: 0 }}
                            showsVerticalScrollIndicator={false}
                            onScroll={(event) => {
                                const { y } = event.nativeEvent.contentOffset
                                if(y > 0 && !startScrolling) this.setState({ startScrolling: true })
                                if(y == 0) this.setState({ startScrolling: false })
                            }}
                            backgroundColor={"#fff"}
                            stickyHeaderHeight={ !startScrolling ? 1 : STICKY_HEADER_HEIGHT }
                            parallaxHeaderHeight={ PARALLAX_HEADER_HEIGHT }
                            backgroundSpeed={10}

                            // renderBackground={() => (
                            //     <View style={{ width: window.width, height: PARALLAX_HEADER_HEIGHT, backgroundColor: Colors.main }} />
                            // )}

                            renderForeground={() => (
                                <View key="parallax-header" style={[ styles.parallaxHeader, { backgroundColor: Colors.main } ]}>
                                    <TouchableOpacity 
                                        onPress={() => this.props.navigation.goBack()} 
                                        style={{ position: "absolute", left: 15, top: 10, height: 40, width: 40, borderRadius: 40, backgroundColor: Colors.main, zIndex: 10, alignItems: "center" }}>
                                        <Icon size={30} style={{ top: 5 }} color="#fff" name="arrowleft" />
                                    </TouchableOpacity>
                                    <View style={{ flex: 1, flexDirection: "row", height: 290 }}>
                                        <ProgressiveImage resizeMode="cover" style={{ width: "100%", height: "100%" }} source={{ uri: "https://images.unsplash.com/photo-1553413077-190dd305871c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=60" }} />
                                    </View>
                                    <View style={{ padding: 20 }}>
                                        <Text style={{ textAlign: "left", color: "#fff", fontSize: 16, fontWeight: "bold", fontFamily: "sans-serif-medium" }}>MESRAN PRIMA XP</Text>
                                        <Text style={{ textAlign: "left", color: "#fff", fontSize: 10, flexShrink: 1, marginTop: 5, marginBottom: 5 }}>A94949488</Text>
                                        <Text style={{ textAlign: "left", color: "#fff", fontSize: 12, flexShrink: 1 }}>This vehicle must stop the engine while parking and please securing surrounding and conﬁrm to loading master</Text>
                                    </View>
                                </View>
                            )}

                            renderStickyHeader={() => (
                                <View key="sticky-header" style={[styles.stickySection, { backgroundColor: Colors.main }]}>
                                    <View style={{ flexDirection: "row", alignContent: "flex-start", paddingLeft: 15, paddingRight: 15 }}>
                                        <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{ height: 40, width: 40 }}>
                                            {/* <IonIcon size={40} color="#fff" name="ios-arrow-round-back" /> */}
                                        </TouchableOpacity>
                                        <View>
                                            <Text style={{ textAlign: "left", color: "#fff", fontSize: 16, fontWeight: "bold", fontFamily: "sans-serif-medium" }}>MESRAN PRIMA XP</Text>
                                            <Text style={{ textAlign: "left", color: "#fff", fontSize: 10, marginTop: 5, marginBottom: 5 }}>A94949488</Text>
                                            <View>
                                                <Text style={{ textAlign: "left", color: "#fff", fontSize: 12 }}>This vehicle must stop the engine while parking and...</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            )}
                        />
                    )}
                />
            </View>
        )
    }
}

const window = Dimensions.get('window');
const PARALLAX_HEADER_HEIGHT = 400;
const STICKY_HEADER_HEIGHT = 85;

const styles = StyleSheet.create({
  stickySection: {
    height: STICKY_HEADER_HEIGHT,
    width: window.width,
    padding: 0,
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  parallaxHeader: {
    flex: 1,
    marginBottom: 20
  }
});

export default DetailScreen;