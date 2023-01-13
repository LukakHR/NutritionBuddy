import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {Dimensions, Easing, Animated, LogBox} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

// Navigation
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import auth from '@react-native-firebase/auth';

import Loader from './src/_elements/Loader';
import Registration from './src/screens/Registration';
import BarCodeScanner from './src/screens/BarcodeScanner';
import ScannedFood from './src/screens/ScannedFood';
import HomePage from './src/screens/HomePage';
import PictureTaker from './src/screens/PictureTaker';
import Settings from './src/screens/Settings';
import Search from './src/screens/Search';

// Global
global.WIDTH = Dimensions.get('window').width;
global.HEIGHT = Dimensions.get('window').height;

const Stack = createStackNavigator();
const BottomTabs = createBottomTabNavigator();

// DEV Ignore logbox
LogBox.ignoreAllLogs();

const UserScreen = () => {
  return (
    <BottomTabs.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'HomePage') {
            iconType = 'Feather';
            iconSize = 18;
            iconName = focused ? 'home' : 'home';
            iconColor = focused
              ? COLORS.activeTabColor
              : COLORS.inactiveTabColor;
          }
          if (route.name === 'BarcodeScanner') {
            iconType = 'Icon';
            iconSize = 18;
            iconName = focused ? 'barcode' : 'barcode';
            iconColor = focused
              ? COLORS.activeTabColor
              : COLORS.inactiveTabColor;
          }
          if (route.name === 'Settings') {
            iconType = 'Feather';
            iconSize = 18;
            iconName = focused ? 'settings' : 'settings';
            iconColor = focused
              ? COLORS.activeTabColor
              : COLORS.inactiveTabColor;
          }
          if (route.name === 'Search') {
            iconType = 'Icon';
            iconSize = 18;
            iconName = focused ? 'search' : 'search';
            iconColor = focused
              ? COLORS.activeTabColor
              : COLORS.inactiveTabColor;
          }
          //

          switch (iconType) {
            case 'Feather':
              return (
                <Feather name={iconName} size={iconSize} color={iconColor} />
              );
              break;
            default:
              return <Icon name={iconName} size={iconSize} color={iconColor} />;
          }
        },
      })}
      tabBarOptions={{
        //showLabel: false,
        inactiveTintColor: 'rgba(30,30,30,.25)',
        activeTintColor: 'rgba(30,30,30,.75)',
        tabStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 0.5,
          borderColor: 'rgba(30,30,30,.05)',
        },
      }}>
      <BottomTabs.Screen
        name="HomePage"
        component={HomePageStack}
        options={{title: 'Home'}}
      />
      <BottomTabs.Screen
        name="BarcodeScanner"
        component={BarCodeStack}
        options={{title: 'Scan'}}
      />
      <BottomTabs.Screen
        name="Search"
        component={SearchStack}
        options={{title: 'Search'}}
      />
      <BottomTabs.Screen
        name="Settings"
        component={Settings}
        options={{title: 'Settings'}}
      />
    </BottomTabs.Navigator>
  );
};

// Logged in user stack
const UserLoggedInStack = () => {
  return (
    <Stack.Navigator
      edgeWidth="0"
      screenOptions={{
        headerStyle: {
          display: 'none',
          backgroundColor: '#9AC4F8',
          header: null,
        },
        headerShown: false,
      }}>
      <Stack.Screen name="HomePage" component={UserScreen} />
      <Stack.Screen name="ScannedFood" component={ScannedFood} />
      <Stack.Screen name="Registration" component={Registration} />
      <Stack.Screen name="BarCodeScanner" component={BarCodeScanner} />
      <Stack.Screen name="PictureTaker" component={PictureTaker} />
    </Stack.Navigator>
  );
};

const HomePageStack = () => {
  return (
    <Stack.Navigator
      edgeWidth="0"
      screenOptions={{
        headerStyle: {
          display: 'none',
          backgroundColor: '#9AC4F8',
          header: null,
        },
        headerShown: false,
      }}>
      <Stack.Screen name="HomePage" component={HomePage} />
      <Stack.Screen name="ScannedFood" component={ScannedFood} />
      <Stack.Screen name="BarCodeScanner" component={BarCodeScanner} />
    </Stack.Navigator>
  );
};

const BarCodeStack = () => {
  return (
    <Stack.Navigator
      edgeWidth="0"
      screenOptions={{
        headerStyle: {
          display: 'none',
          backgroundColor: '#9AC4F8',
          header: null,
        },
        headerShown: false,
      }}>
      <Stack.Screen name="BarCodeScanner" component={BarCodeScanner} />
      <Stack.Screen name="ScannedFood" component={ScannedFood} />
    </Stack.Navigator>
  );
};

const SearchStack = () => {
  return (
    <Stack.Navigator
      edgeWidth="0"
      screenOptions={{
        headerStyle: {
          display: 'none',
          backgroundColor: '#9AC4F8',
          header: null,
        },
        headerShown: false,
      }}>
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="ScannedFood" component={ScannedFood} />
    </Stack.Navigator>
  );
};

const UserNotLoggedInStack = () => {
  return (
    <Stack.Navigator
      edgeWidth="0"
      screenOptions={{
        headerStyle: {
          display: 'none',
          backgroundColor: '#9AC4F8',
          header: null,
        },
        headerShown: false,
      }}>
      <Stack.Screen name="Registration" component={Registration} />
      <Stack.Screen name="HomePage" component={UserScreen} />
      <Stack.Screen name="ScannedFood" component={ScannedFood} />
      <Stack.Screen name="BarCodeScanner" component={BarCodeScanner} />
      <Stack.Screen name="PictureTaker" component={PictureTaker} />
    </Stack.Navigator>
  );
};

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      animLogo: new Animated.Value(0),
    };
  }

  UNSAFE_componentWillMount() {
    this._loadDone();
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
    if (this.state.loading == true) {
      return <Loader animLogo={this.state.animLogo} />;
    } else {
      if (auth().currentUser) {
        return (
          <NavigationContainer value={auth().currentUser}>
            <UserLoggedInStack />
          </NavigationContainer>
        );
      } else {
        // Register
        return (
          <NavigationContainer value={auth().currentUser}>
            <UserNotLoggedInStack />
          </NavigationContainer>
        );
      }
    }
  }
}
