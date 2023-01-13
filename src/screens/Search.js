import React, {Component} from 'react';
import {TouchableOpacity, View, Animated, Easing, FlatList} from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

import styles from '../_services/style';
import {Header} from '../_elements/_headers/Header';
import Loader from '../_elements/Loader';
import SearchBar from '../_elements/SearchBar';
import {SimpleButton} from '../_elements/_buttons/Buttons';

export default class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      animLogo: new Animated.Value(0),
      user: null,
      searchValue: '',
    };
  }

  UNSAFE_componentWillMount() {
    database()
      .ref('/users/db/' + auth().currentUser.uid)
      .on('value', snapshot => {
        if (snapshot.val()) {
          this.setState({user: snapshot.val()}, () => {
            database()
              .ref('/food/db/')
              .on('value', foodSnapshot => {
                foodList = [];
                keys = Object.keys(foodSnapshot.val());

                keys.forEach(key => {
                  foodItem = foodSnapshot.val()[key];
                  foodItem.key = key;
                  foodList.push(foodItem);
                });

                this.setState(
                  {
                    foods: foodList,
                  },
                  () => this._loadDone(),
                );
              });
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
            <Header title={'Search'} language={this.state.user.language} />
            <View style={styles.homePageView}>
              <SearchBar
                value={this.state.searchValue}
                updateSearch={val => this.setState({searchValue: val})}
                style={{marginTop: '8%'}}
              />
              {this.state.searchValue.length > 2 && (
                <FlatList
                  data={this.state.foods.filter(x =>
                    x.name
                      .toLowerCase()
                      .includes(this.state.searchValue.toLowerCase()),
                  )}
                  renderItem={({item, index}) => (
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate('ScannedFood', {
                          foodCode: item.key,
                        })
                      }>
                      <SimpleButton
                        title={item.name}
                        language={this.state.user.language}
                        rightIcon={['Icon', 'angle-right']}
                      />
                    </TouchableOpacity>
                  )}
                />
              )}
            </View>
          </View>
        )}
      </>
    );
  }
}
