import React from "react";
import { StyleSheet, View, Dimensions, Text, FlatList, Button, TouchableHighlight, Modal,
    StatusBar, TextInput, Image, ImageBackground, Alert } from "react-native";
import { API_KEY } from '../apikey/apikey';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addPlace } from "../actions/DataActions";


export class AddPlace extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchResult: [],
            keyword: '',
            coords: {},
            modalShow: false,
            modalData: {item: {name: '', formatted_address: '', rating: ''}},
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

    _addPlace = () => {
        console.log('adding...');
        // console.log(this.state.modalData);
        let id = this.state.modalData.item.name.toLowerCase().slice(0, 3) + this.state.modalData.item.formatted_address.toLowerCase().slice(-3);
        console.log(id);
        let resto = {
            id: id,
            restaurant: this.state.modalData.item.name,
            address: this.state.modalData.item.formatted_address,
            rating: this.state.modalData.item.rating,
            foods: []
        };
        this.props.addPlace(resto);
        console.log(this.props.userData.currentData[0].id);
        if (this.props.userData.currentData[0].id == id) {
            this.props.navigation.goBack();
        }
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
                            <TouchableHighlight style={{borderRadius: 10}} onPress={() => {this.setState({modalData: item, modalShow: !this.state.modalShow})}}>
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

                <Modal animationType={'fade'} transparent={true}
                    visible={this.state.modalShow} onRequestClose={() => this.setState({ modalShow: !this.state.modalShow })}>
                    <View style={styles.modalBg}>
                        <View style={styles.modal}>
                            <View style={{alignItems: 'flex-end'}}>
                                <TouchableHighlight onPress={() => this.setState({ modalShow: !this.state.modalShow })}>
                                    <Text style={{fontSize: height*0.02, marginRight: width*0.03, marginTop: height*0.01}} >X Close</Text>
                                </TouchableHighlight>
                            </View>
                            <Text style={{fontWeight: 'bold', fontSize: height * 0.04, margin: height*0.02}}>{this.state.modalData.item.name}</Text>
                            <Text style={{ fontSize: height * 0.03, margin: height * 0.02 }}>
                                Rating: <Text style={{ textDecorationLine: 'underline' }}>{this.state.modalData.item.rating}</Text>
                            </Text>
                            <Text style={{ fontSize: height * 0.03, margin: height * 0.02, marginBottom: height*0.05}}>{this.state.modalData.item.formatted_address}</Text>
                            <Button style={{marginTop: height*0.05,borderRadius: 100, width: 100}} title='Add Place' onPress={() => {this._addPlace()}}/>
                        </View>
                    </View>
                </Modal>
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
    modalBg: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    modal: {
        width: width * 0.8,
        height: height * 0.45,
        backgroundColor: 'white',
        borderRadius: width * 0.05,
        padding: width * 0.02,
    }
})

// Bindings for redux
const mapStateToProps = (state) => {
    const { userData } = state;
    return { userData }
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        addPlace,
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(AddPlace);
// end of bindings