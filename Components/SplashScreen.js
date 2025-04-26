// Components/SplashScreen.js
import React, { useEffect } from 'react';
import { View, StyleSheet, StatusBar, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const bootstrap = async () => {
      /* tiny pause so the logo / color flash is visible */
      await new Promise(r => setTimeout(r, 800));

      const token = await AsyncStorage.getItem('authToken');
      navigation.replace(token ? 'Home' : 'LoginPage');
    };
    bootstrap();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#7ED321" barStyle="light-content" />
      {/* optional spinner or logo */}
      <ActivityIndicator size="large" color="#fff" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7ED321',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
