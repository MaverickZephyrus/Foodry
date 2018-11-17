import React from "react";
import { StyleSheet, View, Dimensions, Text, FlatList, KeyboardAvoidingView } from "react-native";
import _ from "lodash";
import IconM from "react-native-vector-icons/MaterialIcons";
import { SearchBar } from "react-native-elements";
const ITEM_WIDTH = Dimensions.get("window").width;
const ITEM_HEIGHT = Dimensions.get("window").height;
import { test_data } from "./test_data";
import { Header } from 'react-navigation';

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
        <FlatList
          data={this.state.data}
          keyExtractor={(x, i) => i}
          key={key}
          numColumns={column}
          renderItem={({ item }) => (
            <View style={styles.flatlist_view}>
              <Text
                style={{
                  width: (ITEM_WIDTH - 5 * column) / column,
                  marginLeft: 2,
                  textAlign: "center"
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
          color="black"
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
  add_circle_icon: {
    right:0,
    bottom: 0,
    width: ITEM_WIDTH / 6,
    margin: 20,
    position:'absolute'
  },
  flatlist_view: {
    backgroundColor: "#DCDCDC",
    marginVertical: 2,
    borderRadius: 5
  }
});
