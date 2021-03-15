import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';

const App = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  let openImagePickerAsync = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('Perission to access camera is required.');
      return;
    }
    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled === true) {
      return;
    }
    setSelectedImage({ localUri: pickerResult.uri });
  }
  const openShareDialog = async () => {
    const result = await Sharing.isAvailableAsync();
    if (!result) {
      alert("Sharing is not available in your platform.");
      return;
    }
    await Sharing.shareAsync(selectedImage.localUri);
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pick an Image!</Text>
      <TouchableOpacity
        onPress={openImagePickerAsync}
      >
        <Image
          source={{ uri: selectedImage !== null ? selectedImage.localUri : "https://static.scientificamerican.com/sciam/cache/file/D78728AD-1FD6-431E-9F2933C6D544D339_source.jpg" }}
          style={styles.img}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => Alert.alert('Hello!!')}
      >
        <Text style={styles.buttonText}>Press me</Text>
      </TouchableOpacity>

      {
        selectedImage ?
          <TouchableOpacity
            style={styles.button}
            onPress={openShareDialog}
          >
            <Text style={styles.buttonText}>Share this image</Text>
          </TouchableOpacity>
          : <View />
      }
    </View>
  )
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#292929'
  },
  title: {
    fontSize: 30,
    color: '#fff'
  },
  img: {
    height: 200,
    width: 200,
    resizeMode: 'contain'
  },
  button: {
    backgroundColor: 'blue',
    marginTop: 10,
    padding: 10
  },
  buttonText: {
    color: '#fff',
    fontSize: 20
  }
});
export default App;