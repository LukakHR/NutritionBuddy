import React, {Component} from 'react';
import {TouchableOpacity, View, Animated, Easing, Text} from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

import styles from '../_services/style';
import {Header} from '../_elements/_headers/Header';
import {SimpleButton} from '../_elements/_buttons/Buttons';
import Loader from '../_elements/Loader';

export default class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      animLogo: new Animated.Value(0),
      user: null,
      nameOfLastScanned: 'none',
    };
  }

  UNSAFE_componentWillMount() {
    database()
      .ref('/users/db/' + auth().currentUser.uid)
      .on('value', snapshot => {
        if (snapshot.val()) {
          this.setState({user: snapshot.val()}, () => {
            if (this.state.lastScanned !== snapshot.val().lastScanned) {
              database()
                .ref('/food/db/' + snapshot.val().lastScanned)
                .on('value', foodSnapshot =>
                  this.setState(
                    {
                      lastScanned: foodSnapshot.val(),
                      nameOfLastScanned: foodSnapshot.val().name,
                    },
                    () => this._loadDone(),
                  ),
                );
            } else {
              this._loadDone();
            }
          });
        }
      });
  }

  _loadDone() {
    Animated.timing(this.state.animLogo, {
      toValue: 5,
      duration: 500,
      useNativeDriver: true,
      easing: Easing.bezier(0.53, 0.01, 0.52, 0.99),
    }).start();
    setTimeout(() => {
      this.setState({loading: false});
    }, 500);
  }

  render() {
    return (
      <>
        {this.state.loading ? (
          <Loader animLogo={this.state.animLogo} />
        ) : (
          <View style={styles.container}>
            <Header title={'Settings'} language={this.state.user.language} />

            <TouchableOpacity
              onPress={() =>
                database()
                  .ref('users/db/' + auth().currentUser.uid)
                  .update({
                    language: this.state.user.language === 'en' ? 'hr' : 'en',
                  })
              }>
              <SimpleButton
                title="Change language"
                language={this.state.user.language}
                leftIcon={['Icon', 'language', COLORS.primaryColor]}
                rightIcon={['Icon', 'angle-right']}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{marginBottom: 30}}
              onPress={() => {
                auth().signOut();
                this.props.navigation.navigate('Registration');
              }}>
              <SimpleButton
                title="Log out"
                language={this.state.user.language}
                leftIcon={['Feather', 'log-out', COLORS.primaryColor]}
                rightIcon={['Icon', 'angle-right']}
              />
            </TouchableOpacity>
          </View>
        )}
      </>
    );
  }
}
