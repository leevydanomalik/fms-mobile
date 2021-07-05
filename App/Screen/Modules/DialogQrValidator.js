import React from 'react'
import { Dialog } from 'react-native-simple-dialogs'
import { View } from 'react-native'
import Validating from '../Components/Validating'

class DialogQrValidator extends React.Component {
    render() {
        const { title } = this.props
        return (
            <Dialog visible={true}>
                <View style={{ alignItems: 'center', height: 250 }}>
                    <Validating title={title ? title : 'Validating your code...'} />
                </View>
            </Dialog>
        )
    }
}

export default DialogQrValidator