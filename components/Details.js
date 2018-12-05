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
    const cost = navigation.getParam('cost');
    const notes = navigation.getParam('notes');
    const restaurant = navigation.getParam('restaurant');
    const date = navigation.getParam('date');


    
    this.setState({
        searchResult: {'img' : img, 'food_name': food_name, 'cost':cost, 'notes':notes, 'restaurant':restaurant, 'date':date }
    });

    console.log(this.state.searchResult);
    };

    render () {
        const Bold = (props) => <Text style={{fontWeight: 'bold'}}>{props.children}</Text>

        return (
            <View style={styles.container}>

                <Image style={{flex: 1, width: width, height: height/2}} source={{uri: this.state.searchResult.img}}></Image>

                <View style={styles.detailbox}>
                    <ScrollView>
                            <Text
                              style={{
                                  margin: 10,
                              }}> 
                            <Bold>{this.state.searchResult.food_name}</Bold> --- {this.state.searchResult.cost} {"\n"}@ {this.state.searchResult.restaurant} {"\n"} {"\n"} " {this.state.searchResult.notes} " 
                            
                            </Text>

                          <Text style={{ margin: 10, fontSize:11, color:'grey'}}>{this.state.searchResult.date} </Text>

                    </ScrollView>
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
        height: height/2,
    }
})


