import React from "react";
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  Text,
  FlatList, 
  Button
} from "react-native";
import _ from 'lodash';
import IconM from 'react-native-vector-icons/MaterialIcons';
import {SearchBar} from 'react-native-elements';
const ITEM_WIDTH = Dimensions.get("window").width;
const ITEM_HEIGHT = Dimensions.get("window").height;
import {test_data} from './test_data';

export default class MyPlaceScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return{
        title: 'My Places',
        // headerLeft: null,
        headerStyle: {
            backgroundColor: '#282828',
            marginTop:-25,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
        headerLeft: (
            <SearchBar containerStyle={{width: ITEM_WIDTH}} placeholder="Filter..."  onChangeText={navigation.getParam('increaseCount')}/>
        ),
        headerRight: (
            <IconM style={{textAlign: 'right', padding:15}} name="add" size={25} color="white" />
        ),
    }
    };
    constructor(props) {
        super(props)
        this.state = {
            data: test_data,
            column: 1,
            key: 1,
            query: "",
            fullData: test_data,
        };
    }
    componentDidMount() {
        this.props.navigation.setParams({ increaseCount: this._handleSearch });
      }
    _handleSearch = (text) =>{
        const data = _.filter(this.state.fullData, (lc) =>
        {return lc.restaurant.toLowerCase().indexOf(text.toLowerCase()) != -1 || lc.location.toLowerCase().indexOf(text.toLowerCase()) != -1})
            this.setState({
                data: data
            });
    };
    render() {
    const { navigation } = this.props;
    const { column, key } = this.state;
    const Bold = (props) => <Text style={{fontWeight: 'bold'}}>{props.children}</Text>
    return (
        <View>
        {/* <SearchBar style={{ flex: 1}} placeholder="Filter..." lightTheme onChangeText={this.handleSearch}/> */}
        <View style={styles.container}>
        <FlatList
            data={this.state.data}
            keyExtractor={(x, i) => i}
            key={key}
            numColumns={column}
            renderItem={({ item }) => (
            <View style={{backgroundColor: '#DCDCDC', marginVertical:2, borderRadius: 5}}>
                <Text
                style={{
                    width: (ITEM_WIDTH - 5 * column) / column,
                    marginLeft: 2,
                    textAlign:'center'
                }}
                >
                <Bold>{item.restaurant}</Bold> {"\n"}@ {item.location}
                </Text>
            </View>
            )}
        />
        {/* <Icon style={styles.shadow} name="add-circle" size={ITEM_WIDTH/6} color="#4C4949" />         */}
        </View>
        </View>
    );
    }
    }

const styles = StyleSheet.create({
  container: {
    // height: ITEM_HEIGHT,
    backgroundColor: "#fff",
    // paddingBottom: 10
  }
});
