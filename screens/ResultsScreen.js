import React from 'react';
import { View, Image, StyleSheet, Button } from 'react-native';

const ResultsScreen = ({ route, navigation }) => {
  const { croppedImageUri } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: croppedImageUri }} style={styles.image} />
      <Button title="Go Back" onPress={() => navigation.goBack()} />
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
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
});

export default ResultsScreen;
