import React from 'react';
import { View, StyleSheet, Animated, Image, Text } from 'react-native';
import Spinner from 'react-native-spinkit'
import RNFetchBlob from 'rn-fetch-blob'
import {Colors} from '../../Themes'

const styles = StyleSheet.create({
  imageOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
  container: {
    backgroundColor: '#e1e4e8',
  },
});

class ProgressiveImage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      image: null,
      fetching: true,
      source: null
    }
  }

  componentDidMount() {
    this.setState({ source: this.props.source }, () => this.getImage())
  }

  componentDidUpdate(){
    const { source } = this.props
    if(source !== this.state.source) {
      this.setState({ source }, () => this.getImage())
    }
  }

  getImage = async () => {
    let { disableNotFoundInfo, isImageDownloaded } = this.props
    let { image, source } = this.state
    let response = await RNFetchBlob.fetch('GET', source.uri, {...source.headers, 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiJ9.5BG9SEVOGo_xRhtT8IkyoSy60kPg8HM9Vpvb0TdNew4'})
    
    if (response.data && response.respInfo.status == 200) {
      image = {
        uri: "data:image/jpg;base64," + response.data
      }
      isImageDownloaded && isImageDownloaded(true)
    } else {
      image = !disableNotFoundInfo && require('../../assets/not-found.png')
      isImageDownloaded && isImageDownloaded(false)
    }
    this.setState({ image, fetching: false })
  }

  render() {
    const {
      thumbnailSource,
      source,
      style,
      sizeSpinner,
      colorSpinner,
      resizeMode,
      ...props
    } = this.props;

    return (
      <View style={{ justifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}>
        {!this.state.fetching ? (
          <Image
            source={this.state.image}
            style={{...style, resizeMode: resizeMode ? resizeMode : "cover"}}
          />
        ) : (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Spinner isVisible={true} size={sizeSpinner ? sizeSpinner : 50} type={"Circle"} color={colorSpinner ? colorSpinner : Colors.main}/>
          </View>
        )}
      </View>
    );
  }
}

export default ProgressiveImage