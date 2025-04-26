import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LoginPage from './Components/login/LoginPage';
import OTPVerification from './Components/login/OtpVerify';
import HomeScreen from './Components/login/Home/homeScreen';
import CategoryProductsScreen from './Components/CategoryScreen/CategoryProductsScreen';
import LocationScreen from './Components/login/location';
import AddAddressScreen from './Components/login/address';
import CategoryScreen from './Components/CategoryScreen/categoryScreen';
import ProductDetailScreen from './Components/productScreen/ProductDetailScreen';
import SplashScreen from './Components/SplashScreen';
import SearchScreen from './Components/login/Home/SearchScreen';
import { GlobalStoreProvider } from './utils/GlobalStoreContext';

const Stack = createStackNavigator();

export default function App() {
  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        setInitialRoute(token ? 'Home' : 'Splash');
      } catch {
        setInitialRoute('Splash');
      }
    };
    checkToken();
  }, []);

  if (!initialRoute) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <GlobalStoreProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={initialRoute}>
          <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
          <Stack.Screen name="LoginPage" component={LoginPage} options={{ headerShown: false }} />
          <Stack.Screen name="OTPVerification" component={OTPVerification} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen
            name="CategoryProductsScreen"
            component={CategoryProductsScreen}
            options={({ navigation }) => ({
              title: 'Products',
              headerShadowVisible: false,
              headerStyle: { elevation: 0 },
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => navigation.navigate('Search')}
                  style={{ marginRight: 16 }}
                >
                  <Icon name="magnify" size={24} color="#333" />
                </TouchableOpacity>
              ),
            })}
          />
          <Stack.Screen name="location" component={LocationScreen} options={{ headerShown: false }} />
          <Stack.Screen name="AddAddressScreen" component={AddAddressScreen} options={{ headerShown: false }} />
          <Stack.Screen
            name="CategoryScreen"
            component={CategoryScreen}
            options={({ navigation }) => ({
              title: 'Category',
              headerShadowVisible: false,
              headerStyle: { elevation: 0 },
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => navigation.navigate('Search')}
                  style={{  marginRight: 16 }}
                >
                  <Icon name="magnify" size={24} color="#333" />
                </TouchableOpacity>
              ),
            })}
          />

          <Stack.Screen name="ProductDetail" component={ProductDetailScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </GlobalStoreProvider>
  );
}
