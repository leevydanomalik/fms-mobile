import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Modal, StyleSheet, Animated, Dimensions, PanResponder } from 'react-native'
import FaIcon from 'react-native-vector-icons/AntDesign'

class BottomPopup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            panY: new Animated.Value(Dimensions.get('screen').height)
        }
        this._resetPositionAnim = Animated.timing(this.state.panY, {
            toValue: 0,
            duration: 300,
        })
        this._closeAnim = Animated.timing(this.state.panY, {
            toValue: Dimensions.get('screen').height,
            duration: 300,
        })
        this._panResponders = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => false,
            onPanResponderMove: Animated.event([
              null, {dy: this.state.panY}
            ]),
            onPanResponderRelease: (e, gs) => {
              if (gs.dy > 0 && gs.vy > 2) {
                return this._closeAnim.start(() => this.props.onDismiss());
              }
              return this._resetPositionAnim.start();
            },
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (
            prevProps.visible !== this.props.visible 
            && this.props.visible
        ) {
            this._resetPositionAnim.start();
        }
    }
    
      _handleDismiss() {
        this._closeAnim.start(() => this.props.onDismiss());
    }

    render() {
        const {visible, title} = this.props
        const top = this.state.panY.interpolate({
            inputRange: [-1, 0, 1],
            outputRange: [0, 0, 1],
        })
        return (
            <Modal 
                    animated
                    animationType="fade"
                    visible={visible}
                    transparent={true}
                    onRequestClose={() => this._handleDismiss()}
                >
                <View style={styles.overlay}>
                    <Animated.View style={[styles.container, {top}]}>
                        <View style={styles.header}>
                            <View>
                                <Text style={styles.title}>{title}</Text>
                            </View>
                            <View style={styles.close}>
                                <TouchableOpacity onPress={() => this._handleDismiss()}>
                                    <FaIcon name={'close'} size={20} color={'#555'} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        {this.props.children}
                    </Animated.View>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.2)',
        flex: 1,
        justifyContent: 'flex-end',
    },
    header: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        // alignContent: 'center',
        padding: 15,
        paddingTop: 0,
        paddingBottom: 10
    },
    container: {
        backgroundColor: 'white',
        paddingTop: 12,
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
    },
    title: {
        marginTop: 5,
        fontSize: 16, 
        fontWeight: 'bold',
        color: '#999'
    },
    close: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default BottomPopup