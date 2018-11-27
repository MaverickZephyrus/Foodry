import React from "react";
import { StyleSheet, TextInput, TouchableHighlight, View, Dimensions, Text, ActivityIndicator, Image, KeyboardAvoidingView } from "react-native";
import { ImagePicker } from 'expo';
const ITEM_WIDTH = Dimensions.get("window").width;
const ITEM_HEIGHT = Dimensions.get("window").height;

export default class AddScreen extends React.Component {
  
  static navigationOptions = {
    header: null
  }

  constructor() {
    super();
    this.state = {
      image: null
    }
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [5, 5],
    });
  
    console.log(result);
  
    if (!result.cancelled) {
      this.setState({
        image: result.uri
      });
    }
  };

  render() {
      let {image} = this.state;
       return (
         <View style={styles.container}>
          <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={100} style={styles.appView}>
          
          {!image && <ActivityIndicator style={styles.pic}/>}
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
           
           <TextInput style={styles.inName}></TextInput>
           
           <Text style={styles.wordPrice}>Price:</Text>
           
           <TextInput style={styles.inPrice}></TextInput>
           
           <Text style={styles.wordNotes}>Notes:</Text>

           <TextInput style={styles.inNotes} editable={true} maxLength={400} multiline={true}></TextInput>
           
           <TouchableHighlight 
           style={styles.saveButton}
           onPress={()=>console.log('2')}
           underlayColor="white"
           >
            <Text>Save</Text>
           </TouchableHighlight>

           <TouchableHighlight 
           style={styles.cancelButton}
           onPress={()=>console.log('3')}
           underlayColor="white"
           >
            <Text>Cancel</Text>
           </TouchableHighlight>

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
    borderRadius: 10,
    borderWidth: 1.5,
  },
  cancelButton: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: ITEM_WIDTH/3,
    borderRadius: 10,
    borderWidth: 1.5
  },
  pic: {
    width: 200,
    height: 200,
  }
})
