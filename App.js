import { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { ImageEditor } from 'expo-crop-image';

export default function App() {
  const [image, setImage] = useState('');
  const [location, setLocation] = useState(null); // New state for location
  const [showEditor, setShowEditor] = useState(false);
  const [timestamp, setTimestamp] = useState(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      exif: true, // Include EXIF data
    });
  
    if (!result.canceled) {
      setImage(result.assets[0].uri);
  
      // Extract and log the date/time if available
      const exifData = result.assets[0].exif;
      if (exifData && exifData.DateTimeOriginal) {
        console.log('Photo Taken At:', exifData.DateTimeOriginal);
      } else {
        console.log('No timestamp found for this photo.');
      }
  
      // Fetch location if EXIF contains GPS info
      if (exifData && exifData.GPSLatitude && exifData.GPSLongitude) {
        const { GPSLatitude, GPSLongitude } = exifData;
        const locationInfo = await Location.reverseGeocodeAsync({
          latitude: GPSLatitude,
          longitude: GPSLongitude,
        });
  
        if (locationInfo.length > 0) {
          setLocation(locationInfo[0]); // Save location details
          console.log('Photo Location:', locationInfo[0]);
        }
      } else {
        setLocation(null);
        console.log('No location data available for this photo.');
      }
    }
  };
  
  

  return (
    <>
      <ImageEditor
        isVisible={showEditor}
        fixedAspectRatio={9 / 16} // Set to 9:16 aspect ratio
        onEditingCancel={() => setShowEditor(false)}
        onEditingComplete={(image) => {
          setShowEditor(false);
          setImage(image.uri);
        }}
        imageUri={image}
      />

      <View style={styles.container}>
      {timestamp && (
  <View style={{ marginTop: 16 }}>
    <Text style={styles.timestampText}>Taken At: {timestamp}</Text>
  </View>
)}

        {image ? (
          <View>
            <TouchableOpacity onPress={pickImage}>
              <Image
                source={{ uri: image }}
                style={styles.imagePlaceholder}
                resizeMode="cover"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setShowEditor(true)}
            >
              <Text style={styles.text}>Edit</Text>
            </TouchableOpacity>
            {location && (
              <View style={{ marginTop: 16 }}>
                <Text style={styles.locationText}>
                  Location: {location.city}, {location.region}, {location.country}
                </Text>
              </View>
            )}
          </View>
        ) : (
          <TouchableOpacity style={styles.imagePlaceholder} onPress={pickImage}>
            <Feather name="plus" size={50} color="#121214" />
          </TouchableOpacity>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timestampText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
  },
  
  imagePlaceholder: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderColor: '#f2f2f2',
    borderWidth: 2,
    backgroundColor: '#f7f7f7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#555',
    borderRadius: 8,
    marginTop: 24,
    alignItems: 'center',
  },
  text: {
    color: '#f7f7f7',
    fontWeight: '500',
  },
  locationText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginTop: 8,
  },
});
