import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createMaterialTopTabNavigator } from 'react-navigation';
import { fadeIn } from 'react-navigation-transitions';

import MainScreen from './components/mainscreen';
import MyPlaceScreen from './components/myplacescreen'

//NOTE: 
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
    MyPlace: {
      screen: MyPlaceScreen
    },
    },
    {
      initialRouteName: 'MyPlace',
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
