import React from "react";
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  Text,
  FlatList, 
  Button,
  TouchableWithoutFeedback,
  TouchableHighlight,
  Modal,
  ScrollView,
  StatusBar,
  ImageBackground,
  AsyncStorage
} from "react-native";
import _ from 'lodash';
import {SearchBar} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { BlurView } from 'expo';
import IconM from 'react-native-vector-icons/MaterialIcons';


// NOTE: Lines 24, 30, 42, 46, 201
// Redux guide
// import the following 3
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadFromAsyncStorage } from "../actions/DataActions";

// Bind state and dispatch to MainScreen component in line 197
// Use the function binded as this.props.loadFromAsyncStorage(param) in
// whatever function you want to do in this component
global.something = 10;
const ITEM_WIDTH = Dimensions.get("window").width;
const ITEM_HEIGHT = Dimensions.get("window").height;


class MainScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            raw_data: this.props.userData.currentData,
            data: [],
            fullData: [],
        }
    }

    static navigationOptions = ({ navigation }) => {
        return{
            title: 'Restaurant Details',
            headerTitleStyle: {
                marginLeft: 0,
            },
            headerLeft: <Icon name='arrow-left'  size={ITEM_WIDTH / 14} style={{marginLeft:10}}
            onPress={ () => { navigation.push('Main') }} />
        }
    };

    render() {
        let data = this.props.navigation.getParam('data', 'NO DATA');
        let raw =  this.props.navigation.getParam('raw', 'NO DATA');
        let restaurant = this.props.navigation.getParam('restaurant', 'NO DATA');
        var raw1 = _.filter(raw, {'restaurant': restaurant });
        var place = _.filter(data, {'restaurant': restaurant });
        var place = place.filter(
            (set => u => !set.has(u.notes) && set.add(u.notes))(new Set())
          );
        const { column, key } = this.state;
        const { navigation } = this.props;
        const Bold = (props) => <Text style={{fontWeight: 'bold'}}>{props.children}</Text>
        const Dateformat = (props) => <Text style={{color:'#696969'}}>{props.children}</Text>
        return (
            <View style={styles.container}>
            <ImageBackground style={ styles.imgBackground } 

          resizeMode='cover' 
          source={{uri:'https://images.unsplash.com/photo-1520405350075-ea8df9ae72a5?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=56df2db5de7d9fe47c39161937d88baf&auto=format&fit=crop&w=934&q=80'}}> 
                <View style={styles.restHeader}>
                    <Text style={styles.restInfo}><Bold>Restaurant: </Bold>{raw1[0].restaurant}</Text>
                    <Text style={styles.restInfo}><Bold>Address: </Bold>{raw1[0].address}</Text>
                    <Text style={styles.restInfo}><Bold>Rating: </Bold>{raw1[0].rating}</Text>
                </View>
                
                <FlatList 
                    data={place}
                    keyExtractor={(x, i) => i.toString()}
                    numColumns={1}
                    renderItem={({ item }) => (

                        <TouchableHighlight
                        onPress={() => { this.props.navigation.navigate('Details', {'img' : item.img, 'food_name': item.food_name, 'cost': item.cost, 'notes': item.notes, 'restaurant': item.restaurant, 'date': item.date }) }}>
                        <View style={styles.listItems}>
                            <Image source={{uri: item.img}} style={styles.pic}/>
                            <Text style={{marginLeft: 3}}><Bold>{item.food_name}</Bold> {"\n"} {"\n"}{item.price} {"\n"} {"\n"}<Dateformat>{item.date}</Dateformat></Text>

                        </View>
                        </TouchableHighlight>

                    )}
                />
                <IconM
          style={styles.add_circle_icon}
          name="add-circle"
          size={ITEM_WIDTH / 6}
          color='rgba(0, 0, 0, 1)'
          onPress={() => {
            this.props.navigation.navigate('AddScreen', { 'data': raw1, 'data1': data, 'data2': raw })
      }}
        />
        </ImageBackground>
            </View>
        );
        }

    }

const styles = StyleSheet.create({
    imgBackground: {
        width: '100%',
        height: '100%',
        flex: 1
    },
    container: {
        backgroundColor: "#fff",
        justifyContent: "center",
        flex: 1
        },
    restHeader: {
        height:ITEM_HEIGHT/7, 
        justifyContent:'space-evenly',
        borderColor: 'black',
        borderWidth: 1,
        backgroundColor:'rgba(255,255,255,0.95)',
        justifyContent:'space-evenly',
    },
    restInfo: {
        marginLeft:10,
        fontSize: 16,
    },
    listItems: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor:'rgba(255,255,255,0.7)',
        borderRadius: 5,
        borderColor: 'black',
        borderWidth: 0.8,
    },
    pic: {
        width: (ITEM_WIDTH - 5 * 2) / 6,
        height: (ITEM_WIDTH - 5 * 2) / 6,
        borderRadius: 5,
        margin: 4,
        marginRight: 5,


    },
    add_circle_icon: {
        right: 0,
        bottom: 0,
        width: ITEM_WIDTH / 6,
        margin: 20,
        position: "absolute",
        backgroundColor:'rgba(255,255,255,0.4)',
        borderRadius:50,
        },
    imgBackground: {
      width: '100%',
      height: '100%',
      flex: 1 
  },
});

// Bindings for redux
const mapStateToProps = (state) => {
    const { userData } = state;
    return { userData }
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        loadFromAsyncStorage,
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
// end of bindings