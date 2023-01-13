import React, {Component} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import styles from '../../_services/style';
import I18n from '../../_translations/i18n';

export class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={{backgroundColor: 'white'}}>
        <View style={[styles.settingsHeader]}>
          <SafeAreaView />
          <View style={styles.spacer}></View>
          <View style={styles.headerRow}>
            <Text style={styles.headerText}>
              {I18n.t(this.props.title, {locale: this.props.language})}
            </Text>
            {this.props.button && <this.props.button />}
          </View>
        </View>
      </View>
    );
  }
}
