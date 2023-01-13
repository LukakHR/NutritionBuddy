import React, {Component} from 'react';
import {View, ActivityIndicator, Animated} from 'react-native';

export default class Loader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animLogo: props.animLogo,
    };
  }

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View
          style={{
            width: WIDTH / 1.5,
            height: WIDTH / 1.5,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Animated.Image
            style={{
              flex: 1,
              opacity: this.state.animLogo.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0.8],
              }),
              transform: [
                {
                  scale: this.state.animLogo.interpolate({
                    inputRange: [0, 2],
                    outputRange: [1, 2],
                  }),
                },
              ],
            }}
            resizeMode={'contain'}
            source={require('../assets/logo/NutritionBuddy.png')}
          />
          <ActivityIndicator style={{}} />
        </View>
      </View>
    );
  }
}
