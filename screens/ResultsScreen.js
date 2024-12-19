import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

export default function ResultsScreen({ route }) {
  const { image } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: image.uri }} style={styles.image} />
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
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
});
