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
            box1:'#000',
            box2:'#606060'
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
        headerLeft: (
        <SearchBar containerStyle={{width: ITEM_WIDTH}} placeholder="Filter..." lightTheme onChangeText={navigation.getParam('increaseCount')}/> 
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
                        onPress={() => { this.setModalVisible(true, index)}}>
                        
                        <View style={{backgroundColor: 'rgba(255, 255, 255, 0.5)', margin: 2, borderRadius: 5}}>
                    
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
                                
                                <Image style={{flex:1, resizeMode: 'contain'}} source={{uri: this.state.data[Number(this.state.itemindex)].img}}></Image>
                              
                                <Text
                                    style={{
                                        margin: 10,
                                    }}
                                    >
                                    <Bold>{this.state.data[Number(this.state.itemindex)].food_name}</Bold> --- {this.state.data[Number(this.state.itemindex)].cost} @ {this.state.data[Number(this.state.itemindex)].restaurant} {"\n"} {"\n"} " {this.state.data[Number(this.state.itemindex)].notes} " 
                                </Text>
                                <Text style={{ margin: 10, fontSize:11, color:'grey'}}>{this.state.data[Number(this.state.itemindex)].date} </Text>
                        </ScrollView>
                    </View>
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
        flex: 1,
        backgroundColor: 'white',
    },
    textx: {
        paddingTop: 30,
        paddingLeft: ITEM_WIDTH - 50,
    },
    imgBackground: {
      width: '100%',
      height: '100%',
      flex: 1 
  },
});