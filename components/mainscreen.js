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

// NOTE: Lines 24, 30, 42, 46, 201
// Redux guide
// import the following 3
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadFromAsyncStorage } from "../actions/DataActions";

// Bind state and dispatch to MainScreen component in line 197
// Use the function binded as this.props.loadFromAsyncStorage(param) in
// whatever function you want to do in this component

const ITEM_WIDTH = Dimensions.get("window").width;
const ITEM_HEIGHT = Dimensions.get("window").height;

class MainScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            raw_data: this.props.userData.currentData,
            data: [],
            column: 2,
            key: 1,
            fullData: [],
            modalVisible: false,
            itemindex: '0',
            box1:'#000',
            box2:'#606060',
            item_data: { 'notes' : 'empty'}
        }
    }

    static navigationOptions = ({ navigation }) => {
        return{}
    };

   
    async componentDidMount() {
        await AsyncStorage.removeItem('userData');
        await this._loadAsyncStorage();
        await this._loadFromAsyncStorage();
        this._parserawdata();
        this.props.navigation.setParams({ increaseCount: this._handleSearch });
      }

    //  TODO: Remove this when everyone has data saved into AsyncStorage
    //  This is preload data of restaurants and foods
      _loadAsyncStorage = async() => {
          let data = [
              {
                  id: 'sus4l3',
                  address: "4635 Kingsway, Burnaby, BC V5H 4L3",
                  restaurant: "Sushi Garden Metro",
                  rating: 3.8,
                  foods: [
                      {
                          food_name: "Sushi Meal",
                          img:
                              "https://static1.squarespace.com/static/5849a1775016e1094e1d0763/t/5849ddc1197aeaa33558470e/1481235920269/2016-01-Sushi-plate.jpg?format=1500w",
                          price: "$15.99",
                          notes:
                              "I love it for the user to search the list, we need to add a search bar on the top of the FlatList. FlatList has a prop to add any custom component to its header. I love it. I love it for the user to search the list, we need to add a search bar on the top of the FlatList. FlatList has a prop to add any custom component to its header. I love it. I love it for the user to search the list, we need to add a search bar on the top of the FlatList. FlatList has a prop to add any custom component to its header. I love it.",
                          date: "Nov 15, 2018",
                      },
                      {
                          food_name: "Seafood Pizza",
                          img:
                              "https://static.cuisineaz.com/610x610/i10453-pizza-aux-crevettes.jpg",
                          price: "$8.99",
                          notes:
                              "I love it for the user to search the list, we need to add a search bar on the top of the FlatList. FlatList has a prop to add any custom component to its header. I love it.",
                          date: "Nov 15, 2018",
                      }
                  ]
              },
              {
                  id: 'sus1e2',
                  address: "6611 Kingsway, Burnaby, BC V5E 1E2",
                  restaurant: "Sushi Garden High Gate",
                  rating: 3.9,
                  foods: [
                      {
                          food_name: "California Sushi",
                          img:
                              "https://sushiaji.ca/img/cdn/533_ff8cac35529f89434e1d291c61d9e5a8.jpg",
                          price: "$15.99",
                          notes:
                              "I love it for the user to search the list, we need to add a search bar on the top of the FlatList. FlatList has a prop to add any custom component to its header. I love it.",
                          date: "Nov 15, 2018",
                      },
                      {
                          food_name: "Dynamite Roll",
                          img:
                              "https://i.pinimg.com/originals/c9/ef/71/c9ef71ab42e904e0b31832e13b06b99b.jpg",
                          price: "$8.99",
                          notes:
                              "I love it for the user to search the list, we need to add a search bar on the top of the FlatList. FlatList has a prop to add any custom component to its header. I love it.",
                          date: "Nov 15, 2018",
                      }
                  ]
              }
          ];

        let test = await AsyncStorage.getItem('userData');
        if (test == null) {
            AsyncStorage.setItem('userData', JSON.stringify(data));
        } else {
            console.log('Not null');
        }
    }
    // end of preload data function

    // Default behaviour of app to load data from local storage when starting
    _loadFromAsyncStorage = async() => {
        let data = await AsyncStorage.getItem('userData');
        if (data != null) {
            let parsedData = JSON.parse(data);
            console.log(parsedData);
            this.props.loadFromAsyncStorage(parsedData);
        }
    }

    _handleSearch = (text) =>{
    const data = _.filter(this.state.fullData, (lc) =>
    {return lc.restaurant.toLowerCase().indexOf(text.toLowerCase()) != -1 || lc.food_name.toLowerCase().indexOf(text.toLowerCase()) != -1 || lc.price.toLowerCase().indexOf(text.toLowerCase()) != -1})
        this.setState({
            data: data
        });
    
    };

    _parserawdata(){
        const raw = this.state.raw_data
        const parsedata = []
        raw.map((single) => {
            single.foods.map((s) =>{
                s['restaurant'] = single.restaurant
            })
            parsedata.push(single.foods)
        });
        var result = [].concat.apply([], parsedata);
        this.setState({
            data: result,
            fullData: result
        });

    };

    setModalVisible(visible, i, item) {
        this.setState({itemindex: i});       
        this.setState({item_data: item}); 
        this.setState({modalVisible: visible});
        console.log(i);

    };

    stringTruncate(str, length) {
        var dots = str.length > length ? '...' : '';
        return str.substring(0, length) + dots;
    };

    render() {

        const { column, key } = this.state;
        const { navigation } = this.props;
        const Bold = (props) => <Text style={{fontWeight: 'bold'}}>{props.children}</Text>

        return (
            <View style={styles.container}>
            <SearchBar containerStyle={{width: ITEM_WIDTH}} placeholder="Filter..." lightTheme onChangeText={navigation.getParam('increaseCount')}/> 
             <ImageBackground style={ styles.imgBackground } 
      resizeMode='cover' 
      source={{uri:'https://images.unsplash.com/photo-1520405350075-ea8df9ae72a5?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=56df2db5de7d9fe47c39161937d88baf&auto=format&fit=crop&w=934&q=80'}}>
            <View style={{width: ITEM_WIDTH,
        flexDirection: 'row',justifyContent: 'space-evenly', backgroundColor:'#fff',marginTop:2}}>
         <TouchableWithoutFeedback  
        onPress={() => {
                    this.setState({column: 2, key:key+1, box1:'#000000', box2:'#606060'});
                  }}>
        <View style={{width:ITEM_WIDTH/2}}>
        <Icon style={{padding:5, textAlign:'center'}} name="grid-large" size={25} color={this.state.box1} />
        </View>
        </TouchableWithoutFeedback>
        <Text style={{fontSize:25}}>|</Text>
        <TouchableWithoutFeedback  
        onPress={() => {
                    this.setState({column: 1, key:key+1, box1:'#606060', box2:'#000000'});
                  }}>
        <View style={{width:ITEM_WIDTH/2}}>
        <Icon style={{padding:5, textAlign:'center'}} name="checkbox-blank-outline" size={25} color={this.state.box2} />
        </View>
        </TouchableWithoutFeedback>
        </View>
            <FlatList
                data={this.state.data}
                keyExtractor={(x, i) => i}
                key={key}
                numColumns={column}
                renderItem={({item, index}) => (
                    <TouchableHighlight
                        onPress={() => { this.setModalVisible(true, index, item)}}>
                        
                        <View style={{backgroundColor: 'rgba(255, 255, 255, 0.7)', margin: 2, borderRadius: 5}}>
                    
                            <Image
                                style={{
                                    width: (ITEM_WIDTH - 5 * column) / column,
                                    height: (ITEM_WIDTH - 5 * column) / column,
                                    borderRadius: 5
                                }}
                                source={{ uri: item.img }}
                                />
                                <Text
                                style={{
                                    width: (ITEM_WIDTH - 5 * column) / column,
                                    textAlign:'center'
                                }}
                                >
                                <Bold>{item.food_name}</Bold> --- {item.price} {"\n"}@ {item.restaurant}
                                </Text>
                        </View>
                        </TouchableHighlight>
                    )}
            />


                <Modal animationType={'fade'}
                    transparent={true} visible={this.state.modalVisible}
                    onRequestClose={() => {}}>
                        <TouchableWithoutFeedback onPress={() => {
            this.setState({ modalVisible: false });
        }}>
                     <BlurView  tint="dark" intensity={60} style={{   flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <ScrollView contentContainerStyle={styles.modal}>
                                <Icon style={styles.textx} name="close" size={25}  onPress={() => {this.setModalVisible(false, 0, { 'notes' : 'empty'})}} color="#000" />
                                
                                <Image style={{flex:1, resizeMode: 'contain'}} source={{uri: this.state.item_data.img}}></Image>

                                <Text
                                    style={{
                                        margin: 10,
                                    }}
                                    >

                                    <Bold>{this.state.item_data.food_name}</Bold> --- {this.state.item_data.cost} @ {this.state.item_data.restaurant} {"\n"} {"\n"} " {this.stringTruncate(this.state.item_data.notes, 200)} " 
                                </Text>


                                <Text style={{ margin: 10, fontSize:11, color:'grey'}}>{this.state.item_data.date} </Text>
                                <Text style={{ margin: 10 }}
                                    onPress={() => {
            this.setState({ modalVisible: false }),
            this.props.navigation.navigate('Details', {'img' : this.state.item_data.img, 'food_name': this.state.item_data.food_name, 'cost': this.state.item_data.cost, 'notes': this.state.item_data.notes, 'restaurant': this.state.item_data.restaurant, 'date': this.state.item_data.date })

            }}>Go to Details... </Text>

                        </ScrollView>
                        </BlurView>
                        </TouchableWithoutFeedback>
                </Modal>

                </ImageBackground>
            </View> 

        );
        }

    }



const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    justifyContent: "center",
    flex:1
  },
    modal: {
        height: ITEM_HEIGHT/1.50,
        width: ITEM_WIDTH-ITEM_WIDTH/15,
        backgroundColor: 'white',
        borderRadius:10,
        marginTop: ITEM_WIDTH/2
    },
    textx: {
        paddingLeft: ITEM_WIDTH/2 -25,
        paddingVertical: 10,
        left: ITEM_WIDTH/2.6
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