import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const GradientBackground = ({ children }) => {
  return (
    <LinearGradient
      colors={['#E0F7FA', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#F3E5F5', '#E8F5E9']}
      locations={[0, 0.1, 0.2, 0.5, 0.8, 0.9, 0.95, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    height,
  },
});

export default GradientBackground;
