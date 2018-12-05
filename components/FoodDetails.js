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
        return{}
    };

    render() {
        let data = this.props.navigation.getParam('data', 'NO DATA');
        let raw =  this.props.navigation.getParam('raw', 'NO DATA');
        let restaurant = this.props.navigation.getParam('restaurant', 'NO DATA');
        var raw1 = _.filter(raw, {'restaurant': restaurant });
        console.log(raw1);
        var place = _.filter(data, {'restaurant': restaurant });
        const { column, key } = this.state;
        const { navigation } = this.props;
        const Bold = (props) => <Text style={{fontWeight: 'bold'}}>{props.children}</Text>
        return (
            <View style={styles.container}>
                <View style={styles.restHeader}>
                    <Text style={styles.restInfo}>{place[0].restaurant}</Text>
                    <Text style={styles.restInfo}>{place[0].address}</Text>
                    <Text style={styles.restInfo}>{place[0].phone}</Text>
                    <Text style={styles.restInfo}>N/A</Text>
                </View>

                <FlatList 
                    data={place}
                    renderItem={({ item }) => (

                        <TouchableHighlight
                        onPress={() => { this.props.navigation.navigate('Details', {'img' : item.img, 'food_name': item.food_name, 'cost': item.cost, 'notes': item.notes, 'restaurant': item.restaurant, 'date': item.date }) }}>


                        <View style={styles.listItems}>
                            <Image source={{uri: item.img}} style={styles.pic}/>
                            <Text style={{marginLeft: 2, textAlign: 'center', justifyContent:'center'}}><Bold>{item.food_name}</Bold> --- {item.price}</Text>
                        </View>
                        </TouchableHighlight>

                    )}
                />
                <IconM
          style={styles.add_circle_icon}
          name="add-circle"
          size={ITEM_WIDTH / 6}
          color='rgba(0, 0, 0)'
          onPress={() => {
            this.props.navigation.navigate('AddScreen', { 'data': data})
      }}
        />
            </View>
        );
        }

    }

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        justifyContent: "center",
        flex: 1
        },
    restHeader: {
        height:ITEM_HEIGHT/4, 
        justifyContent:'space-evenly',
        borderColor: 'black',
        borderWidth: 1,
    },
    restInfo: {
        marginLeft:10
    },
    listItems: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: "#DCDCDC", 
        marginVertical: 2, 
        borderRadius: 5,
        marginBottom: 5,
        borderColor: 'black',
    },
    pic: {
        width: 50,
        height: 50,
        marginRight: 5,
        marginBottom: 5,
        marginTop: 5,
        marginLeft: 5,
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