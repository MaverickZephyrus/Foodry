import React from "react";
import { StyleSheet, View, Dimensions, Text, Image, FlatList } from "react-native";
const ITEM_WIDTH = Dimensions.get("window").width;
const ITEM_HEIGHT = Dimensions.get("window").height;
import IconM from "react-native-vector-icons/MaterialIcons";
import { test_data } from "./test_data";
import _ from "lodash";

export default class FoodDetails extends React.Component {

    // static navigationOptions = {
    //     header: null,    
    // }

    state = {
        data: [],
        fulldata: [],
    }
    componentDidMount() {
        this._specificplace();
      }
    
    _specificplace = () => {
    const { navigation } = this.props;
    const location = navigation.getParam('address', 'NO LOCATION');
    const restaurant = navigation.getParam('restaurant', 'NO RESTAURANT');
    const data = navigation.getParam('data', 'NO DATA');
    console.log(location)
    console.log(restaurant)
    console.log(data)
    this.setState({
        data: data,
        fullData: data
    });
    console.log(this.state.data)
    };

    render() {
        const Bold = (props) => <Text style={{fontWeight: 'bold'}}>{props.children}</Text>
        return(
            <View style={styles.container}>
                <View style={styles.restHeader}>
                    {/* <Text style={styles.restInfo}>{this.state.data[0].restaurant}</Text> */}
                    {/* <Text style={styles.restInfo}>{this.state.data}</Text> */}
                    <Text style={styles.restInfo}>N/A</Text>
                    <Text style={styles.restInfo}>N/A</Text>
                </View>

                {/* <FlatList 
                    data={this.state.data}
                    renderItem={({ item }) => (
                        <View style={styles.listItems}>
                            <Image source={{uri: item.img}} style={styles.pic}/>
                            <Text style={{marginLeft: 2, textAlign: 'center', justifyContent:'center'}}><Bold>{item}</Bold> --- {item.price}</Text>
                        </View>
                    )}
                /> */}
                <IconM
          style={styles.add_circle_icon}
          name="add-circle"
          size={ITEM_WIDTH / 6}
          color='rgba(0, 0, 0)'
          onPress={() => {
            this.props.navigation.navigate('AddScreen')
      }}
        />
            </View>
        )       
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        justifyContent: "center",
        flex: 1
      },
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
});