import React from "react";
import { StyleSheet, View, Dimensions, Text, FlatList, Button, TouchableHighlight, Modal,
    StatusBar, TextInput, Image, ImageBackground } from "react-native";

// TODO:    - integrate google places api for results
//          - add modal view as preview before adding place

export default class AddPlace extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchResult: [
                { name: 'Gyoza Bar', cat: 'Japanese Restaurant', addr: '622 W Pender St, Vancouver, BC V6B 1V8'},
                { name: 'Kita No Donburi', cat: 'Japanese Restaurant', addr: '423 Seymour St, Vancouver, BC V6B 1M1'},
                { name: 'Peaceful Restaurant', cat: 'Chinese Restaurant', addr: '602 Seymour St, Vancouver, BC V6B 3K3'}
            ]
        }
    }

    // hide top navigation bar
    static navigationOptions = {
        header: null,
    };

    // search function using google places api
    _searchPlaces = () => {

    }

    render () {
        return (
            // background props/image
            <ImageBackground style={styles.container} source={require('../assets/searchbg.png')}>

                {/* search bar */}
                <View style={styles.searchContainer}>
                    <Image style={styles.searchIcon} source={require('../assets/searchgrey.png')} />
                    <TextInput style={styles.input}
                        placeholder='Search..'
                    />
                </View>

                {/* results list */}
                <View style={styles.listContainer}>
                    <FlatList
                        data={this.state.searchResult}
                        keyExtractor={(item, index) => item.name + index}
                        renderItem={(item) => (
                            <TouchableHighlight style={{borderRadius: 10}} onPress={() => console.log('working')}>
                                <View style={styles.results}>
                                    <Text style={[styles.resultText, { fontWeight: 'bold'}]}>{item.item.name}</Text>
                                    <Text style={[styles.resultText, {textDecorationLine: 'underline'}]}>{item.item.cat}</Text>
                                    <Text style={styles.resultText}>{item.item.addr}</Text>
                                </View>
                            </TouchableHighlight>
                        )}
                        ItemSeparatorComponent={() => <View style={{height: height * 0.005}} />}
                    />
                </View>
            </ImageBackground>
        )
    }
}

const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: width,
        height: height,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 20,
        borderWidth: 1,
        paddingLeft: width * 0.01,
        marginTop: height * 0.03,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    searchIcon: {
        width: width * 0.05,
        height: width * 0.05,
        margin: width * 0.01
    },
    input: {
        width: width * 0.8,
        color: 'white',
        marginRight: width * 0.02,
        fontSize: height * 0.03,
    },
    listContainer: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        width: width * 0.9,
        height: height * 0.85,
        margin: height * 0.02,
        borderRadius: 10,
        padding: width * 0.01
    },
    resultText: {
        color: 'white',
        fontSize: height * 0.025,
    },
    results: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'white',
        paddingLeft: width * 0.01,
    },
})