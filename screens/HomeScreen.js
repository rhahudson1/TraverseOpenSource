import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native'; // Import navigation
import { Ionicons } from '@expo/vector-icons'; // Import icons
const { width, height } = Dimensions.get('window');

const HomeScreen = () => {
  const navigation = useNavigation(); // Hook for navigation

  return (
    <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#f5f5f5' }}>
      {/* Back Button */}
      <TouchableOpacity
        style={{
          position: 'absolute',
          top: height * 0.05,
          left: width * 0.05,
          zIndex: 1,
          flexDirection: 'row',
          alignItems: 'center',
        }}
        onPress={() => navigation.goBack()} // Go back to the previous screen
      >
        <Ionicons name="chevron-back" size={width * 0.06} color="#212846" />
        <Text style={{ fontSize: width * 0.04, color: '#212846', fontFamily: 'sans-serif-medium' }}>Back</Text>
      </TouchableOpacity>

      {/* Navigation Button */}
      <TouchableOpacity
        style={{
          width: width * 0.5,
          height: width * 0.15,
          backgroundColor: '#212846',
          borderRadius: width * 0.025,
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={() => navigation.navigate('NavigationBar')} // Navigate to NavigationBar.js
      >
        <Text style={{ color: 'white', fontSize: width * 0.035 }}>Navigate to Navigation Bar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
