import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Tts from 'react-native-tts';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../../_services/style';
import I18n from '../../_translations/i18n';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default class FoodValueButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  speak = val => {
    Tts.getInitStatus().then(() => {
      Tts.speak(val);
    });
    Tts.stop();
  };

  render() {
    return (
      <View style={sSimpleButton.button}>
        <TouchableOpacity onPress={() => this.props.onOpen()}>
          <View style={[sSimpleButton.buttonAligner, {flex: 1}]}>
            {this.props.numerical && (
              <Text style={styles.buttonText}>
                {I18n.t(this.props.title, {locale: this.props.language})}
              </Text>
            )}

            <Text style={styles.buttonText}>{this.props.value}</Text>
          </View>
        </TouchableOpacity>

        <View style={sSimpleButton.button}>
          <View style={sSimpleButton.buttonAligner}>
            <TouchableOpacity onPress={() => this.speak(this.props.value)}>
              <Icon name="volume-up" style={sSimpleButton.iconRight} />
            </TouchableOpacity>
          </View>
          <View style={sSimpleButton.buttonAligner}>
            <TouchableOpacity onPress={() => this.props.onEdit()}>
              <Icon name="edit" style={sSimpleButton.iconRight} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const sSimpleButton = StyleSheet.create({
  button: {
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  buttonAligner: {
    justifyContent: 'center',
    marginHorizontal: 5,
  },

  iconRight: {
    fontSize: 20,
    color: COLORS.mainTextLight,
  },
  leftIcon: {
    fontSize: 20,
    paddingRight: 20,
    color: COLORS.mainTextLight,
  },
});
