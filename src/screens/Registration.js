import React, {Component} from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  Dimensions,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from '../_services/style';
import I18n from '../_translations/i18n';

var WIDTH = Dimensions.get('window').width;
var HEIGHT = Dimensions.get('window').height;

export default class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      phone: '',
      confirmResult: null,
      verificationCode: '',
      timer: 59,
      welcome: true,
      language: 'hr',
    };
  }

  validatePhoneNumber = () => {
    var regexp = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/;
    return regexp.test(this.state.phone);
  };

  handleSendCode = () => {
    // Request to send OTP
    if (this.validatePhoneNumber()) {
      auth()
        .signInWithPhoneNumber(this.state.phone)
        .then(confirmResult => {
          this.startCountdown();
          this.setState({confirmResult});
        })
        .catch(error => {
          alert(error.message);

          console.log(error);
        });
    } else {
      alert(I18n.t('Invalid phone number', {locale: this.state.language}));
    }
  };

  changePhoneNumber = () => {
    this.setState({confirmResult: null, verificationCode: ''});
  };

  handleVerifyCode = () => {
    // Request for OTP verification
    const {confirmResult, verificationCode} = this.state;
    if (verificationCode.length == 6) {
      confirmResult
        .confirm(verificationCode)
        .then(user => {
          const userID = user.user.uid;
          const url = '/users/db/' + userID + '/';
          if (user.additionalUserInfo.isNewUser) {
            database()
              .ref(url)
              .update({
                phoneNumber: this.state.phone,
                language: this.state.language,
                addedFoods: 0,
              })
              .catch(error => console.log(error));
            this.props.navigation.navigate('HomePage');
          } else {
            this.props.navigation.navigate('HomePage');
          }
        })
        .catch(error => {
          alert(error.message);
          console.log(error);
        });
    } else {
      alert(
        I18n.t('Please enter a 6 digit OTP code', {
          locale: this.state.language,
        }),
      );
    }
  };

  renderConfirmationCodeView = () => {
    return (
      <View style={styles.verificationView}>
        <TextInput
          style={[styles.textInput, {textAlign: 'center'}]}
          selectionColor="#222"
          value={this.state.verificationCode}
          keyboardType="numeric"
          onChangeText={verificationCode => {
            this.setState({verificationCode});
          }}
          maxLength={6}
          clearButtonMode="always"
        />
        <TouchableOpacity
          style={[styles.themeButton, {marginTop: 20}]}
          onPress={this.handleVerifyCode}>
          <Text style={styles.themeButtonTitle}>
            {I18n.t('CONFIRM CODE', {locale: this.state.language})}
          </Text>
          <Icon name={'arrow-right'} size={13} color="#fff" />
        </TouchableOpacity>
      </View>
    );
  };

  startCountdown() {
    this.setState({timer: 30});
    this.interval = setInterval(() => {
      if (this.state.timer !== 0) {
        this.setState({timer: this.state.timer - 1});
      }
    }, 1000);
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  render() {
    return (
      <SafeAreaView style={[styles.container, {backgroundColor: '#FFF'}]}>
        <View style={styles.page}>
          <Text style={[styles.title]}>
            {I18n.t('Welcome', {locale: this.state.language})}
          </Text>

          {!this.state.confirmResult && !this.state.welcome ? (
            <View style={styles.numberExampleView}>
              <View>
                <Text style={styles.phoneNumText}>
                  {I18n.t('Your phone number', {locale: this.state.language})}
                </Text>
                <Text style={styles.phoneNumTextExample}>
                  {I18n.t('ex', {locale: this.state.language})} +3859812345678
                </Text>
              </View>
              <View style={{flex: 1}}></View>
            </View>
          ) : null}

          {!this.state.confirmResult && !this.state.welcome ? (
            <TextInput
              style={[styles.textInput]}
              selectionColor="#222"
              value={this.state.phone}
              onChangeText={value => {
                this.setState({phone: value});
              }}
              maxLength={15}
              editable={this.state.confirmResult ? false : true}
              clearButtonMode="always"
            />
          ) : null}

          {!this.state.confirmResult && !this.state.welcome ? (
            <TouchableOpacity
              style={[styles.themeButton]}
              onPress={
                this.state.confirmResult
                  ? this.changePhoneNumber
                  : this.handleSendCode
              }>
              <Text style={styles.themeButtonTitle}>
                {this.state.confirmResult
                  ? I18n.t('Change phone number', {locale: this.state.language})
                  : I18n.t('Send code', {locale: this.state.language})}
              </Text>
              <Icon name={'arrow-right'} size={13} color="#fff" />
            </TouchableOpacity>
          ) : null}

          {this.state.confirmResult && !this.state.welcome ? (
            <View style={styles.codeConfirmView}>
              <View>
                <Text style={styles.phoneNumText}>
                  {I18n.t('Code you got in your messages', {
                    locale: this.state.language,
                  })}
                </Text>
              </View>
              <View style={{flex: 1}}></View>
            </View>
          ) : null}

          {this.state.confirmResult && !this.state.welcome
            ? this.renderConfirmationCodeView()
            : null}

          {!this.state.welcome ? (
            <View style={styles.buttonView}>
              {this.state.confirmResult && this.state.timer > 0 ? (
                this.state.timer < 10 ? (
                  <Text style={styles.timer}>0:0{this.state.timer}</Text>
                ) : (
                  <Text style={styles.timer}>0:{this.state.timer}</Text>
                )
              ) : null}
              {this.state.confirmResult && this.state.timer === 0 ? (
                <View style={[styles.codeResendButton]}>
                  <TouchableOpacity
                    onPress={() =>
                      this.setState({
                        confirmResult: false,
                      })
                    }>
                    <Text style={styles.codeResendTitleFollow}>
                      {I18n.t('Click', {locale: this.state.language})}
                    </Text>
                  </TouchableOpacity>
                  <Text style={styles.codeResendButtonTitle}>
                    {I18n.t('to resend code', {locale: this.state.language})}
                  </Text>
                </View>
              ) : null}
            </View>
          ) : null}

          {this.state.welcome ? (
            <View style={styles.buttonView}>
              <View style={{flex: 1}} />
              <TouchableOpacity
                style={[styles.welcomeButton]}
                onPress={() => {
                  this.setState({welcome: false});
                }}>
                <Text style={styles.themeButtonTitle}>
                  {I18n.t('CONTINUE', {locale: this.state.language})}
                </Text>
                <Icon name={'arrow-right'} size={13} color="#fff" />
              </TouchableOpacity>
            </View>
          ) : null}

          <View style={[styles.codeResendButton]}>
            <TouchableOpacity
              onPress={() =>
                this.setState({
                  language: this.state.language === 'hr' ? 'en' : 'hr',
                })
              }>
              <Text style={styles.codeResendTitleFollow}>
                {this.state.language === 'hr' ? 'English' : 'Croatian'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
