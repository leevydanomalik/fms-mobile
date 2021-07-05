import React, { Component } from 'react'
import { View } from 'react-native'
import FaIcon from 'react-native-vector-icons/FontAwesome'

class CardStars extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [
                {id: 1, status: false},
                {id: 2, status: false},
                {id: 3, status: false},
                {id: 4, status: false},
                {id: 5, status: false}
            ]
        }
    }

    componentDidMount () {
        this.setData()
    }

    setData = () => {
        const { periority } = this.props
        const { data } = this.state
        let payload = []

        data.map((dt, index) => {
            let idx = (index + 1)
            let stt = (idx <= periority) ? true : false
            payload.push({
                id: dt.id,
                status: stt
            })
            return null
        })

        this.setState({data: payload})
    }

    render () {
        const {data} = this.state
        const {size} = this.props
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                {data && data.map((dt, index) => {
                    return (
                        <FaIcon 
                            key={index} 
                            name={"star"} 
                            size={size ? size : 14} 
                            color={(dt.status) ? styles.voteColorYellow : styles.voteColorGrey} 
                            style={styles.voteStyles} 
                        />
                    )
                })}
            </View>
        )
    }
}

const styles = {
    voteStyles: {
        marginLeft: 1, 
        marginRight: 1
    },
    voteColorYellow: '#fdb813',
    voteColorGrey: '#ccc'
}

export default CardStars