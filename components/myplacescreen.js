import React from "react";
import { StyleSheet, View, Dimensions, Text, FlatList, ImageBackground } from "react-native";
import _ from "lodash";
import IconM from "react-native-vector-icons/MaterialIcons";
import { SearchBar } from "react-native-elements";
const ITEM_WIDTH = Dimensions.get("window").width;
const ITEM_HEIGHT = Dimensions.get("window").height;
import { test_data } from "./test_data";
import { Header } from "react-navigation";

// UPDATE: line 111 your rgba(0,0,0) was missing alpha.
//         changed to rgba(0,0,0,1)

// TODO:  - replace test data with redux state. refer to mainscreen for example.

export default class MyPlaceScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "My Places",
      headerStyle: {
        backgroundColor: "#282828",
        marginTop: -25
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      },
      headerLeft: (
        <SearchBar
          containerStyle={{ width: ITEM_WIDTH }}
          placeholder="Filter..."
          lightTheme
          onChangeText={navigation.getParam("increaseCount")}
        />
      )
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      data: test_data,
      column: 1,
      key: 1,
      query: "",
      fullData: test_data
    };
  }
  componentDidMount() {
    this.props.navigation.setParams({ increaseCount: this._handleSearch });
    this._uniqueplace();
  }

  _uniqueplace = () => {
    var unique = this.state.data.filter(
      (set => u => !set.has(u.location) && set.add(u.location))(new Set())
    );
    this.setState({
      data: unique,
      fullData: unique
    });
  };

  _handleSearch = text => {
    const data = _.filter(this.state.fullData, lc => {
      return (
        lc.restaurant.toLowerCase().indexOf(text.toLowerCase()) != -1 ||
        lc.location.toLowerCase().indexOf(text.toLowerCase()) != -1
      );
    });
    this.setState({
      data: data
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
                  this.props.navigation.navigate('FoodDetails',{
                    location: item.location, restaurant: item.restaurant})
            }}
              >
                <Bold>{item.restaurant}</Bold> {"\n"}@ {item.location}
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
    backgroundColor:'rgba(255,255,255,0.4)',
    borderRadius:50,
  },
  flatlist_view: {
    backgroundColor:'rgba(255,255,255,0.5)',
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
