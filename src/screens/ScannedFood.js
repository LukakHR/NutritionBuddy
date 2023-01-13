import React, {Component} from 'react';
import {
  View,
  Animated,
  Easing,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  Text,
  Dimensions,
} from 'react-native';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from '../_services/style';
import {Header} from '../_elements/_headers/Header';
import Loader from '../_elements/Loader';
import TextInputComponent from '../_elements/_input/TextInput';
import FoodValueButton from '../_elements/_buttons/FoodValueButton';

// 9.11.
// WIP
var WIDTH = Dimensions.get('window').width;
var HEIGHT = Dimensions.get('window').height;

export default class ScannedFood extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      animLogo: new Animated.Value(0),
      user: null,
      modalVisible: false,
      modalText: '',
      modalValue: '',
      editing: null,
      foodValues: {
        name: null,
        packagingSize: null,
        energy: null,
        fat: null,
        saturatedFat: null,
        carbonHydrates: null,
        sugars: null,
        fibers: null,
        protein: null,
        salt: null,
      },
      changesWereMade: false,
    };
  }

  UNSAFE_componentWillMount() {
    this._loadUserAndFood();
  }

  _loadUserAndFood = async () => {
    await database()
      .ref('/users/db/' + auth().currentUser.uid)
      .on('value', snapshot => {
        if (snapshot.val()) {
          this.setState({user: snapshot.val()});
        }
      });

    let imageURL = '';
    try {
      imageURL = await storage()
        .ref('FoodImages/' + this.props.route.params.foodCode)
        .getDownloadURL();
    } catch {}

    await database()
      .ref('/food/db/' + this.props.route.params.foodCode)
      .once('value', snapshot => {
        if (snapshot.val()) {
          this.setState(
            {foodValues: snapshot.val(), newFood: false, imageURL: imageURL},
            () => this._loadDone(),
          );
        } else {
          this.setState({newFood: true}, () => this._loadDone());
        }
      });
  };

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

  submitButton = () => {
    if (this.state.changesWereMade) {
      return (
        <TouchableOpacity
          style={styles.iconButton}
          onPress={async () => {
            this.setState({changesWereMade: false});
            await database()
              .ref('/food/db/' + this.props.route.params.foodCode)
              .update(this.state.foodValues);

            if (this.state.newFood) {
              await database()
                .ref('/users/db/' + auth().currentUser.uid)
                .update({
                  addedFoods: this.state.user.addedFoods + 1,
                  lastScanned: this.props.route.params.foodCode,
                });
            } else {
              await database()
                .ref('/users/db/' + auth().currentUser.uid)
                .update({
                  lastScanned: this.props.route.params.foodCode,
                });
            }

            this.props.navigation.navigate('HomePage');
          }}>
          <Icon name="cloud-upload" color={COLORS.primaryColor} size={20} />
        </TouchableOpacity>
      );
    } else {
      return <View></View>;
    }
  };

  render() {
    return (
      <>
        {this.state.loading ? (
          <Loader animLogo={this.state.animLogo} />
        ) : (
          <View style={styles.container}>
            <Modal
              visible={this.state.modalVisible}
              transparent={true}
              onRequestClose={() => {
                this.setState({modalVisible: false});
              }}>
              <>
                <TouchableOpacity
                  style={styles.modalCloseButton}
                  activeOpacity={1}
                  onPress={() => {
                    this.setState({modalVisible: false});
                  }}
                />
                <View
                  style={[styles.centeredView, styles.modalView, {zIndex: 1}]}>
                  <Text>{this.state.modalText}</Text>
                  <Text style={styles.modalValueText}>
                    {this.state.modalValue}
                  </Text>
                </View>
              </>
            </Modal>

            <View
              style={{
                opacity: this.state.modalVisible ? 0.2 : 1,
              }}>
              {this.state.newFood ? (
                <Header title={'New food'} button={this.submitButton} />
              ) : (
                <Header
                  title={this.state.foodValues.name}
                  button={this.submitButton}
                />
              )}
              <ScrollView>
                {this.state.imageURL ? (
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('PictureTaker', {
                        foodCode: this.props.route.params.foodCode,
                      })
                    }>
                    <Image
                      style={{height: WIDTH / 2, aspectRatio: 2}}
                      resizeMode={'contain'}
                      source={{uri: this.state.imageURL}}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('PictureTaker', {
                        foodCode: this.props.route.params.foodCode,
                      })
                    }
                    style={{alignSelf: 'center'}}>
                    <Icon name="image" size={100} />
                  </TouchableOpacity>
                )}

                {this.state.editing === 'Name' ? (
                  <TextInputComponent
                    text="Name"
                    language={this.state.user.language}
                    keyboardType="default"
                    closeEditor={() => this.setState({editing: null})}
                    defaultValue={this.state.foodValues.name}
                    onChangeText={val => {
                      const newFoodValues = this.state.foodValues;
                      newFoodValues.name = val;
                      this.setState({
                        foodValues: newFoodValues,
                        changesWereMade: true,
                      });
                    }}
                  />
                ) : (
                  <FoodValueButton
                    language={this.state.user.language}
                    title="Name"
                    value={this.state.foodValues.name}
                    onEdit={() => this.setState({editing: 'Name'})}
                    onOpen={() =>
                      this.setState({
                        modalVisible: true,
                        modalText: 'Name',
                        modalValue: this.state.foodValues.name,
                      })
                    }
                  />
                )}
                {this.state.editing === 'Packaging size' ? (
                  <TextInputComponent
                    text="Pachaging size"
                    language={this.state.user.language}
                    closeEditor={() => this.setState({editing: null})}
                    keyboardType="default"
                    defaultValue={this.state.foodValues.packagingSize}
                    onChangeText={val => {
                      const newFoodValues = this.state.foodValues;
                      newFoodValues.packagingSize = val;
                      this.setState({
                        foodValues: newFoodValues,
                        changesWereMade: true,
                      });
                    }}
                  />
                ) : (
                  <FoodValueButton
                    language={this.state.user.language}
                    title="Packaging size"
                    value={this.state.foodValues.packagingSize}
                    onEdit={() => this.setState({editing: 'Packaging size'})}
                    onOpen={() =>
                      this.setState({
                        modalVisible: true,
                        modalText: 'Packaging size',
                        modalValue: this.state.foodValues.packagingSize,
                      })
                    }
                    numerical={true}
                  />
                )}
                {this.state.editing === 'Energy (kcal)' ? (
                  <TextInputComponent
                    text="Energy (kcal)"
                    language={this.state.user.language}
                    closeEditor={() => this.setState({editing: null})}
                    keyboardType="numeric"
                    defaultValue={this.state.foodValues.energy}
                    onChangeText={val => {
                      const newFoodValues = this.state.foodValues;
                      newFoodValues.energy = val;
                      this.setState({
                        foodValues: newFoodValues,
                        changesWereMade: true,
                      });
                    }}
                  />
                ) : (
                  <FoodValueButton
                    language={this.state.user.language}
                    title="Energy (kcal)"
                    value={this.state.foodValues.energy}
                    onEdit={() => this.setState({editing: 'Energy (kcal)'})}
                    onOpen={() =>
                      this.setState({
                        modalVisible: true,
                        modalText: 'Energy (kcal)',
                        modalValue: this.state.foodValues.energy,
                      })
                    }
                    numerical={true}
                  />
                )}
                {this.state.editing === 'Fat' ? (
                  <TextInputComponent
                    text="Fat"
                    language={this.state.user.language}
                    keyboardType="numeric"
                    defaultValue={this.state.foodValues.fat}
                    closeEditor={() => this.setState({editing: null})}
                    onChangeText={val => {
                      const newFoodValues = this.state.foodValues;
                      newFoodValues.fat = val;
                      this.setState({
                        foodValues: newFoodValues,
                        changesWereMade: true,
                      });
                    }}
                  />
                ) : (
                  <FoodValueButton
                    language={this.state.user.language}
                    title="Fat"
                    value={this.state.foodValues.fat}
                    onEdit={() => this.setState({editing: 'Fat'})}
                    onOpen={() =>
                      this.setState({
                        modalVisible: true,
                        modalText: 'Fat',
                        modalValue: this.state.foodValues.fat,
                      })
                    }
                    numerical={true}
                  />
                )}

                {this.state.editing === 'Saturated fat' ? (
                  <TextInputComponent
                    text="Saturated fat"
                    language={this.state.user.language}
                    keyboardType="numeric"
                    defaultValue={this.state.foodValues.saturatedFat}
                    closeEditor={() => this.setState({editing: null})}
                    onChangeText={val => {
                      const newFoodValues = this.state.foodValues;
                      newFoodValues.saturatedFat = val;
                      this.setState({
                        foodValues: newFoodValues,
                        changesWereMade: true,
                      });
                    }}
                  />
                ) : (
                  <FoodValueButton
                    language={this.state.user.language}
                    title="Saturated fat"
                    value={this.state.foodValues.saturatedFat}
                    onEdit={() => this.setState({editing: 'Saturated fat'})}
                    onOpen={() =>
                      this.setState({
                        modalVisible: true,
                        modalText: 'Saturated fat',
                        modalValue: this.state.foodValues.saturatedFat,
                      })
                    }
                    numerical={true}
                  />
                )}

                {this.state.editing === 'Carbonhydrates' ? (
                  <TextInputComponent
                    text="Carbonhydrates"
                    language={this.state.user.language}
                    closeEditor={() => this.setState({editing: null})}
                    keyboardType="numeric"
                    defaultValue={this.state.foodValues.carbonHydrates}
                    onChangeText={val => {
                      const newFoodValues = this.state.foodValues;
                      newFoodValues.carbonHydrates = val;
                      this.setState({
                        foodValues: newFoodValues,
                        changesWereMade: true,
                      });
                    }}
                  />
                ) : (
                  <FoodValueButton
                    language={this.state.user.language}
                    title="Carbonhydrates"
                    value={this.state.foodValues.carbonHydrates}
                    onEdit={() => this.setState({editing: 'Carbonhydrates'})}
                    onOpen={() =>
                      this.setState({
                        modalVisible: true,
                        modalText: 'Carbonhydrates',
                        modalValue: this.state.foodValues.carbonHydrates,
                      })
                    }
                    numerical={true}
                  />
                )}

                {this.state.editing === 'Sugar' ? (
                  <TextInputComponent
                    text="Sugar"
                    language={this.state.user.language}
                    keyboardType="numeric"
                    closeEditor={() => this.setState({editing: null})}
                    defaultValue={this.state.foodValues.sugars}
                    onChangeText={val => {
                      const newFoodValues = this.state.foodValues;
                      newFoodValues.sugars = val;
                      this.setState({
                        foodValues: newFoodValues,
                        changesWereMade: true,
                      });
                    }}
                  />
                ) : (
                  <FoodValueButton
                    language={this.state.user.language}
                    title="Sugar"
                    value={this.state.foodValues.sugars}
                    onEdit={() => this.setState({editing: 'Sugar'})}
                    onOpen={() =>
                      this.setState({
                        modalVisible: true,
                        modalText: 'Sugar',
                        modalValue: this.state.foodValues.sugars,
                      })
                    }
                    numerical={true}
                  />
                )}

                {this.state.editing === 'Fibers' ? (
                  <TextInputComponent
                    text="Fibers"
                    language={this.state.user.language}
                    keyboardType="numeric"
                    closeEditor={() => this.setState({editing: null})}
                    defaultValue={this.state.foodValues.fibers}
                    onChangeText={val => {
                      const newFoodValues = this.state.foodValues;
                      newFoodValues.fibers = val;
                      this.setState({
                        foodValues: newFoodValues,
                        changesWereMade: true,
                      });
                    }}
                  />
                ) : (
                  <FoodValueButton
                    language={this.state.user.language}
                    title="Fibers"
                    value={this.state.foodValues.fibers}
                    onEdit={() => this.setState({editing: 'Fibers'})}
                    onOpen={() =>
                      this.setState({
                        modalVisible: true,
                        modalText: 'Fibers',
                        modalValue: this.state.foodValues.fibers,
                      })
                    }
                    numerical={true}
                  />
                )}

                {this.state.editing === 'Protein' ? (
                  <TextInputComponent
                    text="Protein"
                    language={this.state.user.language}
                    keyboardType="numeric"
                    closeEditor={() => this.setState({editing: null})}
                    defaultValue={this.state.foodValues.protein}
                    onChangeText={val => {
                      const newFoodValues = this.state.foodValues;
                      newFoodValues.protein = val;
                      this.setState({
                        foodValues: newFoodValues,
                        changesWereMade: true,
                      });
                    }}
                  />
                ) : (
                  <FoodValueButton
                    language={this.state.user.language}
                    title="Protein"
                    value={this.state.foodValues.protein}
                    onEdit={() => this.setState({editing: 'Protein'})}
                    onOpen={() =>
                      this.setState({
                        modalVisible: true,
                        modalText: 'Protein',
                        modalValue: this.state.foodValues.protein,
                      })
                    }
                    numerical={true}
                  />
                )}

                {this.state.editing === 'Salt' ? (
                  <TextInputComponent
                    text="Salt"
                    language={this.state.user.language}
                    keyboardType="numeric"
                    closeEditor={() => this.setState({editing: null})}
                    defaultValue={this.state.foodValues.salt}
                    onChangeText={val => {
                      const newFoodValues = this.state.foodValues;
                      newFoodValues.salt = val;
                      this.setState({
                        foodValues: newFoodValues,
                        changesWereMade: true,
                      });
                    }}
                  />
                ) : (
                  <FoodValueButton
                    language={this.state.user.language}
                    title="Salt"
                    value={this.state.foodValues.salt}
                    onEdit={() => this.setState({editing: 'Salt'})}
                    onOpen={() =>
                      this.setState({
                        modalVisible: true,
                        modalText: 'Salt',
                        modalValue: this.state.foodValues.salt,
                      })
                    }
                    numerical={true}
                  />
                )}

                <View
                  style={{
                    height: this.state.editing ? HEIGHT * 0.6 : HEIGHT * 0.2,
                  }}
                />
              </ScrollView>
            </View>
          </View>
        )}
      </>
    );
  }
}
