import React, {Component} from 'react';
import {TextInput, Text, View} from 'react-native';
import I18n from '../../_translations/i18n';
import styles from '../../_services/style';
import Icon from 'react-native-vector-icons/FontAwesome';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default class TextInputComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.textInputView}>
        <Text style={styles.mainText}>
          {I18n.t(this.props.text, {locale: this.props.language})}
        </Text>

        <View style={[styles.row, {alignItems: 'center'}]}>
          <TextInput
            style={styles.textInput}
            selectionColor="#222"
            keyboardType={this.props.keyboardType}
            defaultValue={this.props.defaultValue}
            onChangeText={val => {
              this.props.onChangeText(val);
            }}
            clearButtonMode="always"
          />
          <TouchableOpacity onPress={() => this.props.closeEditor()}>
            <Icon name="times" size={20} style={styles.textInputCloseButton} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
