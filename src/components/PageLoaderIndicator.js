import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  Modal,
} from 'react-native';
import {BallIndicator} from 'react-native-indicators';
import PropTypes from 'prop-types';
import ProgressBar from 'react-native-animated-progress';
const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;

const PageLoaderIndicator = ({
  isPageLoader = false,
  loaderStyle = 'bar',
  barColor = 'white',
}) => {
  if (!isPageLoader) {
    return null;
  }

  if (loaderStyle == 'bar') {
    return (
      //
    //   <View
    //     style={{
    //       position: 'absolute',
    //       top: 0,
    //       left: 0,
    //       width: WINDOW_WIDTH,
    //       height: WINDOW_HEIGHT,
    //       backgroundColor: 'rgba(13,13,13,0.4)',
    //       zIndex: 9999999,
    //       justifyContent: 'flex-end',
    //       alignItems: 'stretch',
    //     }}>
        <View
          style={{
            width: WINDOW_WIDTH,
            height: 4,
            position: 'absolute',
            bottom: 0,
            left: 0,
            // bottom: 10,
            // width: '100%',
          }}>
          <ProgressBar indeterminate backgroundColor={barColor} height={3} />
        </View>
    //   </View>
    );
  } else {
    return (
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: WINDOW_WIDTH,
          height: WINDOW_HEIGHT,
          backgroundColor: 'rgba(13,13,13,0.4)',
          zIndex: 9999999,
        }}>
        <BallIndicator color={'white'} />
      </View>
    );
  }
};

PageLoaderIndicator.propTypes = {
  isPageLoader: PropTypes.bool,
};

PageLoaderIndicator.defaultProps = {
  isPageLoader: false,
};

export default PageLoaderIndicator;
