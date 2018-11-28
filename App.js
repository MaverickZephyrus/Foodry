import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { createStackNavigator, createMaterialTopTabNavigator } from 'react-navigation';
import { fadeIn } from 'react-navigation-transitions';

import MainScreen from './components/mainscreen';
import MyPlaceScreen from './components/myplacescreen';
import AddScreen from './components/AddScreen';
import FoodDetails from './components/FoodDetails'

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
    AddScreen:{
      screen: AddScreen
    },
    FoodDetails:{
      screen: FoodDetails
    }
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
