import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Platform,
  Alert,
  ActivityIndicator,
  Image,
} from 'react-native';
import { useGlobalStore } from '../../utils/GlobalStoreContext';

const GOOGLE_MAPS_API_KEY = 'AIzaSyALnIp-JqzPZ4lIHgQyvyr7pJ77VgVn7kA';

const AddAddressScreen = ({ route, navigation }) => {
  const [region, setRegion] = useState(null);
  const [address, setAddress] = useState('');
  const [street, setStreet] = useState('');
  const [landmark, setLandmark] = useState('');
  const [addressType, setAddressType] = useState('');
  const [loading, setLoading] = useState(true);
  let store = useGlobalStore();

  useEffect(() => {
    (async () => {
      try {
        const location = route?.params?.location;
        if (!location?.coords) {
          Alert.alert('Location Error', 'No location data received.');
          setLoading(false);
          return;
        }

        const { latitude, longitude } = location.coords;
        setRegion({ latitude, longitude });
        await reverseGeocode(latitude, longitude);
      } catch (error) {
        console.error('Location error:', error);
        Alert.alert('Error', 'Unable to fetch location.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const reverseGeocode = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}`
      );
      const data = await response.json();

      if (data.status === 'OK' && data.results.length > 0) {
        const place = data.results[0];
        setAddress(place.formatted_address);

        const components = place.address_components;
        const streetComponent = components.find(c => c.types.includes('route'));
        const landmarkComponent = components.find(c =>
          c.types.includes('point_of_interest') || c.types.includes('establishment')
        );

        setStreet(streetComponent?.long_name || '');
        setLandmark(landmarkComponent?.long_name || '');
      }
    } catch (error) {
      console.error('Reverse geocode failed:', error);
    }
  };

  const handleAddAddress = async () => {
    if (!street || !landmark || !addressType) {
      Alert.alert('Missing Fields', 'Please fill in all required fields.');
      return;
    }

    const fullAddress = `${street}, ${landmark}, ${addressType}`;
    store.address = fullAddress;
    navigation.navigate('Home', { userAddress: fullAddress });
  };

  const mapImageUrl = region
    ? `https://maps.googleapis.com/maps/api/staticmap?center=${region.latitude},${region.longitude}&zoom=16&size=600x300&markers=color:red%7C${region.latitude},${region.longitude}&key=${GOOGLE_MAPS_API_KEY}`
    : null;

  return (
    <SafeAreaView style={[styles.container, { paddingTop: Platform.OS === 'android' ? 40 : 0 }]}>
      <View style={{ flex: 1 }}>
        {loading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#7ED321" />
          </View>
        ) : (
          <>
            {mapImageUrl ? (
              <Image source={{ uri: mapImageUrl }} style={styles.map} />
            ) : (
              <Text style={styles.errorText}>Unable to load map image.</Text>
            )}

            <View style={styles.form}>
              <Text style={styles.label}>{address || 'No address found'}</Text>

              <TextInput
                style={styles.input}
                placeholder="Area/Street *"
                value={street}
                onChangeText={setStreet}
              />
              <TextInput
                style={styles.input}
                placeholder="Landmark *"
                value={landmark}
                onChangeText={setLandmark}
              />
              <TextInput
                style={styles.input}
                placeholder="Address Type (e.g., Home, Work) *"
                value={addressType}
                onChangeText={setAddressType}
              />

              <TouchableOpacity style={styles.button} onPress={handleAddAddress}>
                <Text style={styles.buttonText}>Add Address</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    height: '40%',
    width: '100%',
    resizeMode: 'cover',
  },
  errorText: {
    textAlign: 'center',
    padding: 16,
    color: 'red',
    fontWeight: 'bold',
  },
  form: {
    padding: 20,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#7ED321',
    padding: 15,
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default AddAddressScreen;
