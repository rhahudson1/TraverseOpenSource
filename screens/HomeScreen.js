import React, { useState, useEffect } from 'react';
import { FlatList, TouchableOpacity, Image, StyleSheet, View, Text, Dimensions, Button } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { useNavigation } from '@react-navigation/native';
import { ImageManipulator } from 'expo-image-crop';

export default function HomeScreen() {
  const [photos, setPhotos] = useState([]);
  const [hasPermission, setHasPermission] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isManipulatorVisible, setManipulatorVisible] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status === 'granted') {
        setHasPermission(true);
        const media = await MediaLibrary.getAssetsAsync({
          mediaType: 'photo',
          first: 50, // Load the first 50 photos
        });
        setPhotos(media.assets);
      }
    })();
  }, []);

  const handlePhotoPress = (photo) => {
    setSelectedPhoto(photo);
    setManipulatorVisible(true);
  };

  const handleImageManipulated = (result) => {
    setManipulatorVisible(false);
    navigation.navigate('ResultsScreen', { image: result });
  };

  if (!hasPermission) {
    return (
      <View style={styles.container}>
        <Text>No access to photo library. Please allow permissions.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={photos}
        keyExtractor={(item) => item.id}
        numColumns={3}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePhotoPress(item)}>
            <Image source={{ uri: item.uri }} style={styles.photo} />
          </TouchableOpacity>
        )}
      />
      {selectedPhoto && (
        <ImageManipulator
          photo={{ uri: selectedPhoto.uri }}
          isVisible={isManipulatorVisible}
          onPictureChoosed={(result) => handleImageManipulated(result)}
          onToggleModal={() => setManipulatorVisible(false)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  photo: {
    width: 100,
    height: 100,
    margin: 5,
    borderRadius: 8,
  },
});
