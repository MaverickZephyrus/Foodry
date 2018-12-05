import React from "react";
import { StyleSheet, View, Dimensions, Text, FlatList, Button, TouchableHighlight, Modal,
    StatusBar, TextInput, Image, ImageBackground, Alert } from "react-native";
import { API_KEY } from '../assets/apikey';

// TODO:    - integrate google places api for results
//          - add modal view as preview before adding place

export default class AddPlace extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchResult: [],
            keyword: '',
            coords: {}
        }
    }

    // hide top navigation bar
    static navigationOptions = {
        title: 'Search Place',
        headerTitleStyle: {
            marginLeft: 0,
        }
    };

    componentDidMount() {
        this._locationPermission();
    }

    _locationPermission = async() => {
        const { Location, Permissions } = Expo;
        const { status } = await Permissions.askAsync(Permissions.LOCATION);
        const locStat = await Location.getProviderStatusAsync();
        if (status != 'granted' || locStat.locationServicesEnabled == false) {
            Alert.alert(
                'Location Services',
                'Location Services not enabled or permitted. Please turn it ON and/or give permission.',
                [
                    {text: 'OK', onPress: () => this.props.navigation.goBack()}
                ],
                { cancelable: false }
            )
        } else {
            currentLocation = await Location.getCurrentPositionAsync({})
            this.setState({
                coords: currentLocation.coords
            })
            console.log(this.state.coords);
        }
    }

    // search function using google places api
    _searchPlaces = keyword => {
        fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${keyword}&location=${this.state.coords.latitude},${this.state.coords.longitude}&radius=20000&region=ca&type=restaurant&key=${API_KEY}`)
        .then((response) => {
            let myPlaces = JSON.parse(response._bodyText).results;
            this.setState({
                searchResult: myPlaces
            })
        })
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
                        onChangeText={keyword => this.setState({keyword})}
                        onSubmitEditing={() => this._searchPlaces(this.state.keyword)}
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
                                    <Text style={[styles.resultText, {textDecorationLine: 'underline'}]}>Rating: {item.item.rating}</Text>
                                    <Text style={styles.resultText}>{item.item.formatted_address}</Text>
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
        height: height * 0.8,
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