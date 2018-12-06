import React from "react";
import { StyleSheet, View, Dimensions, Text, FlatList, Button, TouchableHighlight, Modal,
    StatusBar, TextInput, Image, ImageBackground, ScrollView } from "react-native";
import _ from "lodash";
// TODO:    - integrate google places api for results
//          - add modal view as preview before adding place

export default class Details extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchResult: []
        }};

    static navigationOptions = {
        title: 'Food Details',
        headerTitleStyle: {
            marginLeft: 0,
        }
    };

    componentDidMount() {
        this._specificfood();
      };
    
    _specificfood = () => {
    const { navigation } = this.props;
    const img = navigation.getParam('img');
    const food_name = navigation.getParam('food_name');
    const price = navigation.getParam('price');
    const notes = navigation.getParam('notes');
    const restaurant = navigation.getParam('restaurant');
    const date = navigation.getParam('date');


    
    this.setState({
        searchResult: {'img' : img, 'food_name': food_name, 'price':price, 'notes':notes, 'restaurant':restaurant, 'date':date }
    });

    console.log(this.state.searchResult);
    };

    render () {
        const Bold = (props) => <Text style={{fontWeight: 'bold'}}>{props.children}</Text>
        const BigBold = (props) => <Text style={{fontWeight: 'bold', fontSize: 22}}>{props.children}</Text>

        return (
            <View style={styles.container}>

                <Image style={{flex: 1, width: width, height: height/2}} source={{uri: this.state.searchResult.img}}></Image>

                <View style={styles.detailbox}>
                            <Text
                              style={{
                                  margin: 12,
                                  marginBottom: 0,
                                  fontSize: 18,
                                  lineHeight: 24
                              }}> 
                            <BigBold>{this.state.searchResult.food_name}</BigBold>{"\n"}{"\n"}<Bold>From: </Bold> {this.state.searchResult.restaurant}{"\n"}<Bold>Price: </Bold> {this.state.searchResult.price}{"\n"}<Bold>Notes: </Bold> 
                            </Text>

                        <ScrollView>
                            <Text style={{
                                  margin: 12,
                                  marginTop: 0,
                                  fontSize: 18,
                                  marginLeft: 16
                              }}> 
                            " {this.state.searchResult.notes} "</Text>
                        </ScrollView>

                          <Text style={{ margin: 10, fontSize:15, color:'#696969'}}>{this.state.searchResult.date} </Text>

                </View>
            </View>
        )
    }
}

const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: width,
        height: height,
        paddingBottom: height/10
    },
    

    detailbox: {
        backgroundColor: 'rgba(0,0,0,0)',
        width: width,
        height: height/2.5,

    }
})


