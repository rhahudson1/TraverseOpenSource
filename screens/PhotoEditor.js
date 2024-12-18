import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  Button,
  PanResponder,
  Alert,
} from 'react-native';
import * as ImageManipulator from 'expo-image-manipulator';
import { PinchGestureHandler, GestureHandlerRootView } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');
const croppingSize = width * 0.8; // Square crop area size (80% of screen width)

const PhotoEditor = ({ route, navigation }) => {
  const { photoUri } = route.params;

  const [scale, setScale] = useState(1); // Zoom level
  const [translateX, setTranslateX] = useState(0); // Horizontal translation
  const [translateY, setTranslateY] = useState(0); // Vertical translation
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 }); // Image natural dimensions
  const [imageOffset, setImageOffset] = useState(null); // Image offset on screen

  // PanResponder for dragging the image
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (e, gestureState) => {
      setTranslateX((prev) => prev + gestureState.dx);
      setTranslateY((prev) => prev + gestureState.dy);

      console.log('Dragging - translateX:', translateX, 'translateY:', translateY);
    },
    onPanResponderRelease: () => {
      console.log('Drag finished - final translateX:', translateX, 'final translateY:', translateY);
    },
  });

  // PinchGestureHandler for zooming the image
  const handlePinchGesture = ({ nativeEvent }) => {
    if (nativeEvent.scale > 0.5 && nativeEvent.scale <= 5) {
      setScale(nativeEvent.scale);

      console.log('Zooming - scale:', nativeEvent.scale);
    }
  };

  // Set the natural dimensions of the image
  const onImageLoad = (event) => {
    const { width: imgWidth, height: imgHeight } = event.nativeEvent.source;
    setImageDimensions({ width: imgWidth, height: imgHeight });
    console.log('Image Dimensions (natural):', imgWidth, 'x', imgHeight);
  };

  // Measure image position on screen
  const measureImagePosition = (event) => {
    event.target.measure((x, y, w, h, pageX, pageY) => {
      setImageOffset({ x: pageX, y: pageY, width: w, height: h });
      console.log('Image Offset on Screen:', { x: pageX, y: pageY, width: w, height: h });
    });
  };

  // Overlay the hovered pixels visually
  const logAndVisualizeHoveredPixels = () => {
    if (!imageOffset || !imageDimensions) {
      console.error('Image offset or dimensions not available.');
      return;
    }

    const { x: imageX, y: imageY, width: renderedWidth, height: renderedHeight } = imageOffset;
    const { width: naturalWidth, height: naturalHeight } = imageDimensions;

    // Cropping square position relative to the image
    const cropSquareX = (width - croppingSize) / 2 - imageX;
    const cropSquareY = (height - croppingSize) / 2 - imageY;

    // Convert cropping square coordinates to natural image pixels
    const naturalStartX = Math.max(cropSquareX * (naturalWidth / renderedWidth), 0);
    const naturalStartY = Math.max(cropSquareY * (naturalHeight / renderedHeight), 0);
    const naturalEndX = Math.min(naturalStartX + croppingSize * (naturalWidth / renderedWidth), naturalWidth);
    const naturalEndY = Math.min(naturalStartY + croppingSize * (naturalHeight / renderedHeight), naturalHeight);

    console.log('Hovered Pixels (Natural Dimensions):');
    console.log('Start X:', naturalStartX, 'End X:', naturalEndX);
    console.log('Start Y:', naturalStartY, 'End Y:', naturalEndY);

    return { naturalStartX, naturalStartY, naturalEndX, naturalEndY };
  };

  // Calculate cropping parameters and perform the crop
  const cropImage = async () => {
    const hoveredPixels = logAndVisualizeHoveredPixels(); // Get hovered pixels

    try {
      const { naturalStartX, naturalStartY, naturalEndX, naturalEndY } = hoveredPixels;
      const { width: naturalWidth, height: naturalHeight } = imageDimensions;

      if (!hoveredPixels || naturalWidth === 0 || naturalHeight === 0 || !imageOffset) {
        Alert.alert('Error', 'Unable to determine image dimensions or position.');
        return;
      }

      const cropWidth = naturalEndX - naturalStartX;
      const cropHeight = naturalEndY - naturalStartY;

      console.log('Cropping Parameters:');
      console.log('Natural Dimensions:', naturalWidth, naturalHeight);
      console.log('Crop Origin X:', naturalStartX);
      console.log('Crop Origin Y:', naturalStartY);
      console.log('Crop Width:', cropWidth);
      console.log('Crop Height:', cropHeight);

      // Perform cropping
      const result = await ImageManipulator.manipulateAsync(
        photoUri,
        [
          {
            crop: {
              originX: naturalStartX,
              originY: naturalStartY,
              width: cropWidth,
              height: cropHeight,
            },
          },
        ],
        { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
      );

      console.log('Cropped Image URI:', result.uri);

      // Navigate to the results screen
      navigation.navigate('ResultsScreen', { croppedImageUri: result.uri });
    } catch (error) {
      console.error('Error cropping image:', error);
      Alert.alert('Error', 'Failed to crop the image.');
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* Cropping Area */}
        <View style={styles.cropArea} pointerEvents="none" />

        {/* Image Manipulation */}
        <PinchGestureHandler onGestureEvent={handlePinchGesture}>
          <View style={styles.editor}>
            <View {...panResponder.panHandlers}>
              <Image
                source={{ uri: photoUri }}
                style={[
                  styles.image,
                  {
                    transform: [
                      { scale },
                      { translateX },
                      { translateY },
                    ],
                  },
                ]}
                onLoad={onImageLoad} // Set natural dimensions
                onLayout={measureImagePosition} // Measure image position on screen
              />
            </View>
          </View>
        </PinchGestureHandler>

        {/* Crop Button */}
        <View style={styles.buttonContainer}>
          <Button title="Crop & Save" onPress={cropImage} />
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  cropArea: {
    position: 'absolute',
    top: (height - croppingSize) / 2,
    left: (width - croppingSize) / 2,
    width: croppingSize,
    height: croppingSize,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    zIndex: 10,
  },
  editor: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width * 2,
    height: height * 2,
    resizeMode: 'contain',
  },
  buttonContainer: {
    padding: 20,
    backgroundColor: '#fff',
  },
});

export default PhotoEditor;
