import React from "react";
import { StyleSheet, TextInput, TouchableHighlight, View, Dimensions, Text, ActivityIndicator, Image, KeyboardAvoidingView } from "react-native";
import { ImagePicker } from 'expo';
const ITEM_WIDTH = Dimensions.get("window").width;
const ITEM_HEIGHT = Dimensions.get("window").height;

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { saveToAsyncStorage } from "../actions/DataActions";

class AddScreen extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
        data: this.props.userData.currentData,
        fullData: this.props.userData.currentData,
        image: null,
        food: {
          food_name: "",
          img: "",
          price: "",
          notes: "",
          date: new Date().toDateString(),
          address: "",
          restaurant: "",
        }
    }
}

  static navigationOptions = {
    header: null
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [5, 5],
    });

    console.log(result);
  
    if (!result.cancelled) {
      this.setState({
        food: {
          food_name: this.state.food.food_name,
          img: result.uri,
          price: this.state.food.price,
          notes: this.state.food.notes,
          date: this.state.food.date,
          address: this.state.food.address,
          restaurant: this.state.food.restaurant,
        },
        image: result.uri
        
      });
    }
  };

  _saveBut = async (id, newFood) => {
    this.props.saveToAsyncStorage(id, newFood)
    this.props.navigation.navigate('MyPlace')
  }

  render() {
      let restData = this.props.navigation.getParam('data', 'NO DATA');
      let {image} = this.state;
       return (
         <View style={styles.container}>
          <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={ITEM_HEIGHT/2} style={styles.appView}>
          
          {!image && <Image source={require('../assets/default.png')} style={styles.pic} />}
          {image && 
            <Image source={{
            uri: image
          }} style={styles.pic} />}

          <TouchableHighlight 
            style={styles.uploadButton}
            onPress={this._pickImage}
            underlayColor="white"
          >
            <Text>Upload Photo</Text>
          </TouchableHighlight>
          
           <Text style={styles.wordName}>Food Name:</Text>
           
           <TextInput 
            style={styles.inName}
            onChangeText={(text) => this.setState({ 
              food: {
                food_name: text,
                img: this.state.food.img,
                price: this.state.food.price,
                notes: this.state.food.notes,
                date: this.state.food.date,
                address: restData[0].address,
                restaurant: restData[0].restaurant,
              } 
            })}
           />
           
           <Text style={styles.wordPrice}>Price:</Text>
           
           <TextInput 
            style={styles.inPrice}
            onChangeText={(text) => this.setState({ 
              food: {
                food_name: this.state.food.food_name,
                img: this.state.food.img,
                price: text,
                notes: this.state.food.notes,
                date: this.state.food.date,
                address: restData[0].address,
                restaurant: restData[0].restaurant,
              } 
             })}
           />
           
           <Text style={styles.wordNotes}>Notes:</Text>

           <TextInput 
            style={styles.inNotes} 
            editable={true} 
            maxLength={400} 
            multiline={true}
            onChangeText={(text) => this.setState({ 
              food: {
                food_name: this.state.food.food_name,
                img: this.state.food.img,
                price: this.state.food.price,
                notes: text,
                date: this.state.food.date,
                address: restData[0].address,
                restaurant: restData[0].restaurant,
              } 
             })}
           />
           
           <View style={{flexDirection:'row', padding: 20}}>
           <TouchableHighlight 
           style={styles.saveButton}
           onPress={() => {this._saveBut(restData[0].id, this.state.food)}}
           underlayColor="white"
           >
            <Text>Save</Text>
           </TouchableHighlight>

           <TouchableHighlight 
           style={styles.cancelButton}
           onPress={() => {this.props.navigation.navigate('FoodDetails')}}
           underlayColor="white"
           >
            <Text>Cancel</Text>
           </TouchableHighlight>
           </View>

           </KeyboardAvoidingView>
         </View>
       );
     }
}

const styles = StyleSheet.create({
  appView: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'space-between'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  wordName: {
    fontSize: 15,
  },
  inName: {
    borderColor: 'gray',
    borderWidth: 1.5,
    borderRadius: 10,
    width: ITEM_WIDTH/1.2,
    padding: 2
  },
  wordPrice: {
    fontSize: 15,
  },
  inPrice: {
    borderColor: 'gray',
    borderWidth: 1.5,
    borderRadius: 10,
    width: ITEM_WIDTH/1.2,
    padding: 2
  },
  wordNotes: {
    fontSize: 15,
  },
  inNotes: {
    borderColor: 'gray',
    borderWidth: 1.5,
    borderRadius: 10,
    width: ITEM_WIDTH/1.2,
    height: ITEM_HEIGHT/5,
    textAlignVertical: "top",
    padding: 6
  },
  uploadButton: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: ITEM_WIDTH/3,
    borderRadius: 100,
    borderWidth: 1.5
  },
  saveButton: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: ITEM_WIDTH/3,
    margin:10,
    borderRadius: 10,
    borderWidth: 1.5,
  },
  cancelButton: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: ITEM_WIDTH/3,
    margin:10,
    borderRadius: 10,
    borderWidth: 1.5
  },
  pic: {
    width: 200,
    height: 200,
  }
})

const mapStateToProps = (state) => {
  const { userData } = state;
  return { userData }
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
      saveToAsyncStorage,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(AddScreen);
