import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import styles from '../../_services/style';
import I18n from '../../_translations/i18n';

export class SimpleButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let rightIcon;
    let leftIcon;
    if (this.props.rightIcon) {
      switch (this.props.rightIcon[0]) {
        case 'Icon':
          rightIcon = (
            <Icon
              name={this.props.rightIcon[1]}
              style={sSimpleButton.iconRight}
            />
          );
          break;
        case 'Feather':
          rightIcon = (
            <Feather
              name={this.props.rightIcon[1]}
              style={sSimpleButton.iconRight}
            />
          );
          break;
        default:
          rightIcon = (
            <Icon
              name={this.props.rightIcon[1]}
              style={sSimpleButton.iconRight}
            />
          );
          break;
      }
    }
    if (this.props.leftIcon) {
      switch (this.props.leftIcon[0]) {
        case 'Icon':
          leftIcon = (
            <Icon
              name={this.props.leftIcon[1]}
              style={[sSimpleButton.leftIcon, {color: this.props.leftIcon[2]}]}
            />
          );
          break;
        case 'Feather':
          leftIcon = (
            <Feather
              name={this.props.leftIcon[1]}
              style={[sSimpleButton.leftIcon, {color: this.props.leftIcon[2]}]}
            />
          );
          break;
        default:
          leftIcon = (
            <Icon
              name={this.props.leftIcon[1]}
              style={[sSimpleButton.leftIcon, {color: this.props.leftIcon[2]}]}
            />
          );
          break;
      }
    }
    return (
      <View style={sSimpleButton.button}>
        <View style={sSimpleButton.buttonAligner}>{leftIcon}</View>
        <View style={[sSimpleButton.buttonAligner, {flex: 1}]}>
          <Text style={styles.buttonText}>
            {I18n.t(this.props.title, {locale: this.props.language})}
          </Text>
          {this.props.subtitle ? (
            <Text style={styles.buttonTextSecondary}>
              {this.props.subtitle}
            </Text>
          ) : null}
        </View>
        <View style={sSimpleButton.buttonAligner}>{rightIcon}</View>
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
