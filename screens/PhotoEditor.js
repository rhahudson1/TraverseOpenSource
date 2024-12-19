import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import * as ImageManipulator from 'expo-image-manipulator';

export default function PhotoEditor({ route, navigation }) {
    const { photo } = route.params;
    const [showModal, setShowModal] = useState(true);
    const manipulateImage = async (uri) => {
      const result = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { width: 300 } }],
        { compress: 1, format: ImageManipulator.SaveFormat.PNG }
      );
      console.log(result);
    };
    
    const handlePictureChoosed = (data) => {
        navigation.navigate('ResultsScreen', { croppedImage: data.uri });
    };

    const { width, height } = Dimensions.get('window');

    return (
        <ExpoImageManipulator
            photo={{ uri: photo.uri }}
            isVisible={showModal}
            onPictureChoosed={handlePictureChoosed}
            onToggleModal={() => setShowModal(false)}
            saveOptions={{
                compress: 1,
                format: 'png',
                base64: false,
            }}
        />
    );
}
