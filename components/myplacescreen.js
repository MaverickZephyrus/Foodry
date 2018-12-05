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
  ImageBackground
} from "react-native";
import _ from 'lodash';
import {SearchBar} from 'react-native-elements';
import IconM from 'react-native-vector-icons/MaterialIcons';
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
            column: 1,
            key: 1,
            query: "",
            fullData: [],
            foodDetail: []
        }
    }

    static navigationOptions = ({ navigation }) => {
        return{}
    };
    componentDidMount() {
        this._parserawdata();
        this.props.navigation.setParams({ increaseCount: this._handleSearch });
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
                s['address'] = single.address
            })
            parsedata.push(single.foods)
        });
        var result = [].concat.apply([], parsedata);
        var unique = result.filter(
          (set => u => !set.has(u.address) && set.add(u.address))(new Set())
        );
        this.setState({
            data: unique,
            fullData: unique,
            foodDetail: result
        });

    };

      render() {
        const { navigation } = this.props;
        const { column, key } = this.state;
        const Bold = props => (
          <Text style={{ fontWeight: "bold" }}>{props.children}</Text>
        );
        return (
          <View style={styles.container}>
           <SearchBar
              containerStyle={{ width: ITEM_WIDTH }}
              placeholder="Filter..."
              lightTheme
              onChangeText={navigation.getParam("increaseCount")}
            />
            <ImageBackground style={ styles.imgBackground } 
          resizeMode='cover' 
          source={{uri:'https://images.unsplash.com/photo-1520405350075-ea8df9ae72a5?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=56df2db5de7d9fe47c39161937d88baf&auto=format&fit=crop&w=934&q=80'}}> 
            <FlatList
              data={this.state.data}
              keyExtractor={(x, i) => i.toString()}
              key={key}
              numColumns={column}
              renderItem={({ item }) => (
                <View style={styles.flatlist_view}>
                  <Text
                    style={{
                      width: (ITEM_WIDTH - 5 * column) / column,
                      textAlign: "center"
                    }}
                    onPress={() => {
                      this._
                      this.props.navigation.navigate('FoodDetails',{
                        address: item.address, restaurant: item.restaurant, data: this.state.foodDetail})
                }}
                  >
                    <Bold>{item.restaurant}</Bold> {"\n"}@ {item.address}
                  </Text>
                </View>
              )}
            />
            <IconM
              style={styles.add_circle_icon}
              name="add-circle"
              size={ITEM_WIDTH / 6}
              color='rgba(0, 0, 0, 1)'
              onPress={() => {
                this.props.navigation.navigate('AddPlace')
          }}
            />
          </ImageBackground>
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
      add_circle_icon: {
        right: 0,
        bottom: 0,
        width: ITEM_WIDTH / 6,
        margin: 20,
        position: "absolute",
        backgroundColor:'rgba(255,255,255,0.5)',
        borderRadius:50,
      },
      flatlist_view: {
        backgroundColor:'rgba(255,255,255,0.7)',
        marginVertical: 2,
        borderRadius: 5,
        height: 50,
        alignItems: "center",
        justifyContent: "center"
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