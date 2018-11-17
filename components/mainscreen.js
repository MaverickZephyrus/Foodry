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
  StatusBar
} from "react-native";
import _ from 'lodash';
import {SearchBar} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconM from 'react-native-vector-icons/MaterialIcons';
import {test_data} from './test_data';
const ITEM_WIDTH = Dimensions.get("window").width;
const ITEM_HEIGHT = Dimensions.get("window").height;

export default class MainScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: test_data,
            column: 2,
            key: 1,
            fullData: test_data,
            modalVisible: false,
            itemindex: '0',
        }
    }

    static navigationOptions = ({ navigation }) => {
        return{
        title: 'My Foodry',
        headerStyle: {
            marginTop:-25,
            backgroundColor: '#282828',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
        // headerRight: (
        //     <IconM style={{textAlign: 'right', padding:15}} name="add" size={25} color="#fff" />
        // ),
        headerLeft: (
            // <Icon style={{textAlign: 'right', padding:15}} name="search" size={25} color="#fff" />
        <SearchBar containerStyle={{width: ITEM_WIDTH}} placeholder="Filter..."  onChangeText={navigation.getParam('increaseCount')}/> 
        ),
    }
    };
    componentDidMount() {
        this.props.navigation.setParams({ increaseCount: this._handleSearch });
      }

      _handleSearch = (text) =>{
        const data = _.filter(this.state.fullData, (lc) =>
        {return lc.restaurant.toLowerCase().indexOf(text.toLowerCase()) != -1 || lc.food_name.toLowerCase().indexOf(text.toLowerCase()) != -1 || lc.cost.toLowerCase().indexOf(text.toLowerCase()) != -1})
            this.setState({
                data: data
            });
        
    };

    setModalVisible(visible, i) {
        this.setState({itemindex: i});        
        this.setState({modalVisible: visible});
        console.log(i);
    }

    render() {

        const { column, key } = this.state;
        const { navigation } = this.props;
        const Bold = (props) => <Text style={{fontWeight: 'bold'}}>{props.children}</Text>
        return (
            <View style={styles.container}>
            {/* <StatusBar hidden={true} /> */}
            {/* <SearchBar containerStyle={{width: ITEM_WIDTH}} placeholder="Filter..." lightTheme onChangeText={this.handleSearch}/>  */}
            <View style={{width: ITEM_WIDTH,
        flexDirection: 'row',justifyContent: 'space-evenly', backgroundColor:'#fff'}}>
         <TouchableWithoutFeedback  
        onPress={() => {
                    this.setState({column: 2, key:key+1});
                  }}>
        <View style={{width:ITEM_WIDTH/2}}>
        <Icon style={{padding:5, textAlign:'center'}} name="grid-large" size={25} color="#000" />
        </View>
        </TouchableWithoutFeedback>
        <Text></Text>
        <TouchableWithoutFeedback  
        onPress={() => {
                    this.setState({column: 1, key:key+1});
                  }}>
        <View style={{width:ITEM_WIDTH/2}}>
        <Icon style={{padding:5, textAlign:'center'}} name="checkbox-blank-outline" size={25} color="#000" />
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
                        onPress={() => { this.setModalVisible(true, index)}}>
                        
                        <View style={{backgroundColor: '#DCDCDC', margin: 2, borderRadius: 5}}>
                    
                            <Image
                                style={{
                                    width: (ITEM_WIDTH - 5 * column) / column,
                                    height: (ITEM_WIDTH - 5 * column) / column,
                                    marginRight: 2,
                                    marginBottom: 2,
                                    marginTop: 2,
                                    marginLeft: 0,
                                    borderRadius: 5
                                }}
                                source={{ uri: item.img }}
                                />
                                <Text
                                style={{
                                    width: (ITEM_WIDTH - 5 * column) / column,
                                    marginLeft: 2,
                                    textAlign:'center'
                                }}
                                >
                                <Bold>{item.food_name}</Bold> --- {item.cost} {"\n"}@ {item.restaurant}
                                </Text>
                        </View>
                        </TouchableHighlight>
                    )}
            />

                <Modal style={styles.modal} animationType={'fade'}
                    transparent={true} visible={this.state.modalVisible}
                    onRequestClose={() => {}}>
                    <View style={styles.modal}>
                        <ScrollView contentContainerStyle={styles.modal}>
                                <Icon style={styles.textx} name="close" size={25}  onPress={() => {this.setModalVisible(false, 0)}} color="#000" />
                                
                                <Image style={{flex:1, resizeMode: 'contain'}} source={{uri: this.state.fullData[Number(this.state.itemindex)].img}}></Image>
                              
                                <Text
                                    style={{
                                        margin: 10,
                                    }}
                                    >
                                    <Bold>{this.state.fullData[Number(this.state.itemindex)].food_name}</Bold> --- {this.state.fullData[Number(this.state.itemindex)].cost} @ {this.state.fullData[Number(this.state.itemindex)].restaurant} {"\n"} {"\n"} " {this.state.fullData[Number(this.state.itemindex)].notes} " 
                                </Text>
                                <Text style={{ margin: 10, fontSize:11, color:'grey'}}>{this.state.fullData[Number(this.state.itemindex)].date} </Text>
                        </ScrollView>
                    </View>
                </Modal>
                
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
        flex: 1,
        backgroundColor: 'white',
    },
    textx: {
        paddingTop: 30,
        paddingLeft: ITEM_WIDTH - 50,
    }
});