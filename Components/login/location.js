import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ActivityIndicator,
  Platform,
  Dimensions,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import GradientBackground from '../GradientBackground';

const { width } = Dimensions.get('window');

const SelectLocationScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const handleAddAddress = async () => {
    try {
      setLoading(true);

      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        setLoading(false);
        Alert.alert('Permission Denied', 'Location permission is required.');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setLoading(false);
      navigation.navigate('AddAddressScreen', { location });
    } catch (error) {
      console.error('Location error:', error);
      setLoading(false);
      Alert.alert(
        'Location Error',
        'Current location is unavailable. Make sure that location services are enabled.'
      );
    }
  };

  return (
    <GradientBackground>
      <SafeAreaView style={[styles.container, { paddingTop: Platform.OS === 'android' ? 40 : 0 }]}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={20} color="black" />
        </TouchableOpacity>

        <Image source={require('../../assets/location.png')} style={styles.image} />

        <Text style={styles.title}>Select Your Location</Text>
        <Text style={styles.subtitle}>
          Switch on your location to stay in tune with what’s happening in your area
        </Text>

        <TouchableOpacity style={styles.button} onPress={handleAddAddress} disabled={loading}>
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Add your current address</Text>
          )}
        </TouchableOpacity>
      </SafeAreaView>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  image: {
    width: width * 0.5,
    height: width * 0.5,
    resizeMode: 'contain',
    marginVertical: 25,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  subtitle: {
    fontSize: 14,
    color: 'gray',
    textAlign: 'center',
    paddingHorizontal: 10,
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#7ED321',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 20,
    minWidth: 200,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SelectLocationScreen;
