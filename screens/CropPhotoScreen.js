import React, { useState } from 'react';
import { View, Image, Button, StyleSheet, Dimensions } from 'react-native';
import * as ImageManipulator from 'expo-image-manipulator';

const { width } = Dimensions.get('window');

const CropPhotoScreen = ({ route, navigation }) => {
  const { photoUri } = route.params;
  const [croppedPhoto, setCroppedPhoto] = useState(photoUri);

  const cropImage = async () => {
    const result = await ImageManipulator.manipulateAsync(
      photoUri,
      [{ crop: { originX: 0, originY: 0, width: 1000, height: 1000 } }], // Crop square (adjust dimensions as needed)
      { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
    );
    setCroppedPhoto(result.uri);
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: croppedPhoto }} style={styles.image} />
      <Button title="Crop to Square" onPress={cropImage} />
      <Button title="Save and Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  image: {
    width: width - 40,
    height: width - 40,
    marginBottom: 20,
  },
});

export default CropPhotoScreen;
