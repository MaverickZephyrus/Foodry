import React from "react";
import { StyleSheet, View, Dimensions, Text, FlatList, Button, TouchableHighlight, Modal,
    StatusBar, TextInput, Image, ImageBackground, ScrollView } from "react-native";

// TODO:    - integrate google places api for results
//          - add modal view as preview before adding place

export default class Details extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchResult: [
                {
            img: "https://img.grouponcdn.com/deal/fmPws6o2uTweCftZu7yj/p4-2048x1229/v1/c700x420.jpg",
            location: "4635 Kingsway, Burnaby, BC V5H 4L3",
            food_name: "Sushi",
            cost: "$8.99",
            restaurant: "Sushi Garden",
            notes: "I love it for the user to search the list, we need to add a search bar on the top of the FlatList. FlatList has a prop to add any custom component to its header. I love it. ",
            date: "Nov 15, 2018"
        }
            ]
        }

        
    }

  

    render () {
        const Bold = (props) => <Text style={{fontWeight: 'bold'}}>{props.children}</Text>

        return (
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.detailscreen}>

                        {/*data={this.state.searchResult}; */}

                        <Image style={{flex: 1, resizeMode: 'contain'}} source={{uri: this.state.searchResult[0].img}}></Image>


                        <Text
                          style={{
                              margin: 10,
                          }}> 
                        <Bold>{this.state.searchResult[0].food_name}</Bold> --- {this.state.searchResult[0].cost} {"\n"}@ {this.state.searchResult[0].restaurant} {"\n"} {"\n"} " {this.state.searchResult[0].notes} " 
                        
                        </Text>

                      <Text style={{ margin: 10, fontSize:11, color:'grey'}}>{this.state.searchResult[0].date} </Text>

                </ScrollView>
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
    
    detailscreen: {
        backgroundColor: 'rgba(0,0,0,0)',
        width: width,
        height: height,
    },
})


