

import React, { useState } from "react";
import { Button, PermissionsAndroid, SafeAreaView, Image, StatusBar, StyleSheet, Text, View } from "react-native";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ImagePicker from 'react-native-image-picker';
let options = {
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
  includeBase64: true,
};

const requestCameraPermission = async () => {
  try {
    await launchCamera(options, (response) => {
      console.log('Response=', response)
    })
  } catch (err) {
    console.warn(err);
  }
};
const requestGalleryPermission = async () => {
  try {
    await launchImageLibrary(options, (response) => {
      console.log('Response=', response)
    })
  } catch (err) {
    console.warn(err);
  }
};
const ShowImage = ({ image, onImagePicked }) => {

  const [selectedImage, setSelectedImage] = useState();

  pickImageHandler = () => {
    ImagePicker.showImagePicker({ title: 'Select an image', maxWidth: 800, maxHeight: 600 },
      response => {
        if (response.error) {
          console.log('Image: ' + response)
        }
        // console.log('Image : uri :  'data: image /jpeg base 64')
        else {
          const source = { uri: 'data:image/jpeg;base64,' + response.base64 }
          setSelectedImage(source)
          console.log("Image:" + response.uri)
          setSelectedImage({ uri: response.uri })
          onImagePicked({ uri: response.uri });
        }
      }
    )
  }
}
const List = () => (
  <View style={styles.container}>
    <Text style={styles.item}>Camera And Gallery</Text>
      <View style={styles.btn1}>
      <Button title="CAMERA" onPress={requestCameraPermission} color="#27612d"

     />
    </View>
    <View style={styles.btn2}>
      <Button title="OPEN GALLERY" onPress={requestGalleryPermission} color="#27612d" />
    </View>
</View >
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#dff7c6",
    justifyContent: "center",
    paddingTop: StatusBar.currentHeight,
    padding: 8,

  },
  item: {

    margin: 24,
    fontSize: 19,
    fontWeight: "bold",
    textAlign: "center",
    color: "black"

  },
  btn1: {
    marginBottom: 40,
    paddingHorizontal: 60,



  },
  btn2: {
    paddingHorizontal: 60,
    paddingBottom: 60,
  },

}
);
export default List;



