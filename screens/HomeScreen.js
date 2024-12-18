import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomModal from './CustomModal';

const HomeScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handlePhotoSelected = (uri) => {
    setModalVisible(false);
    navigation.navigate('PhotoEditor', { photoUri: uri });
  };

  return (
    <View style={styles.container}>
      <Button title="Open Photos" onPress={() => setModalVisible(true)} />
      <CustomModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onPhotoSelected={handlePhotoSelected}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
