import React, { useEffect, useState } from 'react';
import {
  Modal,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker'; // New import

const { width, height } = Dimensions.get('window');

const CustomModal = ({ visible, onClose }) => {
  const [photos, setPhotos] = useState([]);

  // Fetch photos from the camera roll
  useEffect(() => {
    if (visible) {
      const fetchPhotos = async () => {
        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status === 'granted') {
          const assets = await MediaLibrary.getAssetsAsync({
            first: 50,
            mediaType: 'photo',
          });

          // Convert to accessible URIs
          const convertedAssets = await Promise.all(
            assets.assets.map(async (asset) => {
              const assetInfo = await MediaLibrary.getAssetInfoAsync(asset.id);
              return { ...asset, uri: assetInfo.localUri || asset.uri };
            })
          );

          setPhotos(convertedAssets); // Set photos with usable URIs
        } else {
          Alert.alert(
            'Permission Denied',
            'You need to grant photo library access to view your photos.'
          );
        }
      };

      fetchPhotos().catch((err) => console.error('Error fetching photos:', err));
    }
  }, [visible]);

  // Handle photo click
  const handlePhotoPress = async (photo) => {
    try {
      const croppedResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1], // Square crop
        base64: false,
        uri: photo.uri,
      });

      if (!croppedResult.canceled) {
        Alert.alert('Photo Cropped', 'Photo cropped successfully!');
      }
    } catch (err) {
      console.error('Error cropping photo:', err);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={[styles.modalContent, { width, height: height * 0.9 }]}>
          {/* Header with X Button */}
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeButton}>X</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Your Photos</Text>
          </View>

          {/* Scrollable Photo Grid */}
          <FlatList
            data={photos}
            numColumns={3}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handlePhotoPress(item)}>
                <Image source={{ uri: item.uri }} style={styles.photo} />
              </TouchableOpacity>
            )}
            contentContainerStyle={styles.photoGrid}
            showsVerticalScrollIndicator={false} // Disable scroll bar visibility
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 0,
    overflow: 'hidden',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  closeButton: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
  },
  photoGrid: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  photo: {
    width: width / 3 - 10, // Adjusted for 3 columns with spacing
    height: width / 3 - 10, // Square photos
    margin: 5,
    borderRadius: 5,
  },
});

export default CustomModal;
