import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons,Octicons,MaterialCommunityIcons } from '@expo/vector-icons'; // Import icons

const { width, height } = Dimensions.get('window');

const NavigationBar = () => {
  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Navigation Bar</Text>

      <View style={{flexDirection: 'row',
    justifyContent: 'space-evenly',
    position: 'absolute',
    bottom: height * 0.275,
    backgroundColor: 'white',
    paddingVertical: width*.01,
    width: width * .9,
    borderRadius:width,
    alignItems: 'center',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,}}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')} style={{ width: width*.15, height: width*.15, justifyContent: 'center', alignItems: 'center'}}>
      <Octicons name="home" size={25} color="#85847f" />
      
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Hostels')} style={{ width: width*.15, height: width*.15, justifyContent: 'center', alignItems: 'center'}}>
      <Octicons name="organization" size={25} color="#85847f" />
      
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Home')} style={{ width: width*.175, height: width*.175, justifyContent: 'center', alignItems: 'center'}}>
      <View style={{width:width*.1375,height:width*.1375, backgroundColor:'#212846', justifyContent:'center',alignItems:'center', paddingVertical:width*.025,borderRadius:width*.05}}>
      <Octicons name="plus" size={25} color="white" />
      
      </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Community')} style={{ width: width*.15, height: width*.15, justifyContent: 'center', alignItems: 'center'}}>
        <MaterialCommunityIcons name="message-text-outline" size={25} color="#85847F" />
        
      </TouchableOpacity>
      <TouchableOpacity  style={{ width: width*.15, height: width*.15, justifyContent: 'center', alignItems: 'center'}}>
        <Octicons name="person" size={25} color="#212846" />
        <View style={{position: 'absolute',
    bottom: height * 0.0075,
    width: width * 0.06,
    height: width*.00625,
    backgroundColor: '#212846',
    alignSelf: 'center',
    borderRadius: 999999,}} />

      </TouchableOpacity>
    </View>

      <View style={{flexDirection: 'row',
    justifyContent: 'space-evenly',
    position: 'absolute',
    bottom: height * 0.15,
    backgroundColor: 'white',
    paddingVertical: width*.025,
    width: width * .9,
    borderRadius:width,
    alignItems: 'center',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,}}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')} style={{ width: width*.15, height: width*.15, justifyContent: 'center', alignItems: 'center'}}>
      <Octicons name="home" size={25} color="#85847f" />
      <Text style={{
    marginTop:width*.0125, fontSize:width*.025, color: '#85847f'}}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Hostels')} style={{ width: width*.15, height: width*.15, justifyContent: 'center', alignItems: 'center'}}>
      <Octicons name="organization" size={25} color="#85847f" />
      <Text style={{
    marginTop:width*.0125, fontSize:width*.025, color: '#85847f'}}>Hostels</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Home')} style={{ width: width*.15, height: width*.15, justifyContent: 'center', alignItems: 'center'}}>
      <View style={{width:width*.1375, height: width*.1375, backgroundColor:'#212846', justifyContent:'center',alignItems:'center', paddingVertical:width*.0175,borderRadius:width*.05}}>
      <Octicons name="plus" size={25} color="white" />
      <Text style={{
    marginTop:width*.0025, fontSize:width*.025, color: 'white'}}>Post</Text>
      </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Community')} style={{ width: width*.15, height: width*.15, justifyContent: 'center', alignItems: 'center'}}>
        <MaterialCommunityIcons name="message-text-outline" size={25} color="#85847F" />
        <Text style={{
    marginTop:width*.0125, fontSize:width*.025, color: '#85847f'}}>Chats</Text>
      </TouchableOpacity>
      <TouchableOpacity  style={{ width: width*.15, height: width*.15, justifyContent: 'center', alignItems: 'center'}}>
        <Octicons name="person" size={25} color="#212846" />
        <Text style={{
    marginTop:width*.0125, fontSize:width*.025, color: '#212846'}}>Profile</Text>
      </TouchableOpacity>
    </View>

      <View style={styles.bottomNav}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')} style={{ width: width*.15, height: width*.15, justifyContent: 'center', alignItems: 'center'}}>
      <Octicons name="home" size={25} color="#85847f" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Hostels')} style={{ width: width*.15, height: width*.15, justifyContent: 'center', alignItems: 'center'}}>
      <Octicons name="organization" size={25} color="#85847f" />
      </TouchableOpacity>
      <TouchableOpacity style={{ backgroundColor: '#212846', borderRadius: width * 0.025, width:width*.125, height: width*.125, justifyContent:'center', alignItems:'center' }} onPress={() => navigation.navigate('Add')}>
        <Octicons name="plus" size={25} color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Community')} style={{ width: width*.15, height: width*.15, justifyContent: 'center', alignItems: 'center'}}>
        <MaterialCommunityIcons name="message-text-outline" size={25} color="#85847F" />
      </TouchableOpacity>
      <TouchableOpacity  style={{ width: width*.15, height: width*.15, justifyContent: 'center', alignItems: 'center'}}>
        <Octicons name="person" size={25} color="#212846" />
        <View style={styles.activeDot} />
      </TouchableOpacity>
    </View>
    </View>
  );
};

export default NavigationBar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: width * 0.06,
    fontFamily: 'sans-serif-medium',
    color: '#212846',
    marginBottom: height * 0.05,
  },
  navOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: width * 0.035,
    fontFamily: 'sans-serif',
    color: '#212846',
    marginTop: height * 0.01,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    position: 'absolute',
    bottom: height * 0.0,
    backgroundColor: 'white',
    paddingBottom: height * 0.035,
    paddingTop: 10,
    height: height * 0.11,
    width: width * 1,
    alignItems: 'center',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  activeDot: {
    position: 'absolute',
    bottom: height * 0.005,
    width: width * 0.06,
    height: 2,
    backgroundColor: '#212846',
    alignSelf: 'center',
    borderRadius: 999999,
  },
});
