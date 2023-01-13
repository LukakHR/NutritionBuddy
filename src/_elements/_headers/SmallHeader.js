import React, {Component} from 'react';
import {View, Image, Dimensions, TouchableOpacity, Text} from 'react-native';

import I18n from '../../_translations/i18n';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import {SafeAreaView} from 'react-native-safe-area-context';

var WIDTH = Dimensions.get('window').width;
var HEIGHT = Dimensions.get('window').height;

export class SmallHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      storeTemplate: this.props.storeTemplate,
    };
  }

  render() {
    return (
      <View style={{}}>
        <View
          style={{
            position: 'absolute',
            zIndex: -1,
            height: WIDTH / 2.5,
            aspectRatio: 1,
          }}>
          <Image
            style={{height: WIDTH / 2.5, aspectRatio: 2.5}}
            resizeMode={'contain'}
            source={T_COLORS[this.state.storeTemplate].headerImage}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            height: WIDTH / 2.5,
          }}>
          <View
            style={{
              top: -25,
              padding: 10,
              alignSelf: 'flex-end',
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: 'rgba(0,0,0,.20)',
                padding: 10,
                borderRadius: 100,
              }}
              onPress={() => this.props.navigation.goBack()}>
              <Feather
                name={'arrow-left'}
                size={22}
                color={T_COLORS[this.state.storeTemplate].headerTextColor}
                style={{}}
              />
            </TouchableOpacity>
            <Text
              style={{
                //backgroundColor: "rgba(255,0,0,.5)", padding: 10, borderRadius: 100,
                justifyContent: 'center',
                alignSelf: 'center',
                color: T_COLORS[this.state.storeTemplate].headerTextColor,
                fontSize: 19,
                fontWeight: '500',
                shadowColor:
                  T_COLORS[this.state.storeTemplate].headerTextShadow,
                shadowOffset: {
                  width: 1,
                  height: 1,
                },
                shadowOpacity: 1,
                shadowRadius: 6,
              }}>
              {this.props.title}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
