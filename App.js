import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { createStackNavigator, createMaterialTopTabNavigator } from 'react-navigation';
import { fadeIn } from 'react-navigation-transitions';

import MainScreen from './components/mainscreen';
import MyPlaceScreen from './components/myplacescreen'
import AddPlace from './components/addplace'

const MainStack = createStackNavigator(
  {
    Main: {
      screen: MainScreen
    },
    },
    {
      initialRouteName: 'Main',
       transitionConfig: () => fadeIn(),
    }
)

const MyPlaceStack = createStackNavigator(
  {
    MyPlace: MyPlaceScreen,
    AddPlace: AddPlace
    },
    {
      initialRouteName: 'MyPlace',
      // initialRouteName: 'AddPlace',
       transitionConfig: () => fadeIn(),
    }
)

const RootTab = createMaterialTopTabNavigator(
  {
    'My Foodry': {
      screen: MainStack
    },
    'My Places': {
      screen: MyPlaceStack
    }
    },
    {
      lazy: true,
      tabBarOptions: {
        activeTintColor: 'white',
        inactiveTintColor: 'gray',
        style: {
          backgroundColor: '#000',
          paddingTop: StatusBar.currentHeight
      },
      labelStyle:{
        fontWeight: 'bold',
      },
      indicatorStyle: {
          backgroundColor: '#fff',
      },
      },
    }
)


export default class App extends React.Component {
  render() {
    return <RootTab/>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
