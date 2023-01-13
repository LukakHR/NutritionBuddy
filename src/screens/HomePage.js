import React, {Component} from 'react';
import {TouchableOpacity, View, Animated, Easing, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

import styles from '../_services/style';
import {Header} from '../_elements/_headers/Header';
import {SimpleButton} from '../_elements/_buttons/Buttons';
import Loader from '../_elements/Loader';
import I18n from 'i18n-js';

// 9.11.
// WIP

scanButton = props => {
  return (
    <TouchableOpacity
      style={styles.iconButton}
      onPress={() =>
        props.navigation.navigate('BarCodeScanner', {
          navigation: props.navigation,
        })
      }>
      <Icon name="barcode" color={COLORS.primaryColor} size={20} />
    </TouchableOpacity>
  );
};

export default class HomePage extends Component {
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
            <Header
              title={'NutritionBuddy'}
              button={() => scanButton(this.props)}
              language={this.state.user.language}
            />
            <View style={styles.homePageView}>
              <Text style={styles.mainText}>
                {I18n.t("You've scanned:  ", {
                  locale: this.state.user.language,
                }) +
                  this.state.user.addedFoods +
                  I18n.t('  products', {
                    locale: this.state.user.language,
                  })}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('BarCodeScanner', {
                    navigation: this.props.navigation,
                  })
                }>
                <SimpleButton
                  title={'Scan more'}
                  language={this.state.user.language}
                  rightIcon={['Icon', 'angle-right']}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.homePageView}>
              <Text style={styles.mainText}>
                {I18n.t('Last scanned:  ', {
                  locale: this.state.user.language,
                }) + this.state.nameOfLastScanned}
              </Text>
              <TouchableOpacity
                disabled={!this.state.user.lastScanned}
                onPress={() =>
                  this.props.navigation.navigate('ScannedFood', {
                    foodCode: this.state.user.lastScanned,
                  })
                }>
                <SimpleButton
                  title={'See last scanned'}
                  language={this.state.user.language}
                  rightIcon={['Icon', 'angle-right']}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </>
    );
  }
}
