import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import screens
import HomeScreen from './screens/HomeScreen';
import QuizScreen from './screens/QuizScreen';
import ResultsScreen from './screens/ResultsScreen';
import CropPhotoScreen from './screens/CropPhotoScreen';
import PhotoEditor from './screens/PhotoEditor';
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Quiz" component={QuizScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="ResultsScreen" component={ResultsScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="CropPhotoScreen" component={CropPhotoScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="PhotoEditor" component={PhotoEditor} options={{ headerShown: false }}/>


      </Stack.Navigator>
    </NavigationContainer>
  );
}
