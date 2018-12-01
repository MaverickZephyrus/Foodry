import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { createStackNavigator, createMaterialTopTabNavigator } from 'react-navigation';
import { fadeIn } from 'react-navigation-transitions';

import MainScreen from './components/mainscreen';
import MyPlaceScreen from './components/myplacescreen';
import AddScreen from './components/AddScreen';
import FoodDetails from './components/FoodDetails'
import AddPlace from './components/addplace'

// NOTE: Lines 13, 18, and 84
// Redux related imports
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { reducer } from './reducers';

// We create redux as store and link reducer using createStore
const store = createStore(reducer);

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
    },
    AddPlace: AddPlace
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
        // We wrap RootTab with Provider and give it redux store
        return (
            <Provider store={store}>
                <RootTab/>
            </Provider>
        )
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
