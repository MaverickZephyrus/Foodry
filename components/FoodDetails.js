import React from "react";
import { StyleSheet, View, Dimensions, Text, Image, FlatList } from "react-native";
const ITEM_WIDTH = Dimensions.get("window").width;
const ITEM_HEIGHT = Dimensions.get("window").height;
import { test_data } from "./test_data";

export default class FoodDetails extends React.Component {

    static navigationOptions = {
        header: null,

    }

    state = {
        data: test_data
    }

    render() {
        return(
            <View>

                <View style={styles.restHeader}>
                    <Text style={styles.restInfo}>{this.state.data[0].restaurant}</Text>
                    <Text style={styles.restInfo}>{this.state.data[0].location}</Text>
                    <Text style={styles.restInfo}>(604) 699-9377</Text>
                    <Text style={styles.restInfo}>jinya-ramenbar.com</Text>
                </View>

                <FlatList 
                    data={this.state.data}
                    renderItem={({ item }) => (
                        <View style={styles.listItems}>
                            <Image source={{uri: item.img}} style={styles.pic}/>
                            <Text style={{marginLeft: 2, textAlign: 'center'}}>{item.food_name}</Text>
                            <Text style={{marginRight: 2, textAlign: 'right'}}>{item.cost}</Text>
                        </View>
                    )}
                />

            </View>
        )       
    }
}

const styles = StyleSheet.create({
    restHeader: {
        height:ITEM_HEIGHT/4, 
        justifyContent:'space-evenly',
        borderColor: 'black',
        borderWidth: 1,
    },
    restInfo: {
        marginLeft:10
    },
    listItems: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: "#DCDCDC", 
        marginVertical: 2, 
        borderRadius: 5,
        marginBottom: 5,
        borderColor: 'black',
    },
    pic: {
        width: 50,
        height: 50,
        marginRight: 5,
        marginBottom: 5,
        marginTop: 5,
        marginLeft: 5,
    }
});